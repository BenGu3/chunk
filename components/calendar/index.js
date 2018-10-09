import React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native';
import { FAB } from 'react-native-paper';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props)
  }

  handleOnPress() {
    console.log('Calendar Add Pressed')
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ textAlign: 'center' }}>Calendar</Text>
        <FAB
          style={styles.fab}
          color='white'
          small
          icon="add"
          onPress={this.handleOnPress()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  fab: {
    backgroundColor: '#4646FF',
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})
