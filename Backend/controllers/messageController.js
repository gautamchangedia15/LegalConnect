import admin from "firebase-admin";
import moment from "moment-timezone";
import { getReceiverSocketId, io } from "../socket/socket.js";

const db = admin.firestore();
const messagesCollection = db.collection("messages");
const conversationCollection = db.collection("conversations"); // Using conversations collection
const clientsCollection = db.collection("clients");
const providersCollection = db.collection("providersCollection");

// Assuming user ID is retrieved from the request (modify if needed)
const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user.userId || req.user.user.userId; // Assuming user ID is available from request

    // 1. Sort participant IDs to create a unique identifier for the conversation
    const participants = [senderId, userToChatId].sort();
    const participantKey = JSON.stringify(participants);

    // 2. Find the conversation based on the participant key
    const conversationQuery = await conversationCollection
      .where("participantKey", "==", participantKey)
      .limit(1)
      .get();

    if (conversationQuery.empty) {
      return res.status(200).json([]); // No conversation found
    }

    const conversationDoc = conversationQuery.docs[0];

    // 3. Retrieve message references from the conversation
    const messageIds = conversationDoc.data().messages || [];

    // 4. Retrieve message documents associated with the message IDs
    const messageDocs = await Promise.all(messageIds.map(async messageId => {
      const snapshot = await messagesCollection.doc(messageId).get();
      return { id: snapshot.id, ...snapshot.data() };
    }));

    // 5. Format timestamps and prepare response data
    const formattedMessages = messageDocs.map(messageData => {
      // Convert timestamp to a readable format
      const timestamp = moment
        .unix(messageData.timestamp._seconds)
        .format("YYYY-MM-DD HH:mm:ss");
      messageData.timestamp = timestamp; // Replace timestamp with formatted string
      return messageData;
    });

    return res.status(200).json(formattedMessages);
  } catch (error) {
    console.log("Error in getMessages: ", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};


// Assuming user ID is retrieved from the request (modify if needed)
const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.userId || req.user.user.userId; // Assuming user ID is available from request

    // Ensure consistent participant order (sender first, then receiver)
    const participants = [senderId, receiverId].sort();

    // 1. Create a unique identifier based on the ordered participants
    const participantKey = JSON.stringify(participants);

    // 2. Check for existing conversation based on the participant key
    const conversationQuery = conversationCollection
      .where("participantKey", "==", participantKey) // Use the unique key
      .limit(1)
      .get();

    let conversationRef;
    const conversations = await conversationQuery;

    if (conversations.empty) {
      // Create a new conversation
      conversationRef = await conversationCollection.add({
        participants,
        messages: [], // Initialize empty messages array
        participantKey, // Store the key for future reference
      });
    } else {
      conversationRef = conversations.docs[0].ref;
    }

    // 3. Create a new message document
    const newMessage = {
      senderId,
      receiverId,
      message,
      timestamp: admin.firestore.FieldValue.serverTimestamp(), // Use server timestamp
    };

    const messageRef = await messagesCollection.add(newMessage);
    const messageDoc = await messageRef.get();

    // 4. Update conversation "messages" field with message ID
    await conversationRef.update({
      messages: admin.firestore.FieldValue.arrayUnion(messageRef.id), // Add message ID to array
    });

    // 5. SOCKET IO FUNCTIONALITY 
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

    // 6. Send response with newly added message details (including ID)
    return res.status(201).json({
      id: messageRef.id, // Send message ID for retrieval
      ...messageDoc.data(), // Spread operator to include other message properties
    });
  } catch (error) {
    console.log("Error in sendMessage: ", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getUserInteractionsList = async (req, res) => {
  try {
    const userName = req.user.userId || req.user.user.userId; // Assuming user name is retrieved

    // 1. Find all conversations where the user's name appears in participants field (clients or providers)
    const conversationQuery = conversationCollection.where(
      "participants",
      "array-contains",
      userName
    );
    const conversations = await conversationQuery.get();

    // 2. Prepare data structures for interacting users and conversation details
    const interactingUsers = [];
    const conversationDetails = [];

    // 3. Process conversations and fetch user details efficiently
    for (const conversationDoc of conversations.docs) {
      const conversationData = conversationDoc.data();
      const participants = conversationData.participants;

      // 3.1 Identify interacting users (excluding current user)
      for (const participant of participants) {
        if (participant !== userName) {
          // Exclude current user
          const userId = participant;

          // 3.2 Check if user details are already retrieved
          const existingUser = interactingUsers.find(
            (user) => user.id === userId
          );
          if (!existingUser) {
            // 3.3 Try fetching user details from clients collection
            const clientRef = clientsCollection.doc(userId);
            const clientSnapshot = await clientRef.get();

            if (clientSnapshot.exists) {
              interactingUsers.push({
                id: userId,
                name: clientSnapshot.data().name,
                isClient: true,
              });
              continue; // Skip provider check if client found
            }

            // 3.4 If not found in clients, try providers collection
            const providerRef = providersCollection.doc(userId);
            const providerSnapshot = await providerRef.get();

            if (providerSnapshot.exists) {
              interactingUsers.push({
                id: userId,
                name: providerSnapshot.data().name,
                isClient: false,
              });
            } else {
              console.warn("User document not found for ID:", userId);
            }
          }
        }
      }

      // 3.5 Extract conversation details with formatted timestamps
      const messagePromises = conversationData.messages.map((messageID) =>
        messagesCollection.doc(messageID).get()
      );
      const messages = await Promise.all(messagePromises);
      const conversationMessages = messages
        .filter((messageSnap) => messageSnap.exists)
        .map((messageSnap) => {
          const messageData = messageSnap.data();
          const timestamp = messageData.timestamp;

          // Assuming timestamp is a Firebase Timestamp object
          const formattedTimestamp = moment
            .tz(timestamp.toDate(), "Asia/Kolkata")
            .format("DD-MM-YYYY, h:mm A"); // Adjust time zone as needed

          return { ...messageData, timestamp: formattedTimestamp }; // Include formatted timestamp in message data
        });

      conversationDetails.push({
        id: conversationDoc.id,
        participants: participants.filter((p) => p !== userName), // Exclude current user from participants list
        messages: conversationMessages,
      });
    }

    return res.status(200).json({ interactingUsers, conversationDetails });
  } catch (error) {
    console.log("Error in getUserInteractionsList:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export { sendMessage, getMessages, getUserInteractionsList };
