import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const relations = [
  { label: 'Family', emoji: '🏠' },
  { label: 'Partner', emoji: '❤️' },
  { label: 'Friend', emoji: '🎉' },
  { label: 'Work', emoji: '💼' },
  { label: 'Other', emoji: '✨' },
];

const traitsList = ['Kind', 'Funny', 'Smart', 'Creative', 'Caring'];

const InputScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [selectedRelation, setSelectedRelation] = useState('');
  const [traits, setTraits] = useState([]);
  const [message, setMessage] = useState('');

  const toggleTrait = (trait) => {
    setTraits((prev) =>
      prev.includes(trait) ? prev.filter((t) => t !== trait) : [...prev, trait]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Who is this song for?</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter their name"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Relation</Text>
      <View style={styles.row}>
        {relations.map((r) => (
          <TouchableOpacity
            key={r.label}
            style={[styles.relationBtn, selectedRelation === r.label && styles.relationSelected]}
            onPress={() => setSelectedRelation(r.label)}
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
      />
      <TouchableOpacity
        style={styles.nextBtn}
        onPress={() => navigation.navigate('Style')}
        disabled={!name || !selectedRelation || traits.length < 2}
      >
        <Text style={styles.nextText}>Next: Pick a Style</Text>
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
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    fontWeight: '600',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  relationBtn: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
    minWidth: 70,
    marginBottom: 10,
  },
  relationSelected: {
    backgroundColor: '#7B61FF',
  },
  relationText: {
    fontSize: 14,
    color: '#333',
  },
  traitBtn: {
    backgroundColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  traitSelected: {
    backgroundColor: '#7B61FF',
  },
  traitText: {
    color: '#333',
  },
  nextBtn: {
    backgroundColor: '#7B61FF',
    padding: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default InputScreen;
