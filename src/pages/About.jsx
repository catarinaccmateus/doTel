import React from 'react';
import { SafeAreaView, View, Text, Image, Animated, PanResponder } from 'react-native';
import Header from 'components/Header';
import { styles } from 'styles/about';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function About() {
  const [homeLayoutLocation, setHomeLayoutLocation] = React.useState({ x: 0, y: 0 });

  const animatedValue = React.useRef(new Animated.ValueXY()).current;
  const comparisonValue = React.useRef(new Animated.ValueXY());

  animatedValue.addListener((value) => (comparisonValue.current = value));
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      /*onPanResponderGrant: () => {
        animatedValue.setOffset({
          x: comparisonValue.current.x,
          y: comparisonValue.current.y,
        });
        animatedValue.setValue({ x: 0, y: 0 });
      },*/
      onPanResponderMove: (event, gesture) => {
        animatedValue.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: () => {
        Animated.spring(animatedValue, { toValue: homeLayoutLocation }).start();
      },
    })
  ).current;

  const animatedStyle = {
    transform: animatedValue.getTranslateTransform(),
  };

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
            <Animated.View
              style={[{ height: 40, width: 40 }, homeLayoutLocation, animatedStyle]}
              {...panResponder.panHandlers}
            >
              <Icon name="dog" color="#996633" size={30} style={styles.icon} />
            </Animated.View>
            <View
              onLayout={(event) => {
                const layout = event.nativeEvent.layout;
                setHomeLayoutLocation({ x: layout.x + 50, y: layout.y + 50 });
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
