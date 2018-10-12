import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  main: {
    color: '#4646FF',
  },
  dialogContent: {
    minHeight: '80%',
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  timeSelector: {
    color: '#000000',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
})

export default styles