import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  const { data } = useSelector((state) => state.loadProviders.Provider);
  const { client } = useSelector((state) => state.user);

  useEffect(() => {
    setLoading(true);
    if (data) {
      const clients = data.clients;
      const uniqueClientIds = new Set(clients.map((obj) => obj.clientId));
      // Create a new array with unique objects
      const uniqueData = [];
      clients.forEach((obj) => {
        if (uniqueClientIds.has(obj.clientId)) {
          uniqueData.push({id:obj.clientId,...obj});
          uniqueClientIds.delete(obj.clientId); // Remove processed clientId to avoid duplicates
        }
      });
      // console.log("helloooo from provider", uniqueData);
      setConversations(uniqueData);
    }

    if (client && client.data) {
      const filteredServices = client.data.services.filter(service => service.hasOwnProperty("providerId"));
      // console.log("helloooo from client", client.data);
      setConversations(filteredServices);
    }
    setLoading(false);
  }, [data, client]);

  return { loading, conversations };
};
export default useGetConversations;

// useEffect(() => {
//     const getConversations = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(
//           "http://localhost:3000/messages/getUserInteractionsList",
//           { withCredentials: true }
//         );
//         const data = res.data.interactingUsers;
//         if (data.error) {
//           throw new Error(data.error);
//         }
//         setConversations(data);
//       } catch (error) {
//         console.error(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // getConversations();
//   }, []);
