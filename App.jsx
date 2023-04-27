import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import Lottie from 'lottie-react-native';
import SplashScreen from 'react-native-lottie-splash-screen'
import LoginScreen from './screens/LoginScreen';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const App = () => {
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
    SplashScreen.hide();
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
    <Button
            title="Google Sign-In"
            onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
        />
  );
};

export default App;
