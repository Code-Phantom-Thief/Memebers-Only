import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import url from '../api';

const AuthContext = createContext();

const AuthContextProvider = (props) => {
	const [loggedIn, setLoggedIn] = useState(undefined);
	const [loggedinMember, setLoggedinMember] = useState(undefined);
	const [loggedinAdmin, setLoggedinAdmin] = useState(undefined);

	async function getLoggedIn() {
		const loggedInRes = await axios.get(
			`${url}/auth/loggedin`
		);
		setLoggedIn(loggedInRes.data);
	}

	async function getLoggedInMember() {
		const loggedInMemberRes = await axios.get(
			`${url}/auth/loggedinmember`
		);
		setLoggedinMember(loggedInMemberRes.data);
	}

	async function getLoggedInAdmin() {
		const loggedInAdminRes = await axios.get(
			`${url}/auth/loggedinadmin`
		);
		setLoggedinAdmin(loggedInAdminRes.data);
	}


	useEffect(() => {
		getLoggedIn();
		getLoggedInMember();
		getLoggedInAdmin();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				loggedIn,
				getLoggedIn,
				loggedinMember,
				getLoggedInMember,
				loggedinAdmin,
				getLoggedInAdmin
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
export { AuthContextProvider };
