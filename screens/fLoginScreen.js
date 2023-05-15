import React, { useState } from 'react';
import Lottie from 'lottie-react-native';

import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AppStyles from '../styles/LoginScreenStyles.scss'
import Background from '../assets/backgrounds/LoginBackground.svg';
import GoogleSvg from '../assets/icons/google.svg';
import MailSvg from '../assets/icons/mail.svg';
import LockSvg from '../assets/icons/lock.svg';


const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // logika logowania użytkownika
};

  return (
    <View style={AppStyles.container}>
        <Background syle={AppStyles.background}/>
      <Text style={AppStyles.title}>Zaloguj się</Text>
     
      
      <TouchableOpacity style={AppStyles.googleButton} onPress={handleLogin}>
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
         value={username}
         onChangeText={setUsername}
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
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      </View>

      <TouchableOpacity style={AppStyles.button} onPress={handleLogin}>
        <Text style={AppStyles.buttonText}>Zaloguj się</Text>
      </TouchableOpacity>
      <View style={AppStyles.textContainer}>
        <Text style={AppStyles.plainText}>Nie masz jeszcze konta? </Text>
        <Text style={AppStyles.clickableText}>Zarejestruj się!</Text>
      </View>
    </View>
  );
};



export default LoginScreen;
