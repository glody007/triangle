import { 
    View, 
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
import React from 'react'

export default function ChatRow({ user }) {
  return (
    <TouchableOpacity className="flex-row items-center space-x-4">
      <View>
        <Image 
            source={{
                uri: user.photoURL
            }}
            style={{
                resizeMode: 'cover'
            }}
            className="h-20 w-20 rounded-full"
        />
      </View>
      <View className="border-b border-gray-300 h-full w-full justify-center">
        <Text className="text-xl font-bold">{user.displayName}</Text>
        <Text className="text-gray-500">last message</Text>
      </View>
    </TouchableOpacity>
  )
}