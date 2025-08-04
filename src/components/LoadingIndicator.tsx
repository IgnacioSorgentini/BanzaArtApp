import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

interface LoadingIndicatorProps {
  size?: "small" | "large";
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ size = "large" }) => (
  <View style={styles.loaderContainer}>
    <ActivityIndicator size={size} color="#b50938" />
  </View>
);

const styles = StyleSheet.create({
  loaderContainer: {
    backgroundColor: '#FFF9C4',
    flex: 1,
    minHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingIndicator;