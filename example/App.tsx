import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

import * as ExpoDirectCall from 'expo-direct-call';
import React from 'react';

export default function App() {

  const [value, onChangeText] = React.useState('12345678');

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 38 }}>{ExpoDirectCall.debug()}</Text>

      <TextInput
        style={{ height: 40, width: 200, marginBottom: 38, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => onChangeText(text)}
        value={value} />

      <Button
        onPress={() => ExpoDirectCall.directCall(value, {
          title: "Place call permission",
          message: "We need your permission to place a call"
        })}
        title={"Call " + value}
        color="#841584"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
