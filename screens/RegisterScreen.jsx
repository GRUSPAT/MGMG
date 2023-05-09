import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../src/config/config';

//import { firebase } from '../src/config/config';
//import { firestore } from '../src/config/config';
//import { addDoc, collection, doc, setDoc } from "firebase/firestore"; 

import { useNavigation } from '@react-navigation/native';

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
    <View style={styles.container}>
      <Text style={styles.text}>
        Zarejestruj się
      </Text>
      <View>
        <TextInput
          style={styles.textInput}
          placeholder='First Name'
          onChangeText={(firstName) => setFirstName(firstName)}
          autoCorrect={false}
        />
        <TextInput
          style={styles.textInput}
          placeholder='LastName'
          onChangeText={(lastName) => setLastName(lastName)}
          autoCorrect={false}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Email'
          onChangeText={(email) => setEmail(email)}
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='email-address'
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
        onPress={() => registerUser(email, password, firstName, lastName)}
        style={styles.button}
      >
        <Text style={{fontWeight:'bold', fontSize:22}}>
          Zarejestruj
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => navigation.navigate('Login')}
        style={{marginTop:20}}
      >
        <Text style={{fontWeight:'bold', fontSize:16}}>Masz już konto? Zaloguj się!</Text>
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
