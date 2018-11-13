import React from 'react';
import { AppRegistry } from 'react-native';
import Expo from 'expo';
import { Root } from 'native-base';

import HomeScreenRouter from './app/routing';
import LoadingScreen from './app/screen/LoadingScreen/';


const RoundedMplus1c = require('./app/assets/fonts/rounded-mplus-1c/rounded-mplus-1c-bold.ttf');
const Roboto = require('native-base/Fonts/Roboto.ttf');
const RobotoMedium = require('native-base/Fonts/Roboto_medium.ttf');

export default class App extends React.Component {
  state = {
    loading: true,
  }
  async componentDidMount() {
    await Expo.Font.loadAsync({
      'rounded-mplus-1c': RoundedMplus1c,
      Roboto,
      Roboto_medium: RobotoMedium,
    });
    this.disableLoading();
  }
  disableLoading() {
    this.setState({ loading: false });
  }
  render() {
    const screen = this.state.loading
      ? <LoadingScreen />
      : <Root><HomeScreenRouter style={{ fontFamily: 'rounded-mplus-1c' }} /></Root>;
    return screen;
  }
}
AppRegistry.registerComponent('App', () => App);
