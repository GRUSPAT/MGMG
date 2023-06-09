import React from 'react';
import { TouchableOpacity, Text} from 'react-native';
import { GoogleSignin} from '@react-native-google-signin/google-signin';

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
        const user_sign_in = signInWithCredential(auth, googleCredential);
        user_sign_in.then((user) => {
          console.log(user);
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
