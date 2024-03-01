import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { defaultStyles } from "@/constants/Styles";

const Page = () => {
  const [firstName, setFirstName] = useState("Dev Sai");
  const [lastName, setLastName] = useState("Dheeraj");
  const [email, setEmail] = useState("devsaidheeraj@gmail.com");
  const [edit, setEdit] = useState(false);

  return (
    <SafeAreaView style={defaultStyles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Profile</Text>
        <Ionicons name="notifications-outline" size={26} />
      </View>

      <View style={styles.card}>
        <TouchableOpacity>
          <Image source={require('@/img.png')} style={styles.avatar} />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", gap: 6 }}>
          <View style={styles.editRow}>
            <Text style={{ fontSize: 22 }}>
              {firstName} {lastName}
            </Text>
            <TouchableOpacity onPress={() => setEdit(true)}>
              <Ionicons name="create-outline" size={24} color={Colors.dark} />
            </TouchableOpacity>
          </View>

          
        </View>
        <Text>{email}</Text>
        <Text></Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 24,
  },
  header: {
    fontSize: 24,
  },
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 24,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    alignItems: "center",
    gap: 14,
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  editRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});

export default Page;
