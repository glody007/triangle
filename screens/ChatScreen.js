import { 
    View, 
    Image,
    Text,
    TouchableOpacity
} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import ChatList from '../components/ChatList'
import { useNavigation } from '@react-navigation/native';

export default function ChatScreen() {
    const navigation = useNavigation()

    return (
        <SafeAreaView className="flex-1">
            {/* Header */}
            <View className="flex-row items-center justify-center py-2 px-4 space-x-1">
                <TouchableOpacity 
                    className="absolute top-2 left-4"
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons 
                        name="arrow-back" 
                        size={24} 
                        color="gray" 
                    />
                </TouchableOpacity>
                <Image 
                    source={require('../assets/logo.png')}
                    className="h-5 w-5 rounded-full"
                />
                <Text className="font-semibold text-red-400 text-4xl">
                    tinder
                </Text>
            </View>

            {/* Chat list */}
            <View className="flex-1 px-4 mt-4">
                <ChatList />
            </View>
        </SafeAreaView>
    )
}