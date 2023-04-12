import { 
    View, 
    Text, 
    TouchableOpacity,
    ImageBackground
} from 'react-native'
import React, { useLayoutEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'

export default function LoginScreen() {
    const navigation = useNavigation()
    const { user, googleAuth } = useAuth()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    return (
        <View className="flex-1">
            <ImageBackground
                resizeMode='cover' 
                className="flex-1 items-center"
                source={{
                    uri: "https://tinder.com/static/tinder.png"
                }}
            >
                <TouchableOpacity 
                    onPress={() => googleAuth()}
                    className="bg-white px-20 py-5 rounded-2xl absolute bottom-40"
                >
                    <Text className="font-semibold">Sign in</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}