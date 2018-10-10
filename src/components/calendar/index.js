import React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { FAB } from 'react-native-paper'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addEvent } from '../../actions/CalendarActions'


class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.handleOnPress = this.handleOnPress.bind(this)
  }

  handleOnPress() {
    const { events } = this.props.calendar
    const length = events ? events.length : 0
    this.props.addEvent({
      name: 'event' + length,
      id: length
    })
  }

  renderEvents() {
    return this.props.calendar.events.map(event => {
      return (
        <Text key={event.id} style={{ textAlign: 'center' }}>
          {event.name}
        </Text>
      )
    })
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ textAlign: 'center' }}>Calendar</Text>
        {this.renderEvents()}
        <FAB
          style={styles.fab}
          color='white'
          small
          icon="add"
          onPress={this.handleOnPress}
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

const mapStateToProps = (state) => {
  const { calendar } = state
  return { calendar }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addEvent,
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)
