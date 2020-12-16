import React from 'react';
import { StyleSheet, View, PermissionsAndroid, Platform, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { mapStyle } from '~/utils/constants';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/FontAwesome';
import { hotelsDataBase } from '~/utils/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Map({ navigation }) {
  const [userLocation, setUserLocation] = React.useState({ latitude: 0, longitude: 0 });
  const requestAndroidCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION, {
        title: 'Permission to access your Location',
        message: 'DoTel App needs access to your location ' + 'so we can help you to find hotels nearby.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        return true;
      } else {
        console.log('Location permission denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  React.useEffect(() => {
    async function getUserLocation() {
      let hasLocationPermission = true;
      if (Platform.OS === 'android') {
        hasLocationPermission = await requestAndroidCameraPermission();
      } else {
        const result = await Geolocation.requestAuthorization('always');
        hasLocationPermission = result === 'granted' ? true : false;
      }
      if (hasLocationPermission) {
        console.log('loading...');
        Geolocation.getCurrentPosition(
          (position) => {
            console.log('position', position);
            setUserLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
          },
          (error) => {
            // See error code charts below.
            console.log('error', error);
          },
          {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 10000,
            showLocationDialog: true,
            forceRequestLocation: true,
          }
        );
      }
    }
    getUserLocation();
  }, []);
  return (
    <View style={StyleSheet.absoluteFillObject}>
      <MapView
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        region={{
          ...userLocation,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        rotateEnabled={false}
      >
        <Marker coordinate={userLocation}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Icon name="user" color="#80e5ff" size={30} />
            <Text style={{ backgroundColor: 'white', padding: 1 }}>You are here!</Text>
          </View>
        </Marker>
        {hotelsDataBase.map((hotel, index) => (
          <Marker
            key={index}
            coordinate={hotel.latlng}
            onCalloutPress={() =>
              navigation.navigate('HotelInfo', {
                hotel: hotel,
              })
            }
            pinColor="#80e5ff"
          >
            <Callout
              onPress={() =>
                navigation.navigate('HotelInfo', {
                  hotel: hotel,
                })
              }
              style={{ width: 200, height: 50 }}
              tooltip={true}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#80e5ff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: 0,
                  padding: 0,
                  elevation: 5,
                }}
              >
                <Text>{hotel.name}</Text>
                <Text>{hotel.price}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}
