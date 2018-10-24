import PropTypes from 'prop-types'
import * as React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown'
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Button, Dialog, Divider, IconButton, Portal, Text, TextInput } from 'react-native-paper'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addEvent } from '../../actions/CalendarActions'
import { addTask } from '../../actions/TaskListActions'
import styles from './styles'

const { bool, func, object, string } = PropTypes

const createTypeData = [
  {
    value: 'event',
    label: 'Event'
  },
  {
    value: 'task',
    label: 'Task'
  }
]

class AddDialog extends React.Component {
  static propTypes = {
    createType: string.isRequired,
    currentDay: object.isRequired,
    isDialogOpen: bool.isRequired,
    isEditing: bool.isRequired,
    onClose: func.isRequired
  }

  constructor(props) {
    super(props)
    this.handleCreateTypeChange = this.handleCreateTypeChange.bind(this)
    this.handleOnDialogClose = this.handleOnDialogClose.bind(this)
    this.handleOnAdd = this.handleOnAdd.bind(this)
    this.renderEventOptions = this.renderEventOptions.bind(this)
    this.renderTaskOptions = this.renderTaskOptions.bind(this)
    this.renderOptions = this.renderOptions.bind(this)
    this.state = {
      createType: props.createType,
      isStartTimePickerVisible: false,
      isEndTimePickerVisible: false,
      isDueTimePickerVisible: false,
      event: {
        name: '',
        startTime: this.props.currentDay,
        endTime: this.props.currentDay
      },
      task: {
        name: '',
        dueTime: this.props.currentDay
      }
    }
  }

  handleCreateTypeChange(createType) {
    this.setState({ createType })
  }

  handleOnDialogClose() {
    this.props.onClose()
  }

  handleOnAdd() {
    if (this.state.createType === 'event') {
      const { events } = this.props.calendar
      const length = events ? events.length : 0
      this.props.addEvent({
        ...this.state.event,
        id: length,
        type: 'event'
      })
    } else if (this.state.createType === 'task') {
      const { tasks } = this.props.taskList
      const length = Object.keys(tasks).reduce((taskCount, currentTaskGroup) => {
        return taskCount + tasks[currentTaskGroup].length
      }, 0)
      this.props.addTask({
        ...this.state.task,
        completed: false,
        id: length,
        type: 'task'
      })
    }
    this.handleOnDialogClose()
  }


  formatTime(date) {
    return date.toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    })
  }

  renderEventOptions() {
    const { name, startTime, endTime } = this.state.event
    return (
      <ScrollView contentContainerStyle={styles.optionsContainer}>
        <TextInput
          label='Event Name'
          mode='outlined'
          onChangeText={name => this.setState(prevState => (
            { event: { ...prevState.event, name: name }, task: { ...prevState.task, name: name } })
          )}
          value={name}
        />
        <View style={styles.timeSelector}>
          <Text>Starts</Text>
          <Button color={styles.timeSelectorColor} onPress={() => this.setState({ isStartTimePickerVisible: true })}>
            {this.formatTime(startTime)}
          </Button>
          <DateTimePicker
            date={this.state.event.startTime}
            isVisible={this.state.isStartTimePickerVisible}
            mode='datetime'
            onConfirm={date => this.setState(prevState => (
              { event: { ...prevState.event, startTime: date }, isStartTimePickerVisible: false })
            )}
            onCancel={() => this.setState({ isStartTimePickerVisible: false })}
          />
        </View>
        <View style={styles.timeSelector}>
          <Text>Ends</Text>
          <Button color={styles.timeSelectorColor} onPress={() => this.setState({ isEndTimePickerVisible: true })}>
            {this.formatTime(endTime)}
          </Button>
          <DateTimePicker
            date={this.state.event.endTime}
            isVisible={this.state.isEndTimePickerVisible}
            mode='datetime'
            onConfirm={date => this.setState(prevState => (
              { event: { ...prevState.event, endTime: date }, isEndTimePickerVisible: false })
            )}
            onCancel={() => this.setState({ isEndTimePickerVisible: false })}
          />
        </View>
      </ScrollView>
    )
  }

  renderTaskOptions() {
    const { name, dueTime } = this.state.task
    return (
      <ScrollView contentContainerStyle={styles.optionsContainer}>
        <TextInput
          label='Task Name'
          mode='outlined'
          onChangeText={name => this.setState(prevState => (
            { event: { ...prevState.event, name: name }, task: { ...prevState.task, name: name } }
          ))}
          value={name}
        />
        <View style={styles.timeSelector}>
          <Text>Due</Text>
          <Button color={styles.timeSelectorColor} onPress={() => this.setState({ isDueTimePickerVisible: true })}>
            {this.formatTime(dueTime)}
          </Button>
          <DateTimePicker
            isVisible={this.state.isDueTimePickerVisible}
            mode='datetime'
            date={this.state.task.dueTime}
            onConfirm={date => this.setState(prevState => (
              { task: { ...prevState.task, dueTime: date }, isDueTimePickerVisible: false })
            )}
            onCancel={() => this.setState({ isDueTimePickerVisible: false })}
          />
        </View>
      </ScrollView>
    )
  }

  renderOptions() {
    if (this.state.createType === 'event') {
      return this.renderEventOptions()
    } else if (this.state.createType === 'task') {
      return this.renderTaskOptions()
    }
  }

  render() {
    const { isDialogOpen } = this.props
    return (
      <Portal>
        <Dialog visible={isDialogOpen} onDismiss={() => ({})} dismissable={false}>
          <Dialog.Content style={styles.dialogContent}>
            <Dropdown
              data={createTypeData}
              onChangeText={this.handleCreateTypeChange}
              value={this.state.createType}/>
            {this.renderOptions()}
          </Dialog.Content>
          <Dialog.Actions style={styles.buttons}>
            <Button mode='contained' color={styles.main.color} onPress={this.handleOnDialogClose}>
              Close
            </Button>
            <Button mode='contained' color={styles.main.color} onPress={this.handleOnAdd}>
              Add {this.state.createType}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    )
  }
}

const mapStateToProps = (state) => {
  const { calendar, taskList } = state
  return { calendar, taskList }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addEvent,
    addTask
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(AddDialog)
