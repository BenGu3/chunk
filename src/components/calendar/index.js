import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { Agenda } from 'react-native-calendars'
import { FAB } from 'react-native-paper'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures'
import { connect } from 'react-redux'

import AddUpdateDialog from '../add-update-dialog'
import {
  addDays,
  getCalendarFormattedDate, getCalendarHeaderDate,
  getDateFromTaskFormattedDate,
  getDayOfWeek,
  timeSorter
} from '../../date-util';
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

  handleDayPress(day) {
    this.setState({ currentDay: getDateFromTaskFormattedDate(day.dateString) })
  }

  renderCalendarHeader() {


    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingTop: 15,
        marginBottom: 5,
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowColor: 'black',
        shadowOffset: { height: 5, width: 0 },
        backgroundColor: 'white'
      }}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: '500' }}>{getDayOfWeek(this.state.currentDay)}</Text>
          <Text style={{ fontSize: 20, fontWeight: '500' }}>{getCalendarHeaderDate(this.state.currentDay)}</Text>
        </View>
        <View
          style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', paddingLeft: 10, paddingRight: 10 }}>
          <Text>S</Text>
          <Text>M</Text>
          <Text>T</Text>
          <Text>W</Text>
          <Text>T</Text>
          <Text>F</Text>
          <Text>S</Text>
        </View>
        <View
          style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', paddingLeft: 10, paddingRight: 10 }}>
          <Text style={this.state.currentDay.getDay() === 0 ? { color: '#2c86e5' } : null}>S</Text>
          <Text style={this.state.currentDay.getDay() === 1 ? { color: '#2c86e5' } : null}>M</Text>
          <Text style={this.state.currentDay.getDay() === 2 ? { color: '#2c86e5' } : null}>T</Text>
          <Text style={this.state.currentDay.getDay() === 3 ? { color: '#2c86e5' } : null}>W</Text>
          <Text style={this.state.currentDay.getDay() === 4 ? { color: '#2c86e5' } : null}>T</Text>
          <Text style={this.state.currentDay.getDay() === 5 ? { color: '#2c86e5' } : null}>F</Text>
          <Text style={this.state.currentDay.getDay() === 6 ? { color: '#2c86e5' } : null}>S</Text>
        </View>
      </View>
    )
  }

  renderCalendar() {
    // return (
    //   <Agenda
    //     style={{ height: '100%', width: '100%' }}
    //     hideKnob={true}
    //     items={this.props.calendarItems}
    //     onDayPress={this.handleDayPress.bind(this)}
    //     renderEmptyDate={this.renderEmptyDate.bind(this)}
    //     renderItem={this.renderItem.bind(this)}
    //     rowHasChanged={this.handleRowChange.bind(this)}
    //   />
    // )
    return (
      <GestureRecognizer
        onSwipeLeft={(state) => this.setState(prevState => ({ currentDay: addDays(prevState.currentDay, 1) }))}
        onSwipeRight={(state) => this.setState(prevState => ({ currentDay: addDays(prevState.currentDay, -1) }))}
        style={{
          flex: 1,
          backgroundColor: 'white',
          width: '100%',
          paddingTop: 20
        }}
      >
        {this.renderCalendarHeader()}
        <View style={{ backgroundColor: 'white', height: '80%' }}>
        </View>
      </GestureRecognizer>
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
