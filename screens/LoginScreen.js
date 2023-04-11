import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import useAuth from '../hooks/useAuth'

export default function LoginScreen() {
    const { user, googleAuth } = useAuth()

    return (
        <View className="flex-1 justify-center items-center">
            <TouchableOpacity 
                onPress={() => googleAuth()}
                className="bg-blue-500 px-20 py-5 rounded-full"
            >
                <Text className="text-white text-xl font-bold">Login</Text>
            </TouchableOpacity>
        </View>
    )
}