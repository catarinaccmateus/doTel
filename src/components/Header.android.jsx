import React from 'react';
import { styles } from 'styles/header';
import { View, Text } from 'react-native';

const App = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>DoTel</Text>
      <Text style={styles.subTitle}>Go Anywhere with your Best Friend</Text>
    </View>
  );
};

export default App;
