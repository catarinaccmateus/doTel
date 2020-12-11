import React from 'react';
import { styles } from 'styles/header';
import { View, Text, Animated, Easing } from 'react-native';

const App = () => {
  const animation = React.useRef(new Animated.Value(34)).current;

  React.useEffect(() => {
    function createAnimation() {
      Animated.timing(animation, {
        toValue: 50,
        duration: 3000,
        easing: Easing.bounce,
      }).start();
    }
    createAnimation();
  }, [animation]);

  const animatedStyle = { fontSize: animation };

  return (
    <View style={styles.header}>
      <Text style={[styles.title, animatedStyle]}>DoTel</Text>
      <Text style={styles.subTitle}>Go Anywhere with your Best Friend</Text>
    </View>
  );
};

export default App;
