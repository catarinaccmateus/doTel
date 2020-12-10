import React from 'react';
import {styles} from 'styles/app';
import {View, Text, TouchableHighlight} from 'react-native';
import Stars from 'components/Stars';

const HotelItem = ({hotel, index, navigateToInfo}) => {
  function infoPressed() {
    navigateToInfo();
  }

  return (
    <View
      style={[
        styles.hotelItem,
        // eslint-disable-next-line react-native/no-inline-styles
        {backgroundColor: index % 2 === 0 ? '#cceeff' : 'white'},
      ]}>
      <Stars starsNumber={hotel.starRating} />
      <View style={styles.hotelInfo}>
        <Text style={styles.hotelTitle}>{hotel.name}</Text>
        <Text style={styles.hotelSubtitle}>{hotel.address.locality}</Text>
      </View>
      <TouchableHighlight
        style={styles.button}
        onPress={() => infoPressed()}
        underlayColor="#adebeb">
        <Text style={styles.hotelLink}>Info</Text>
      </TouchableHighlight>
    </View>
  );
};

export default HotelItem;
