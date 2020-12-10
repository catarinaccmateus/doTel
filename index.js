import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import App from './src/App';
import { name as appName } from './app.json';
import { LogBox } from 'react-native';

//Ignoring Yellow Warnings
LogBox.ignoreAllLogs(true);

AppRegistry.registerComponent(appName, () => App);
