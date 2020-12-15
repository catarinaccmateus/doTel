import React from 'react';
import { StyleSheet, View, PermissionsAndroid, Platform } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { mapStyle } from '~/utils/constants';
import Geolocation from 'react-native-geolocation-service';

export default function Map() {
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
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
}
