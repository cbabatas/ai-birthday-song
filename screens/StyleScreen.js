import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Platform, StatusBar } from 'react-native';

const vibeTagMap = {
  "Party Pop 🎉": ["pop", "party", "happy", "dance pop", "uplifting"],
  "Romantic Ballad ❤️": ["pop", "melodic", "love", "ballad", "acoustic"],
  "Funny Rap 😂": ["rap", "funny", "boom bap", "party", "boastful"],
  "WU Emotional Piano🎹": ["piano", "emotional", "melodic", "ballad", "ambient"],
  "Upbeat EDM 💃": ["electronic", "edm", "dance", "party", "energetic"]
};

const StyleScreen = ({ route, navigation }) => {
  const { tags = [], name, relation, traits, message } = route.params || {};
  const [selectedStyle, setSelectedStyle] = useState('');
  const [recommendedVibes, setRecommendedVibes] = useState([]);

  useEffect(() => {
    // Calculate matching scores for each vibe based on tags
    const vibeScores = Object.entries(vibeTagMap).map(([vibeName, vibeTags]) => {
      const matchingTags = vibeTags.filter(tag => tags.includes(tag));
      return {
        name: vibeName,
        score: matchingTags.length,
        emoji: vibeName.split(' ').pop() // Get the emoji from the vibe name
      };
    });

    // Sort vibes by matching score (highest first)
    const sortedVibes = vibeScores
      .sort((a, b) => b.score - a.score)
      .filter(vibe => vibe.score > 0); // Only include vibes with matching tags

    setRecommendedVibes(sortedVibes);
  }, [tags]);

  const handleNext = () => {
    const selectedVibeTags = vibeTagMap[selectedStyle] || [];
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
        
        {recommendedVibes.length > 0 && (
          <Text style={styles.recommendedText}>Recommended vibes based on your choices:</Text>
        )}
        
        <View style={styles.styleGrid}>
          {recommendedVibes.map((vibe) => (
            <TouchableOpacity
              key={vibe.name}
              style={[
                styles.styleBtn,
                selectedStyle === vibe.name && styles.styleSelected,
                { opacity: vibe.score > 0 ? 1 : 0.5 }
              ]}
              onPress={() => setSelectedStyle(vibe.name)}
              accessibilityLabel={`Select ${vibe.name}`}
            >
              <Text style={styles.emoji}>{vibe.emoji}</Text>
              <Text style={styles.styleLabel}>{vibe.name.split(' ').slice(0, -1).join(' ')}</Text>
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
  recommendedText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
    color: '#666',
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
    backgroundColor: '#7B61FF20',
    borderColor: '#7B61FF',
    borderWidth: 2,
  },
  emoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  styleLabel: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  nextBtn: {
    backgroundColor: '#7B61FF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 'auto',
  },
  nextText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  disabledBtn: {
    opacity: 0.5,
  },
});

export default StyleScreen;