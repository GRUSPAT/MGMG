import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';

import { signOut } from 'firebase/auth';
import { useAuth } from '../src/hooks/useAuth';
import { auth } from '../src/config/config';

import { useSelector, useDispatch} from 'react-redux';
import { setRoom } from '../reducers/roomSlice';

import { database } from '../src/config/config';
import { ref, onValue, update, set, remove, get} from 'firebase/database';

//import "firebase/firestore";
//import { firebase } from '../src/config/config';
//import { getFirestore } from 'firebase/firestore';
//import { collection, getDocs } from 'firebase/firestore';

import { useNavigation } from '@react-navigation/native';

import AppStyles from '../styles/LoginScreenStyles.scss';
import Background from '../assets/backgrounds/RoomBackground.svg';

import ActionButton from '../components/form/ActionButton';
import NewIcon from '../assets/icons/new.svg';
import JoinIcon from '../assets/icons/join.svg';

const JoiningRoomScreen = () => {
    const currUserData = useSelector(state => state.user);
    const currRoomData = useSelector(state => state.room);
    const [isLoading, setLoading] = useState(true);

    const dispatch = useDispatch();

    const navigation = useNavigation();

    const leaveRoom = () => {
        room = ref(database, "rooms/" + currRoomData.roomId + "/enemy");
        remove(room);
        navigation.navigate('Dashboard');
    };

    useEffect(() => {
        console.log(isLoading);
    }, [isLoading]);

    return (
        <View style={AppStyles.container}>
            <Background style={AppStyles.roomBackground}/>
            <Text style={AppStyles.roomTitle}>Numer pokoju</Text>
            <Text style={AppStyles.roomTitle}>{currRoomData.roomId !== '' ? "#" + currRoomData.roomId : "Unknown"}</Text>
            <View style={AppStyles.roomRow}>
                <View style={AppStyles.roomCard}>
                    <Image
                    style={AppStyles.cardImage}
                    source={currRoomData.owner.photo != 'null' ? {uri:currRoomData.owner.photo} : require('../assets/images/UnknownImage.png')}
                    />
                    <Text style={AppStyles.cardText}>{ currRoomData.owner != {} ? currRoomData.owner.userName : "?"}</Text>
                </View>
                <Text style={AppStyles.roomTitle}>vs</Text>
                <View style={AppStyles.roomCard}>
                    <Image
                    style={AppStyles.cardImage}
                    source={currRoomData.enemy ? currRoomData.enemy.photo != 'null' ? {uri:currRoomData.enemy.photo} : require('../assets/images/UnknownImage.png') : require('../assets/images/UnknownImage.png')}
                    />
                    <Text style={AppStyles.cardText}>{currRoomData.enemy != {} ? currRoomData.enemy.userName : "?"}</Text>
                </View>
            </View>
            <Text style={{marginTop: 50, marginBottom: 80}}>Oczekiwanie na rozpoczęcie gry przez {currRoomData.owner.userName}</Text>

            <ActionButton text="Opuść pokój" onPress={leaveRoom}/>
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

export default JoiningRoomScreen;
