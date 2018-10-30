import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { withNavigation } from 'react-navigation';

class BottomNav extends React.Component {
  render() {
    console.log('this.props.navigator.state.key:', this.props.navigator.state.key)
    return (
      <Appbar style={styles.bottom}>
        <Appbar.Action icon={() => (<Icon size={25} name={'md-list'} color={this.props.navigator.state.key === 'TaskList' ? '#2c86e5' : 'black'}/>)}
                       onPress={() => this.props.navigator.navigate('TaskList')}/>
        <Appbar.Action icon={() => (<Icon size={25} name={'md-calendar'} color={this.props.navigator.state.key === 'Calendar' ? '#2c86e5' : 'black'}/>)}
                       onPress={() => this.props.navigator.navigate('Calendar')}
                       style={{ position: 'absolute', right: 0 }}/>
      </Appbar>
    )
  }
}

const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
    shadowOpacity: 0.75,
    shadowRadius: 3,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 },
  }
})

export default BottomNav
