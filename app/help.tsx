
import {  View, StyleSheet, Text,  Alert } from 'react-native';
import { GestureHandlerRootView , TouchableOpacity} from 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite';
import * as Haptics from 'expo-haptics';


export default function Page() {

  const handleDeleteAll = () => {
    console.log("Delete All");
      
    Alert.alert("Delete All","Are you sure you want to delete all the links?", [
      { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
      { text: "Delete", onPress: () => {
          const db = SQLite.openDatabaseSync('links.db');
          db.execSync('DELETE FROM links');
          db.execSync('DELETE FROM tags');
          db.execSync('DELETE FROM sqlite_sequence WHERE name="links"');
          db.execSync('DELETE FROM sqlite_sequence WHERE name="tags"');
          db.closeSync();
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          console.log("Deleted All");
        }},
    ]);
  }

  return (
      <GestureHandlerRootView style={{flex:1, margin: 0, padding: 0}}> 
    <View style={styles.container}>
      
      <Text style={styles.heading}>🧭 How to Use LinkNest</Text>
      <Text style={styles.text}>
        Welcome to LinkNest — your cozy hub to save, organize, and access links with ease! Here's a quick guide to help you navigate:
      </Text>
      <View style={{backgroundColor: "#ccc", height:StyleSheet.hairlineWidth,width:"100%"}}/>
      <Text style={styles.title}> ➕ Adding a New Link </Text>
<Text style={styles.text}>
Tap the “+” button on the home screen to create a new entry.

Enter the Link, Tag, and an optional Description.

While typing the tag, a dropdown will suggest existing tags — select one or create a new one!

      </Text>
      
      <View style={{backgroundColor: "#ccc", height:StyleSheet.hairlineWidth,width:"100%"}}/>
      <Text style={styles.title}>🔍 Searching </Text>
      <Text style={styles.text}>
Use the Search Bar at the top of the home screen to quickly filter links by tag name.

      </Text>
      
      <View style={{backgroundColor: "#ccc", height:StyleSheet.hairlineWidth,width:"100%"}}/>
      <Text style={styles.title}>🏷️ Viewing Tags</Text>
      <Text     style={styles.text}>
Tap on any tag to view all links associated with it.

Links under a tag are sorted by time — newest first.

      </Text>
      
      <View style={{backgroundColor: "#ccc", height:StyleSheet.hairlineWidth,width:"100%"}}/>
      <Text style={styles.title}>👆 Link Interactions</Text>
      <Text style={styles.text}>
Single Tap a link → Opens the link in browser.

Long Press a link → Edit the link, tag, or description.

Swipe Right → Delete the link.

Swipe Left → Share the link via any app.

      </Text>
      
      <View style={{backgroundColor: "#ccc", height:StyleSheet.hairlineWidth,width:"100%"}}/>
      <Text style={styles.text}>
LinkNest keeps your digital finds organized, searchable, and one tap away. Stay tidy, stay smart 💡

</Text>
<View style={{flex: 1}}/>
<View style={{display: "flex", flexDirection:"row", gap: 5, justifyContent:"center", alignItems:"center"}}>
  <Text style={{color: "#ed5c5c", fontSize: 14, fontFamily: "winkyRough"}}>Want to delete all data? </Text>
<TouchableOpacity onPress={()=>{handleDeleteAll()}}>
                <Text style={{color: "red", fontSize: 16,fontWeight:"bold", textDecorationLine:"underline", textDecorationColor:"red", fontFamily:"winkyRough"}}>click here!</Text>
        </TouchableOpacity>
</View>
  
    </View>
      </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    backgroundColor: '#25292e',
    padding :20,
  },
  title:{
    color: '#fff',
    fontSize: 18,
    fontFamily: "winkyRough",
    fontWeight: "bold",
    textAlign: "left",
  },
  heading:{
    color: '#fff',
    fontSize: 24,
    fontFamily: "winkyRough",
    letterSpacing: 1.2,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    color: '#ddd',
    fontSize: 16,
    fontFamily: "winkyRough",
    textAlign: "justify",
  },
});


// Copyright 2025 Darshan Aguru