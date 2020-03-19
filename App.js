import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Header from './components/header';
import TodoItem from './components/todoitem';
import AddTodo from './components/addTodo';
import Sanbox from './components/sanbox';

import {Colors} from 'react-native/Libraries/NewAppScreen';

export default function App() {
  const [todos, setTodos] = useState([
    {text: 'home Walkthrough', key: '1'},
    {text: 'create an app', key: '2'},
    {text: 'play on the switch', key: '3'},
  ]);

  const pressHandler = key => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.key !== key);
    });
  };

  const submitHandler = (
    text,
    audio,
    recordSecs,
    recordTime,
    audioFile,
    recording,
    loaded,
  ) => {
    if (text.length > 3) {
      setTodos(prevTodos => {
        return [
          {
            text: text,
            audio: audio,
            recordSecs: recordSecs,
            recordTime: recordTime,
            audioFile: audioFile,
            recording: recording,
            loaded: loaded,
            key: Math.random().toString(),
          },
          ...prevTodos,
        ];
      });
    } else {
      Alert.alert('OOPS!', 'Todos must be over 3 long', [
        {text: 'Understood', onPress: () => console.log('alert closed')},
      ]);
    }
  };

  return (
    // <Sanbox />
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        console.log('dismissed keyboard');
      }}>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({item}) => (
                <TodoItem item={item} pressHandler={pressHandler} />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 40,
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
});
