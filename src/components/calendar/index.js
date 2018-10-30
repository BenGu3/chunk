import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { Agenda } from 'react-native-calendars'
import { FAB } from 'react-native-paper'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures'
import { connect } from 'react-redux'

import AddUpdateDialog from '../add-update-dialog'
import {
  addDays,
  getCalendarCurrentWeek,
  getCalendarFormattedDate,
  getCalendarHeaderDate,
  getDateFromTaskFormattedDate,
  getDayOfWeek,
  getTimeDifference,
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

  handleUpdateEvent(event) {
    this.setState({
      isDialogOpen: true,
      isUpdateDialog: true,
      eventToUpdate: event
    })
  }

  renderItemsForToday() {
    const { currentDay } = this.state
    const itemsForToday = this.props.calendarItems[getCalendarFormattedDate(currentDay)]
    if (!itemsForToday)
      return
    return (
      <View>
        {itemsForToday.map(item => {
          if (item.type === 'task') {
            if (item.completed)
              return
            const taskCountForDay = this.props.taskList.tasks[getCalendarFormattedDate(currentDay)]
              && this.props.taskList.tasks[getCalendarFormattedDate(currentDay)].length
            const taskLocation = (((item.dueTime.getHours() * 60) + item.dueTime.getMinutes()) * 50 / 60) + 20
            return (
              <TaskPin
                key={'task-' + item.id}
                numberOfTasks={taskCountForDay}
                onPress={this.handleTaskPinPressed(currentDay)}
                styles={{ top: taskLocation, right: 20 }}
              />
            )
          } else {
            const eventHeight = getTimeDifference(item.startTime, item.endTime) * 50 / 60
            const eventLocation = (((item.startTime.getHours() * 60) + item.startTime.getMinutes()) * 50 / 60) + 20
            return (
              <TouchableHighlight
                key={item.id}
                style={[styles.event, { height: eventHeight, position: 'absolute', top: eventLocation }]}
                onPress={() => this.handleUpdateEvent(item)}>
                <Text style={{ color: 'white' }}>{item.name}</Text>
              </TouchableHighlight>
            )
          }
        })}
      </View>
    )
  }

  handleDayPress(day) {
    this.setState({ currentDay: day })
  }

  renderCalendarHeader() {
    const { currentDay } = this.state
    const week = getCalendarCurrentWeek(currentDay)
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
        backgroundColor: 'white',
      }}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
          <Text style={{ fontSize: 20, fontWeight: '500' }}>{getDayOfWeek(currentDay)}</Text>
          <Text style={{ fontSize: 20, fontWeight: '500' }}>{getCalendarHeaderDate(currentDay)}</Text>
        </View>
        <GestureRecognizer
          onSwipeLeft={(state) => this.setState(prevState => ({ currentDay: addDays(prevState.currentDay, 7) }))}
          onSwipeRight={(state) => this.setState(prevState => ({ currentDay: addDays(prevState.currentDay, -7) }))}
          style={{
            flex: 1,
            backgroundColor: 'white',
          }}
        >
          <View
            style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
            {Object.keys(week).map(day => {
              return (
                <View
                  key={day + '-view'}
                  style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', }}>
                  <Text key={day + '-name'} style={{ fontSize: 18, fontWeight: '400' }}>{day.split('')[0]}</Text>
                  <TouchableHighlight
                    key={day}
                    onPress={() => this.handleDayPress(week[day])}>
                    <Text style={currentDay.getDate() === week[day].getDate()
                      ? {
                        backgroundColor: '#2c86e5', color: 'white', borderRadius: 4, overflow: 'hidden', width: 24,
                        height: 24, textAlign: 'center', fontSize: 18, fontWeight: '400'
                      }
                      : {
                        width: 24, height: 24, textAlign: 'center', fontSize: 18, fontWeight: '400'
                      }}>{week[day].getDate()}</Text>
                  </TouchableHighlight>
                </View>
              )
            })}
          </View>
        </GestureRecognizer>
      </View>
    )
  }

  renderTimeLines() {
    let timeLines = []
    timeLines.push(
      <View key={'midnight1'} style={{
        flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: 50, marginLeft: 10
      }}>
        <Text>12</Text>
        <Text>AM</Text>
        <View style={{ borderBottomColor: '#808080', borderBottomWidth: .5, width: '100%', marginLeft: 10 }}/>
      </View>
    )
    for (let i = 1; i < 12; i++) {
      timeLines.push(
        <View key={i + 'AM'} style={{
          flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: 50, marginLeft: 10
        }}>
          <Text>{i}</Text>
          <Text>AM</Text>
          <View style={{ borderBottomColor: '#808080', borderBottomWidth: .5, width: '100%', marginLeft: 10 }}/>
        </View>
      )
    }
    timeLines.push(
      <View key={'noon'} style={{
        flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: 50, marginLeft: 10
      }}>
        <Text>12</Text>
        <Text>PM</Text>
        <View style={{ borderBottomColor: '#808080', borderBottomWidth: .5, width: '100%', marginLeft: 10 }}/>
      </View>
    )
    for (let i = 1; i < 12; i++) {
      timeLines.push(
        <View key={i + 'PM'} style={{
          flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: 50, marginLeft: 10
        }}>
          <Text>{i}</Text>
          <Text>PM</Text>
          <View style={{ borderBottomColor: '#808080', borderBottomWidth: .5, width: '100%', marginLeft: 10 }}/>
        </View>
      )
    }
    timeLines.push(
      <View key={'midnight2'} style={{
        flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: 50, marginLeft: 10
      }}>
        <Text>12</Text>
        <Text>AM</Text>
        <View style={{ borderBottomColor: '#808080', borderBottomWidth: .5, width: '100%', marginLeft: 10 }}/>
      </View>
    )

    return (
      <View style={{ marginTop: 10, marginBottom: 10, zIndex: -100 }}>
        {timeLines}
      </View>
    )
  }

  renderCalendar() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
        paddingTop: 20
      }}>
        {this.renderCalendarHeader()}
        <ScrollView style={{ backgroundColor: 'white', minHeight: 350 }}>
          <GestureRecognizer
            onSwipeLeft={(state) => this.setState(prevState => ({ currentDay: addDays(prevState.currentDay, 1) }))}
            onSwipeRight={(state) => this.setState(prevState => ({ currentDay: addDays(prevState.currentDay, -1) }))}
          >
            {this.renderItemsForToday()}
            {this.renderTimeLines()}
          </GestureRecognizer>
        </ScrollView>
      </View>
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
    backgroundColor: '#2c86e5',
    opacity: .75,
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    left: 50,
    width: '100%',
    zIndex: 1000
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
