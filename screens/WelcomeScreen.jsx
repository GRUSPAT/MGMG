import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Witaj w MGMG
            </Text>
            <Text style={styles.text}>
                Rozpocznij rywalizację!
            </Text>
            <TouchableOpacity 
                onPress={() => navigation.navigate('Login')}
                style={styles.button}
            >
                <Text style={{fontWeight:'bold', fontSize:22}}>
                    Zaloguj się
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => navigation.navigate('Register')}
                style={{marginTop:20}}
            >
                <Text style={{fontWeight:'bold', fontSize:16}}>
                    Nie masz konta? Zarejestruj teraz!
                </Text>
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

export default WelcomeScreen;
