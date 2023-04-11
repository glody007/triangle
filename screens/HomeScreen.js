import { 
    View, 
    Text, 
    TouchableOpacity
} from 'react-native'
import React from 'react'
import useAuth from '../hooks/useAuth'

export default function HomeScreen() {
  const { logout } = useAuth()

    return (
        <View className="flex-1 justify-center items-center">
            <TouchableOpacity onPress={() => logout()}>
                <Text className="text-blue-500 text-lg font-bold">Logout</Text>
            </TouchableOpacity>
        </View>
    )
}