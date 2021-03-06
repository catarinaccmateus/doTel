import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Landpage from './pages/LandPage';
import HotelInfo from './pages/HotelInfo';
import About from './pages/About';
import Review from './pages/Review';
import Map from './pages/Map';
import HotelWebview from './pages/Webview';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';
import NotifService from '../notificationservice.js';
import { Alert } from 'react-native';

const MainStack = createStackNavigator();

function AppStack() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#e6f7ff',
        },
        headerTintColor: '#005580',
        headerTitleStyle: {
          color: '#005580',
        },
      }}
    >
      <MainStack.Screen name="Home" component={Landpage} options={{ title: 'Welcome to DoTel', headerShown: false }} />
      <MainStack.Screen
        name="HotelInfo"
        component={HotelInfo}
        options={{
          title: 'Hotel Details',
        }}
      />
      <MainStack.Screen name="Webview" component={HotelWebview} />
      <MainStack.Screen
        name="Map"
        component={Map}
        options={{
          title: 'Find your hotel',
        }}
      />
    </MainStack.Navigator>
  );
}

function AboutStack() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="About" component={About} />
    </MainStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = {
            List: 'list',
            About: 'question-circle',
          }[route.name];

          return <Icon name={iconName} color={color} size={size} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#004080',
        inactiveTintColor: '#666666',
        tabStyle: { backgroundColor: '#cce6ff' },
        keyboardHidesTabBar: true,
        labelStyle: { padding: 4 },
      }}
    >
      <Tab.Screen name="List" component={AppStack} />
      <Tab.Screen name="About" component={AboutStack} />
    </Tab.Navigator>
  );
}

const RootStack = createStackNavigator();

function RootStackScreen() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        mode="modal"
        headerMode="none"
        screenOptions={{
          //In iOS you can slide down the modal to close it, this will eliminate that option.
          gestureEnabled: false,
        }}
      >
        <RootStack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
        <RootStack.Screen name="Review" component={Review} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

function App() {
  function onRegister(token) {
    console.log('TOKEN ON REGISTER', token);
  }

  function onNotif(notif) {
    Alert.alert(notif.title, notif.message);
  }
  const notif = React.useRef(new NotifService(onRegister, onNotif));

  React.useEffect(() => {
    SplashScreen.hide();
  }, []);
  React.useEffect(() => {
    async function requestUserPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    }
    requestUserPermission();
    notif.current.scheduleNotif();
  }, [notif]);

  React.useEffect(() => {
    console.log('subscribing');
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  return <RootStackScreen />;
}

export default App;
