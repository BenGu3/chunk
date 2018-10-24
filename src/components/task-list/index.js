import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Checkbox } from 'react-native-material-ui'
import { FAB } from 'react-native-paper';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import AddDialog from '../add-dialog'

import { addTask, editTask } from '../../actions/TaskListActions'
import { addEvent } from '../../actions/CalendarActions'
import { getDueTime, getTaskFormattedDate, isToday, isTomorrow, timeSorter } from '../../date-util'

class TaskList extends React.Component {
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

  renderTask(task, taskGroupName) {
    return (
      <View style={styles.taskList} key={task.id}>
        <Checkbox
          checked={task.completed}
          label={task.name}
          value=''
          onCheck={() => this.props.editTask({ ...task, completed: !task.completed }, taskGroupName)}
        />
        <Text>
          {getDueTime(task.dueTime)}
        </Text>
      </View>
    )
  }

  renderTaskList() {
    const { tasks } = this.props.taskList
    return Object.keys(tasks).map(taskGroupDate => {
      return (
        <View style={{ marginTop: '5%' }} key={taskGroupDate}>
          <Text>
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

  renderAddDialog() {
    const { isDialogOpen } = this.state
    return isDialogOpen && (
      <AddDialog
        createType='task'
        currentDay={new Date()}
        isDialogOpen={this.state.isDialogOpen}
        onClose={this.handleOnAddDialogClose}/>
    )
  }

  render() {
    return (
      <View style={{
        flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: '10%', marginHorizontal: '5%'
      }}>
        <Text style={{ textAlign: 'center' }}>Tasks</Text>
        {this.renderTaskList()}
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
  },
  taskList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: '5%',
    marginVertical: '.5%',
    width: '100%'
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
    editTask
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
