import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";

interface CompletedTasks {
  [key: string]: boolean;
}

const Home = () => {
  const [markedDates, setMarkedDates] = useState({});
  const [completedTasks, setCompletedTasks] = useState<CompletedTasks>({
    exercise: false,
    water: false,
    eating: false,
    running: false,
    sleeping: false,
  });

  const markDateCompleted = (date: string) => {
    setMarkedDates((prevMarkedDates) => ({
      ...prevMarkedDates,
      [date]: { selected: true, marked: true, selectedColor: "#67B32B" },
    }));
  };

  const toggleTaskCompletion = (task: keyof CompletedTasks) => {
    setCompletedTasks((prevTasks) => ({
      ...prevTasks,
      [task]: !prevTasks[task],
    }));

    const allTasksCompleted = Object.values(completedTasks).every(
      (task) => task
    );
    if (allTasksCompleted) {
      const currentDate = new Date().toISOString().split("T")[0];
      markDateCompleted(currentDate);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image
            source={require("@/assets/images/logo.jpg")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>FitFriend</Text>
        </View>

        <View style={styles.mainSection}>
          <Text style={styles.welcomeText}>Welcome to FitFriend App</Text>
        </View>

        <View style={styles.calendarSection}>
          <Calendar
            markedDates={markedDates}
            onDayPress={(day: { dateString: string }) =>
              markDateCompleted(day.dateString)
            }
            theme={{
              calendarBackground: "#ffffff",
              selectedDayBackgroundColor: "#67B32B",
              selectedDayTextColor: "#ffffff",
            }}
          />
        </View>

        <View style={styles.tasksSection}>
          <Text style={styles.tasksTitle}>Daily Tasks</Text>
          <TouchableOpacity
            style={[
              styles.task,
              completedTasks.exercise && styles.completedTask,
            ]}
            onPress={() => toggleTaskCompletion("exercise")}
          >
            <Text style={styles.taskText}>Exercise</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.task, completedTasks.water && styles.completedTask]}
            onPress={() => toggleTaskCompletion("water")}
          >
            <Text style={styles.taskText}>Drink Water</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.task, completedTasks.eating && styles.completedTask]}
            onPress={() => toggleTaskCompletion("eating")}
          >
            <Text style={styles.taskText}>Healthy Eating</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.task,
              completedTasks.running && styles.completedTask,
            ]}
            onPress={() => toggleTaskCompletion("running")}
          >
            <Text style={styles.taskText}>Running</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.task,
              completedTasks.sleeping && styles.completedTask,
            ]}
            onPress={() => toggleTaskCompletion("sleeping")}
          >
            <Text style={styles.taskText}>Good Sleep</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "center",
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    color: "green",
  },
  mainSection: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  calendarSection: {
    marginBottom: 20,
  },
  featuresSection: {
    marginBottom: 20,
  },
  feature: {
    fontSize: 16,
    marginBottom: 10,
  },
  illustrationsSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  illustration: {
    width: "80%",
    height: 200,
  },
  benefitsSection: {
    marginBottom: 20,
  },
  benefit: {
    fontSize: 16,
    marginBottom: 10,
  },
  tasksSection: {
    marginBottom: 20,
  },
  tasksTitle: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 10,
  },
  task: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  taskText: {
    alignSelf: "center",
    fontSize: 16,
  },
  completedTask: {
    backgroundColor: "#67B32B",
    borderColor: "#67B32B",
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});

export default Home;