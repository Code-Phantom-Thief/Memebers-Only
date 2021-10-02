import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
	Avatar,
	Button,
	CssBaseline,
	Grid,
	TextField,
	Typography,
	Box,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import signup from './image/signup.svg';
import axios from 'axios';
import url from '../../api';
import { toast } from 'react-toastify';
import AuthContext from '../../context/AuthContext';

const Signup = () => {
	const history = useHistory();

	const [user, setUser] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const { getLoggedIn } = useContext(AuthContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const userData = await axios.post(
				`${url}/auth/register`,
				user
			);
			await getLoggedIn();
			toast.success(userData.data?.message + user.username, {
				position: toast.POSITION.BOTTOM_RIGHT,
			});
					setTimeout(() => {
						history.push('/');
						window.location.reload();
					}, 2000);
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
					backgroundImage: `url(${signup})`,
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
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Sign up
					</Typography>
					<Box
						component='form'
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 1 }}
					>
						<TextField
							margin='normal'
							fullWidth
							id='username'
							label='Username'
							name='username'
							type='text'
							autoComplete='username'
							autoFocus
							value={user.username}
							onChange={(e) =>
								setUser({
									...user,
									username: e.target.value,
								})
							}
							required
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							type='email'
							autoComplete='email'
							value={user.email}
							onChange={(e) =>
								setUser({
									...user,
									email: e.target.value,
								})
							}
						/>
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
								setUser({
									...user,
									password: e.target.value,
								})
							}
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							name='confirmPassword'
							label='Confirm Password'
							type='password'
							id='confirmPassword'
							autoComplete='confirmPassword'
							value={user.confirmPassword}
							onChange={(e) =>
								setUser({
									...user,
									confirmPassword: e.target.value,
								})
							}
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}
						>
							Sign Up
						</Button>
						<Grid container>
							<Grid item>
								<Link
									to='/login'
									variant='body2'
									className='link__form'
								>
									{'Already have an account? Log in'}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
};

export default Signup;
