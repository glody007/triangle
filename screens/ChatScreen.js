import { 
    View, 
    Image,
    Text 
} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import ChatList from '../components/ChatList'

export default function ChatScreen() {

  return (
    <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center py-2 px-4 space-x-1">
            <Image 
                source={require('../assets/logo.png')}
                className="h-5 w-5 rounded-full"
            />
            <Text className="font-semibold text-red-400 text-4xl">tinder</Text>
        </View>

        {/* Chat list */}
        <View className="flex-1 px-4 mt-4">
            <ChatList />
        </View>
    </SafeAreaView>
  )
}