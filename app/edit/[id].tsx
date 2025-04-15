import { View, TextInput,  StyleSheet, TouchableOpacity, Text,  Keyboard, ToastAndroid, Alert, Platform } from 'react-native';
import { useFocusEffect, useLocalSearchParams,  useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Colors } from '@/assets/constants/Colors';
import * as SQLite from 'expo-sqlite';
import * as Haptics from 'expo-haptics';
import { getColor } from '@/assets/utils/colorPicker';
export default function Page() {
  const { id, tag, url, descr } = useLocalSearchParams<{id: string ,tag: string, url:string, descr:string}>();
  const [link, setLink] = useState(url || '');
  const [desc, setDesc] = useState(descr || '');
  const [tagg, setTag] = useState(tag || '');

  const [tagData, setTagData] = useState<any>({});
  const [visible, setVisible] = useState(false);

  const router = useRouter();

  
    const handleTagChange = (tag: string) => {
      setVisible(true);
      setTag(tag);
    };

  
    useFocusEffect(React.useCallback(()=>{
      const db = SQLite.openDatabaseSync('links.db');
      const res:any = db.getAllSync(`SELECT * FROM tags ORDER BY tag ASC`);
      setTagData(res);
      db.closeSync();
    },[]))
  
    const filteredTags = useMemo(() => {
      // console.log(tagData);
      if (tagData && tagData.length > 0 && tagg.trim() !== "") {
        return tagData.filter((item: any) => item.tag.toLowerCase().startsWith(tagg.trim().toLowerCase()));
      }
      return [];
    }, [tag, tagData]);
    
    const handleTagSelect = (selectedTag: string) => {
      setTag(selectedTag);
      setVisible(false);
      Keyboard.dismiss(); // hide suggestions
    };

  const handleSave = () => {
    try {
      const db = SQLite.openDatabaseSync('links.db');
  
      if (link.trim() === "" || tagg.trim() === "") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        if (Platform.OS === "android") {
          ToastAndroid.show("Please fill all the fields", ToastAndroid.SHORT);
        } else {
          Alert.alert("Error", "Please fill all the fields", [{ text: "OK" }]);
        }
        throw new Error("Please fill all the fields");
      }
  
      const tags: any = db.getAllSync("SELECT * FROM tags");
      const links: any = db.getAllSync("SELECT * FROM links");
  
      const currentLink = links.find((item: any) => item.id === Number(id));
      const oldTagId = currentLink.tagId;
  
      let tagId;
      const presentTag = tags.find((item: any) => item.tag === tagg.trim());
  
      if (!presentTag) {
        const bgColor = getColor();
        const smt1 = db.prepareSync("INSERT INTO tags (tag,  bgColor) VALUES ($tag,  $bgColor)");
        const r = smt1.executeSync({ $tag: tagg.trim(), $bgColor: bgColor });
        tagId = r.lastInsertRowId;
        smt1.finalizeSync();
      } else {
        tagId = presentTag.id;
      }
  
      const stmt = db.prepareSync("UPDATE links SET url = $url, tagId = $tagId, desc = $desc, timeStamp = $timeStamp WHERE id = $id");
      stmt.executeSync({ $url: link.trim(), $tagId: tagId, $desc: desc.trim(), $timeStamp: new Date().toISOString(), $id: Number(id) });
      stmt.finalizeSync();
  
      // Check if oldTagId is unused now
      const remaining = db.getAllSync("SELECT * FROM links WHERE tagId = $tagId", { $tagId: oldTagId });
      if (remaining.length === 0) {
        db.runSync("DELETE FROM tags WHERE id = $id", { $id: oldTagId });
      }
  
      db.closeSync();
  
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Keyboard.dismiss();
  
      if (router.canDismiss()) {
        router.dismissAll();
      }
  
      router.replace("/");
  
    } catch (e) {
      console.log(e);
    }
  };
  
  return (
    <GestureHandlerRootView style={styles.container}>
      <TextInput
        style={styles.input}
        value={link}
        placeholder="Link"
        onChangeText={setLink}
        placeholderTextColor={"#888"}

      />
   <View style={{ position: 'relative' }}>
     <TextInput
       style={styles.input}
       value={tagg}
       placeholder="Tag"
       onSubmitEditing={() => setVisible((prev) => !prev)}
       onChangeText={handleTagChange}
       placeholderTextColor={"#888"}
     />
     
     {tag.length > 0 && filteredTags?.length > 0 && visible &&  (
       <View style={styles.dropdown}>
         {filteredTags.map((item: any) => (
           <TouchableOpacity key={item.id} onPress={() => handleTagSelect(item.tag)} style={styles.dropdownItem}>
             <Text style={{ color: 'white' }}>{item.tag}</Text>
           </TouchableOpacity>
         ))}
       </View>
     )}
   </View>
      <TextInput
        style={styles.input}
        value={desc}
        placeholder="Description (optional)"
        onChangeText={setDesc}
        placeholderTextColor={"#888"}
      />
      <TouchableOpacity  style={styles.button} onPress={handleSave} >
        <Text style={{color: "white", fontSize: 20, fontFamily: "winkyRough"}}>Save Link</Text>
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#25292e' },
  input: {
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    color:"white",
    borderColor: Colors.gray,
    borderRadius: 8,
    boxShadow: "6px 6px 2px 4px rgba(255,255,255,0.5)",
    
  },
  button:{
    alignSelf:"center",
    display: "flex",
    justifyContent:"center",
    alignItems:"center",
    width: "60%",
    marginVertical: 24,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor:Colors.gray,
    boxShadow: "6px 6px 2px 4px rgba(255,255,255,0.5)",
  },
  
  dropdown: {
    position: 'absolute',
    top: 55,
    left: 0,
    right: 0,
    backgroundColor: '#333',
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 8,
    zIndex: 99,
    maxHeight: 150,
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  dropdownItem: {
    padding: 10,
    borderBottomColor: Colors.gray,
    borderBottomWidth: 1,
  },
});


// Copyright 2025 Darshan Aguru