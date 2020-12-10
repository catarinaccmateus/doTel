import React from 'react';
import { styles } from 'styles/info';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import Stars from 'components/Stars';
import Loading from 'components/Loading';

const HotelInfo = ({ route, navigation }) => {
  const [isImageLoading, setLoading] = React.useState(true);
  const hotel = route.params.hotel;
  return (
    <View style={styles.mainContainer}>
      <Loading isLoading={isImageLoading} />
      <Image
        source={{ uri: hotel.thumbnailUrl }}
        style={styles.picture}
        resizeMode="contain"
        onLoadEnd={() => {
          setLoading(false);
        }}
      />
      <Text style={styles.title}> {hotel.name} </Text>
      <Stars starsNumber={hotel.starRating} />
      <Text>{hotel.address.streetAddress + ', ' + hotel.address.locality + ', ' + hotel.address.postalCode}</Text>
      {hotel.ratePlan && <Text>Price per night: {hotel.ratePlan?.price.current}</Text>}
      <TouchableHighlight style={styles.button} underlayColor="#adebeb" onPress={() => navigation.navigate('Review')}>
        <Text style={styles.hotelLink}>Add a Review!</Text>
      </TouchableHighlight>
    </View>
  );
};

export default HotelInfo;
