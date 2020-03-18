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
    try {
      const result = await audioRecorderPlayer.startRecorder();
      audioRecorderPlayer.addRecordBackListener(e => {
        console.log(e.current_position);
        setRecordsecs(e.current_position);
        setRecordTime(
          audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
        );
        return;
      });
      setAudio(result);
      console.log(result);
    } catch (error) {
      console.log('Error block');
      console.log(error);
    }
  };

  const onStopRecord = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setRecordsecs(0);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="new todo....."
        onChangeText={changeHadler}
      />
      {recordSecs === 0 ? (
        <Button
          style={styles.buttonRecord}
          onPress={() => onStartRecord()}
          title="start Record"
        />
      ) : (
        <Button
          style={styles.buttonRecord}
          onPress={() => onStopRecord()}
          title="Stop Record"
        />
      )}

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
  buttonRecord: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
