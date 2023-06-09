import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';

import { signOut } from 'firebase/auth';
import { useAuth } from '../src/hooks/useAuth';
import { auth } from '../src/config/config';

//import "firebase/firestore";
//import { firebase } from '../src/config/config';
//import { getFirestore } from 'firebase/firestore';
//import { collection, getDocs } from 'firebase/firestore';

import AppStyles from '../styles/LoginScreenStyles.scss';
import Background from '../assets/backgrounds/RoomBackground.svg';

import NewIcon from '../assets/icons/new.svg';
import JoinIcon from '../assets/icons/join.svg';


const DashboardScreen = () => {
    //const [name, setName] = useState('');
    //const db = getFirestore(firebase);
    const { user } = useAuth();

    useEffect(() => {
        console.log(user);
    }, []);

    return (
        <View style={AppStyles.container}>
            <Background style={AppStyles.Bg}/>
            <View style={AppStyles.leftContainer}>
            <TouchableOpacity
                onPress={() => signOut(auth)}
                style={styles.profileImage}
            >
                <Image
                style={AppStyles.profileImage}
                source={require('../assets/images/ProfileImage.png')}
                />
            </TouchableOpacity>
                <Text>Witaj{'\n'}{user?.displayName || user?.email}</Text>
            </View>
            
                <TouchableOpacity style={AppStyles.bigButtonOutline}>
                    <NewIcon style={AppStyles.NewIcon}/>
                    <Text style={AppStyles.bigButtonOutlineText}>Utwórz pokój</Text>
                </TouchableOpacity>
                
            
            <Text style={AppStyles.dashboardText}>Stwórz grę lub dołącz do istniejącej</Text>

            <TouchableOpacity style={AppStyles.bigButton}>
                <JoinIcon style={AppStyles.JoinIcon}/>
                <Text style={AppStyles.bigButtonText}>Dołącz</Text>
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
