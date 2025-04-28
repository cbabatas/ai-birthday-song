import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/IMG_logo_%282017%29.svg' }}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.headline}>Make Someone's Birthday Extra Special</Text>
      <View style={styles.emojiRow}>
        <Text style={styles.emoji}>🎂</Text>
        <Text style={styles.emoji}>🥳</Text>
        <Text style={styles.emoji}>🎁</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Input')}>
        <Text style={styles.buttonText}>Start Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  headline: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  emojiRow: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  emoji: {
    fontSize: 28,
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: '#7B61FF',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default WelcomeScreen;
