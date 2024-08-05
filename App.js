import React, { useState, useEffect, useRef } from 'react';
import { View, Text, AppState, StyleSheet, AppRegistry, Alert, Button } from 'react-native';

import PushNotification from 'react-native-push-notification';


const App = () => {


  
  const [val, setVal] = useState(0);

  const configureNotifications = () => {
    // Create a channel
    PushNotification.createChannel(
      {
        channelId: "channel-id", // Channel ID
        channelName: "Thats 1 minute", // Channel name
        channelDescription: "wait for another minute..", // Channel description
        soundName: "default",
        importance: 4, // Importance level: 0 - 4
        vibrate: true,
        repeatType: 'minute',
      },
      (created) => console.log(`Create channel returned '${created}'`) // Callback function
    );

    // Schedule notification
    PushNotification.localNotification({
      channelId: "channel-id", // Channel ID
      title: 'Thats 1 minute',
      message: 'This is a scheduled notification.',
      repeatType: 'minute',
    });
  };



  useEffect(() => {
    configureNotifications()

    
  }, [val]);


 

  return (
    <View style={styles.container}>
    <Button title="send notification" onPress={ configureNotifications} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});



const headlessTask = async () => {
  try {
    // Increment background time count
    let currentValue = await AsyncStorage.getItem('backgroundTimeCount');
    let newValue = (parseInt(currentValue) || 0) + 1;
    await AsyncStorage.setItem('backgroundTimeCount', newValue.toString());
    console.log('Async Storage value incremented:', newValue);

    // Configure notifications
    PushNotification.localNotification({
      channelId: "channel-id",
      title: 'Thats 1 minute',
      message: 'This is a background notification.',
      repeatType: 'minute',
    });
    
  } catch (error) {
    console.error('Error in background task:', error);
  }
};

// Register the headless task
AppRegistry.registerHeadlessTask('IncrementAsyncStorage', () => headlessTask);

// Optional: Configure notification channels if not already done in App.js or index.js
PushNotification.createChannel(
  {
    channelId: "channel-id",
    channelName: "Thats 1 minute",
    channelDescription: "Wait for another minute..",
    soundName: "default",
    importance: 4,
    vibrate: true,
    repeatType: 'minute',
  },
  (created) => console.log(`Create channel returned!ß '${created}'`)
);

export default App;

