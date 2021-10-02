import { useEffect, useState } from 'react';
import axios from 'axios';
import url from '../../api';
import { toast } from 'react-toastify';
import MessageList from './MessageList/MessageList';

const Home = () => {
	const [messages, setMessages] = useState([]);

	async function getMessages() {
		try {
			const messagesData = await axios.get(
				`${url}/message`
			);
			setMessages(messagesData.data);
		} catch (error) {
			toast.error(error.response.data?.message, {
				position: toast.POSITION.BOTTOM_RIGHT,
			});
		}
	}

	useEffect(() => {
		getMessages();
	}, [])

	return (
		<div>
			<MessageList messages={messages} getMessages={getMessages}/>
		</div>
	);
};

export default Home;
