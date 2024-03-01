import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Constants from "expo-constants";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = Constants.expoConfig?.extra?.G_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

interface MCQProps {
    topic: string;
    onResetTopic: () => void;
  }
  
  const MCQComponent: React.FC<MCQProps> = ({ topic, onResetTopic }) => {
    const [question, setQuestion] = useState<string>("");
    const [options, setOptions] = useState<string[]>([]);
    const [correctOption, setCorrectOption] = useState<number>(-1);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  
    useEffect(() => {
      const fetchQuestionAndOptions = async () => {
        try {
          const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
          // Fetch a question
          const questionPrompt = `Generate a question for topic: ${topic}`;
          const questionResult = await model.generateContent(questionPrompt);
          const questionResponse = await questionResult.response;
          const questionText = await questionResponse.text();
  
          setQuestion(questionText);
  
          // Fetch options for the question
          const optionsPrompt = `Generate only 4 mcq where only one option is correct option for the question: ${questionText} important : only 4 options where one option is correct and remaining 3 are wrong and no numbers or special characters, no bold, no points, just comma seperated options`;
          const optionsResult = await model.generateContent(optionsPrompt);
          const optionsResponse = await optionsResult.response;
          const optionsText = await optionsResponse.text();
          
          const optionsArray = optionsText.split(","); // Split options by space
          const foptionsArray = [optionsArray[0],optionsArray[1],optionsArray[2],optionsArray[3]]
  
          setOptions(foptionsArray);

          const correctOptionsPrompt = `for the question: ${questionText} and options: ${foptionsArray} give only one correct option, important : give only one correct option index, no special characters, or no explanation `;
          const correctOptionsResult = await model.generateContent(optionsPrompt);
          const correctOptionsResponse = await optionsResult.response;
          const correctOptionsText = await optionsResponse.text();  
          console.log(correctOptionsText);
          setCorrectOption(Number(correctOptionsText)); // Randomly set correct option index
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchQuestionAndOptions();
  
      return () => {
        
      };
    }, [topic]);
  
    const onSelectOption = (index: number) => {
        setSelectedOptionIndex(index);
      };
    
      const reloadOptions = () => {
        onResetTopic();
      };

      const clearOptions = () => {
        setSelectedOptionIndex(null);
      };
    
      return (
        <View style={styles.container}>
          <TouchableOpacity onPress={reloadOptions} style={styles.newQuizButton}>
            <Text style={styles.newQuizButtonText}>New Quiz</Text>
          </TouchableOpacity>
          <Text style={styles.text}>{question}</Text>
          {options.map((option, index) => {
            let optionStyle: React.CSSProperties = styles.optionButton;
            if (selectedOptionIndex !== null) {
              if (index === correctOption) {
                optionStyle = {...styles.optionButton, backgroundColor: '#4CAF50' };
              } else if (index === selectedOptionIndex) {
                optionStyle = {...styles.optionButton, backgroundColor: '#4CAF50' };
              }
            }
            return (
              <TouchableOpacity
                key={index}
                onPress={() => onSelectOption(index)}
                style={optionStyle}
              >
                <Text style={{ color: 'black', fontSize: 18, textAlign: 'center' }}>
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
          {selectedOptionIndex !== null && (
            <TouchableOpacity onPress={clearOptions} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>Clear Selection</Text>
            </TouchableOpacity>
          )}
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
      optionButton: {
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        width: '80%',
        backgroundColor: '#DDD',
      },
      newQuizButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
      },
      newQuizButtonText: {
        fontSize: 18,
        color: 'white',
      },
      clearButton: {
        marginTop: 20,
        backgroundColor: '#FF0000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
      },
      clearButtonText: {
        fontSize: 16,
        color: 'white',
      },
    });
    
    export default MCQComponent;