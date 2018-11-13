import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';
import { Text } from 'native-base';
import dogImg from './imgDataUri';

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  childCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  favHeadline: {
    color: '#929292',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  favDescription: {
    color: '#929292',
    fontSize: 15,
    marginTop: 8,
    textAlign: 'center',
  },
  dogImg: {
    width: 300,
    height: 250,
  },
});

export default class NoneFavorite extends Component {
  render() {
    return (
      <View style={styles.childCenter}>
        <Image
          style={styles.dogImg}
          source={{ uri: dogImg }}
          resizeMode={Image.resizeMode.center}
        />
        <Text style={styles.favHeadline}>動画をお気に入りしましょう</Text>
        <Text style={styles.favDescription}>動画右上のハートマークをタップすると{'\n'}動画をお気に入り保存できます</Text>
      </View>
    );
  }
}
