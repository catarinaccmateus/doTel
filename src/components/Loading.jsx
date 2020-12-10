import React from 'react';
import { styles } from 'styles/app';
import { ActivityIndicator } from 'react-native';

const Loading = ({ isLoading, children }) => {
  return isLoading ? (
    <ActivityIndicator size="large" color={'#000066'} style={styles.loader} />
  ) : children ? (
    children
  ) : (
    <React.Fragment />
  );
};

export default Loading;
