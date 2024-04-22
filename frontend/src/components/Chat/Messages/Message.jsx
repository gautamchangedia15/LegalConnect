import { useAuthContext } from "../context/AuthContext";
import { extractTime } from "../utils/extractTime";
import useConversation from "../zustand/useConversation";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser;
	const formattedTime = message.timeStamp;
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdQK3Ih0TEYvLOjU23ZylvIYQsi77V_gUo1fhX9uZPHg&s" : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
};
export default Message;