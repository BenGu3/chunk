import React, { Component } from 'react'
import { Portal } from 'react-native-paper'
import { Provider } from 'react-redux'

import BottomNav from './src/components/bottom-nav'
import store from './src/store'

store.subscribe(() => console.log(store.getState()))

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Portal.Host>
          <BottomNav />
        </Portal.Host>
      </Provider>

    )
  }
}

export default App
