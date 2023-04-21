import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function MatchScreen() {
  const navigation = useNavigation()

  return (
    <View 
        style={{
            backgroundColor: 'rgba(107, 114, 128, 0.8)'
        }}
        className="flex-1 justify-center items-center "
    >
      <Text className="text-4xl text-green-300 font-extrabold">IT'S A</Text>
      <Text className="text-8xl text-green-300 font-extrabold">MATCH</Text>
      <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className="bg-white px-20 py-5 rounded-2xl absolute bottom-40"
      >
            <Text className="font-semibold">Send message</Text>
      </TouchableOpacity>
    </View>
  )
}