import { BrowserRouter, Switch, Route} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Member from './components/Member/Member';
import Admin from './components/Admin/Admin';
import NotFound from './components/NotFound/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Message from './components/Message/Message';

const Router = () => {

    return (
			<BrowserRouter>
				<ToastContainer theme='colored' />
				<Navbar />
				<Switch>
					<Route
						exact
						path='/'
						component={Home}
					/>
					<Route path='/signup' component={Signup} />
					<Route
						path='/login'
						component={Login}
					/>
					<Route path='/create' component={Message} />
					<Route path='/member' component={Member} />
					<Route path='/admin' component={Admin} />
					<Route path='/' component={NotFound} />
				</Switch>
			</BrowserRouter>
		);
}

export default Router
