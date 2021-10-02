import React, { useContext } from 'react';
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
import url from '../../api';
import { toast } from 'react-toastify';
import AuthContext from '../../context/AuthContext';

const Transition = React.forwardRef(function Transition(
	props,
	ref
) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const Logout = () => {
	const history = useHistory();
	const { getLoggedIn } = useContext(AuthContext);

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	async function logout(e) {
		try {
            const logout  = await axios.get(`${url}/auth/logout`);
			toast.success(logout.data?.message, {
				position: toast.POSITION.BOTTOM_RIGHT,
			});
			await getLoggedIn();
			history.push('/');
		} catch (error) {;
			toast.error(error.response.data?.message, {
				position: toast.POSITION.BOTTOM_RIGHT,
			});
		}
	};

	return (
		<>
			<Button color='inherit' onClick={handleClickOpen}>
				LOGOUT
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
						If so, please click AGREE button.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleClose}
						color='error'
						variant='contained'
					>
						Disagree
					</Button>
					<Button
						onClick={logout}
						color='info'
						variant='contained'
					>
						Agree
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default Logout;
