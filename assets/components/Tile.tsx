import { View, StyleSheet, Vibration, TouchableOpacity } from 'react-native'
import React, { memo, useCallback } from 'react'
import { Colors } from '@/assets/constants/Colors'
import { Text } from '@react-navigation/elements';
import { useRouter } from 'expo-router';
import * as LocalAuthentication from 'expo-local-authentication';
import { Entypo } from '@expo/vector-icons';


type SearchBoxProps = {
  tag: string,
  bgColor: string,
  id: number,
}

const Tile = memo(({ id, tag, bgColor }: SearchBoxProps) => {
  const router = useRouter();

  const handlePress = useCallback(async () => {
    Vibration.vibrate(10);

    if (tag.toLowerCase() === 'private') {
      const authResult = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Unlock to view your links',
        fallbackLabel: 'Use Passcode',
      });

      if (!authResult.success) {
        return; // Don't route if auth failed or was cancelled
      }
    }

    router.push({ pathname: '/linkdata/[id]', params: { id: tag, tagId: String(id) } });
  }, [id, tag, router]);

  return (
    <TouchableOpacity onPress={handlePress} >
      <View style={[styles.tile, { boxShadow: `6px 6px 2px 4px ${bgColor}` }]}>
        <Text
          style={[styles.text, { color: bgColor }]}
          numberOfLines={4}
          ellipsizeMode='tail'
        >
          {tag}
        </Text>
        {tag.toLowerCase() === 'private' && <Entypo name="lock" size={18} color={bgColor} style={{ position: 'absolute', top: 10, right: 10, opacity: 0.75 }} />}
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
    fontFamily: "winkyRough",
    textAlign: 'center',
    paddingHorizontal: 8,
    paddingVertical: 5,
  }
})

export default Tile

// Copyright 2025 Darshan Aguru