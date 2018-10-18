import PropTypes from 'prop-types'
import React from 'react'
import { Button, StyleSheet, Text } from 'react-native'
import { FAB } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { func, number, object } = PropTypes

export default class TaskPin extends React.Component {
  static propTypes = {
    numberOfTasks: number.isRequired,
    onPress: func.isRequired,
    styles: object
  }

  render() {
    return (
      <FAB
        style={styles.fab}
        small
        icon={<Icon name={'circle'}/>}
        onPress={this.props.onPress}
      />
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
  }
})
