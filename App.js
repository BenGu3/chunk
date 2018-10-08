import React, { Component } from 'react'
import { View } from 'react-native'
import BottomNavigation, { IconTab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/Ionicons';

import Calendar from './src/components/calendar'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'calendar'
    }
  }

  tabs = [
    {
      key: 'menu',
      icon: 'md-menu',
      barColor: '#ffffff',
      pressColor: 'rgba(0, 0, 0, 0.16)'
    },
    {
      key: 'calendar',
      icon: 'md-calendar',
      barColor: '#ffffff',
      pressColor: 'rgba(0, 0, 0, 0.16)'
    },
    {
      key: 'add',
      icon: 'md-add',
      barColor: '#ffffff',
      pressColor: 'rgba(0, 0, 0, 0.16)'
    }
  ]

  handleTabPress = (newTab, oldTab) => {
    this.setState({ activeTab: newTab.key })
  }

  renderIcon = iconName => ({ isActive }) => {
    return <Icon size={24} color="black" name={iconName}/>
  }

  renderTab = ({ tab, isActive }) => {
    return (
      <IconTab
        key={tab.key}
        isActive={isActive}
        renderIcon={this.renderIcon(tab.icon)}
      />
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Calendar/>
        </View>
        <BottomNavigation
          activeTab={this.state.activeTab}
          onTabPress={this.handleTabPress}
          renderTab={this.renderTab}
          tabs={this.tabs}
        />
      </View>
    )
  }
}
