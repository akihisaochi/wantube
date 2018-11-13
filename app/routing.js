/* eslint react/prop-types: 0 */
import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import VideoListScreen from './screen/VideoListScreen/';
import FavoriteScreen from './screen/FavoriteScreen/';
import SettingScreen from './screen/SettingScreen/';
import VideoViewScreen from './screen/VideoViewScreen/';

const tabIconSize = 30;

const Tab = createBottomTabNavigator(
  {
    VideoList: {
      screen: VideoListScreen,
      navigationOptions: {
        tabBarLabel: '動画一覧',
        tabBarIcon: ({ tintColor }) => <Icon size={tabIconSize} name="subscriptions" color={tintColor} />,
      },
    },
    Favorite: {
      screen: FavoriteScreen,
      navigationOptions: {
        header: {
          visible: true,
        },
        tabBarLabel: 'お気に入り',
        tabBarIcon: ({ tintColor }) => <Icon size={tabIconSize} name="favorite" color={tintColor} />,
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#0071BC',
      inactiveTintColor: '#737373',
      showLabel: true,
      showIcon: true,
    },
    navigationOptions: {
      header: {
        visible: true,
      },
    },
  },
);

const Stack = createStackNavigator(
  {
    Home: { screen: Tab },
    Setting: { screen: SettingScreen },
    VideoView: { screen: VideoViewScreen },
  },
  { headerMode: 'none' },
);

const HomeScreenRouter = () => <Stack />;
export default HomeScreenRouter;
