import PropTypes from 'prop-types'
import * as React from 'react'
import { Dropdown } from 'react-native-material-dropdown'
import { Button, Dialog, Portal, Text } from 'react-native-paper'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addEvent } from '../../actions/CalendarActions'
import { addTask } from '../../actions/TaskListActions'

const { bool, func, string } = PropTypes

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
    isDialogOpen: bool.isRequired,
    onClose: func.isRequired
  }

  constructor(props) {
    super(props)
    this.handleCreateTypeChange = this.handleCreateTypeChange.bind(this)
    this.handleOnDialogClose = this.handleOnDialogClose.bind(this)
    this.handleOnAdd = this.handleOnAdd.bind(this)
    this.state = {
      createType: props.createType
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
        name: 'event' + length,
        id: length
      })
    } else if (this.state.createType === 'task') {
      const { tasks } = this.props.taskList
      const length = tasks ? tasks.length : 0
      this.props.addTask({
        name: 'task' + length,
        id: length
      })
    }
    this.handleOnDialogClose()
  }


  render() {
    const { isDialogOpen } = this.props
    return (
      <Portal>
        <Dialog visible={isDialogOpen} onDismiss={() => ({})} dismissable={false}>
          <Text>{this.state.createType}</Text>
          <Dropdown
            data={createTypeData}
            onChangeText={this.handleCreateTypeChange}
            value={this.state.createType}
          />
          <Button mode="contained" onPress={this.handleOnDialogClose}>
            Close
          </Button>
          <Button mode="contained" onPress={this.handleOnAdd}>
            Add {this.state.createType}
          </Button>
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
