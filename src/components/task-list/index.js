import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Checkbox } from 'react-native-material-ui'
import { FAB } from 'react-native-paper';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import AddUpdateDialog from '../add-update-dialog'

import { addTask, updateTask } from '../../actions/TaskListActions'
import { addEvent } from '../../actions/CalendarActions'
import { getDueTime, getTaskFormattedDate, isToday, isTomorrow, timeSorter } from '../../date-util'
import BottomNav from '../bottom-nav';

class TaskList extends React.Component {
  constructor(props) {
    super(props)
    this.renderAddUpdateDialog = this.renderAddUpdateDialog.bind(this)
    this.handleOnPress = this.handleOnPress.bind(this)
    this.handleOnAddUpdateDialogClose = this.handleOnAddUpdateDialogClose.bind(this)
    this.handleUpdateTask = this.handleUpdateTask.bind(this)
    this.state = {
      isDialogOpen: false,
      isUpdateDialog: false,
      taskToUpdate: {}
    }
  }

  handleOnAddUpdateDialogClose() {
    this.setState({ isDialogOpen: false, isUpdateDialog: false, taskToUpdate: {} })
  }

  handleOnPress() {
    this.setState({ isDialogOpen: true })
  }

  handleUpdateTask(task) {
    this.setState({
      isDialogOpen: true,
      isUpdateDialog: true,
      taskToUpdate: task
    })
  }

  renderTask(task, taskGroupName) {
    return (
      <View style={styles.taskList} key={task.id}>
        <Checkbox
          checked={task.completed}
          label=''
          value=''
          onCheck={() => this.props.updateTask({ ...task, completed: !task.completed }, taskGroupName)}
          style={{
            container: { maxWidth: '13%' }
          }}
        />
        <TouchableHighlight onPress={() => this.handleUpdateTask(task)}>
          <Text style={{ fontSize: 16, fontWeight: '400', color: '#000000', opacity: .93 }}>
            {task.name}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.handleUpdateTask(task)}>
          <Text style={{ fontSize: 14, fontWeight: '400', color: '#000000', opacity: .7 }}>
            {getDueTime(task.dueTime)}
          </Text>
        </TouchableHighlight>
      </View>
    )
  }

  renderTaskList() {
    const { tasks } = this.props.taskList
    return Object.keys(tasks).map(taskGroupDate => {
      if (tasks[taskGroupDate].length === 0)
        return
      return (
        <View style={{ marginTop: '5%', marginLeft: '2%' }} key={taskGroupDate}>
          <Text style={{ fontSize: 20, fontWeight: '500' }}>
            {isToday(taskGroupDate)
              ? 'Today'
              : (isTomorrow(taskGroupDate)
                ? 'Tomorrow'
                : getTaskFormattedDate(taskGroupDate))}
          </Text>
          {tasks[taskGroupDate].map(task => (this.renderTask(task, taskGroupDate)))}
        </View>
      )
    })
  }

  renderAddUpdateDialog() {
    const { isDialogOpen, isUpdateDialog, taskToUpdate } = this.state
    return isDialogOpen && (
      <AddUpdateDialog
        createType='task'
        currentDay={new Date()}
        isDialogOpen={this.state.isDialogOpen}
        isUpdating={isUpdateDialog}
        taskToUpdate={isUpdateDialog ? taskToUpdate : null}
        onClose={this.handleOnAddUpdateDialogClose}/>
    )
  }

  render() {
    return (
      <View style={{ flex: 1, flexGrow: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', height: 300  }}>
        <ScrollView contentContainerStyle={{
          flexGrow: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: '10%', marginHorizontal: 10, paddingBottom: 50
        }}>
          <Text style={{ fontSize: 24, fontWeight: '400' }}>Tasks</Text>
          {this.renderTaskList()}
          {this.renderAddUpdateDialog()}
        </ScrollView>
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
  },
  taskList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 350
  }
})

const mapStateToProps = (state) => {
  const { taskList } = state
  const orderedTasks = {}
  Object.keys(taskList.tasks).sort(timeSorter).forEach(function(key) {
    orderedTasks[key] = taskList.tasks[key]
  })
  return { taskList: { tasks: orderedTasks } }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    updateTask
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
