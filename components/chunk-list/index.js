import React from 'react'
import { Text, View } from 'react-native';

export default class ChunkList extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ textAlign: 'center' }}>ChunkList</Text>
      </View>
    )
  }
}
