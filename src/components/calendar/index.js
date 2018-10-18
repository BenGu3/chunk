import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Agenda } from 'react-native-calendars'
import { FAB } from 'react-native-paper'
import { connect } from 'react-redux'

import AddDialog from '../add-dialog'
import { getCalendarFormattedDate } from '../../date-util';
import TaskPin from './task-pin'

class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.renderAddDialog = this.renderAddDialog.bind(this)
    this.handleOnPress = this.handleOnPress.bind(this)
    this.handleTaskPinPressed = this.handleTaskPinPressed.bind(this)
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

  handleTaskPinPressed(currentDate) {
    return (() => {
      this.props.navigation.navigate('TaskList', { currentDate })
    })
  }

  renderTasksForDate(task, isFirstTask) {
    if (!isFirstTask || task.completed)
      return
    const currentDate = getCalendarFormattedDate(task.dueTime)
    const taskCountForDay = this.props.taskList.tasks[currentDate] && this.props.taskList.tasks[currentDate].length
    return (
      <TaskPin
        numberOfTasks={taskCountForDay}
        onPress={this.handleTaskPinPressed(currentDate)}
      />
    )
  }

  renderEventsForDate(event) {
    return (
      <View style={styles.event}>
        <Text>{event.name}</Text>
      </View>
    )
  }

  renderItem(item, isFirstItem) {
    if (item.type === 'event') {
      return this.renderEventsForDate(item)
    } else if (item.type === 'task' && !item.completed) {
      return this.renderTasksForDate(item, isFirstItem)
    }
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
      </View>
    )
  }

  renderCalendar() {
    return (
      <Agenda
        style={{ height: '100%', width: '100%' }}
        items={this.props.calendarItems}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        renderItem={this.renderItem.bind(this)}
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
  let calendarItems = {}

  Object.keys(taskList.tasks).map(taskTimeGroup => {
    if (!calendarItems[taskTimeGroup]) {
      calendarItems[taskTimeGroup] = []
    }
    calendarItems = {
      ...calendarItems,
      [taskTimeGroup]: [
        ...calendarItems[taskTimeGroup],
        ...taskList.tasks[taskTimeGroup]
      ]
    }
  })

  Object.keys(calendar.events).map(eventTimeGroup => {
    if (!calendarItems[eventTimeGroup]) {
      calendarItems[eventTimeGroup] = []
    }
    calendarItems = {
      ...calendarItems,
      [eventTimeGroup]: [
        ...calendarItems[eventTimeGroup],
        ...calendar.events[eventTimeGroup]
      ]
    }
  })

  return { calendarItems, taskList }
}

export default connect(mapStateToProps)(Calendar)
