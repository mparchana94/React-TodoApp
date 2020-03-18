import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

export default function AddTodo({submitHandler}) {
  const [text, setText] = useState('');
  const [audioPath, setAudio] = useState(null);

  const audioRecorderPlayer = new AudioRecorderPlayer();

  const changeHadler = val => {
    setText(val);
  };

  onStartRecord = async () => {
    const result = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener((e) => {
      this.useState({
        recordSecs: e.current_position,
        recordTime: audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
      });
      return;
    });
    console.log(result);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="new todo....."
        onChangeText={changeHadler}
      />
      <Button
        style={styles.button}
        onPress={() => onStartRecord()}
        title="start"
      />
      <Button title="Stop" />
      <Button
        onPress={() => submitHandler(text, audioPath)}
        title="add todo"
        color="coral"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  button: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
});
