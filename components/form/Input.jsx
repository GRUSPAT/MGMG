import React from 'react';
import { View, Text, TextInput} from 'react-native';

import AppStyles from '../../styles/LoginScreenStyles.scss';
import MailSvg from '../../assets/icons/mail.svg';
import LockSvg from '../../assets/icons/lock.svg';
import PersonSvg from '../../assets/icons/person.svg';

const Input = ({ type, onChangeText }) => {
  const renderContent = () => {
    switch (type) {
      case 'nickname':
        return (
            <View style={AppStyles.inputContainer}>
                <PersonSvg style={AppStyles.personImage} />
                <View style={AppStyles.separator} />
                <TextInput 
                    style={AppStyles.input}
                    placeholder="Imie"
                    placeholderTextColor="#00B4D8"
                    autoCapitalize='none'
                    onChangeText={onChangeText}
                    autoCorrect={false}
                />
            </View>
        );
      case 'email':
        return (
            <View style={AppStyles.inputContainer}>
                <MailSvg style={AppStyles.mailImage} />
                <View style={AppStyles.separator} />
                <TextInput 
                    style={AppStyles.input}
                    placeholder="e-mail"
                    placeholderTextColor="#00B4D8"
                    autoCapitalize='none'
                    onChangeText={onChangeText}
                    autoCorrect={false}
                />
        </View>
        );
      case 'password':
        return (
            <View style={AppStyles.inputContainer}>
                <LockSvg style={AppStyles.lockImage} />
                <View style={AppStyles.separator} />
                <TextInput 
                    style={AppStyles.input}
                    placeholder="hasło"
                    placeholderTextColor="#00B4D8"
                    autoCapitalize='none'
                    onChangeText={onChangeText}
                    autoCorrect={false}
                    secureTextEntry={true}
                />
            </View>
        );
      default:
        return (
            <Text>Błąd</Text>
        );
    }
  };

  return renderContent();
};

export default Input;
