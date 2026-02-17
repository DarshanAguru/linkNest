import { View, StyleSheet, Vibration, TouchableOpacity } from 'react-native'
import React, { memo, useCallback } from 'react'
import { Colors } from '@/assets/constants/Colors'
import { Text } from '@react-navigation/elements';
import { useRouter } from 'expo-router';


type SearchBoxProps = {
  tag: string,
  bgColor: string,
  id: number,
}

const Tile = memo(({ id, tag, bgColor }: SearchBoxProps) => {
  const router = useRouter();

  const handlePress = useCallback(() => {
    Vibration.vibrate(8);
    router.push({ pathname: '/linkdata/[id]', params: { id: tag, tagId: String(id) } });
  }, [id, tag, router]);

  return (
    <TouchableOpacity onPress={handlePress} >
      <View style={[styles.tile, { boxShadow: `6px 6px 2px 4px ${bgColor}` }]}>
        <Text style={[styles.text, { color: bgColor }]}>{tag}</Text>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({

  tile: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#212429",
    borderRadius: 16,
    width: 120,
    height: 120,
    margin: 16,
    elevation: 5,
    borderWidth: 1,
    borderColor: Colors.gray,

  },
  text: {
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "winkyRough"
  }


})

export default Tile

// Copyright 2025 Darshan Aguru