import React from 'react';
import { styles } from 'styles/header';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const App = () => {
  return (
    <View style={styles.header}>
      <Icon name="paw" color="#1a75ff" size={30} style={styles.icon} />
      <Text style={styles.iOSTitle}>DoTel</Text>
      <Text style={styles.subTitle}>Go Anywhere with your Best Friend</Text>
    </View>
  );
};

export default App;
