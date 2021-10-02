import React from 'react';
import { useHistory } from 'react-router';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Slide,
} from '@mui/material';
import axios from 'axios';
import url from '../../../../api';
import { toast } from 'react-toastify';

const Transition = React.forwardRef(function Transition(
	props,
	ref
) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const DeleteButton = ({ message, getMessages }) => {
	const history = useHistory();

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	async function handleDelete(e) {
		try {
			const deleteMessage = await axios.delete(
				`${url}/message/${message._id}`
			);
			toast.success(deleteMessage.data?.message, {
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
				size='small'
				color='error'
				variant='contained'
				right='true'
				onClick={handleClickOpen}
			>
				DELETE MESSAGE
			</Button>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby='alert-dialog-slide-description'
			>
				<DialogTitle color='error'>
					{'Are you sure?'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-slide-description'>
						If so, please click DELETE button.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleClose}
						color='error'
						variant='contained'
					>
						NOT DELETE
					</Button>
					<Button
						onClick={handleDelete}
						color='info'
						variant='contained'
					>
						DELETE
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default DeleteButton;
