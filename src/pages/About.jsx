import React from 'react';
import { SafeAreaView, View, Text, Image } from 'react-native';
import Header from 'components/Header';
import { styles } from 'styles/about';

export default function About() {
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
      </View>
    </SafeAreaView>
  );
}
