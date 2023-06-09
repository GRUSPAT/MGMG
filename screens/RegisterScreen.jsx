import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../src/config/config';

import { setDoc, doc} from "firebase/firestore"; 

import { useNavigation } from '@react-navigation/native';

import GoogleBtn from '../components/form/GoogleButton'
import Input from '../components/form/Input'

import AppStyles from '../styles/LoginScreenStyles.scss'
import Background from '../assets/backgrounds/LoginBackground.svg';
import ActionButton from '../components/form/ActionButton';

const RegisterScreen = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const registerUser = async (email, password, userName) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          uid: uid,
          userName: userName,
          email: email
        };
        setDoc(doc(firestore, "users", uid), data);
      })
    } catch(error) {
      console.log(error);
    }
  };
    
  return (
    <View style={AppStyles.container}>
      <Background syle={AppStyles.background}/>
      <Text style={AppStyles.titleRegister}>
        Zarejestruj się
      </Text>
      <GoogleBtn/>
      <Input type="nickname" onChangeText={(userName) => setUserName(userName)}/>
      <Input type="email" onChangeText={(email) => setEmail(email)}/>
      <Input type="password" onChangeText={(password) => setPassword(password)}/>
      <ActionButton 
      onPress={() => registerUser(email, password, userName)} 
      text="Zarejestruj się"/>
      <ActionButton 
      type="text" 
      onPress={() => navigation.navigate('Login')}
      text="Masz już konto"
      text2="Zaloguj się!"
      />
    </View>
  );
};

export default RegisterScreen;
