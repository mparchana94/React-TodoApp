import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

export default function AddTodo({submitHandler}) {
  const [text, setText] = useState('');
  const [audioPath, setAudio] = useState(null);
  const [recordSecs, setRecordsecs] = useState(0);
  const [recordTime, setRecordTime] = useState(0);

  const audioRecorderPlayer = new AudioRecorderPlayer();

  const changeHadler = val => {
    setText(val);
  };

  const onStartRecord = async () => {
    const result = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener(e => {
      setRecordsecs({
        recordSecs: e.current_position,
      });
      setRecordTime({
        recordTime: audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
      });
      return;
    });
    console.log(result);
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordsecs({
      recordSecs: 0,
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
      <Button
        style={styles.button}
        onPress={() => onStopRecord()}
        title="Stop"
      />
      <Button
        onPress={() => submitHandler(text, audioPath, recordSecs, recordTime)}
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
