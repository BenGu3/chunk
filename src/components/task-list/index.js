import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { connect } from 'react-redux'

import AddDialog from '../add-dialog'

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

  renderTasks() {
    return this.props.taskList.tasks.map(task => {
      return (
        <Text key={task.id} style={{ textAlign: 'center' }}>
          {task.name}
        </Text>
      )
    })
  }

  renderAddDialog() {
    const { isDialogOpen } = this.state
    return isDialogOpen && (
      <AddDialog
        createType='task'
        isDialogOpen={this.state.isDialogOpen}
        onClose={this.handleOnAddDialogClose}/>
    )
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ textAlign: 'center' }}>TaskList</Text>
        {this.renderTasks()}
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
  },
})

const mapStateToProps = (state) => {
  const { taskList } = state
  return { taskList }
}

export default connect(mapStateToProps)(TaskList)
