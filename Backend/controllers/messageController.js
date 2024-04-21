import admin from 'firebase-admin';
import moment from "moment";

const db = admin.firestore();
const messageCollection = db.collection('messages');
const conversationCollection = db.collection('conversations'); // Using conversations collection

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.userId; // Assuming user ID is available from request

    // 1. Check for existing conversation or create a new one
    let conversationRef;
    const conversationQuery = await conversationCollection.where('participants', 'array-contains-any', [senderId, receiverId]).limit(1).get();

    if (conversationQuery.empty) {
      // Create a new conversation
      conversationRef = await conversationCollection.add({
        participants: [senderId, receiverId],
      });
    } else {
      conversationRef = conversationQuery.docs[0].ref;
    }

    // 2. Create a new message document
    const newMessage = {
      senderId,
      receiverId,
      message,
      timestamp: admin.firestore.FieldValue.serverTimestamp(), // Use server timestamp
    };

    const messageRef = await messageCollection.add(newMessage);

    // 3. Update conversation "messages" field with message ID
    await conversationRef.update({
        messages: admin.firestore.FieldValue.arrayUnion(messageRef.id) // Add message ID to array
      });

    // 4. Socket IO functionality (assuming you have a separate server)
    const receiverSocketId = await getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      // Emit event to the receiver's socket ID
      io.to(receiverSocketId).emit("newMessage", messageRef.id); // Send message ID for retrieval
    }

    res.status(201).json({ messageId: messageRef.id }); // Send message ID for retrieval
  } catch (error) {
    console.log("Error in sendMessage: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMessages=async(req,res)=>{
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user.userId; // Assuming user ID is available from request
    
        // 1. Check for any conversation
        const conversationQuery = await conversationCollection.where('participants', 'array-contains-any', [senderId, userToChatId]).limit(1).get();
    
        if (conversationQuery.empty) {
          return res.status(200).json([]); // No conversation found
        }
    
        const conversationDoc = conversationQuery.docs[0];
    
        // 2. Retrieve message references from conversation
        const messageIds = conversationDoc.data().messages || []; // Handle empty array
    
        // 4. Retrieve message documents
        const messageDocs = await messageCollection.where('__name__', 'in', messageIds).get(); // Efficiently retrieve messages
    
        // 5. Prepare response data with formatted timestamps
        const messages = messageDocs.docs.map(doc => {
          const messageData = doc.data();
          messageData.id = doc.id;
    
          // Convert timestamp to a readable format
          const timestamp = moment.unix(messageData.timestamp._seconds).format("YYYY-MM-DD HH:mm:ss");
          messageData.timestamp = timestamp; // Replace timestamp with formatted string
    
          return messageData;
        });
    
        res.status(200).json(messages);
      } catch (error) {
        console.log("Error in getMessages: ", error.message);
        res.status(500).json({ error: "Internal server error" });
      }
}
export {sendMessage,getMessages}