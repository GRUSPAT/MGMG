import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { firebase } from '../config';
import { getFirestore } from 'firebase/firestore';
import "firebase/firestore";
import { collection, getDocs } from 'firebase/firestore';



const DashboardScreen = () => {
    const [name, setName] = useState('');
    const db = getFirestore(firebase);

    useEffect(() => {
        const querySnapshot = getDocs(collection(db, "users"));
        if(querySnapshot.exists){
            setName(querySnapshot.data())
        } else {
            console.log("Uzytkownik nie istnieje")
        }

        /*
        db.collection('users').get().then((querySnapshot) => {
            if(querySnapshot.exists){
                setName(querySnapshot.data())
            } else {
                console.log("Uzytkownik nie istnieje")
            }
        })

        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid).get()
        .then((snapshot) => {
            if(snapshot.exists){
                setName(snapshot.data())
            } else {
                console.log("Uzytkownik nie istnieje")
            }
        })
        */
    }, []);

    return (
        <View style={styles.container}>
            <View style={{alignItems: 'center', marginTop: 100}}>
                <Text style={styles.text}>Witaj, {name.firstName}</Text>
            </View>
            <TouchableOpacity
                onPress={() => {firebase.auth().signOut()}}
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
