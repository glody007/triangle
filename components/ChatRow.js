import { 
    View, 
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import getMatchedUser from '../lib/getMatchedUser'
import useAuth from '../hooks/useAuth'

export default function ChatRow({ matchedUsers }) {
    const navigation = useNavigation()
    const { user } = useAuth()
    const matchedUser = getMatchedUser(matchedUsers, user.uid)

    return (
        <TouchableOpacity 
            onPress={() => navigation.navigate('MessageScreen', { matchedUsers })}
            className="flex-row items-center space-x-4"
        >
            <View>
                <Image 
                    source={{
                        uri: matchedUser.photoURL
                    }}
                    style={{
                        resizeMode: 'cover'
                    }}
                    className="h-20 w-20 rounded-full"
                />
            </View>
            <View className="border-b border-gray-300 h-full w-full justify-center">
                <Text className="text-xl font-bold">{matchedUser.displayName}</Text>
                <Text className="text-gray-500">last message</Text>
            </View>
        </TouchableOpacity>
    )
}