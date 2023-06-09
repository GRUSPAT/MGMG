import { View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, { useState} from 'react';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { signInWithEmailAndPassword, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { auth, firestore } from '../src/config/config';
import { doc, setDoc } from 'firebase/firestore';

import GoogleBtn from '../components/form/GoogleButton'
import Input from '../components/form/Input'

import AppStyles from '../styles/LoginScreenStyles.scss';
import Background from '../assets/backgrounds/LoginBackground.svg';
import GoogleSvg from '../assets/icons/google.svg';
import MailSvg from '../assets/icons/mail.svg';
import LockSvg from '../assets/icons/lock.svg';

import { useNavigation } from '@react-navigation/native';
import ActionButton from '../components/form/ActionButton';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
    
    loginUser = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={AppStyles.container}>
            <Background syle={AppStyles.background}/>
            <Text style={AppStyles.title}>
                Zaloguj się
            </Text>
            <GoogleBtn/>
            <Input type="email" onChangeText={(email) => setEmail(email)}/>
            <Input type="password" on onChangeText={(password) => setPassword(password)}/>
            <ActionButton onPress={()=>loginUser(email, password)} text="Zaloguj się"/>
            <ActionButton 
                type="text" 
                onPress={()=>navigation.navigate('Register')} 
                text="Nie masz jeszcze konta?" 
                text2="Zarejestruj się!"
            />
            
        </View>
    );
};

export default LoginScreen;