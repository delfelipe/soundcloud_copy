import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LoginScreen } from './screens/Login';
import { HomeScreen } from './screens/Home';
import { ProfileScreen } from './screens/Profile';
import { SearchScreen } from './screens/Search';
import { StreamScreen } from './screens/Stream';
import { SongScreen } from './screens/Song';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Song: SongScreen
});

const StreamStack = createStackNavigator({
  Stream: StreamScreen,
  Song: SongScreen
});

const SearchStack = createStackNavigator({
  Search: SearchScreen,
  Song: SongScreen
});

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
  Song: SongScreen
});

const Tabs = createBottomTabNavigator({
  Home: HomeStack,
  Stream: StreamStack,
  Search: SearchStack,
  Profile: ProfileStack
}, {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;

      if (routeName === 'Home') {
        iconName = 'home';
      } else if (routeName === 'Stream') {
        iconName = 'flash';
      } else if (routeName === 'Search') {
        iconName = 'search';
      } else if (routeName === 'Profile') {
        iconName = 'account';
      }

      return iconName === 'search' ? <MaterialIcons name={iconName} size={25} color={tintColor} /> : <MaterialCommunityIcons name={iconName} size={25} color={tintColor} />;
    }
  }),
  tabBarOptions: {
    activeTintColor: '#FFFFFF',
    inactiveBackgroundColor: 'grey',
    activeBackgroundColor: 'grey',
    showLabel: false,
    style: {
      backgroundColor: '#000000'
    }
  }
});

export default Switch = createSwitchNavigator({
  Login: LoginScreen,
  Home: Tabs,
}, {
  initialRouteName: 'Login'
});
