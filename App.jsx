import React, { useEffect } from 'react';
import Lottie from 'lottie-react-native';
import SplashScreen from 'react-native-lottie-splash-screen'

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
  <Lottie source={require('./assets/animations/error.json')} autoPlay loop />
  );
};

export default App;
