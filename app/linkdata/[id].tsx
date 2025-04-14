import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router/build/hooks'
import { useNavigation } from 'expo-router';
import ListItem from '@/assets/components/ListItem';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite';

const Page = () => {
    const {id,tagId} = useLocalSearchParams<{id: string, tagId: string}>();
    const [data, setData] = useState<any>([]);
    const [refresh, setRefresh] = useState(false);
    const [tagData, setTagData] = useState<{id: number, tag: string; color: string; bgColor: string }>({ id: 0, tag: '', color: '', bgColor: '' });

    const handleRefresh = () => {
        setRefresh((prev)=>!prev);
    }

    const navigation = useNavigation();
    useEffect(() => {
      navigation.setOptions({
        title: `${id}`,
      });
    }, [navigation]);
    
    useEffect(()=>{
      const db = SQLite.openDatabaseSync('links.db');

      const res = db.getAllSync(`SELECT * FROM links WHERE tagId="${tagId}" ORDER BY timeStamp DESC`);
      const _tagData:any = db.getFirstSync(`SELECT id, tag, bgColor FROM tags WHERE id = ${tagId}`);
      setTagData(_tagData);
      setData(res);
      db.closeSync();
    },[refresh]);

  
  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView style={{marginHorizontal: 4,marginVertical: 40,}}>
        {data.map((item:any, index:number) => <ListItem  handleRefresh={handleRefresh} key={index} id={item.id} desc={item.desc} url={item.url} tagId={tagData.id} tag={tagData.tag} bgColor={tagData.bgColor} timeStamp={new Date(item.timeStamp)} />)}
      </ScrollView>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  text: {
    color: '#fff',
  },
});


export default Page

// Copyright 2025 Darshan Aguru