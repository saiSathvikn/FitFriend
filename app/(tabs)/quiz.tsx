import MCQComponent from '@/components/MCQComponent';
import TopicSelectionComponent from '@/components/TopicSelectionComponent\'';
import React, { useState } from 'react';
import { View } from 'react-native';

const App: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const handleSelectTopic = (topic: string) => {
    setSelectedTopic(topic);
  };

  const handleResetTopic = () => {
    setSelectedTopic(null);
  };

  return (
    <View style={{ flex: 1 }}>
      {selectedTopic ? (
        <MCQComponent topic={selectedTopic} onResetTopic={handleResetTopic} />
      ) : (
        <TopicSelectionComponent onSelectTopic={handleSelectTopic} />
      )}
    </View>
  );
};

export default App;
