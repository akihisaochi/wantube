import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import LoadingBox from '../../components/molecules/LoadingBox/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0071BC',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class LoadingScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <LoadingBox
          boxStyle={{
            width: 80,
            height: 80,
            radius: 10,
            color: 'rgba(0, 0, 0, .1)',
          }}
          spinnerColor="#fff"
        />
      </View>
    );
  }
}
export default LoadingScreen;
