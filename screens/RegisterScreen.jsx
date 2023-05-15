import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../src/config/config';

//import { firebase } from '../src/config/config';
//import { firestore } from '../src/config/config';
//import { addDoc, collection, doc, setDoc } from "firebase/firestore"; 

import { useNavigation } from '@react-navigation/native';

import AppStyles from '../styles/LoginScreenStyles.scss'
import Background from '../assets/backgrounds/LoginBackground.svg';
import GoogleSvg from '../assets/icons/google.svg';
import MailSvg from '../assets/icons/mail.svg';
import LockSvg from '../assets/icons/lock.svg';
import PersonSvg from '../assets/icons/person.svg';

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
      <TouchableOpacity style={AppStyles.googleButton} onPress={() => navigation.navigate('Login')}>
      <GoogleSvg style={AppStyles.googleImage} />
        <Text style={AppStyles.googleButtonText}>Kontynuuj z Google</Text>
      </TouchableOpacity>
      <View style={AppStyles.inputContainer}>
                <PersonSvg style={AppStyles.personImage} />
                <View style={AppStyles.separator} />
                <TextInput 
                    style={AppStyles.input}
                    placeholder="Imie"
                    placeholderTextColor="#00B4D8"
                    autoCapitalize='none'
                    onChangeText={(firstName) => setFirstName(firstName)}
                    autoCorrect={false}
                />
            </View>
            <View style={AppStyles.inputContainer}>
                <PersonSvg style={AppStyles.personImage} />
                <View style={AppStyles.separator} />
                <TextInput 
                    style={AppStyles.input}
                    placeholder="Nazwisko"
                    placeholderTextColor="#00B4D8"
                    autoCapitalize='none'
                    onChangeText={(lastName) => setLastName(lastName)}
                    autoCorrect={false}
                />
            </View>
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
                onPress={() => registerUser(email, password, firstName, lastName)}
                style={AppStyles.button}
            >
                <Text style={AppStyles.buttonText}>Zarejestruj się</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => navigation.navigate('Login')}
                style={AppStyles.textContainer}
            >
                <Text style={AppStyles.plainText}>Masz już konto? </Text>
        <Text style={AppStyles.clickableText}>Zaloguj się!</Text>
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

export default RegisterScreen;
