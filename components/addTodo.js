import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
// import Permissions from 'react-native-permissions';
import {Buffer} from 'buffer';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import AudioRecord from 'react-native-audio-record';

export default function AddTodo({submitHandler}) {
  const [text, setText] = useState('');
  // const [audioPath, setAudio] = useState(null);
  const [recordSecs, setRecordsecs] = useState(0);
  const [recordTime, setRecordTime] = useState(0);
  const [audioFile, setAudio] = useState('');
  const [recording, setRecording] = useState('false');
  const [loaded, setLoaded] = useState('false');

  const changeHadler = val => {
    setText(val);
  };

  useEffect(() => {
    checkPermission();
    initAudioRecord();
  });

  const checkPermission = async () => {
    const p = await PERMISSIONS.ANDROID.RECORD_AUDIO;
    console.log('permission check', p);
    if (p === 'authorized') {
      return;
    }
    return requestPermission();
  };

  const requestPermission = async () => {
    const p = await PERMISSIONS.ANDROID.RECORD_AUDIO;
    console.log('permission request', p);
  };

  const initAudioRecord = () => {
    const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      wavFile: 'test.wav',
    };

    AudioRecord.init(options);

    AudioRecord.on('data', data => {
      const chunk = Buffer.from(data, 'base64');
      console.log('chunk size', chunk.byteLength);
      // do something with audio chunk
    });
  };

  const start = async () => {
    console.log('start record');
    setAudio({audioFile: ''});
    setRecording({recording: true});
    setLoaded({loaded: false});
    AudioRecord.start();
  };

  const stop = async () => {
    if (!recording) {
      return;
    }
    console.log('stop record');
    let voiceFile = await AudioRecord.stop();
    console.log('audioFile', voiceFile);
    setAudio({audioFile: ''});
    setRecording({recording: true});
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
          onPress={() => start()}
          title="start Record"
        />
      ) : (
        <Button
          style={styles.buttonRecord}
          onPress={() => stop()}
          title="Stop Record"
        />
      )}

      <Button
        onPress={() =>
          submitHandler(
            text,
            recordSecs,
            recordTime,
            audioFile,
            recording,
            loaded,
          )
        }
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
