import {
	Box,
	Card,
	CardActions,
	CardContent,
	Typography,
} from '@mui/material';
import { useContext } from 'react';
import { formatDistance } from 'date-fns';
import AuthContext from '../../../context/AuthContext';
import DeleteButton from './DeleteButton/DeleteButton';
import UpdateButton from './UpdateButton/UpdateButton';

const MessageList = ({ messages, getMessages }) => {
	const { loggedIn, loggedinMember} =
		useContext(AuthContext);

	return (
		<>
			{messages?.map((message) => (
				<Box
					sx={{ minWidth: 275, padding: '20px' }}
					key={message._id}
				>
					<Card variant='elevation'>
						<CardContent>
							<Typography
								sx={{ fontSize: 14 }}
								color='text.secondary'
								gutterBottom
							>
								{formatDistance(
									new Date(message.updatedAt),
									new Date(),
									{ addSuffix: true }
								)}
							</Typography>
							<Typography variant='h5' component='div'>
								{message.title}
							</Typography>
							<Typography
								sx={{ mb: 1.5 }}
								color='text.secondary'
							>
								{loggedIn === false
									? 'Anonymous'
									: loggedIn === true &&
									  loggedinMember === false
									? 'Anonymous'
									: message.author.map(
											(user) => user.username
									  )}
							</Typography>
							<Typography variant='body2'>
								{message.description}
								<br />
							</Typography>
						</CardContent>
						{loggedinMember === true && (
						<CardActions>
							<UpdateButton
								message={message}
								getMessages={getMessages}
							/>
							<DeleteButton
								message={message}
								getMessages={getMessages}
							/>
						</CardActions>
						)}
					</Card>
				</Box>
			))}
		</>
	);
};

export default MessageList;
