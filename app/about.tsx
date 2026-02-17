import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View, StyleSheet, Image, TouchableOpacity, Vibration, ToastAndroid, Platform, Alert, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Linking from 'expo-linking';
import { Colors } from '@/assets/constants/Colors';
import { getShadow } from '@/assets/utils/shadow';

export default function AboutScreen() {

  const handleLongPress = () => {
    Vibration.vibrate(50);
    Linking.openURL('https://www.thisdarshiii.in/');
  }

  const handleOnPress = () => {
    Vibration.vibrate(5);
    if (Platform.OS === "android") {
      ToastAndroid.show("Long press and see the magic🪄", ToastAndroid.SHORT);
    }
    else {
      Alert.alert("😉", "Long press and see the magic🪄");
    }
  }

  const handlePress = (platform: string) => {
    Vibration.vibrate(10);
    switch (platform) {
      case 'github':
        Linking.openURL('https://github.com/DarshanAguru');
        break;
      case 'linkedin':
        Linking.openURL('https://www.linkedin.com/in/this-darshiii/');
        break;
      case 'instagram':
        Linking.openURL('https://www.instagram.com/this.darshiii/');
        break;
      default:
        break;
    }
  }

  const InfoCard = ({ icon, title, children }: { icon: any, title: string, children: any }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        {icon}
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <View style={styles.cardContent}>
        {children}
      </View>
    </View>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleOnPress} onLongPress={handleLongPress} activeOpacity={0.9}>
            <View style={styles.imageContainer}>
              <Image source={require('@/assets/images/aboutME.png')} style={styles.profileImage} resizeMode='cover' />
            </View>
          </TouchableOpacity>
          <Text style={styles.heading}>About Developer</Text>
          <Text style={styles.subHeading}>Crafting code with coffee & chaos ☕</Text>
        </View>

        <InfoCard
          icon={<MaterialCommunityIcons name="xml" size={24} color={Colors.tint} />}
          title="The Story"
        >
          <Text style={styles.text}>
            Hi, I'm <Text style={styles.bold}>A. Darshan</Text>! 👋{'\n\n'}
            I'm a developer passionate about building software that looks good and works even better. 💻{'\n\n'}
            <Text style={styles.bold}>LinkNest</Text> was created to solve a simple problem: saving links shouldn't be messy. I wanted a clean, beautiful space for everything you want to rediscover later. 🔗✨
          </Text>
        </InfoCard>

        <InfoCard
          icon={<Entypo name="network" size={22} color={Colors.tint} />}
          title="Connect"
        >
          <Text style={[styles.text, { marginBottom: 15 }]}>
            Check out my other projects or just say hi!
          </Text>
          <View style={styles.socialRow}>
            <TouchableOpacity onPress={() => handlePress('github')} style={styles.socialButton}>
              <Entypo name="github" size={24} color="white" />
              <Text style={styles.socialText}>GitHub</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handlePress('linkedin')} style={styles.socialButton}>
              <Entypo name="linkedin" size={24} color="white" />
              <Text style={styles.socialText}>LinkedIn</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handlePress('instagram')} style={styles.socialButton}>
              <Entypo name="instagram" size={24} color="white" />
              <Text style={styles.socialText}>Instagram</Text>
            </TouchableOpacity>
          </View>
        </InfoCard>

        <Text style={styles.footer}>
          Designed & Developed by Darshan Aguru{'\n'}
          v1.0.0
        </Text>

      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  imageContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.1)',
    ...getShadow("#ffffff", 0.4, 10, 6, { width: 0, height: 4 }),
  },
  profileImage: {
    width: 152,
    height: 152,
    borderRadius: 76,
  },
  heading: {
    color: '#fff',
    fontSize: 28,
    fontFamily: "winkyRough",
    fontWeight: "bold",
    marginBottom: 5,
  },
  subHeading: {
    color: Colors.tint,
    fontSize: 14,
    fontFamily: "winkyRough",
    fontStyle: 'italic',
  },
  card: {
    backgroundColor: '#333',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#444',
    ...getShadow("#000", 0.3, 4, 3, { width: 0, height: 2 }),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    paddingBottom: 10,
  },
  cardTitle: {
    color: 'white',
    fontSize: 20,
    fontFamily: "winkyRough",
    marginLeft: 12,
    fontWeight: "600",
  },
  cardContent: {
    gap: 10,
  },
  text: {
    color: '#ddd',
    fontSize: 16,
    fontFamily: "winkyRough",
    lineHeight: 24,
  },
  bold: {
    color: 'white',
    fontWeight: 'bold',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 5,
  },
  socialButton: {
    flex: 1,
    backgroundColor: '#444',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    ...getShadow("#000", 0.2, 3, 2, { width: 0, height: 2 }),
  },
  socialText: {
    color: '#ddd',
    fontSize: 12,
    fontFamily: "winkyRough",
  },
  footer: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
    fontSize: 12,
    fontFamily: "winkyRough",
    lineHeight: 18,
  },
});

// Copyright 2025 Darshan Aguru