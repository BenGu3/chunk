import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  main: {
    color: '#2c86e5',
  },
  dialogContent: {
    minHeight: '30%',
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  timeSelector: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15
  },
  timeSelectorColor: {
    color: '#000000'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15
  }
})

export default styles
