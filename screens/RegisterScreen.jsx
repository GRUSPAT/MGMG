import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../src/config/config';

//import { firebase } from '../src/config/config';
//import { firestore } from '../src/config/config';
//import { addDoc, collection, doc, setDoc } from "firebase/firestore"; 

import { useNavigation } from '@react-navigation/native';

import GoogleBtn from '../components/form/GoogleButton'
import Input from '../components/form/Input'

import AppStyles from '../styles/LoginScreenStyles.scss'
import Background from '../assets/backgrounds/LoginBackground.svg';
import ActionButton from '../components/form/ActionButton';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigation = useNavigation();

  const registerUser = async (email, password, firstName, lastName) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch(error) {
      console.error(error);
    }
  };
    
  return (
    <View style={AppStyles.container}>
      <Background syle={AppStyles.background}/>
      <Text style={AppStyles.titleRegister}>
        Zarejestruj się
      </Text>
      <GoogleBtn/>
      <Input type="nickname" onChangeText={(firstName) => setFirstName(firstName)}/>
      <Input type="email" onChangeText={(email) => setEmail(email)}/>
      <Input type="password" onChangeText={(password) => setPassword(password)}/>
      <ActionButton 
      onPress={() => registerUser(email, password, firstName)} 
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
