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

  renderIcon() {
    const { numberOfTasks } = this.props
    if (numberOfTasks > 1) {
      return <Icon name={'checkbox-multiple-blank-outline'}/>
    } else {
      return <Icon name={'checkbox-blank-outline'}/>
    }
  }

  render() {
    return (
      <FAB
        style={styles.fab}
        small
        // icon={() => this.renderIcon()}
        icon='check-box-outline-blank'
        onPress={this.props.onPress}
      />
    )
  }
}

const styles = StyleSheet.create({
  fab: {
    backgroundColor: '#2c86e5',
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  }
})
