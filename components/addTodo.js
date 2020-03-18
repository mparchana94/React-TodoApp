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
    const result = await this.audioRecorderPlayer.startRecorder();
    this.audioRecorderPlayer.addRecordBackListener((e) => {
      this.setState({
        recordSecs: e.current_position,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.current_position),
        ),
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
        onPress={() => onStartRecord(text, audioPath)} 
        title="start" 
      />
      <Button
        onPress={() => submitHandler(text)}
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
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
  },
});
