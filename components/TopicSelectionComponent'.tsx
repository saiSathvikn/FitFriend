import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface TopicSelectionProps {
  onSelectTopic: (topic: string) => void;
}

const TopicSelectionComponent: React.FC<TopicSelectionProps> = ({ onSelectTopic }) => {
  const [topic, setTopic] = useState('');

  const handleSelectTopic = () => {
    if (topic.trim() !== '') {
      onSelectTopic(topic.trim());
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enter a topic:</Text>
      <TextInput
        style={styles.input}
        value={topic}
        onChangeText={setTopic}
        placeholder="Type your topic here"
        placeholderTextColor="#777"
      />
      <TouchableOpacity onPress={handleSelectTopic} style={styles.selectButton}>
        <Text style={styles.selectButtonText}>Select</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 10,
    fontSize: 18,
    color: '#000',
  },
  selectButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  selectButtonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default TopicSelectionComponent;
