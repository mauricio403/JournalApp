import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { FirebaseAuth } from '../firebase/config';
import { login, logout } from '../store/auth/authSlice';

export const useCheckAuth = () => {


    const { status } = useSelector(state => state.auth);
    const dispatch = useDispatch();


    useEffect(() => {

        onAuthStateChanged(FirebaseAuth, async (user) => {
            if (!user) return dispatch(logout());
            const { uid, displayName, email, photoURL } = user;
            dispatch(login({ uid, displayName, email, photoURL }));
        })


    }, []);

    return {
        status
    }
}
