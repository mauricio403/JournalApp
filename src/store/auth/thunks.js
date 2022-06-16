import { loginWihtEmailAndPassword, logoutFirebase, registerUserWithEmailAndPassword, signInWithFacebook, signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const result = await signInWithGoogle();
        if (!result.ok) return dispatch(logout(result.errorMessage));

        dispatch(login(result));

    }
}

export const startFacebookSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const result = await signInWithFacebook();
        if (!result.ok) return dispatch(logout(result.errorMessage));
        console.log(result);

        dispatch(login(result));

    }
}

export const startCreatingUserWithEmailAndPassword = ({ email, password, displayName }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailAndPassword({ email, password, displayName });
        if (!ok) return dispatch(logout({ errorMessage }));

        dispatch(login({ uid, photoURL, email, displayName }));
    }
}

export const startLoginWithEmailAndPassword = ({ email, password }) => {

    return async (dispatch) => {
        dispatch(checkingCredentials());

        const result = await loginWihtEmailAndPassword({ email, password });
        if (!result.ok) return dispatch(logout(result));
        dispatch(login(result));
    }

}

export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase();
        dispatch(logout());


    }
}