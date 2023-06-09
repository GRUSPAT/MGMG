import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';

import { signOut } from 'firebase/auth';
import { useAuth } from '../src/hooks/useAuth';
import { app, auth } from '../src/config/config';

import { getFirestore, doc, getDoc} from 'firebase/firestore';

import { useNavigation } from '@react-navigation/native';

const firestore = getFirestore(app);
import AppStyles from '../styles/LoginScreenStyles.scss';
import Background from '../assets/backgrounds/DashboardBackground.svg';

import NewIcon from '../assets/icons/new.svg';
import JoinIcon from '../assets/icons/join.svg';

const DashboardScreen = () => {
    
    const [currDoc, setCurrDoc] = useState([]);
    const { user } = useAuth();
    const navigation = useNavigation();

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
            <Background style={AppStyles.Bg}/>
            <View style={AppStyles.leftContainer}>
                <TouchableOpacity
                    onPress={() => signOut(auth)}
                >
                    <Image
                    style={AppStyles.profileImage}
                    source={require('../assets/images/ProfileImage.png')}
                    />
                </TouchableOpacity>
                    <Text style={AppStyles.profileText}>
                        Witaj{'\n'}{currDoc ? currDoc.userName : "unknown"}
                    </Text>
            </View>
            
                <TouchableOpacity style={AppStyles.bigButtonOutline} onPress={() => navigation.navigate('Make')}>
                    <NewIcon style={AppStyles.NewIcon}/>
                    <Text style={AppStyles.bigButtonOutlineText}>Utwórz pokój</Text>
                </TouchableOpacity>
                
            
            <Text style={AppStyles.dashboardText}>Stwórz grę lub dołącz do istniejącej</Text>

            <TouchableOpacity style={AppStyles.bigButton} onPress={() => navigation.navigate('Join')}>
                <JoinIcon style={AppStyles.JoinIcon}/>
                <Text style={AppStyles.bigButtonText}>Dołącz</Text>
            </TouchableOpacity>

        </View>
    );
};

export default DashboardScreen;
