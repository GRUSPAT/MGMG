import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';

import { signOut } from 'firebase/auth';
import { useAuth } from '../src/hooks/useAuth';
import { auth } from '../src/config/config';

//import "firebase/firestore";
//import { firebase } from '../src/config/config';
//import { getFirestore } from 'firebase/firestore';
//import { collection, getDocs } from 'firebase/firestore';


const DashboardScreen = () => {
    //const [name, setName] = useState('');
    //const db = getFirestore(firebase);
    const { user } = useAuth();

    useEffect(() => {
        console.log(user);
    }, []);

    return (
        <View style={styles.container}>
            <View style={{alignItems: 'center', marginTop: 100}}>
                <Text style={styles.text}>Witaj, {user?.displayName || user?.email}!</Text>
            </View>
            <TouchableOpacity
                onPress={() => signOut(auth)}
                style={styles.button}
            >
                <Text style={{fontSize:22, fontWeight:'bold'}}>
                    Wyloguj
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

export default DashboardScreen;
