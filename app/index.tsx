import { Text, View, StyleSheet, TouchableOpacity, Vibration, Platform } from 'react-native';
import {  useFocusEffect, useRouter } from 'expo-router'; 
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import React, {  useState } from 'react';
import  SearchBox  from  '@/assets/components/SearchBox';
import Tiles from '@/assets/components/Tiles';
import { Entypo } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';


export default function Index() {
  
  const [data, setData] = useState<any>([]);
  const [allData, setAllData] = useState<any>([]);
  
  const router = useRouter();
  
  const [searchQuery , setSearchQuery] = useState({search:''});
  const handleSearch = (query:any) => {
    setSearchQuery({ search: query });
    if(data.length > 0 && query.trim() !== "" && query.length > 0){
      const filteredData = data.filter((item:any) => {
        return item.tag.toLowerCase().startsWith(query.toLowerCase());
      });
      setData(filteredData);
    }
    else{
      setData(allData);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      try {
        const db = SQLite.openDatabaseSync('links.db');
        const res = db.getAllSync(`SELECT * FROM tags ORDER BY tag ASC`);
        // console.log(res);

        setData(res);
        setAllData(res);
        db.closeSync();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      
    }, [])
  );

  
  

  return (
    <View style={{backgroundColor: '#25292e', flex: 1}}>
         <SearchBox placeholder='Search...' value={searchQuery.search} onChangeText={handleSearch}/>
          
        <ScrollView style={styles.scroll}>
            {(data.length > 0) ? <Tiles data={data} /> : <Text style={{color: "white", fontSize: 20, fontFamily: "winkyRough", margin: 30}}>No Data Found! 🫣</Text>}
        </ScrollView>

        <GestureHandlerRootView style={styles.addNewButton}>
            <TouchableOpacity style={{borderRadius: 12,
    backgroundColor: "rgba(255,255,255,1)",
    boxShadow: "4px 4px 2px 2px rgba(255, 255, 255, 0.45)",
    padding: 16,}}  onPress={()=>{Vibration.vibrate(10); router.push("/addLink")}}><Entypo name="plus"  size={24} color="black" /></TouchableOpacity>
        </GestureHandlerRootView>
        <View style={{display: "flex", justifyContent:"center", alignItems:"center", marginVertical: 8}}>
          <Text style={{color: "white", fontSize:14, fontFamily:"winkyRough"}}> Made with ❤️ by AD</Text>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
  scroll:
  {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginTop: 20,
    marginBottom: 65,
  },
  addNewButton:
  {
    display: "flex",
    justifyContent:"center",
    alignItems:"center",   
    position:"absolute",
    bottom : 60,
    right: 55,
    transform: "translate(50%, 50%)",
  }
});

// Copyright 2025 Darshan Aguru