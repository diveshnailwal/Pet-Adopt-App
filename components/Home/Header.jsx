import { View, Text, Image } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';

export default function Header() {
  const { user } = useUser();
  const profileImage = user?.imageUrl;

  console.log("User Image URL:", user?.imageUrl); 

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>Welcome,</Text>
        <Text style={styles.userName}>{user?.fullName || "Guest"}</Text>
      </View>
      <Image 
        source={{ uri: profileImage }}
        style={styles.profileImage}
        resizeMode="cover" // Ensures proper image display
        onError={(e) => console.error("Image Load Error:", e.nativeEvent.error)}
      />
    </View>
  );
}

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -30,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  textContainer: {
    flex: 1, 
  },
  welcomeText: {
    fontFamily: "Outfit",
    fontSize: 18,
    color: '#333',
  },
  userName: {
    fontFamily: "Outfit",
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginTop: 5,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f0f0f0", // Ensures visibility if image fails to load
  },
};
