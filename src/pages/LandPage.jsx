import React, { useState } from 'react';
import axios from 'axios';
import { SafeAreaView, View, TextInput, Platform, FlatList, Animated, Text, Button, Linking } from 'react-native';

import Header from 'components/Header';
import HotelItem from 'components/HotelItem';
import Loading from 'components/Loading';
import { styles } from 'styles/app';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { hotelsDataBase } from '~/utils/constants';
import PushNotification from 'react-native-push-notification';

export default function LandPage({ navigation }) {
  const [searchValue, setSearch] = useState('');
  const [hotels, setHotels] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  const inputStyle = Platform.select({
    ios: styles.inputiOS,
    android: styles.input,
  });

  const handleButtonPress = () => {
    PushNotification.localNotification({
      autoCancel: true,
      bigText: 'Use this discount during checkout.',
      subText: 'Valid for today',
      title: 'Use this discount code - XJSI38A',
      message: 'Only in hotels with opportunity label',
      vibrate: true,
      vibration: 300,
      playSound: true,
      soundName: 'default',
      actions: '["Yes", "No"]',
    });
  };

  React.useEffect(() => {
    const getHotelsRequest = axios.CancelToken.source();
    async function getHotels() {
      setLoading(true);
      axios
        .get(
          'https://hotels4.p.rapidapi.com/properties/list?destinationId=1506246&pageNumber=1&checkIn=2020-01-08&checkOut=2020-01-15&pageSize=25&adults1=1&currency=USD&locale=en_US&sortOrder=PRICE',
          {
            method: 'GET',
            headers: {
              'x-rapidapi-key': 'e6ae2790femsha014232a0ee76ecp191e5cjsn0135b6488926',
              'x-rapidapi-host': 'hotels4.p.rapidapi.com',
            },
            cancelToken: getHotelsRequest.token,
          }
        )
        .then((response) => {
          const hotelsData = response.data.data.body.searchResults.results;
          setHotels(hotelsData);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setHotels(hotelsDataBase);
          setLoading(false);
        });
    }
    getHotels();
    return function cleanup() {
      // getHotelsRequest.cancel();
    };
  }, []);

  const interpolateColor = animatedValue.interpolate({
    inputRange: [0, 150],
    outputRange: ['#0099ff', '#e6f5ff'],
  });

  const animatedStyle = {
    backgroundColor: interpolateColor,
  };

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 150,
      duration: 1500,
    }).start();
  }, [animatedValue]);

  const filterNavigation = React.useCallback(
    (url) => {
      const { navigate } = navigation;
      const route = url.replace(/.*?:\/\//g, '');
      const routeName = route.split('/')[0];
      navigate(routeName.charAt(0).toUpperCase() + route.slice(1).toLowerCase());
    },
    [navigation]
  );

  React.useEffect(() => {
    async function getUrl() {
      if (Platform.OS === 'android') {
        Linking.getInitialURL().then((url) => {
          filterNavigation(url);
        });
      } else {
        Linking.addEventListener('url', (event) => {
          filterNavigation(event.url);
        });
      }
    }
    getUrl();
    return Linking.removeEventListener('url', (event) => {
      filterNavigation(event.url);
    });
  }, [filterNavigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.body, animatedStyle]}>
        <View style={styles.pageContent}>
          <Header />
          <TextInput
            style={inputStyle}
            placeholder="Find an hotel"
            onChangeText={(text) => {
              setSearch(text);
            }}
            value={searchValue}
          />
          <TouchableOpacity style={styles.mapLink} onPress={() => navigation.navigate('Map')}>
            <Text style={styles.mapText}>Or click here check our hotels map!</Text>
          </TouchableOpacity>
          <Button title={'Click to get an amazing discount!'} onPress={() => handleButtonPress()} />
          <View style={styles.hotelList}>
            <Loading isLoading={isLoading}>
              <FlatList
                data={hotels.filter((hotel) => {
                  return (
                    !searchValue ||
                    hotel.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                    hotel.address.locality.toLowerCase().includes(searchValue.toLowerCase())
                  );
                })}
                renderItem={({ item, index }) => (
                  <HotelItem
                    hotel={item}
                    index={index}
                    navigateToInfo={() =>
                      navigation.navigate('HotelInfo', {
                        hotel: item,
                      })
                    }
                  />
                )}
                keyExtractor={(item) => item.name + item.address}
                initialNumToRender={10}
                contentContainerStyle={styles.hotelScroll}
              />
            </Loading>
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}
