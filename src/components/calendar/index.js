import React from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { Agenda } from 'react-native-calendars'
import { FAB } from 'react-native-paper'
import { connect } from 'react-redux'

import AddUpdateDialog from '../add-update-dialog'
import { getCalendarFormattedDate, getDateFromTaskFormattedDate, timeSorter } from '../../date-util';
import TaskPin from './task-pin'
import BottomNav from '../bottom-nav';

class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.renderAddUpdateDialog = this.renderAddUpdateDialog.bind(this)
    this.handleUpdateEvent = this.handleUpdateEvent.bind(this)
    this.handleOnPress = this.handleOnPress.bind(this)
    this.handleTaskPinPressed = this.handleTaskPinPressed.bind(this)
    this.handleOnAddUpdateDialogClose = this.handleOnAddUpdateDialogClose.bind(this)
    this.state = {
      eventToUpdate: {},
      isDialogOpen: false,
      isUpdateDialog: false,
      currentDay: new Date()
    }
  }

  handleOnAddUpdateDialogClose() {
    this.setState({ isDialogOpen: false, isUpdateDialog: false, eventToUpdate: {} })
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

  handleUpdateEvent(event) {
    this.setState({
      isDialogOpen: true,
      isUpdateDialog: true,
      eventToUpdate: event
    })
  }

  renderEventsForDate(event) {
    return (
      <TouchableHighlight style={styles.event} onPress={() => this.handleUpdateEvent(event)}>
        <Text>{event.name}</Text>
      </TouchableHighlight>
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

  handleDayPress(day) {
    this.setState({ currentDay: getDateFromTaskFormattedDate(day.dateString) })
  }

  handleRowChange(r1, r2) {
    if (r1.type === 'event') {
      return (r1.startTime !== r2.startTime) || (r1.endTime !== r2.endTime) || (r1.name !== r2.name)
    } else if (r1.type === 'task') {
      return (r1.completed !== r2.completed) || (r1.dueTime !== r2.dueTime) || (r1.name !== r2.name)
    }
  }

  renderCalendar() {
    return (
      <Agenda
        style={{ height: '100%', width: '100%' }}
        hideKnob={true}
        items={this.props.calendarItems}
        onDayPress={this.handleDayPress.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        renderItem={this.renderItem.bind(this)}
        rowHasChanged={this.handleRowChange.bind(this)}
      />
    )
  }

  renderAddUpdateDialog() {
    const { currentDay, isDialogOpen, isUpdateDialog, eventToUpdate } = this.state
    return isDialogOpen && (
      <AddUpdateDialog
        createType='event'
        currentDay={currentDay}
        isDialogOpen={isDialogOpen}
        isUpdating={isUpdateDialog}
        eventToUpdate={isUpdateDialog ? eventToUpdate : null}
        onClose={this.handleOnAddUpdateDialogClose}/>
    )
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {this.renderCalendar()}
        {this.renderAddUpdateDialog()}
        <FAB
          style={styles.fab}
          color='white'
          icon="add"
          onPress={this.handleOnPress}
        />
        <BottomNav navigator={this.props.navigation}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  fab: {
    backgroundColor: '#2c86e5',
    bottom: 32,
    zIndex: 1000
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

  const orderedCalendarItems = {}
  Object.keys(calendarItems).sort(timeSorter).forEach(function(key) {
    orderedCalendarItems[key] = calendarItems[key]
  })

  return { calendarItems: orderedCalendarItems, taskList }
}

export default connect(mapStateToProps)(Calendar)
