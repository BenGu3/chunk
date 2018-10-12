import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Calendar from '../calendar'
import TaskList from '../task-list'

export default createMaterialBottomTabNavigator({
  TaskList: {
    screen: TaskList,
    navigationOptions: {
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon size={25} name={'md-list'} style={{ color: tintColor }} />
      )
    }
  },
  Calendar: {
    screen: Calendar,
    navigationOptions: {
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon size={28} name={'md-calendar'} style={{ color: tintColor }} />
      )
    }
  },
}, {
  initialRouteName: 'Calendar',
  activeColor: '#4646FF',
  inactiveColor: '#373737',
  barStyle: { backgroundColor: '#ffffff' },
  labeled: false
})
