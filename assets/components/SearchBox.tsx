import { View, StyleSheet } from 'react-native'
import React, { memo } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { Colors } from '@/assets/constants/Colors';
import { getShadow } from '@/assets/utils/shadow';

type SearchBoxProps = {
  value: string,
  onChangeText: (query: string) => void,
  placeholder: string,
}

const SearchBox = memo(({ placeholder, value, onChangeText }: SearchBoxProps) => {
  return (
    <View>
      <View style={styles.container}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#888"
          style={styles.input}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 20,
    backgroundColor: '#25292e', // explicit background for shadow visibility
    ...getShadow("#ffffff", 0.3, 2, 5, { width: 3, height: 3 }),
    boxShadow: "4px 4px 2px 2px #ffffff",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "white",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

})

export default SearchBox

// Copyright 2025 Darshan Aguru