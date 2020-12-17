import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import App from './src/App';
import messaging from '@react-native-firebase/messaging';
import { name as appName } from './app.json';
import { LogBox } from 'react-native';

// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
});

//Ignoring Yellow Warnings
LogBox.ignoreAllLogs(true);

AppRegistry.registerComponent(appName, () => App);
