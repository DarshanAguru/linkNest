import { View,  StyleSheet } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import {Colors} from '@/assets/constants/Colors';

type SearchBoxProps = {
    value: string,
    onChangeText: (query:string)=>void,
    placeholder: string,
}

const SearchBox = (({placeholder, value, onChangeText}: SearchBoxProps) => {
    return (
      <View>
        <View style={styles.container}>
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#888"
            style={styles.searchBox}
          />
        </View>
      </View>
    );
  });

const styles = StyleSheet.create({
    container:{

        flexDirection: 'row',
        alignItems: 'center',
    },
    
    searchBox:{
        flex: 1,
        fontSize: 16,
        color: "white",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: Colors.gray,
        borderRadius: 26,
        marginVertical: 8,
        marginHorizontal: 20,
        boxShadow: "6px 6px 2px 4px rgba(255,255,255,0.5)",
    },
    
})

export default SearchBox

// Copyright 2025 Darshan Aguru