import { View, Text, Image, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import React, { useState, useEffect } from 'react';

import { signOut } from 'firebase/auth';
import { useAuth } from '../src/hooks/useAuth';
import { app, auth, database } from '../src/config/config';

import { getFirestore, doc, getDoc} from 'firebase/firestore';
import { ref, set, onValue, update, query, endAt, orderByValue} from 'firebase/database';

import { useSelector, useDispatch} from 'react-redux';
import { setUser } from '../reducers/userSlice';
import { setRoom } from '../reducers/roomSlice';

import { useNavigation } from '@react-navigation/native';

import AppStyles from '../styles/LoginScreenStyles.scss';
import Background from '../assets/backgrounds/DashboardBackground.svg';

import NewIcon from '../assets/icons/new.svg';
import JoinIcon from '../assets/icons/join.svg';

const firestore = getFirestore(app);

const DashboardScreen = () => {
    const [currDoc, setCurrDoc] = useState([]);
    const [availableRooms, setAvailableRooms] = useState([]);

    const currUserData = useSelector(state => state.user);
    const dispatch = useDispatch();

    const { user } = useAuth();
    const navigation = useNavigation();

    const getUserData = async(userUid) => {
        const docRef = doc(firestore, "users", userUid);
        const docSnap = await getDoc(docRef);
        setCurrDoc(docSnap.data());
    };

    const createRoom = (roomId) => {
        set(ref(database, 'rooms/' + roomId), {
            roomId: roomId,
            owner: currUserData
        });
        dispatch(setRoom({roomId: roomId, owner: currUserData, enemy: {}}));
        navigation.navigate('Make');
    };

    const generateRoomId = (userUid) => {
        let urid = [];
        const timestamp = Date.now();
        const combinedValue = userUid + timestamp;
        for (let i = 0; i< 10; i++){
          urid.push(combinedValue[Math.floor(Math.random() * combinedValue.length)]);
        }
        return urid.join('');
    };

    const joinRoom = () => {
        setAvailableRooms([]);
        listRooms = ref(database, "rooms");
        onValue(listRooms, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const tempRoom = childSnapshot.val();
                if(!tempRoom.enemy) {
                    availableRooms.push(tempRoom);
                }
            })
        });

        if(availableRooms.length > 0){
            const randomRoom = availableRooms[Math.floor(Math.random()*availableRooms.length)];
            dispatch(setRoom({roomId: randomRoom.roomId, owner: randomRoom.owner, enemy: currUserData}));
            update(ref(database, "rooms/" + randomRoom.roomId + "/enemy"), currUserData);
            navigation.navigate("Join");
        } else {
            Alert.alert("Warning!", "Brak dostępnych pokoi!");
        }
    };

    useEffect(() => {
        if(user) {
            getUserData(user.uid);
        }
    }, [user]);

    useEffect(() => {
        dispatch(setUser(currDoc));
    }, [currDoc]);

    useEffect(() => {
        console.log(availableRooms);
    }, [availableRooms]);

    return (
        <View style={AppStyles.container}>
            <Background style={AppStyles.Bg}/>
            <View style={AppStyles.leftContainer}>
                <TouchableOpacity
                    onPress={() => signOut(auth)}
                >
                    <Image
                    style={AppStyles.profileImage}
                    source={currUserData ? currUserData.photo != 'null' ? {uri: currUserData.photo} : require('../assets/images/UnknownImage.png') : require('../assets/images/UnknownImage.png')}
                    />
                </TouchableOpacity>
                    <Text style={AppStyles.profileText}>
                        Witaj{'\n'}{currUserData.userName ? currUserData.userName : "unknown"}
                    </Text>
            </View>
            
                <TouchableOpacity style={AppStyles.bigButtonOutline} onPress={() => createRoom(generateRoomId(currDoc.uid))}>
                    <NewIcon style={AppStyles.NewIcon}/>
                    <Text style={AppStyles.bigButtonOutlineText}>Utwórz pokój</Text>
                </TouchableOpacity>
                
            
            <Text style={AppStyles.dashboardText}>Stwórz grę lub dołącz do istniejącej</Text>

            <TouchableOpacity style={AppStyles.bigButton} onPress={() => joinRoom()}>
                <JoinIcon style={AppStyles.JoinIcon}/>
                <Text style={AppStyles.bigButtonText}>Dołącz</Text>
            </TouchableOpacity>

        </View>
    );
};

export default DashboardScreen;
