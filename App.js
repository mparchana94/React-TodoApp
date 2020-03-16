import React, { useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList
} from 'react-native';
import Header from './components/header';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

export default function App() {
  const [todos, setTodos] = useState([
    { text: 'home Walkthrough', key: '1'},
    { text: 'create an app', key: '2'},
    { text: 'play on the switch', key: '3'}
  ]);

  return(
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
          {/* to form */}
        <View style={styles.list}>
          <FlatList
            data={todos}
            renderItem={({ item }) => (
              <Text>{item.text}</Text>
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  content: {
    padding: 40,
  },

  list: {
    marginTop: 20,
  },
});
