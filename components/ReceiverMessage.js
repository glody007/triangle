import { View, Text } from 'react-native'
import React from 'react'

export default function ReceiverMessage({ data }) {
  return (
    <View className="flex-row items-center justify-end space-x-2 px-4 mt-2">
        <View className="bg-blue-400 rounded-l-2xl rounded-tr-2xl p-2">
            <Text className="text-lg text-white">{ data.message }</Text>
        </View>
    </View>
  )
}