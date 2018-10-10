import PropTypes from 'prop-types'
import * as React from 'react'
import { Dropdown } from 'react-native-material-dropdown'
import { Button, Dialog, Portal, Text } from 'react-native-paper'

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

export default class AddDialog extends React.Component {
  static propTypes = {
    createType: string.isRequired,
    isDialogOpen: bool.isRequired,
    onClose: func.isRequired
  }

  constructor(props) {
    super(props)
    this.handleOnDialogClose = this.handleOnDialogClose.bind(this)
    this.handleCreateTypeChange = this.handleCreateTypeChange.bind(this)
    this.state = {
      createType: props.createType
    }
  }

  handleOnDialogClose() {
    this.props.onClose()
  }

  handleCreateTypeChange(createType) {
    this.setState({ createType })
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
        </Dialog>
      </Portal>
    )
  }
}
