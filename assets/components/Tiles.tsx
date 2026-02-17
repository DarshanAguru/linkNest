import { View, StyleSheet } from 'react-native'
import React, { memo, useMemo } from 'react'
import Tile from './Tile'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

interface dataProps {
  tag: string,
  bgColor: string,
  id: number,
}
interface TilesProps {
  data: dataProps[],
}

const Tiles = memo(({ data }: TilesProps) => {

  const modefiedData = useMemo(() => {
    const res: dataProps[][] = [];
    for (let i = 0; i < data.length; i += 2) {
      const pair = data.slice(i, i + 2); // grab two items
      res.push(pair);
    }
    return res;
  }, [data]);


  return (

    <GestureHandlerRootView>
      {modefiedData.map((mData, i) => <View key={i} style={styles.tiles}>
        {mData.map((tagData) => { return <Tile key={tagData.id} id={tagData.id} tag={tagData.tag} bgColor={tagData.bgColor} /> })}
      </View>)}
    </GestureHandlerRootView>
  )
})


const styles = StyleSheet.create({

  tiles: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-evenly",
    alignItems: "center",
  }


})

export default Tiles

// Copyright 2025 Darshan Aguru