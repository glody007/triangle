import { 
    View, 
    Text,
    Image,
    TextInput
} from 'react-native'
import React from 'react'
import useAuth from '../hooks/useAuth'
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import PictureCard from '../components/PictureCard';

export default function IdentityScreen() {
    const { user } = useAuth()

    return (
        <View className="flex-1 mt-4">
            <View className="flex-row justify-center items-center">
                <Image 
                    source={require('../assets/logo.png')}
                    className="h-10 w-10 rounded-full"
                />
                <Text className="font-semibold text-6xl">tinder</Text>
            </View>

            <Text className="text-center text-xl font-bold mt-4 p-2">
                Welcome {user.displayName}
            </Text>

            <Text className="text-xl font-semibold px-4 pb-2 mt-4">
                Media
            </Text>
            <View className="flex-row space-x-4 mx-4">
                <View className="flex-1">
                    <PictureCard 
                        photoURL={"https://hips.hearstapps.com/hmg-prod/images/gettyimages-515352074.jpg"}
                    />
                </View>
                <View className="flex-1">
                    <PictureCard />
                </View>
                <View className="flex-1">
                    <PictureCard />
                </View>
            </View>

            <Text className="text-xl font-semibold px-4 pb-2 mt-4">
                Age
            </Text>
            <View className="flex-row bg-white"> 
                <TextInput
                    className="flex-1 text-xl px-4 pt-2 pb-3" 
                    placeholder="Your age"
                />
            </View>

            
            <Text className="text-xl font-semibold px-4 pb-2 mt-4">
                About me
            </Text>
            <View className="flex-row bg-white"> 
                <TextInput
                    className="flex-1 text-xl px-4 pt-2 pb-3" 
                    placeholder="About me"
                />
            </View>

            <Text className="text-xl font-semibold px-4 pb-2 mt-4">
                Hobbies
            </Text>
            <View className="flex-row bg-white"> 
                <TextInput
                    className="flex-1 text-xl px-4 pt-2 pb-3" 
                    placeholder="Video game, Sports, Reading"
                />
            </View>

            <Text className="text-xl font-semibold px-4 pb-2 mt-4">
                Languages
            </Text>
            <View className="flex-row items-center space-x-4 bg-white py-2 pl-4"> 
                <FontAwesome5 name="language" size={24} color="#9ca3af" />
                <Text className="flex-1 text-xl text-gray-300">French, Spanish, English</Text>
                <Entypo name="chevron-small-right" size={24} color="#9ca3af" />
            </View>

        </View>
    )
}