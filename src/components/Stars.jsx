import React from 'react';
import { styles } from 'styles/app';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stars = ({ starsNumber }) => {
  return (
    <View style={styles.starsContainer}>
      {Array.from({ length: starsNumber }, (_, key) => (
        <Icon name="star" color="#e6b800" key={key} />
      ))}
    </View>
  );
};

export default Stars;
