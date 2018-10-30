import React, { Component } from 'react'
import { Portal } from 'react-native-paper'
import { Provider } from 'react-redux'
import { createSwitchNavigator } from 'react-navigation'


import BottomNav from './src/components/bottom-nav'
import Calendar from './src/components/calendar'
import store from './src/store'
import TaskList from './src/components/task-list'

store.subscribe(() => console.log(store.getState()))

const Navigator = createSwitchNavigator({
  TaskList: {
    screen: TaskList,
  },
  Calendar: {
    screen: Calendar,
  },
}, {
  initialRouteName: 'Calendar'
})

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Portal.Host>
          <Navigator/>
        </Portal.Host>
      </Provider>

    )
  }
}

export default App
