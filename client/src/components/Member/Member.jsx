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
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import member from './image/join.svg';
import url from '../../api';
import axios from 'axios';
import { toast } from 'react-toastify';
import AuthContext from '../../context/AuthContext';

const Member = () => {
	const history = useHistory();

	const [user, setUSer] = useState({
		password: '',
	});

	const { getLoggedInMember } = useContext(AuthContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const userData = await axios.put(
				`${url}/auth/membership-status`,
				user
			);
			await getLoggedInMember();
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
					backgroundImage: `url(${member})`,
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
						<CardMembershipIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Become A Member
					</Typography>
					<Box
						component='form'
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 1 }}
					>
						<TextField
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='password'
							value={user.password}
							onChange={(e) =>
								setUSer({
									...user,
									password: e.target.value,
								})
							}
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}
						>
							Join The Club
						</Button>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
};

export default Member;
