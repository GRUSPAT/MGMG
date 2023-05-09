import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';

import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { signInWithEmailAndPassword, onAuthStateChanged, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../src/config/config';

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
        <View style={styles.container}>
            <Text style={styles.text}>
                Zaloguj się
            </Text>
            <View style={{marginTop:40}}>
                <GoogleSigninButton
                style={{width: 300, height: 65}}
                onPress={onGoogleButtonPress}
                />
            </View>
            <View style={{marginTop:40}}>
                <TextInput 
                    style={styles.textInput}
                    placeholder='Email'
                    onChangeText={(email) => setEmail(email)}
                    autoCorrect={false}
                />
                <TextInput 
                    style={styles.textInput}
                    placeholder='Password'
                    onChangeText={(password) => setPassword(password)}
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                />
            </View>
            <TouchableOpacity 
                onPress={() => loginUser(email, password)}
                style={styles.button}
            >
                <Text style={{fontWeight:'bold', fontSize:22}}>Zaloguj się</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => navigation.navigate('Register')}
                style={{marginTop:20}}
            >
                <Text style={{fontWeight:'bold', fontSize:16}}>Nie masz konta? Zarejestruj teraz!</Text>
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
