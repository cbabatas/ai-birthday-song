import React, { useState, useRef } from 'react';
import RNPickerSelect from 'react-native-picker-select';
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

const vocalists = [
  { label: 'Male', emoji: '👨' },
  { label: 'Female', emoji: '👩' },
  { label: 'Random', emoji: '🎲' },
];

const languages = [
  { label: 'English' },
  { label: 'Turkish' },
  { label: 'Spanish' },
  { label: 'German' },
  { label: 'French' },
];

const traitsList = ['Cheerful', 'Funny', 'Calm', 'Creative', 'Energetic', 'Emotional'];

const InputScreen = ({ navigation }) => {
  const pickerRef = useRef();
  const [name, setName] = useState('');
  const [selectedRelation, setSelectedRelation] = useState('');
  const [traits, setTraits] = useState([]);
  const [message, setMessage] = useState('');
  const [vocalist, setVocalist] = useState('Random');
  const [language, setLanguage] = useState('English');

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
      tags: combinedTags,
      vocalist,
      language
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
              <Text style={[styles.relationText, selectedRelation === r.label && styles.relationTextSelected]}>{r.emoji}</Text>
              <Text style={[styles.relationText, selectedRelation === r.label && styles.relationTextSelected]}>{r.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.label}>Choose Vocalist</Text>
        <View style={styles.row}>
          {vocalists.map((v) => (
            <TouchableOpacity
              key={v.label}
              style={[styles.relationBtn, vocalist === v.label && styles.relationSelected]}
              onPress={() => setVocalist(v.label)}
              accessibilityLabel={`Select vocalist: ${v.label}`}
            >
              <Text style={[styles.relationText, vocalist === v.label && styles.relationTextSelected]}>{v.emoji}</Text>
              <Text style={[styles.relationText, vocalist === v.label && styles.relationTextSelected]}>{v.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.label}>Song Language</Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            ref={pickerRef}
            onValueChange={(value) => setLanguage(value)}
            value={language}
            placeholder={{
              label: 'Select a language',
              value: null,
              color: '#9EA0A4',
            }}
            items={languages.map((lang) => ({
              label: `${lang.label}`,
              value: lang.label,
              key: lang.label,
            }))}
            useNativeAndroidPickerStyle={false}
            style={{
              inputIOS: {
                fontSize: 16,
                paddingVertical: 14,
                paddingHorizontal: 20,
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 25,
                color: '#333',
                backgroundColor: '#fff',
                width: '100%',
              },
              inputAndroid: {
                fontSize: 16,
                paddingVertical: 14,
                paddingHorizontal: 20,
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 25,
                color: '#333',
                backgroundColor: '#fff',
                width: '100%',
              },
              iconContainer: {
                top: 15,
                right: 15,
              },
              modalViewMiddle: {
                backgroundColor: '#f8f8f8',
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: '#dedede',
                padding: 12,
              },
              modalViewBottom: {
                backgroundColor: '#ffffff',
                height: 230,
              },
              done: {
                color: '#007AFF',
                fontSize: 17,
              },
              modalTitle: {
                fontSize: 17,
                fontWeight: '500',
              },
            }}
            doneText="Done"
            textInputProps={{
              style: {
                textAlign: 'left',
              }
            }}
            Icon={() => (
              <Text style={{
                fontSize: 16,
                color: '#666',
                position: 'absolute',
                right: 15,
                top: 15,
              }}>▾</Text>
            )}
          />
        </View>
        <Text style={styles.label}>Pick Traits</Text>
        <View style={styles.row}>
          {traitsList.map((trait) => (
            <TouchableOpacity
              key={trait}
              style={[styles.traitBtn, traits.includes(trait) && styles.traitSelected]}
              onPress={() => toggleTrait(trait)}
              accessibilityLabel={`Toggle trait: ${trait}`}
            >
              <Text style={[styles.traitText, traits.includes(trait) && styles.traitTextSelected]}>{trait}</Text>
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
          style={[styles.nextBtn, (!name || !selectedRelation || traits.length < 2 || vocalist === '' || language === '') && styles.disabledBtn]}
          onPress={handleNext}
          disabled={!name || !selectedRelation || traits.length < 2 || vocalist === '' || language === ''}
          accessibilityLabel="Next: Pick a Style"
        >
          <Text style={styles.nextText}>Next: Pick a Style</Text>
        </TouchableOpacity>
        <View style={styles.outputPlaceholder}>
          <Text style={styles.placeholderText}>Fill out the info above to continue.</Text>
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
  relationTextSelected: {
    color: '#fff',
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
  traitTextSelected: {
    color: '#fff',
  },
  nextBtn: {
    backgroundColor: '#7B61FF',
    padding: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  disabledBtn: {
    backgroundColor: '#ccc',
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
  },
  outputPlaceholder: {
    marginTop: 24,
    alignItems: 'center',
  },
  placeholderText: {
    color: '#aaa',
    fontSize: 15,
  },
  pickerContainer: {
    borderRadius: 25,
    marginBottom: 20,
    backgroundColor: '#fff',
    width: '100%',
  },
  picker: {
    fontSize: 16,
    height: 50,
    paddingLeft: 20,
    paddingRight: 40,
    backgroundColor: 'transparent',
  },
  pickerIcon: {
    fontSize: 16,
    color: '#666',
    position: 'absolute',
  },
});

export default InputScreen;