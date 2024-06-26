import { useEffect, useState } from "react";
import axios from "axios"
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { server } from "../../../store";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	
	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await axios.get(`${server}/messages/getMessages/${selectedConversation?.clientId || selectedConversation?.id}`,{withCredentials:true});
				const data = res.data;
				setMessages(data);
			} catch (error) {
				console.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?.id){ 
			getMessages();
		}

	}, [selectedConversation?.id, setMessages]);

	

	return { messages, loading };
};
export default useGetMessages;