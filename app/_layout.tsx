import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import { Stack, useRouter } from 'expo-router';
import { Text } from 'react-native';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign, Feather } from '@expo/vector-icons';
import { Vibration } from 'react-native';
import * as SQLite from 'expo-sqlite';



const InitialLayout = () => {

  const navigation = useRouter();


  const [loaded, error] = useFonts({
    'winkyRough': require("@/assets/fonts/WinkyRough-VariableFont_wght.ttf"),
  });

  

  useEffect(() => {
    const hideSplash = async () => {
      await SplashScreen.preventAutoHideAsync();
        // To ensure it's hidden only after everything is ready
        const db = SQLite.openDatabaseSync('links.db');
        // db.execSync('DROP TABLE IF EXISTS links');
        // db.execSync('DROP TABLE IF EXISTS tags');
        db.execSync('CREATE TABLE IF NOT EXISTS tags (id INTEGER PRIMARY KEY AUTOINCREMENT, tag TEXT, bgColor TEXT)');
        db.execSync('CREATE TABLE IF NOT EXISTS links (id INTEGER PRIMARY KEY AUTOINCREMENT, tagId INTEGER, desc TEXT, url TEXT, timeStamp TEXT, FOREIGN KEY (tagId) REFERENCES tags(id))');
        db.closeSync();
        
      if (loaded || error) {
        SplashScreen.hideAsync(); // Hide splash screen
      }
    };
  
    hideSplash();
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
  <Stack screenOptions={{
    headerStyle: {
      backgroundColor: "#25292e",
    },
    gestureEnabled: true,
    headerTitleAlign: "center",
    headerShadowVisible: false,
    headerBackTitle:"",
    headerTitleStyle: {
      fontWeight: "semibold",
      color: "#fff",
      fontSize: 24,
      fontFamily: "winkyRough",
    }
  }}>
      <Stack.Screen name="index" options={{ title: 'Home', headerLeft: () => <TouchableOpacity onPress={()=>{Vibration.vibrate(10);navigation.navigate('/about')}}><Text><AntDesign name="infocirlceo" size={22} color="white"/> </Text></TouchableOpacity> ,headerRight: () => <TouchableOpacity onPress={()=>{Vibration.vibrate(10);navigation.navigate('/help')}}><Text><Feather name="help-circle" size={26} color="white" /></Text></TouchableOpacity> }} />
      <Stack.Screen name="about" options={{ title: "About",headerBackVisible: false, animation: "slide_from_left" , headerLeft: () => <TouchableOpacity  onPress={()=> {Vibration.vibrate(10);navigation.back()}} ><Text><AntDesign name="back" size={22} color="white" /></Text></TouchableOpacity> }} />
      <Stack.Screen name="help" options={{ title: "Help",headerBackVisible: false, animation: "slide_from_right" , headerLeft: () => <TouchableOpacity  onPress={()=> {Vibration.vibrate(10);navigation.back()}} ><Text><AntDesign name="back" size={22} color="white" /></Text></TouchableOpacity> }} />
      <Stack.Screen name="addLink" options={{ title: "New Link",headerBackVisible: false, animation:"fade_from_bottom", headerLeft: () => <TouchableOpacity  onPress={()=> {Vibration.vibrate(10);navigation.back()}} ><Text><AntDesign name="back" size={22} color="white" /></Text></TouchableOpacity> }} />
      <Stack.Screen name="linkdata/[id]" options={{ title:"", headerBackVisible: false, animation:"slide_from_right", headerLeft: () => <TouchableOpacity  onPress={()=> {Vibration.vibrate(10);navigation.back()}} ><Text><AntDesign name="back" size={22} color="white" /></Text></TouchableOpacity> }} />
      <Stack.Screen name="edit/[id]" options={{ title:"Edit", headerBackVisible: false, animation:"slide_from_right", headerLeft: () => <TouchableOpacity  onPress={()=> {Vibration.vibrate(10);navigation.back()}} ><Text><AntDesign name="back" size={22} color="white" /></Text></TouchableOpacity> }} />
    </Stack>
  )
}


export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 , backgroundColor: "#25292e"}}>
      <InitialLayout/>
    </GestureHandlerRootView>
  );
  
}


// Copyright 2025 Darshan Aguru