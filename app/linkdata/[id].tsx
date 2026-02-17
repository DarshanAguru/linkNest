import { StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { useLocalSearchParams } from 'expo-router/build/hooks'
import { useNavigation } from 'expo-router';
import ListItem from '@/assets/components/ListItem';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite';

const Page = () => {
  const { id, tagId } = useLocalSearchParams<{ id: string, tagId: string }>();
  const [data, setData] = useState<any>([]);
  const [refresh, setRefresh] = useState(false);
  const [tagData, setTagData] = useState<{ id: number, tag: string; color: string; bgColor: string }>({ id: 0, tag: '', color: '', bgColor: '' });

  const handleRefresh = useCallback(() => {
    setRefresh((prev) => !prev);
  }, []);

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: `${id}`,
    });
  }, [navigation, id]);

  useEffect(() => {
    const db = SQLite.openDatabaseSync('links.db');

    const res = db.getAllSync(`SELECT * FROM links WHERE tagId="${tagId}" ORDER BY timeStamp DESC`);
    const _tagData: any = db.getFirstSync(`SELECT id, tag, bgColor FROM tags WHERE id = ${tagId}`);
    setTagData(_tagData);
    setData(res);
    db.closeSync();
  }, [refresh, tagId]);

  const renderItem = useCallback(({ item }: { item: any }) => (
    <ListItem
      handleRefresh={handleRefresh}
      id={item.id}
      desc={item.desc}
      url={item.url}
      tagId={tagData.id}
      tag={tagData.tag}
      bgColor={tagData.bgColor}
      timeStamp={new Date(item.timeStamp)}
    />
  ), [tagData, handleRefresh]);

  const keyExtractor = useCallback((item: any) => String(item.id), []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
      />
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  listContent: {
    marginHorizontal: 4,
    marginVertical: 40,
    paddingBottom: 20
  }
});


export default Page

// Copyright 2025 Darshan Aguru

// Copyright 2025 Darshan Aguru