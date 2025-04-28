import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const stylesData = [
  { label: 'Party Pop', emoji: '🎶' },
  { label: 'Romantic Ballad', emoji: '💖' },
  { label: 'Funny Rap', emoji: '🎤' },
  { label: 'Emotional Piano', emoji: '🎹' },
  { label: 'Upbeat EDM', emoji: '🎧' },
];

const StyleScreen = ({ navigation }) => {
  const [selectedStyle, setSelectedStyle] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Choose a vibe for your song</Text>
      <View style={styles.styleGrid}>
        {stylesData.map((style) => (
          <TouchableOpacity
            key={style.label}
            style={[styles.styleBtn, selectedStyle === style.label && styles.styleSelected]}
            onPress={() => setSelectedStyle(style.label)}
          >
            <Text style={styles.emoji}>{style.emoji}</Text>
            <Text style={styles.styleLabel}>{style.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={[styles.nextBtn, !selectedStyle && styles.disabledBtn]}
        onPress={() => navigation.navigate('Loading')}
        disabled={!selectedStyle}
      >
        <Text style={styles.nextText}>Generate My Song</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  styleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  styleBtn: {
    backgroundColor: '#eee',
    borderRadius: 16,
    padding: 20,
    width: '48%',
    alignItems: 'center',
    marginBottom: 10,
  },
  styleSelected: {
    backgroundColor: '#7B61FF',
  },
  emoji: {
    fontSize: 28,
    marginBottom: 10,
  },
  styleLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  nextBtn: {
    backgroundColor: '#7B61FF',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  disabledBtn: {
    backgroundColor: '#ccc',
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default StyleScreen;
