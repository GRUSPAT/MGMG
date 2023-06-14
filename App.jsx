import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';

import RootNavigation from './navigation';
import SplashScreen from 'react-native-lottie-splash-screen'
import LoginScreen from './screens/LoginScreen';
import store from './store/store';
import { Provider } from 'react-redux';



export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return(
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  )
}