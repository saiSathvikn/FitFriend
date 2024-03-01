import React, { useState, useCallback } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Constants from "expo-constants";
import { SafeAreaView } from "react-native-safe-area-context";

const API_KEY = Constants.expoConfig?.extra?.G_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

interface Answer {
  [key: string]: string;
}

const DietPlanner = () => {
  const [answers, setAnswers] = useState<Answer>({});
  const [generatedText, setGeneratedText] = useState("");
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (question: string, answer: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question]: answer,
    }));
  };

  const handleFocus = (inputName: string) => {
    setFocusedInput(inputName);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setGeneratedText("");
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Give a dietary plan for a ${
        answers.gender === "male" ? "man" : "woman"
      } who is ${answers.age} years old, ${answers.height} cm tall, weighs ${
        answers.weight
      } kg, and has the following health issues: ${
        answers.healthIssues
      } , no bold text`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      const formattedData = text.replace(/\*\*/g, "");
      setGeneratedText(formattedData);
    } catch (error) {
      console.error("Error generating content:", error);
      alert("An error occurred while generating content.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.formContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>Age:</Text>
          <TextInput
            style={[styles.input, focusedInput === "age" && styles.inputFocus]}
            placeholder="Enter your age"
            keyboardType="numeric"
            onFocus={() => handleFocus("age")}
            onBlur={handleBlur}
            onChangeText={(text) => handleInputChange("age", text)}
          />
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>Gender:</Text>
          <View style={styles.genderOptions}>
            <TouchableOpacity
              onPress={() => handleInputChange("gender", "male")}
              style={[
                styles.genderOption,
                answers.gender === "male" && styles.genderOptionSelected,
              ]}
            >
              {answers.gender === "male" && (
                <Ionicons name="checkmark" size={3} color="white" />
              )}
            </TouchableOpacity>
            <Text style={styles.genderOptionText}>Male</Text>
            <TouchableOpacity
              onPress={() => handleInputChange("gender", "female")}
              style={[
                styles.genderOption,
                answers.gender === "female" && styles.genderOptionSelected,
              ]}
            >
              {answers.gender === "female" && (
                <Ionicons name="checkmark" size={3} color="white" />
              )}
            </TouchableOpacity>
            <Text style={styles.genderOptionText}>Female</Text>
          </View>
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>Height (cm):</Text>
          <TextInput
            style={[
              styles.input,
              focusedInput === "height" && styles.inputFocus,
            ]}
            placeholder="Enter your height"
            keyboardType="numeric"
            onFocus={() => handleFocus("height")}
            onBlur={handleBlur}
            onChangeText={(text) => handleInputChange("height", text)}
          />
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>Weight (kg):</Text>
          <TextInput
            style={[
              styles.input,
              focusedInput === "weight" && styles.inputFocus,
            ]}
            placeholder="Enter your weight"
            keyboardType="numeric"
            onFocus={() => handleFocus("weight")}
            onBlur={handleBlur}
            onChangeText={(text) => handleInputChange("weight", text)}
          />
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>Health Issues:</Text>
          <TextInput
            style={[
              styles.input,
              focusedInput === "healthIssues" && styles.inputFocus,
            ]}
            placeholder="Enter any health issues (if any)"
            onFocus={() => handleFocus("healthIssues")}
            onBlur={handleBlur}
            onChangeText={(text) => handleInputChange("healthIssues", text)}
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Ionicons name="arrow-forward" size={32} color="white" />
        )}
      </TouchableOpacity>

      {generatedText ? (
        
        <ScrollView
          style={styles.generatedTextContainer}
          showsVerticalScrollIndicator={true}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#67B32B"]}
            />
          }
        >
          <Text style={styles.generatedText}>{generatedText}</Text>
        </ScrollView>
        
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
  },
  formContainer: {
    alignSelf: "center",
    justifyContent: "center",
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    marginBottom: 8,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginTop: 8,
    borderRadius: 10,
    width: "100%",
  },
  inputFocus: {
    borderColor: "#67B32B",
    borderWidth: 2,
  },
  genderOptions: {
    flexDirection: "row",
  },
  genderOption: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginRight: 8,
    borderRadius: 10,
  },
  genderOptionText: {
    fontWeight: "bold",
  },
  genderOptionSelected: {
    borderColor: "#67B32B",
    backgroundColor: "#67B32B",
  },
  submitButton: {
    backgroundColor: "#67B32B",
    padding: 20,
    borderRadius: 50,
    alignSelf: "center",
    position: "relative",
    bottom: 20,
    zIndex: -1,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  generatedTextContainer: {
    position: "absolute",
    zIndex: 1000,
    marginTop: 80,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 0,
    alignSelf: "center",
    maxHeight: 700,
  },
  generatedText: {
    fontSize: 16,
  },
});

export default DietPlanner;