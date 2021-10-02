import { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
} from '@mui/material';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import './Navbar.css';
import Logout from '../Logout/Logout';
import AuthContext from '../../context/AuthContext';

const Navbar = () => {
	const { loggedIn, loggedinMember, loggedinAdmin } =
		useContext(AuthContext);

	return (
		<AppBar position='static'>
			<Toolbar>
				<Link to='/' className='link'>
					<CardMembershipIcon sx={{ mr: 2 }} />
				</Link>
				<Link to='/' className='link'>
					<Typography
						variant='h6'
						color='inherit'
						component='div'
					>
						Members Only
					</Typography>
				</Link>
				<div className='navbar__div'>
					{loggedIn === false && (
						<>
							<Link to='/signup' className='link'>
								<Button color='inherit'>Signup</Button>
							</Link>
							<Link to='/login' className='link'>
								<Button color='inherit'>Login</Button>
							</Link>
						</>
					)}
					{loggedIn === true && (
						<>
							<Link to='/create' className='link'>
								<Button color='inherit'>Message</Button>
							</Link>
							<Logout />
						</>
					)}
					{(loggedIn === true && loggedinMember === false) && (
						<Link to='/member' className='link'>
							<Button color='inherit'>Member</Button>
						</Link>
					)}
					{loggedIn === true && loggedinAdmin !== true && (
					<Link to='/admin' className='link'>
						<Button color='inherit'>Admin</Button>
					</Link>
					)}
				</div>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
