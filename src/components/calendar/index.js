import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Agenda } from 'react-native-calendars'
import { FAB } from 'react-native-paper'
import { connect } from 'react-redux'

import AddDialog from '../add-dialog'
import { getCalendarFormatted } from '../../date-util';
import TaskPin from './task-pin'

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
    this.setState({ isDialogOpen: true })
  }

  renderTasks(taskCount) {
    if (!taskCount)
      return

    return (
      <TaskPin
        numberOfTasks={taskCount}
        styles={styles.fab}
        onPress={() => {
          console.log('pressed')
        }}
      />
    )
  }

  renderEvent(event) {
    const currentDate = getCalendarFormatted(event.startTime)
    const taskCountForDay = this.props.taskList.tasksByDay[currentDate] && this.props.taskList.tasksByDay[currentDate].length
    return (
      <View style={styles.event}>
        <Text>{event.name}</Text>
        {this.renderTasks(taskCountForDay)}
      </View>

    )
  }

  renderCalendar() {
    return (
      <Agenda
        style={{ height: '100%', width: '100%' }}
        items={this.props.calendar.events}
        renderItem={this.renderEvent.bind(this)}
        rowHasChanged={(r1, r2) => {
          return r1.name !== r2.name
        }}
      />
    )
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
        {this.renderCalendar()}
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
  }, event: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    height: 70
  }, emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
})

const mapStateToProps = (state) => {
  const { calendar, taskList } = state
  return { calendar, taskList }
}

export default connect(mapStateToProps)(Calendar)
