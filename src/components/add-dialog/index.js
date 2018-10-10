import PropTypes from 'prop-types'
import * as React from 'react'
import { Button, Dialog, Portal, Text } from 'react-native-paper'

const { bool, func } = PropTypes

export default class AddDialog extends React.Component {
  static propTypes = {
    isDialogOpen: bool.isRequired,
    onClose: func.isRequired
  }

  constructor(props) {
    super(props)
    this.handleOnDialogClose = this.handleOnDialogClose.bind(this)
  }

  handleOnDialogClose() {
    this.props.onClose()
  }

  render() {
    const { isDialogOpen } = this.props
    return (
      <Portal>
        <Dialog visible={isDialogOpen} onDismiss={() => {}} dismissable={false}>
          <Button mode="contained" onPress={this.handleOnDialogClose}>
            Close
          </Button>
        </Dialog>
      </Portal>
    )
  }
}
