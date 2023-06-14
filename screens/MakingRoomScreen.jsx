import { View, Text, Image} from 'react-native';
import React from 'react';


import AppStyles from '../styles/LoginScreenStyles.scss';
import Background from '../assets/backgrounds/RoomBackground.svg';

import ActionButton from '../components/form/ActionButton';
import PersonIcon from '../assets/icons/person';

import { useNavigation } from '@react-navigation/native';

const DashboardScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={AppStyles.container}>
            <Background style={AppStyles.roomBackground}/>
            <Text style={AppStyles.roomTitle}>Numer pokoju</Text>
            <Text style={AppStyles.roomTitle}>#000000</Text>
            <View style={AppStyles.roomRow}>
                <View style={AppStyles.roomCard}>
                    <Image
                    style={AppStyles.cardImage}
                    source={require('../assets/images/ProfileImage.png')}
                    />
                    <Text style={AppStyles.cardText}>Patryk</Text>
                </View>
                <Text style={AppStyles.roomTitle}>vs</Text>
                <View style={AppStyles.roomCard}>
                    <PersonIcon style={AppStyles.cardImage}></PersonIcon>
                    <Text style={AppStyles.cardText}>...</Text>
                </View>
            </View>
            <Text>Oczekiwanie na dołączenie przeciwnika...</Text>
            <ActionButton text="Rozpocznij grę" onPress={()=>navigation.navigate('Game')}/>
            <ActionButton text="Opuść pokój"/>
        </View>
    );
};

export default DashboardScreen;
