import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Vibration, Platform, ToastAndroid, Alert, Keyboard } from 'react-native';
import { SplashScreen, useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Colors } from '@/assets/constants/Colors';
import * as SQLite from 'expo-sqlite';
import { getColor } from '@/assets/utils/colorPicker';
import * as Haptics from 'expo-haptics';

export default function AddLinkScreen() {
  
  const router = useRouter();
  const [link, setLink] = useState('');
  const [desc, setDesc] = useState('');
  const [tag, setTag] = useState('');
  const [tagData, setTagData] = useState<any>({});
  const [visible, setVisible] = useState(true);


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
    if (tagData && tagData.length > 0) {
      return tagData.filter((item: any) => item.tag.toLowerCase().startsWith(tag.toLowerCase()));
    }
    return [];
  }, [tag, tagData]);
  
  const handleTagSelect = (selectedTag: string) => {
    setTag(selectedTag);
    setVisible(false);
    Keyboard.dismiss(); // hide suggestions
  };

  const handleSave =  () => {
    
    // Save logic here
    

    const db = SQLite.openDatabaseSync('links.db');
    try{
      if(link.trim() === "" || tag.trim() === "" || desc.trim() === ""){
       
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        if(Platform.OS === "android"){
          ToastAndroid.show("Please fill all the fields", ToastAndroid.SHORT);
        }
        else{
          Alert.alert("Error", "Please fill all the fields", [{ text: "OK" }]);
        }
        throw new Error("Please fill all the fields");
      }
      const tags:any = db.getAllSync("SELECT * FROM tags");
      let presentTagId = tags.find((item: any) => item.tag === tag);
      let tagId;
      if(presentTagId === undefined){
        const bgColor = getColor();

        const smt1 = db.prepareSync("INSERT INTO tags (tag, bgColor) VALUES ($tag, $bgColor)");
        const r = smt1.executeSync({ $tag: tag, $bgColor: bgColor });
        tagId = r.lastInsertRowId;
        smt1.finalizeSync();
      }
      else{
        tagId = presentTagId.id;
      }
      const stmt = db.prepareSync("INSERT INTO links (url, tagId, desc, timeStamp) VALUES ($url, $tagId, $desc, $timeStamp)");
      stmt.executeSync({ $url: link, $tagId: tagId, $desc: desc, $timeStamp: new Date().toISOString() });
      stmt.finalizeSync();
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      // console.log(db.getAllSync(`SELECT * FROM links`));
      // console.log(db.getAllSync(`SELECT * FROM tags`));
      db.closeSync();
      setLink('');
      setTag('');
      setDesc('');
      Keyboard.dismiss();
      if(router.canDismiss())
      {
        router.dismissAll();
      }
      router.replace("/");
    }
    catch(e){
      console.log(e);
    }
    setLink('');
    setTag('');
    setDesc('');
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
    value={tag}
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
    overflow:"scroll",
  },
  dropdownItem: {
    padding: 10,
    borderBottomColor: Colors.gray,
    borderBottomWidth: 1,
  },
  
});
