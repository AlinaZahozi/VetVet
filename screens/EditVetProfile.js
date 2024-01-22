import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { COLORS, FONTS } from "../constants";
import { MaterialIcons } from "@expo/vector-icons";
import { imagesDataURL } from "../constants/data";

const EditVetProfile = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(imagesDataURL[0]);
  const [profileData, setProfileData] = useState({
    name: "Dr.Sarah Smith",
    specialization: "Veterinarian, Animal care",
    country: "Israel",
    city: "Hadera",
    phoneNumber: "053-4324453",
    about: "Dr. Sarah Smith is a compassionate and dedicated veterinarian...",
    email: "alinush0zahozi@gmail.com",
    password: "randompassword",
  });

  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const updateField = (field, value) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const renderTextInput = (field, label) => (
    <View style={styles.inputContainer}>
      <Text style={FONTS.h4}>{label}</Text>
      <TextInput
        value={profileData[field]}
        onChangeText={(value) => updateField(field, value)}
        editable={true}
        style={styles.textInput}
        secureTextEntry={field === "password"}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="keyboard-arrow-left" size={30} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={FONTS.h3}>Edit Profile</Text>
      </View>

      <ScrollView>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={handleImageSelection}>
            <Image source={{ uri: selectedImage }} style={styles.profileImage} />
            <View style={styles.cameraIcon}>
              <MaterialIcons name="photo-camera" size={32} color={COLORS.primary} />
            </View>
          </TouchableOpacity>
        </View>

        <View>
          {renderTextInput("name", "Name")}
          {renderTextInput("specialization", "Specialization")}
          {renderTextInput("country", "Country")}
          {renderTextInput("city", "City")}
          {renderTextInput("phoneNumber", "Phone Number")}
          {renderTextInput("about", "About")}
          {renderTextInput("email", "Email")}
          {renderTextInput("password", "Password")}
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Change</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 22,
  },
  header: {
    marginHorizontal: 12,
    flexDirection: "row",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    left: 0,
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 22,
  },
  profileImage: {
    height: 170,
    width: 170,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 10,
    zIndex: 9999,
  },
  inputContainer: {
    flexDirection: "column",
    marginBottom: 6,
  },
  textInput: {
    height: 44,
    width: "100%",
    borderColor: COLORS.secondaryGray,
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 6,
    justifyContent: "center",
    paddingLeft: 8,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    height: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    ...FONTS.body3,
    color: COLORS.white,
  },
  container: {
    flex: 1,
  },
});

export default EditVetProfile;
