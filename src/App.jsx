import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Landpage from './pages/LandPage';
import HotelInfo from './pages/HotelInfo';
import About from './pages/About';
import Review from './pages/Review';
import Map from './pages/Map';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import SplashScreen from 'react-native-splash-screen';

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
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);
  return <RootStackScreen />;
}

export default App;

/** We are using our MainStackScreen component as a
 * screen inside RootStackScreen! By doing this,
 * we are nesting a stack navigator inside of another
 *  stack navigator. In this case, this is useful for us
 * because we want to use a different transition style
 * for the modal. Since RootStackScreen renders a stack
 * navigator and has its own header,
 * we also want to hide the header for this screen.
 * In the future this will be important because for tab
 * navigation, for example, each tab will likely have
 * its own stack! Intuitively, this is what you expect:
 * when you are on tab A and switch to tab B, you would
 * like tab A to maintain its navigation state as you
 * continue to explore tab B */
