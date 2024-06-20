import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import AppStyles from '../styles/LoginScreenStyles.scss'
import Background from '../assets/backgrounds/WelcomeBackground.svg';
import Lottie from 'lottie-react-native';

const WelcomeScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={AppStyles.container}>
            <Background syle={AppStyles.background}/>
            <Text style={AppStyles.Title}>
                Witaj w 
            </Text>
            <Text style={AppStyles.Title}>
                MGMG
            </Text>
            <Text style={AppStyles.plainText2}>
                Rozpocznij rywalizację!
            </Text>
            <TouchableOpacity 
                onPress={() => navigation.navigate('Login')}
                style={AppStyles.button}
            >
                <Text style={AppStyles.buttonText}>
                    Zaloguj się
                </Text>
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
/*
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
*/
export default WelcomeScreen;
