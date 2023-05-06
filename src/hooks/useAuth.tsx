import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../config/config';

export function useAuth() {
    const  [user, setUser] = useState<User>();

    useEffect(() => {
        const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (user) => {
            if (user){
                setUser(user);
            } else {
                setUser(undefined);
            }
        });
        return unsubscribeFromAuthStateChanged
    }, []);
    
    return {
        user,
    }
};
