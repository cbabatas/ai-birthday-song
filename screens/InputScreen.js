import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Platform, StatusBar } from 'react-native';

const relationTagMap = {
  Friend: ["funny", "party", "pop"],
  Partner: ["romantic", "love", "emotional", "warm"],
  Family: ["emotional", "ballad", "warm"],
  Child: ["children", "happy", "playful"]
};

const traitTagMap = {
  Cheerful: ["happy", "party"],
  Calm: ["acoustic", "ambient"],
  Energetic: ["dance", "party"],
  Funny: ["funny", "humorous"],
  Emotional: ["emotional", "warm", "ballad"],
  Creative: ["experimental", "quirky"]
};

const relations = [
  { label: 'Family', emoji: '🏠' },
  { label: 'Partner', emoji: '❤️' },
  { label: 'Friend', emoji: '🎉' },
  { label: 'Child', emoji: '👶' },
];

const traitsList = ['Cheerful', 'Funny', 'Calm', 'Creative', 'Energetic', 'Emotional'];

const InputScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [selectedRelation, setSelectedRelation] = useState('');
  const [traits, setTraits] = useState([]);
  const [message, setMessage] = useState('');

  const getCombinedTags = () => {
    const relationTags = selectedRelation ? relationTagMap[selectedRelation] : [];
    const traitTags = traits.flatMap(trait => traitTagMap[trait]);
    return [...new Set([...relationTags, ...traitTags])];
  };

  const handleNext = () => {
    const combinedTags = getCombinedTags();
    navigation.navigate('Style', {
      name,
      relation: selectedRelation,
      traits,
      message,
      tags: combinedTags
    });
  };

  const toggleTrait = (trait) => {
    setTraits((prev) =>
      prev.includes(trait) ? prev.filter((t) => t !== trait) : [...prev, trait]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Who is this song for?</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter their name"
          value={name}
          onChangeText={setName}
          accessibilityLabel="Name input"
        />
        <Text style={styles.label}>Relation</Text>
        <View style={styles.row}>
          {relations.map((r) => (
            <TouchableOpacity
              key={r.label}
              style={[styles.relationBtn, selectedRelation === r.label && styles.relationSelected]}
              onPress={() => setSelectedRelation(r.label)}
              accessibilityLabel={`Select relation: ${r.label}`}
            >
              <Text style={styles.relationText}>{r.emoji}</Text>
              <Text style={styles.relationText}>{r.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.label}>Pick 2–3 Traits</Text>
        <View style={styles.row}>
          {traitsList.map((trait) => (
            <TouchableOpacity
              key={trait}
              style={[styles.traitBtn, traits.includes(trait) && styles.traitSelected]}
              onPress={() => toggleTrait(trait)}
              accessibilityLabel={`Toggle trait: ${trait}`}
            >
              <Text style={styles.traitText}>{trait}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Optional message"
          value={message}
          onChangeText={setMessage}
          accessibilityLabel="Optional message input"
        />
        <TouchableOpacity
          style={[styles.nextBtn, (!name || !selectedRelation || traits.length < 2) && styles.disabledBtn]}
          onPress={handleNext}
          disabled={!name || !selectedRelation || traits.length < 2}
          accessibilityLabel="Next: Pick a Style"
        >
          <Text style={styles.nextText}>Next: Pick a Style</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // ... existing styles remain unchanged ...
});

export default InputScreen;