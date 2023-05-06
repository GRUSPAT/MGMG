import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';

import RootNavigation from './navigation';
import SplashScreen from 'react-native-lottie-splash-screen'

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return(
    <RootNavigation />
  )
}