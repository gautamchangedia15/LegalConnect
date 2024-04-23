import { useState } from "react";
import axios from "axios";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { server } from "../../../store";
const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	const sendMessage = async (message) => {
		setLoading(true);
		try {
			const res = await axios.post(`${server}/messages/send/${selectedConversation?.providerId || selectedConversation?.id}`,{message},
				{withCredentials: true}
			  )
			const data = res.data;
			if (data.error) throw new Error(data.error);
			setMessages([...messages, data]);
		} catch (error) {
			console.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};
export default useSendMessage;