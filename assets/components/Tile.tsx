import { View , StyleSheet, Vibration, ToastAndroid } from 'react-native'
import React, { useEffect } from 'react'
import {Colors} from '@/assets/constants/Colors'
import { Text } from '@react-navigation/elements';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';


type SearchBoxProps = {
    tag: string,
    bgColor: string,
    id: number,
}

const Tile = (({id, tag, bgColor}: SearchBoxProps, key: React.Key) => {
  const router = useRouter();
 
    return (
      <TouchableOpacity key={key} onPress={()=>{Vibration.vibrate(8); router.push({pathname: '/linkdata/[id]' , params:{id: tag, tagId: String(id)}});}} >
      <View style={{...styles.tile, backgroundColor: "#212429", boxShadow: `6px 6px 2px 4px ${bgColor}`}}>
         
            <Text style={{color: bgColor, fontSize: 20, fontWeight: "400", fontFamily: "winkyRough"}}>{tag}</Text>
          
      </View>
      </TouchableOpacity>
    );
  });

const styles = StyleSheet.create({
   
    tile:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        width: 120,
        height: 120,
        margin: 16,
        elevation: 5,
        borderWidth: 1,
        borderColor: Colors.gray,

    }
    
    
})

export default Tile