import React from 'react';
import { styles } from 'styles/info';
import { View, Text, TouchableHighlight, Animated, TouchableOpacity, Button } from 'react-native';
import Stars from 'components/Stars';
import Loading from 'components/Loading';

const HotelInfo = ({ route, navigation }) => {
  const [isImageLoading, setLoading] = React.useState(true);
  const animatedValue = React.useRef(new Animated.Value(1)).current;
  const hotel = route.params.hotel;

  function handlePressIn() {
    Animated.spring(animatedValue, {
      toValue: 1.3,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      navigation.navigate('Review');
    }, 1000);
  }
  function handlePressOut() {
    Animated.spring(animatedValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }
  const animatedStyle = {
    transform: [{ scale: animatedValue }],
  };

  const cardAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const cardValue = React.useRef(0);

  cardAnimatedValue.addListener(({ value }) => {
    cardValue.current = value;
  });

  const frontInterpolate = cardAnimatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const backInterpolate = cardAnimatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  function flipCard() {
    if (cardValue.current > 90) {
      Animated.spring(cardAnimatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
      }).start();
    } else {
      Animated.spring(cardAnimatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
      }).start();
    }
  }

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };
  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  return (
    <View style={styles.mainContainer}>
      <Loading isLoading={isImageLoading} />
      <Animated.Image
        source={{ uri: hotel.thumbnailUrl }}
        style={[styles.picture, animatedStyle]}
        resizeMode="contain"
        onLoadEnd={() => {
          setLoading(false);
        }}
      />
      <Text style={styles.title}> {hotel.name} </Text>
      <Stars starsNumber={hotel.starRating} />
      <Text>{hotel.address.streetAddress + ', ' + hotel.address.locality + ', ' + hotel.address.postalCode}</Text>
      {hotel.ratePlan && <Text>Price per night: {hotel.ratePlan?.price.current}</Text>}
      <TouchableHighlight
        style={styles.button}
        underlayColor="#adebeb"
        onPressIn={() => handlePressIn()}
        onPressOut={() => handlePressOut()}
      >
        <Text style={styles.hotelLink}>Add a Review!</Text>
      </TouchableHighlight>
      <TouchableOpacity onPress={() => flipCard()}>
        <View style={{ marginTop: 30 }}>
          <Animated.View style={[styles.cardFront, frontAnimatedStyle]}>
            <Text style={styles.cardText}>Flip this card to get a discount!</Text>
          </Animated.View>
          <Animated.View style={[styles.cardBack, backAnimatedStyle]}>
            <Text style={styles.cardText}>25% discount with code XJEK32</Text>
          </Animated.View>
        </View>
      </TouchableOpacity>
      <Button title={'Click here to browse to hotel page'} onPress={() => navigation.navigate('Webview')} />
    </View>
  );
};

export default HotelInfo;
