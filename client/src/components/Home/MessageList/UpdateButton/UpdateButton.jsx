import React, { useState } from 'react';
import { useHistory } from 'react-router';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from '@mui/material';
import axios from 'axios';
import url from '../../../../api';
import { toast } from 'react-toastify';

const UpdateButton = ({ message, getMessages }) => {
	const history = useHistory();

	const [open, setOpen] = useState(false);

	const [updateMessage, setUpdateMessage] = useState({
		title: '',
		description: '',
	});

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	async function handleUpdate(e) {
		try {
			const updateData = await axios.put(
				`${url}/message/${message._id}`, updateMessage
			);
			toast.success(updateData.data?.message, {
				position: toast.POSITION.BOTTOM_RIGHT,
			});
			history.push('/');
			setOpen(false);
			getMessages();
		} catch (error) {
			toast.error(error.response.data?.message, {
				position: toast.POSITION.BOTTOM_RIGHT,
			});
			setOpen(false);
		}
	}

	return (
		<>
			<Button
				variant='contained'
				size='small'
				onClick={handleClickOpen}
			>
				UPDATE MESSAGE
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle color="primary">UPDATE MESSAGE</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To update this article, please fill in text
						fields here. But, if you not this message's
						author, you can not update message.
					</DialogContentText>
					<TextField
						autoFocus
						margin='dense'
						id='title'
						label='Title'
						type='text'
						fullWidth
                        variant='standard'
						name='title'
						value={updateMessage.title}
						onChange={(e) =>
							setUpdateMessage({
								...updateMessage,
								title: e.target.value,
							})
						}
					/>
					<TextField
						autoFocus
						margin='dense'
						id='description'
						label='Description'
						type='text'
						fullWidth
						variant='standard'
                        name='description'
						value={updateMessage.description}
						onChange={(e) =>
							setUpdateMessage({
								...updateMessage,
								description: e.target.value,
							})
						}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleUpdate}>UPDATE</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default UpdateButton;
