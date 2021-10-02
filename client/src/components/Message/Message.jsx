import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
	Avatar,
	Button,
	CssBaseline,
	Grid,
	TextField,
	Typography,
	Box,
} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import message from './image/message.svg';
import AuthContext from '../../context/AuthContext';
import url from '../../api';
import axios from 'axios';
import { toast } from 'react-toastify';

const Message = () => {
	const history = useHistory();

	const [user, setUser] = useState({
		title: '',
		description: '',
	});

	const { getLoggedIn } = useContext(AuthContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const userData = await axios.post(
				`${url}/message`,
				user
			);
			await getLoggedIn();
			toast.success(userData.data?.message, {
				position: toast.POSITION.BOTTOM_RIGHT,
			});
			history.push('/');
		} catch (error) {
			toast.error(error.response.data?.message, {
				position: toast.POSITION.BOTTOM_RIGHT,
			});
		}
	};
	return (
		<Grid
			container
			component='main'
			sx={{ height: 'calc(100vh - 64px)' }}
		>
			<CssBaseline />
			<Grid
				item
				xs={false}
				md={6}
				sx={{
					backgroundImage: `url(${message})`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'contain',
					backgroundPosition: 'center',
					backgroundColor: (t) =>
						t.palette.mode === 'light'
							? t.palette.grey[50]
							: t.palette.grey[900],
				}}
			/>
			<Grid
				item
				xs={12}
				md={6}
				elevation={6}
				alignSelf='center'
			>
				<Box
					sx={{
						my: 8,
						mx: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<CreateIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Create Message
					</Typography>
					<Box
						component='form'
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 1 }}
					>
                        <TextField
                            type="text"
							margin='normal'
							required
							fullWidth
							id='title'
							label='Title'
							name='title'
							autoComplete='title'
							autoFocus
							value={user.title}
							onChange={(e) =>
								setUser({ ...user, title: e.target.value })
							}
						/>
						<TextField
							margin='normal'
							required
                            fullWidth
                            multiline
                            maxRows={30}
							name='description'
							label='description'
							type='text'
							id='description'
							autoComplete='description'
							value={user.description}
							onChange={(e) =>
								setUser({
									...user,
									description: e.target.value,
								})
							}
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}
						>
							CREATE MESSAGE
						</Button>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
};

export default Message;
