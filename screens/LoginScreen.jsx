import { View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, { useState} from 'react';

import { GoogleSignin} from '@react-native-google-signin/google-signin';
import { signInWithEmailAndPassword, onAuthStateChanged, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../src/config/config';

import GoogleBtn from '../components/form/GoogleButton'
import Input from '../components/form/Input'

import AppStyles from '../styles/LoginScreenStyles.scss';
import Background from '../assets/backgrounds/LoginBackground.svg';

//import { firebase } from '../src/config/config'

import { useNavigation } from '@react-navigation/native';
import ActionButton from '../components/form/ActionButton';

const LoginScreen = () => {
    //const [initializing, setInitializing] = useState(true);
    //const [user, setUser] = useState();
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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