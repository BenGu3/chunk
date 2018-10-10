import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FAB } from 'react-native-paper'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addEvent } from '../../actions/CalendarActions'
import AddDialog from '../add-dialog'

class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.renderAddDialog = this.renderAddDialog.bind(this)
    this.handleOnPress = this.handleOnPress.bind(this)
    this.handleOnAddDialogClose = this.handleOnAddDialogClose.bind(this)
    this.state = {
      isDialogOpen: false
    }
  }

  handleOnAddDialogClose() {
    this.setState({ isDialogOpen: false })
  }

  handleOnPress() {
    // const { events } = this.props.calendar
    // const length = events ? events.length : 0
    // this.props.addEvent({
    //   name: 'event' + length,
    //   id: length
    // })
    this.setState({ isDialogOpen: true })
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

  renderAddDialog() {
    const { isDialogOpen } = this.state
    return isDialogOpen && (
      <AddDialog
        createType='event'
        isDialogOpen={this.state.isDialogOpen}
        onClose={this.handleOnAddDialogClose}/>
    )
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ textAlign: 'center' }}>Calendar</Text>
        {this.renderEvents()}
        {this.renderAddDialog()}
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
