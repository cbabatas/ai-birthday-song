import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Preview');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.message}>We're crafting your song... 🎶</Text>
      <ActivityIndicator size="large" color="#7B61FF" style={styles.spinner} />
      <Text style={styles.subtext}>Mixing the beats, tuning the vocals...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  message: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  spinner: {
    marginVertical: 20,
  },
  subtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default LoadingScreen;
