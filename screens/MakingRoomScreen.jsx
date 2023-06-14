import { View, Text, Image} from 'react-native';
import React, { useEffect, useState } from 'react';

import { ref, onValue, remove, onChildAdded} from 'firebase/database';
import { database } from '../src/config/config';

import { useSelector, useDispatch } from 'react-redux';
import { setEnemy } from '../reducers/roomSlice';

import AppStyles from '../styles/LoginScreenStyles.scss';
import Background from '../assets/backgrounds/RoomBackground.svg';

import ActionButton from '../components/form/ActionButton';
import PersonIcon from '../assets/icons/person';
import { useNavigation } from '@react-navigation/native';

const MakingRoomScreen = () => {
    const currUserData = useSelector(state => state.user);
    const currRoomData = useSelector(state => state.room);
    const dispatch = useDispatch();

    const [roomDataHandler, setRoomDataHandler] = useState([]);
    const [currEnemy, setCurrEnemy] = useState([]);

    const navigation = useNavigation();

    const leaveRoom = () => {
        console.log("LEAVE");
        const room = ref(database, 'rooms/' + currRoomData.roomId); 
        remove(room);
        navigation.navigate('Dashboard');
    };

    onChildAdded(ref(database, 'rooms/' + currRoomData.roomId), (snapshot) => {
        onValue(ref(database, 'rooms/' + currRoomData.roomId + "/enemy"), (childSnapshot) => {
            if(childSnapshot.val() ){
                console.log("XDDDDDDDD", childSnapshot.val());
                dispatch(setEnemy(childSnapshot.val()));
                setCurrEnemy(childSnapshot.val());
            }
        }, {
            onlyOnce: true
        })
    }, {
        onlyOnce: true
    });

    //roomDataHandler.push(data.val());
    /*
    useEffect(() => {
        setCurrEnemy(roomDataHandler[0]);
        console.log("efekt 1");
    }, [currEnemy]);

    useEffect(() => {
        dispatch(setEnemy(currEnemy));
        console.log("efekt 2");
    }, [currEnemy]);
    */

    return (
        <View style={AppStyles.container}>
            <Background style={AppStyles.roomBackground}/>
            <Text style={AppStyles.roomTitle}>Numer pokoju</Text>
            <Text style={AppStyles.roomTitle}>{currRoomData.roomId !== '' ? "#" + currRoomData.roomId : "Unknown"}</Text>
            <View style={AppStyles.roomRow}>
                <View style={AppStyles.roomCard}>
                    <Image
                    style={AppStyles.cardImage}
                    source={currRoomData.owner.photo != 'null' ? {uri: currRoomData.owner.photo} : require('../assets/images/UnknownImage.png')}
                    />
                    <Text style={AppStyles.cardText}>{ currRoomData.owner != {} ? currRoomData.owner.userName : "Unknown"}</Text>
                </View>
                <Text style={AppStyles.roomTitle}>vs</Text>
                <View style={AppStyles.roomCard}>
                    <Image
                    style={AppStyles.cardImage}
                    source={ currEnemy != [] ? currEnemy.photo != null ? {uri:currEnemy.photo} : require('../assets/images/UnknownImage.png') : require('../assets/images/UnknownImage.png') }
                    />
                    <Text style={AppStyles.cardText}>{currEnemy.userName ? currEnemy.userName : "?"}</Text>
                </View>
            </View>
            <Text>Oczekiwanie na dołączenie przeciwnika...</Text>
            <ActionButton text="Rozpocznij grę"/>
            <ActionButton text="Opuść pokój" onPress={leaveRoom}/>
        </View>
    );
};

export default MakingRoomScreen;
