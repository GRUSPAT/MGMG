import React from 'react';
import { TouchableOpacity, Text} from 'react-native';

import { GoogleSignin} from '@react-native-google-signin/google-signin';

import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { auth, firestore } from '../../src/config/config';
import { doc, setDoc } from 'firebase/firestore';

import AppStyles from '../../styles/LoginScreenStyles.scss'
import GoogleSvg from '../../assets/icons/google.svg';

const GoogleBtn = () => {
    GoogleSignin.configure({
        webClientId: '834855187376-li1ogmtv4bq6ij34su18ed4d8pujsr64.apps.googleusercontent.com',
    });

    const onGoogleButtonPress = async () => {
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();
  
      // Create a Google credential with the token
      const googleCredential = GoogleAuthProvider.credential(idToken);
      
      // Sign-in the user with the credential
      signInWithCredential(auth, googleCredential)
      .then((response) => {
          const uid = response.user.uid;
          const userName = response.user.displayName;
          const email = response.user.email;
          const data = {
              uid: uid,
              userName: userName,
              email: email
          };
          setDoc(doc(firestore, "users", uid), data);
      })
      .catch((error) => {
        console.log(error);
      })
    }

  return (
    <TouchableOpacity style={AppStyles.googleButton} onPress={onGoogleButtonPress}>
        <GoogleSvg style={AppStyles.googleImage} />
        <Text style={AppStyles.googleButtonText}>Kontynuuj z Google</Text>
    </TouchableOpacity>
  );
};

export default GoogleBtn;
