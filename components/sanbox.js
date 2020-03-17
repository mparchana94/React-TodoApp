import React, { useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function Sanbox() {
  return (
    <View style={styles.container}>
      <Text style={styles.boxOne}>one</Text>
      <Text style={styles.boxTwo}>two</Text>
      <Text style={styles.boxThree}>three</Text>
      <Text style={styles.boxFour}>four</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#ddd', 
  },
  boxOne: {
    backgroundColor: 'violet',
    padding: 10,
  },
  boxTwo: {
    backgroundColor: 'yellow',
    padding: 10,
  },
  boxThree: {
    backgroundColor: 'skyblue',
    padding: 10,
  },
  boxFour: {
    backgroundColor: 'red',
    padding: 10,
  },

});
