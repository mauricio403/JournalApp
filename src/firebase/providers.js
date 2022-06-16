import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
import { FirebaseAuth } from "./config";


//login with google

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result); //se obtiene el token

        const { displayName, email, photoURL, uid, } = result.user;

        return {
            ok: true,
            //user info
            displayName,
            email,
            photoURL,
            uid
        }



    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        }
    }
}

//login with facebook

const facebookProvider = new FacebookAuthProvider();
facebookProvider.addScope('user_birthday');

export const signInWithFacebook = async () => {

    try {
        const result = await signInWithPopup(FirebaseAuth, facebookProvider);

        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            //user info
            displayName,
            email,
            photoURL,
            uid
        }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        }
    }

}


export const registerUserWithEmailAndPassword = async ({ email, password, displayName }) => {
    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;

        //todo: actulizar el displayname en firebase

        await updateProfile(FirebaseAuth.currentUser, {
            displayName
        });

        return {
            ok: true,
            uid,
            photoURL,
            email,
            displayName
        }

    } catch (error) {
        console.log(error);
        const errorMessage = error.code === 'auth/email-already-in-use' ? 'El email ya está en uso' : error.message;

        return {
            ok: false,
            errorMessage
        }
    }


}

export const loginWihtEmailAndPassword = async ({ email, password }) => {

    try {

        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);

        const { uid, photoURL, displayName } = resp.user;

        return {
            ok: true,
            uid,
            photoURL,
            displayName
        }

    } catch (error) {
        console.log(error);
        const errorMessage = error.code === 'auth/user-not-found' ? 'El usuario no existe' : error.message;

        return {
            ok: false,
            errorMessage
        }

    }

}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
    
}