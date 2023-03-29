import React from 'react';
import Lottie from 'lottie-react-native';

const App = () => {
  return (
  <Lottie source={require('./error.json')} autoPlay loop />
  );
};

export default App;
