import React from 'react';
import { SafeAreaView, View, Text, Image, Animated, PanResponder } from 'react-native';
import Header from 'components/Header';
import { styles } from 'styles/about';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function About() {
  const animatedValue = React.useRef(new Animated.ValueXY()).current;
  const panResponderAnimatedValue = React.useRef(new Animated.ValueXY()).current;
  panResponderAnimatedValue.addListener((value) => (animatedValue.current = value));
  const [homeLayoutLocation, setHomeLayoutLocation] = React.useState({ x: 0, y: 0 });

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        panResponderAnimatedValue.setOffset({
          x: animatedValue.x,
          y: animatedValue.y,
        });
        panResponderAnimatedValue.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([null, { dx: panResponderAnimatedValue.x, dy: panResponderAnimatedValue.y }]),
      onPanResponderRelease: () => {
        Animated.spring(panResponderAnimatedValue, { toValue: homeLayoutLocation }).start();
      },
    })
  ).current;

  const animatedStyle = {
    transform: panResponderAnimatedValue.getTranslateTransform(),
  };

  console.log('TEST', panResponderAnimatedValue.getTranslateTransform());

  React.useEffect(() => {
    panResponderAnimatedValue.current = new Animated.ValueXY();
  }, [panResponderAnimatedValue]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Header />
        <View style={styles.description}>
          <Image source={require('../assets/family-picture.jpg')} style={styles.image} />
          <Text>
            We built this app in order to help you book the vacations of your life, with the family completed.
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', marginTop: 10 }}>
          <Text style={{ fontWeight: '700', color: '#000080', alignSelf: 'center' }}>
            Your best friend will never be expelled from the hotel! {'\n'}Try to drag him out.
          </Text>
          <View style={{ width: '100%', alignItems: 'center', paddingTop: 30 }}>
            <Animated.View style={[animatedStyle]} {...panResponder.panHandlers}>
              <Icon name="dog" color="#996633" size={30} style={styles.icon} />
            </Animated.View>
            <View
              onLayout={(event) => {
                const layout = event.nativeEvent.layout;
                setHomeLayoutLocation({ x: layout.x, y: layout.y });
              }}
            >
              <Icon name="home" color="#cc3300" size={40} style={styles.icon} />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
