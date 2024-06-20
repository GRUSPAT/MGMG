// SplashScreen.js

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { connect } from 'react-redux';
import { setUser } from '../reducers/userSlice';

class SplashScreen extends Component {
  componentDidMount() {
    this.animation.play();

    setTimeout(() => {
      this.props.navigation.navigate('Welcome');
    }, 3000);
  }

  render() {
    return (
      <View style={styles.container}>
        <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          style={{
            width: 200,
            height: 200
          }}
          source={require('../assets/animations/graph.json')}
        />
        <Text style={styles.text}>Welcome to my app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold'
  }
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user))
});

export default connect(null, mapDispatchToProps)(SplashScreen);
