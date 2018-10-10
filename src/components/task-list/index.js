import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addTask } from '../../actions/TaskListActions'
import AddDialog from '../add-dialog'

class TaskList extends React.Component {
  constructor(props) {
    super(props)
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
    // const { tasks } = this.props.taskList
    // const length = tasks ? tasks.length : 0
    // this.props.addTask({
    //   name: 'task' + length,
    //   id: length
    // })
    this.setState({ isDialogOpen: true })
  }

  renderTasks() {
    return this.props.taskList.tasks.map(task => {
      return (
        <Text key={task.id} style={{ textAlign: 'center' }}>
          {task.name}
        </Text>
      )
    })
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ textAlign: 'center' }}>TaskList</Text>
        {this.renderTasks()}
        <AddDialog isDialogOpen={this.state.isDialogOpen} onClose={this.handleOnAddDialogClose}/>
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
  const { taskList } = state
  return { taskList }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addTask,
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
