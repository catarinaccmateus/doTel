import React from 'react';
import { styles } from 'styles/header';
import { Text, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const App = () => {
  const animation = React.useRef(new Animated.Value(34)).current;
  const rotationAnimation = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    function createAnimation() {
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 50,
          duration: 3000,
          useNativeDriver: false,
          easing: Easing.bounce,
        }),
        Animated.timing(rotationAnimation, {
          toValue: 1,
          duration: 1500,
        }),
      ]).start();
    }
    createAnimation();
  }, [animation, rotationAnimation]);

  const animatedStyle = { fontSize: animation };

  const interpolateRotation = rotationAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const animatedRotationStyle = {
    transform: [{ rotate: interpolateRotation }],
  };

  return (
    <Animated.View style={styles.header}>
      <Animated.View style={[animatedRotationStyle]}>
        <Icon name="paw" color="#1a75ff" size={30} style={styles.icon} />
      </Animated.View>
      <Animated.Text style={[styles.iOSTitle, animatedStyle]}>DoTel</Animated.Text>
      <Text style={styles.subTitle}>Go Anywhere with your Best Friend</Text>
    </Animated.View>
  );
};

export default App;
