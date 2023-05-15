import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';

import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { signInWithEmailAndPassword, onAuthStateChanged, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../src/config/config';

import AppStyles from '../styles/LoginScreenStyles.scss'
import Background from '../assets/backgrounds/LoginBackground.svg';
import GoogleSvg from '../assets/icons/google.svg';
import MailSvg from '../assets/icons/mail.svg';
import LockSvg from '../assets/icons/lock.svg';

//import { firebase } from '../src/config/config'

import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    //const [initializing, setInitializing] = useState(true);
    //const [user, setUser] = useState();
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    GoogleSignin.configure({
        webClientId: '834855187376-li1ogmtv4bq6ij34su18ed4d8pujsr64.apps.googleusercontent.com',
    });

    /*
    function onAuthStateChanged2(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }
    */

    /*
    useEffect(() => {
        const subscriber = onAuthStateChanged(auth, onAuthStateChanged2);
        return subscriber; // unsubscribe on unmount
    }, []);
    */

    //if (initializing) return null;

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
            <TouchableOpacity style={AppStyles.googleButton} onPress={onGoogleButtonPress}>
      <GoogleSvg style={AppStyles.googleImage} />
        <Text style={AppStyles.googleButtonText}>Kontynuuj z Google</Text>
      </TouchableOpacity>
            
            <View style={AppStyles.inputContainer}>
                <MailSvg style={AppStyles.mailImage} />
                <View style={AppStyles.separator} />
                <TextInput 
                    style={AppStyles.input}
                    placeholder="e-mail"
                    placeholderTextColor="#00B4D8"
                    autoCapitalize='none'
                    onChangeText={(email) => setEmail(email)}
                    autoCorrect={false}
                />
            </View>
            <View style={AppStyles.inputContainer}>
                <LockSvg style={AppStyles.lockImage} />
                <View style={AppStyles.separator} />
                <TextInput 
                    style={AppStyles.input}
                    placeholder="hasło"
                    placeholderTextColor="#00B4D8"
                    autoCapitalize='none'
                    onChangeText={(password) => setPassword(password)}
                    autoCorrect={false}
                    secureTextEntry={true}
                />
            </View>

            <TouchableOpacity 
                onPress={() => loginUser(email, password)}
                style={AppStyles.button}
            >
                <Text style={AppStyles.buttonText}>Zaloguj się</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => navigation.navigate('Register')}
                style={AppStyles.textContainer}
            >
                <Text style={AppStyles.plainText}>Nie masz jeszcze konta? </Text>
        <Text style={AppStyles.clickableText}>Zarejestruj się!</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 23,
      fontWeight: 'bold',
    },
    textInput: {
        paddingTop:20,
        paddingBottom:10,
        width: 400,
        fontSize:20,
        borderBottomWidth:1,
        borderBottomColor:'#000',
        marginBottom:10,
        textAlign:'center'
    },
    button: {
        marginTop:50,
        height:70,
        width:250,
        backgroundColor:'#026efd',
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 50,
    }
    
});

export default LoginScreen;
