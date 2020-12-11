import React from 'react';
import { SafeAreaView, View, Text, Image, Animated, PanResponder } from 'react-native';
import Header from 'components/Header';
import { styles } from 'styles/about';

export default function About() {
  const animatedValue = React.useRef(new Animated.ValueXY()).current;
  const panResponderAnimatedValue = React.useRef(new Animated.ValueXY()).current;
  panResponderAnimatedValue.addListener((value) => (animatedValue.current = value));

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        panResponderAnimatedValue.setOffset({
          x: animatedValue.x,
          y: animatedValue.y,
        });
        panResponderAnimatedValue.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([null, { dx: panResponderAnimatedValue.x, dy: panResponderAnimatedValue.y }]),
      onPanResponderRelease: (evt, gestureState) => {
        panResponderAnimatedValue.flattenOffset();
        Animated.decay(panResponderAnimatedValue, {
          deceleration: 0.997,
          velocity: { x: gestureState.vx, y: gestureState.vy },
        }).start();
      },
    })
  ).current;

  const animatedStyle = {
    transform: panResponderAnimatedValue.getTranslateTransform(),
  };

  React.useEffect(() => {
    panResponderAnimatedValue.current = new Animated.ValueXY();
  }, [panResponderAnimatedValue]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Header />
        <Animated.View style={[styles.description, animatedStyle]} {...panResponder.panHandlers}>
          <Image source={require('../assets/family-picture.jpg')} style={styles.image} />
          <Text>
            We built this app in order to help you book the vacations of your life, with the family completed.
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
