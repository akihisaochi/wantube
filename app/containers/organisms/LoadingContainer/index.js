import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import LoadingBox from '../../../components/molecules/LoadingBox';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class LoadingContainer extends Component {
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
