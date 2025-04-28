import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

const PreviewScreen = () => {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
      { shouldPlay: true }
    );
    setSound(sound);
    setIsPlaying(true);
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) setIsPlaying(false);
    });
    await sound.playAsync();
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setIsPlaying(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎵 Happy Birthday Elif!</Text>
      <Text style={styles.subtitle}>Here’s your personalized birthday song 🎉</Text>
      <TouchableOpacity style={styles.button} onPress={isPlaying ? stopSound : playSound}>
        <Text style={styles.buttonText}>{isPlaying ? '⏹ Stop' : '▶️ Play'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryBtn}>
        <Text style={styles.secondaryText}>🔁 Replay</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryBtn}>
        <Text style={styles.secondaryText}>📥 Download</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryBtn}>
        <Text style={styles.secondaryText}>📤 Share</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#7B61FF',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  secondaryBtn: {
    marginTop: 10,
  },
  secondaryText: {
    fontSize: 16,
    color: '#7B61FF',
  },
});

export default PreviewScreen;
