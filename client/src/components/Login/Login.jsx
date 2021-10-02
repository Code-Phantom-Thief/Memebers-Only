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
import LoginIcon from '@mui/icons-material/Login';
import login from './image/login.svg';
import AuthContext from '../../context/AuthContext';
import url from '../../api';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
	const history = useHistory();

	const [user, setUser] = useState({
		email: '',
		password: '',
	});


	const { getLoggedIn } = useContext(AuthContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const userData = await axios.post(
				`${url}/auth/login`,
				user
			);
			await getLoggedIn();
			toast.success(
				userData.data?.message,
				{
					position: toast.POSITION.BOTTOM_RIGHT,
				}
			);
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
					backgroundImage: `url(${login})`,
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
						<LoginIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Log in
					</Typography>
					<Box
						component='form'
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 1 }}
					>
						<TextField
							type='email'
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							autoComplete='email'
							autoFocus
							value={user.email}
							onChange={(e) =>
								setUser({ ...user, email: e.target.value })
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
							autoComplete='current-password'
							value={user.password}
							onChange={(e) =>
								setUser({
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
							Log In
						</Button>
						<Grid container>
							<Grid item>
								<Link
									to='/signup'
									variant='body2'
									className='link__form'
								>
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
};

export default Login;
