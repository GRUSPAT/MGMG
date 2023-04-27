import React, { useState, useEffect, Button, View } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    GoogleSignin.configure({
        webClientId: '834855187376-k5mlvkmrsvli2naubkckso34hadltast.apps.googleusercontent.com',
    });

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);
    
    if (initializing) return null;

    async function onGoogleButtonPress() {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
      
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    }

    return (
        <View>
        <Button
            title="Google Sign-In"
            onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
        />
        </View>
    );
};

export default LoginScreen;
