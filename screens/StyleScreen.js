import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Platform, StatusBar } from 'react-native';

const vibeTagMap = {
  "Party Pop": {
    emoji: "🎶",
    tags: ["pop", "party", "happy", "dance pop", "uplifting"]
  },
  "Romantic Ballad": {
    emoji: "💖",
    tags: ["pop", "melodic", "love", "ballad", "acoustic"]
  },
  "Funny Rap": {
    emoji: "🎤",
    tags: ["rap", "funny", "boom bap", "party", "boastful"]
  },
  "Emotional Piano": {
    emoji: "🎹",
    tags: ["piano", "emotional", "melodic", "ballad", "ambient"]
  },
  "Upbeat EDM": {
    emoji: "🎧",
    tags: ["electronic", "edm", "dance", "party", "energetic"]
  }
};

const StyleScreen = ({ route, navigation }) => {
  const { tags = [], name, relation, traits, message } = route.params || {};
  const [selectedStyle, setSelectedStyle] = useState('');
  const [vibeScores, setVibeScores] = useState([]);

  useEffect(() => {
    // Calculate matching scores for each vibe based on tags
    const scores = Object.entries(vibeTagMap).map(([vibeName, vibe]) => {
      const matchingTags = vibe.tags.filter(tag => tags.includes(tag));
      return {
        label: vibeName,
        emoji: vibe.emoji,
        score: matchingTags.length
      };
    }).sort((a, b) => b.score - a.score); // Sort by score but keep all vibes

    setVibeScores(scores);
  }, [tags]);

  const handleNext = () => {
    const selectedVibeTags = vibeTagMap[selectedStyle]?.tags || [];
    const combinedTags = [...new Set([...tags, ...selectedVibeTags])];
    
    navigation.navigate('Loading', {
      name,
      relation,
      traits,
      message,
      selectedVibe: selectedStyle,
      tags: selectedVibeTags,
      combinedTags
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.headerRow}>
          <TouchableOpacity
            accessibilityLabel="Go back"
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Text style={styles.backText}>{'<'} </Text>
          </TouchableOpacity>
          <Text style={styles.title}>Choose a vibe for your song</Text>
        </View>
        <View style={styles.styleGrid}>
          {vibeScores.map((style, index) => (
            <TouchableOpacity
              key={style.label}
              style={[
                styles.styleBtn,
                selectedStyle === style.label && styles.styleSelected,
                index === 0 && style.score > 0 && styles.recommended
              ]}
              onPress={() => setSelectedStyle(style.label)}
              accessibilityLabel={`Select ${style.label}`}
            >
              <Text style={[styles.emoji, selectedStyle === style.label && styles.textSelected]}>{style.emoji}</Text>
              <Text style={[styles.styleLabel, selectedStyle === style.label && styles.textSelected]}>{style.label}</Text>
              {index === 0 && style.score > 0 && <Text style={styles.recommendedText}>Recommended</Text>}
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={[styles.nextBtn, !selectedStyle && styles.disabledBtn]}
          onPress={handleNext}
          disabled={!selectedStyle}
          accessibilityLabel="Generate My Song"
        >
          <Text style={styles.nextText}>Generate My Song</Text>
        </TouchableOpacity>
        <View style={styles.outputPlaceholder}>
          <Text style={styles.placeholderText}>Your generated song will appear here!</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backBtn: {
    marginRight: 10,
    padding: 8,
  },
  backText: {
    fontSize: 22,
    color: '#7B61FF',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
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
  recommended: {
    borderColor: '#7B61FF',
    borderWidth: 1,
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
  textSelected: {
    color: '#fff',
  },
  recommendedText: {
    fontSize: 12,
    color: '#7B61FF',
    marginTop: 4,
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
  outputPlaceholder: {
    marginTop: 24,
    alignItems: 'center',
  },
  placeholderText: {
    color: '#aaa',
    fontSize: 15,
  },
});

export default StyleScreen;
