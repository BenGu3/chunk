import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs'

import Calendar from '../calendar'
import TaskList from '../task-list'

export default createBottomTabNavigator({
  TaskList: {
    screen: TaskList,
    navigationOptions: {
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon size={25} name={'md-list'} style={{ color: tintColor }}/>
      )
    }
  },
  Calendar: {
    screen: Calendar,
    navigationOptions: {
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon size={28} name={'md-calendar'} style={{ color: tintColor }}/>
      )
    }
  },
}, {
  initialRouteName: 'Calendar',
  tabBarOptions: {
    activeColor: '#4646FF',
    inactiveColor: '#373737',
    style: {
      backgroundColor: '#ffffff',
      borderTopWidth: 0,
      shadowOpacity: 0.75,
      shadowRadius: 3,
      shadowColor: 'black',
      shadowOffset: { height: 0, width: 0 },
    },
    showLabel: false
  }
})
