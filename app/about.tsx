import { Entypo } from '@expo/vector-icons';
import { Text, View, StyleSheet, Image, TouchableOpacity, Vibration, ToastAndroid, Platform, Alert } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Linking from 'expo-linking';


export default function AboutScreen() {

  const handleLongPress = () => {
    Vibration.vibrate(50);
    Linking.openURL('https://www.agurudarshan.tech/');
  }


  const handleOnPress = ()=>{
    Vibration.vibrate(5);
    if(Platform.OS === "android")
    {
      // Alert.alert("Tip","Long press and see the magic🪄");

      ToastAndroid.show("Long press and see the magic🪄", ToastAndroid.SHORT);
    }
    else
    {
      Alert.alert("😉","Long press and see the magic🪄");
    }
  }

  const handlePress = (platform:string) => {
    switch (platform) {
      case 'github':
        Vibration.vibrate(10);
        Linking.openURL('https://github.com/DarshanAguru');
        break;
      case 'linkedin':
        Vibration.vibrate(10);
        Linking.openURL('https://www.linkedin.com/in/this-darshiii/');
        break;
      case 'instagram':
        Vibration.vibrate(10);
        Linking.openURL('https://www.instagram.com/this.darshiii/');
        break;
      default:
        break;
    }
  }
  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={{margin: 0}}>
        <View style={styles.bgCircle}>
        <TouchableOpacity onPress={handleOnPress} onLongPress={handleLongPress}>  
        <Image source={require('@/assets/images/aboutME.png')} style={styles.circle} resizeMode='cover' />
        </TouchableOpacity>
        </View>
      </GestureHandlerRootView>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
            Hi! I'm A. Darshan 👋, a developer who loves building cool stuff 💻 that actually solves real problems.
            Whether it's a personal project or a startup idea 💡🚀, I enjoy crafting intuitive, useful, and clean apps 📱— like this one!
            I built this to simplify how we save and manage links 🔗 without the mess 🧹.
            From design 🎨 to code 🧑‍💻, I'm always exploring 🌍, learning 📚, and experimenting 🔬 with things that make life a bit easier (and a lot cooler 😎).
            Thanks for checking out my app 🙏 — hope it makes your link-saving game stronger 💪🔖!
        </Text>

        <Text style={{color: "#ddd", fontSize: 16, fontFamily:"winkyRough", marginTop: 20}}>Follow me on:</Text>
        <GestureHandlerRootView style={{display: "flex", flexDirection: "row", gap: 60}}>
          <TouchableOpacity onPress={()=>{handlePress('github')}}><Entypo  name="github" size={28} color="#ddd" /></TouchableOpacity>
          <TouchableOpacity onPress={()=>{handlePress('linkedin')}}><Entypo name="linkedin" size={28} color="#ddd" /></TouchableOpacity>
          <TouchableOpacity onPress={()=>{handlePress('instagram')}}><Entypo name="instagram" size={28} color="#ddd" /></TouchableOpacity>
        </GestureHandlerRootView>
        
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    backgroundColor: '#25292e',
    padding :20,
  },
  circle:{
    width: 180,
    height: 180,
    borderRadius: 100,
    alignSelf: "center",
  },  
  bgCircle: {
    height: 185,
    width: 185,
    boxShadow: "4px 4px 2px 3px rgba(255, 255, 255, 0.5)",
    borderRadius: 100,
    backgroundColor: '#fff',
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
  },
  textContainer:{
    marginTop: 20,
    margin: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    gap: 20,
    
  },
  text: {
    color: '#ddd',
    fontSize: 16,
    fontFamily: "winkyRough",
    letterSpacing: 1.2,
    lineHeight: 26,
  },
});

// Copyright 2025 Darshan Aguru