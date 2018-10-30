import React, { Component } from 'react'
import { DefaultTheme, Portal, Provider as PaperProvider } from 'react-native-paper'
import { Provider } from 'react-redux'
import { createSwitchNavigator } from 'react-navigation'

import Calendar from './src/components/calendar'
import store from './src/store'
import TaskList from './src/components/task-list'

store.subscribe(() => console.log(store.getState()))

const theme = {
  ...DefaultTheme,
  roundness: 6,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2c86e5'
  }
};

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
        <PaperProvider theme={theme}>
          <Portal.Host>
            <Navigator/>
          </Portal.Host>
        </PaperProvider>
      </Provider>

    )
  }
}

export default App
