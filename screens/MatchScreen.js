import { View, Text } from 'react-native'
import React from 'react'

export default function MatchScreen() {
  return (
    <View 
        style={{
            backgroundColor: 'rgba(107, 114, 128, 0.8)'
        }}
        className="flex-1 justify-center items-center "
    >
      <Text className="text-4xl text-green-300 font-extrabold">IT'S A</Text>
      <Text className="text-8xl text-green-300 font-extrabold">MATCH</Text>
    </View>
  )
}