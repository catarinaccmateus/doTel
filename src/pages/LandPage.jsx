import React, { useState } from 'react';
import axios from 'axios';
import { SafeAreaView, View, TextInput, Platform, FlatList, Animated } from 'react-native';

import Header from 'components/Header';
import HotelItem from 'components/HotelItem';
import Loading from 'components/Loading';
import { styles } from 'styles/app';

export default function LandPage({ navigation }) {
  const [searchValue, setSearch] = useState('');
  const [hotels, setHotels] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  const inputStyle = Platform.select({
    ios: styles.inputiOS,
    android: styles.input,
  });

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
          setHotels([
            {
              name: 'Test Hotel',
              starRating: 5,
              address: { streetAddress: 'Av. Liberdade 55', locality: 'Lisbon' },
              thumbnailUrl:
                'https://www.nit.pt/wp-content/uploads/2020/09/242c401eb39e01093c52bcbfa8e7dd05-754x394.jpg',
            },
          ]);
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

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.body, animatedStyle]}>
        <View style={{ flex: 1, margin: 30 }}>
          <Header />
          <TextInput
            style={inputStyle}
            placeholder="Find an hotel"
            onChangeText={(text) => {
              setSearch(text);
            }}
            value={searchValue}
          />
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
