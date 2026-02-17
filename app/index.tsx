import { Text, View, StyleSheet, TouchableOpacity, Vibration, Platform } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import React, { useCallback, useMemo, useState } from 'react';
import SearchBox from '@/assets/components/SearchBox';
import Tiles from '@/assets/components/Tiles';
import { Entypo } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';
import { getShadow } from '@/assets/utils/shadow';


export default function Index() {

  const [data, setData] = useState<any>([]);
  const [allData, setAllData] = useState<any>([]);

  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState({ search: '' });

  const handleSearch = useCallback((query: any) => {
    setSearchQuery({ search: query });
    if (data.length > 0 && query.trim() !== "" && query.length > 0) {
      const filteredData = allData.filter((item: any) => {
        return item.tag.toLowerCase().startsWith(query.toLowerCase());
      });
      setData(filteredData);
    }
    else {
      setData(allData);
    }
  }, [allData, data.length]);

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

  const handleAddPress = useCallback(() => {
    Vibration.vibrate(10);
    router.push("/addLink");
  }, [router]);


  const renderContent = useMemo(() => {
    return (data.length > 0) ? <Tiles data={data} /> : <Text style={styles.noDataText}>No Data Found! 🫣</Text>;
  }, [data]);

  return (
    <View style={styles.container}>
      <SearchBox placeholder='Search...' value={searchQuery.search} onChangeText={handleSearch} />

      <ScrollView style={styles.scroll}>
        {renderContent}
      </ScrollView>

      <GestureHandlerRootView style={styles.addNewButton}>
        <TouchableOpacity style={styles.fab} onPress={handleAddPress}><Entypo name="plus" size={24} color="white" /></TouchableOpacity>
      </GestureHandlerRootView>
      <View style={styles.footer}>
        <Text style={styles.footerText}> Made with ❤️ by AD</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
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
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 60,
    right: 55,
    transform: "translate(50%, 50%)",
  },
  fab: {
    borderRadius: 12,
    borderColor: "#ffffff",
    borderWidth: 1,
    ...getShadow("#ffffff", 0.3, 2, 5, { width: 3, height: 3 }),
    boxShadow: "4px 4px 2px 2px #ffffff",
    padding: 16,
  },
  footer: {
    display: "flex", justifyContent: "center", alignItems: "center", marginVertical: 8
  },
  footerText: {
    color: "white", fontSize: 14, fontFamily: "winkyRough"
  },
  noDataText: {
    color: "white", fontSize: 20, fontFamily: "winkyRough", margin: 30
  }
});

// Copyright 2025 Darshan Aguru