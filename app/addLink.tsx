import { View, TextInput, StyleSheet, TouchableOpacity, Text, Platform, ToastAndroid, Alert, Keyboard, ScrollView } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Colors } from '@/assets/constants/Colors';
import { Entypo } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';
import { getColor } from '@/assets/utils/colorPicker';
import * as Haptics from 'expo-haptics';
import { getShadow } from '@/assets/utils/shadow';

export default function AddLinkScreen() {

  const router = useRouter();
  const [link, setLink] = useState('');
  const [desc, setDesc] = useState('');
  const [tag, setTag] = useState('');
  const [tagData, setTagData] = useState<any>([]);
  const [visible, setVisible] = useState(true);



  const handleTagChange = (tag: string) => {
    setVisible(true);

    setTag(tag);
  };

  useFocusEffect(React.useCallback(() => {
    const db = SQLite.openDatabaseSync('links.db');
    const res: any = db.getAllSync(`SELECT * FROM tags ORDER BY tag ASC`);
    setTagData(res);
    db.closeSync();
  }, []))

  const filteredTags = useMemo(() => {
    // console.log(tagData);
    if (tagData && tagData.length > 0 && tag.trim() !== "") {
      return tagData.filter((item: any) => item.tag.toLowerCase().startsWith(tag.trim().toLowerCase()));
    }
    return [];
  }, [tag, tagData]);

  const handleTagSelect = (selectedTag: string) => {
    setTag(selectedTag);
    setVisible(false);
    Keyboard.dismiss(); // hide suggestions
  };

  const handleSave = () => {



    const db = SQLite.openDatabaseSync('links.db');
    try {
      if (link.trim() === "" || tag.trim() === "") {

        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        if (Platform.OS === "android") {
          ToastAndroid.show("Please fill all the fields", ToastAndroid.SHORT);
        }
        else {
          Alert.alert("Error", "Please fill all the fields", [{ text: "OK" }]);
        }
        throw new Error("Please fill all the fields");
      }
      const tags: any = db.getAllSync("SELECT * FROM tags");
      let presentTagId = tags.find((item: any) => item.tag === tag.trim());
      let tagId;
      if (presentTagId === undefined) {
        const bgColor = getColor();

        const smt1 = db.prepareSync("INSERT INTO tags (tag, bgColor) VALUES ($tag, $bgColor)");
        const r = smt1.executeSync({ $tag: tag.trim(), $bgColor: bgColor });
        tagId = r.lastInsertRowId;
        smt1.finalizeSync();
      }
      else {
        tagId = presentTagId.id;
      }
      const stmt = db.prepareSync("INSERT INTO links (url, tagId, desc, timeStamp) VALUES ($url, $tagId, $desc, $timeStamp)");
      stmt.executeSync({ $url: link.trim(), $tagId: tagId, $desc: desc.trim(), $timeStamp: new Date().toISOString() });
      stmt.finalizeSync();
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      // console.log(db.getAllSync(`SELECT * FROM links`));
      // console.log(db.getAllSync(`SELECT * FROM tags`));
      db.closeSync();
      setLink('');
      setTag('');
      setDesc('');
      Keyboard.dismiss();
      if (router.canDismiss()) {
        router.dismissAll();
      }
      router.replace("/");
    }
    catch (e) {
      console.log(e);
    }
    setLink('');
    setTag('');
    setDesc('');
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={link}
          placeholder="Link"
          onChangeText={setLink}
          placeholderTextColor={"#888"}
        />
      </View>

      <View style={{ position: 'relative', zIndex: 100 }}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={tag}
            placeholder="Tag"
            onSubmitEditing={() => setVisible((prev) => !prev)}
            onChangeText={handleTagChange}
            placeholderTextColor={"#888"}
          />

          {tag.length > 0 && filteredTags?.length > 0 && visible && (
            <ScrollView style={styles.dropdown} keyboardShouldPersistTaps="handled">
              {filteredTags.map((item: any) => (
                <TouchableOpacity key={item.id} onPress={() => handleTagSelect(item.tag)} style={styles.dropdownItem}>
                  <Entypo name="price-tag" size={20} color={Colors.tint} style={{ marginRight: 10 }} />
                  <Text style={styles.dropdownText}>{item.tag}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={desc}
          placeholder="Description (optional)"
          onChangeText={setDesc}
          placeholderTextColor={"#888"}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={{ color: "white", fontSize: 20, fontFamily: "winkyRough" }}>Save Link</Text>
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#25292e' },


  // ... (in styles)

  inputContainer: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    backgroundColor: '#25292e',
    ...getShadow("#ffffff", 0.3, 2, 5, { width: 3, height: 3 }),
    boxShadow: "4px 4px 2px 2px #ffffff",
  },
  input: {
    padding: 10,
    color: "white",
    width: '100%',
  },
  button: {
    alignSelf: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    marginVertical: 24,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.gray,
    backgroundColor: '#25292e',
    ...getShadow("#ffffff", 0.3, 2, 5, { width: 3, height: 3 }),
    boxShadow: "4px 4px 2px 2px #ffffff",
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
    maxHeight: 180, // Increased height
    ...getShadow("#000", 0.5, 5, 5, { width: 0, height: 3 }),
  },
  dropdownItem: {
    padding: 12,
    borderBottomColor: '#444',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a3a3a', // Slightly lighter for contrast
  },
  dropdownText: {
    color: 'white',
    fontSize: 16,
    fontFamily: "winkyRough",
  },

});

// Copyright 2025 Darshan Aguru