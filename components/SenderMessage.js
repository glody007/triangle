import { 
    View, 
    Text,
    Image 
} from 'react-native'
import React from 'react'

export default function SenderMessage({ data, user }) {
  return (
    <View className="flex-row items-center space-x-2 px-4 mt-2">
        <Image 
            source={{
                uri: user.photoURL
            }}
            style={{
                resizeMode: 'cover'
            }}
            className="h-10 w-10 rounded-full"
        />
        <View className="bg-gray-300 rounded-r-2xl rounded-tl-2xl p-2">
            <Text className="text-lg">{data.message}</Text>
        </View>
    </View>
  )
}