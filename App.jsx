import React, { useEffect } from 'react';
import Lottie from 'lottie-react-native';
import SplashScreen from 'react-native-lottie-splash-screen'
import LoginScreen from './screens/LoginScreen';



const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <LoginScreen/>
    //<Lottie source={require('./assets/animations/error.json')} autoPlay loop />
  );
};


export default App;
