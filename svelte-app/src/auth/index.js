import { useMachine } from './useMachine';
import { initAuthMachine } from './authMachine';

const userMapper = claims => ({
	id: claims.user_id,
	name: claims.name,
	email: claims.email,
	picture: claims.picture
});

// construction function. need to call it after we
export const initAuth = (useRedirect = false) => {
	const _cc = window.cc
    const auth = _cc.amplify.Auth

	const loginWithEmailPassword = (email, password) => {
		return auth.signIn(email, password);
	}
		

	const services = {
		authChecker: () => {
			// wrap the onAuthStateChanged hook in a promise and
			// immediately unsubscribe when triggered			
			return auth.currentAuthenticatedUser()
		},
		authenticator: (_, event) => {
			return loginWithEmailPassword(event.email, event.password);

		},
		loader: (ctx, _) => {			
			return auth.currentAuthenticatedUser()
		},
		logout: () => auth.signOut()
	};

	const authMachine = initAuthMachine(services);

	return useMachine(authMachine);
};