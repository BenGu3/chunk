import React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native';

export default class Index extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ textAlign: 'center' }}>Calendar</Text>
      </View>
    )
  }
}
