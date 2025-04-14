import { View, Text, StyleSheet, Vibration, Alert } from 'react-native'
import React from 'react'
import {  Gesture, GestureDetector, TouchableOpacity } from 'react-native-gesture-handler'
import { Colors } from '../constants/Colors'
import { useRouter } from 'expo-router'
import  Animated, { interpolate, runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Entypo, Feather } from '@expo/vector-icons'
import { Share } from 'react-native'
import * as Linking from 'expo-linking';
import * as SQLite from 'expo-sqlite';
import * as Haptics from 'expo-haptics';

interface listItemProps{
    desc: string,
    url: string,
    tag: string,
    bgColor: string,
    timeStamp: Date,
    id: number,
    tagId: number,
    handleRefresh: () => void,
}

const ListItem = ({id, desc, url, tagId, tag, bgColor, timeStamp, handleRefresh}: listItemProps) => {

    const router = useRouter();

    const translateX = useSharedValue(0);


    const deleteLink = () => {
      try{
        const db = SQLite.openDatabaseSync('links.db');
        db.execSync('DELETE FROM links WHERE id = ' + id);
        const remaining = db.getAllSync("SELECT * FROM links WHERE tagId = $tagId", { $tagId: tagId });
        let flag=  false;
        if (remaining.length === 0) {
          db.runSync("DELETE FROM tags WHERE id = $id", { $id: tagId });
          flag = true;
        }
        db.closeSync();
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        if (flag){
          if (router.canDismiss())
          {
            router.dismissAll();
            router.replace("/");
          }
          
        }
        handleRefresh();
      }
      catch(e){
        console.log(e);
      }
    }

    const confirmDelete = () => {
        Vibration.vibrate(15);
        Alert.alert("Confirm Delete", "Are you sure you want to delete this link?", [
          { text: "Cancel", onPress: () => resetPosition(), style: "cancel" },
          { text: "Delete", onPress: () => deleteLink() }
        ]);
      };

      const shareLink = () => {
        Vibration.vibrate(15);
        resetPosition();
        Share.share({message: `Check this out! 🔗 ${url}`, url: url, title: `Share Link`}, {dialogTitle: "Share Link"})
        .then((result) => {
          if(result.action === Share.sharedAction)
          {
            if(result.activityType)
            {
              console.log(result.activityType);
            }
            else{
              console.log("Shared successfully!");
            }
          }
          else if(result.action === Share.dismissedAction){
              console.log("Share Dismissed");
          }
        })
        .catch((error:any) => {
          console.log(error);
        });
        console.log("Sharing link...");
      }
    
      const dragGesture = Gesture.Pan()
    .onUpdate((e) => {
      // Vibration.vibrate(10);
      
      if(e.translationX > 80) {
        translateX.value = 81;
      }
      else if(e.translationX < -80){
        translateX.value = -81;
      }
      else{
        translateX.value = e.translationX;
      }
    })
    .onEnd(() => {
      if (translateX.value > 80) {
        runOnJS(confirmDelete)(); // If dragged right past 80, trigger popup -- swipe right
      }
      else if (translateX.value < -80) {
        runOnJS(shareLink)(); // If dragged left past -80, trigger share action --  swipe left
      }
      else {
        translateX.value = withSpring(0); // Snap back
      }
    });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
      }));

      // console.log(tag);
    const handleEditData = ()=>{
        Vibration.vibrate(50);
        router.push({pathname: '/edit/[id]' , params:{id:String(id),tag: tag, url: url, descr: desc}});
    }
    
    function isValidUrl(url: string): boolean {
      try {
        const parsed = new URL(url);
        // Only allow http(s) protocols
        return ['http:', 'https:'].includes(parsed.protocol);
      } catch (err) {
        return false;
      }
    }
    

    const handleClick = ()=>{
        Vibration.vibrate(8);
       try{
        if(isValidUrl(url))
        {
         Linking.openURL(url);
        }
      }
       catch(e)
        {
          console.log("Not supported");
          console.log(e);
        }
       
        
    }

    const resetPosition = () => {
        translateX.value = withSpring(0);
      };

      const trashIconStyle = useAnimatedStyle(() => ({
        opacity: interpolate(translateX.value, [100, 20], [1, 0]),
        transform: [
          {
            scale: interpolate(translateX.value, [100, 20], [1.0, 1.0])
          }
        ]
      }));

    
      const shareIconStyle = useAnimatedStyle(() => ({
        opacity: interpolate(translateX.value, [-100, -20], [1, 0]),
        transform: [
          {
            scale: interpolate(translateX.value, [-100, -20], [1.0, 1.0])
          }
        ]
      }));

  return (
    <View >
         
        <Animated.View style={[styles.shareContainer, shareIconStyle]}>
            <Entypo name="share" size={26} color="cyan" />
         </Animated.View>         
        <Animated.View style={[styles.trashContainer, trashIconStyle]}>
        <Feather name="trash-2" size={26} color="red" />
         </Animated.View> 

    <GestureDetector gesture= {dragGesture}>       
    <Animated.View style={[styles.listItem, {boxShadow: `4px 6px 2px 2px ${bgColor}`},animatedStyle ]}>   
    <TouchableOpacity  onPress={handleClick} onLongPress={handleEditData}>
      <View key = {id} >
            <View>
        <Text style={{...styles.url , color: bgColor}}>{url}</Text>
        <Text style={styles.desc}>{desc}</Text>
        </View>
        <Text style={styles.timeStamp}>{timeStamp.toLocaleString()}</Text>
        </View>
      </TouchableOpacity>
      </Animated.View>
      </GestureDetector>
      </View>


  )
}


const styles=  StyleSheet.create({
      shareContainer: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 20,
        zIndex: -1,
      },
      trashContainer: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 20,
        zIndex: -1,
      },
listItem:{
    display: "flex",
    flexDirection: "column",
    flex:1,
    borderWidth: 1,
    borderColor: Colors.gray,
    padding: 10,
    gap: 5,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
},
url:{
    color: "white",
    fontSize: 16,
    textDecorationLine:"underline",
    textDecorationStyle:"solid",
    textDecorationColor: Colors.gray,
},
desc:{
    color: "#ccc",
    fontSize: 14,
},
timeStamp:{
    color: Colors.gray,
    fontSize: 10,
    fontFamily: "winkyRough",
    textAlign: "right",
    marginHorizontal: 10,
}
});

export default ListItem

// Copyright 2025 Darshan Aguru