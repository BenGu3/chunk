import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Agenda } from 'react-native-calendars'
import { FAB } from 'react-native-paper'
import { connect } from 'react-redux'

import AddDialog from '../add-dialog'
import { getCalendarFormattedDate, getDateFromTaskFormattedDate, timeSorter } from '../../date-util';
import TaskPin from './task-pin'

class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.renderAddDialog = this.renderAddDialog.bind(this)
    this.handleOnPress = this.handleOnPress.bind(this)
    this.handleTaskPinPressed = this.handleTaskPinPressed.bind(this)
    this.handleOnAddDialogClose = this.handleOnAddDialogClose.bind(this)
    this.state = {
      isDialogOpen: false,
      currentDay: new Date()
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
        items={this.props.calendarItems}
        onDayPress={this.handleDayPress.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        renderItem={this.renderItem.bind(this)}
        rowHasChanged={this.handleRowChange.bind(this)}
      />
    )
  }

  renderAddDialog() {
    const { isDialogOpen } = this.state
    return isDialogOpen && (
      <AddDialog
        createType='event'
        currentDay={this.state.currentDay}
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

  const orderedCalendarItems = {}
  Object.keys(calendarItems).sort(timeSorter).forEach(function(key) {
    orderedCalendarItems[key] = calendarItems[key]
  })

  return { calendarItems: orderedCalendarItems, taskList }
}

export default connect(mapStateToProps)(Calendar)
