import { View, Text } from 'react-native';
import React, { useState } from 'react';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../src/config/config';

import GoogleBtn from '../components/form/GoogleButton'
import Input from '../components/form/Input'

import AppStyles from '../styles/LoginScreenStyles.scss';
import Background from '../assets/backgrounds/LoginBackground.svg';

import { useNavigation } from '@react-navigation/native';
import ActionButton from '../components/form/ActionButton';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
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