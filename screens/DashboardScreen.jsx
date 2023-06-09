import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';

import { signOut } from 'firebase/auth';
import { useAuth } from '../src/hooks/useAuth';
import { app, auth } from '../src/config/config';

import { getFirestore, doc, getDoc} from 'firebase/firestore';

import AppStyles from '../styles/LoginScreenStyles.scss'
import Background from '../assets/backgrounds/WelcomeBackground.svg';

const firestore = getFirestore(app);

const DashboardScreen = () => {
    
    const [currDoc, setCurrDoc] = useState([]);
    const { user } = useAuth();

    const getUserData = async(userUid) => {
        const docRef = doc(firestore, "users", userUid);
        const docSnap = await getDoc(docRef);
        setCurrDoc(docSnap.data());
    }

    useEffect(() => {
        if(user) getUserData(user.uid);
    }, [user]);

    return (
        <View style={AppStyles.container}>
            <Background syle={AppStyles.background}/>
            <View style={{alignItems: 'center', marginTop: 100}}>
                <Text style={styles.text}>Witaj, { currDoc ? currDoc.userName : "unknown"}!</Text>
            </View>
            <TouchableOpacity
                style={styles.button}
            >
                <Text style={{fontSize:15, fontWeight:'bold'}}>
                    Dostępne gry
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
            >
                <Text style={{fontSize:15, fontWeight:'bold'}}>
                    Historia gier
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
            >
                <Text style={{fontSize:22, fontWeight:'bold'}}>
                    Utwórz pokój 
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
            >
                <Text style={{fontSize:22, fontWeight:'bold'}}>
                    Dołącz
                </Text>
            </TouchableOpacity>
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
        marginTop:20,
        height:70,
        width:250,
        backgroundColor:'#026efd',
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 50,
    }
  });

export default DashboardScreen;
