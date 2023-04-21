import { 
    View, 
    Text,
    Image,
    TextInput,
    SafeAreaView,
    TouchableOpacity
} from 'react-native'
import React, { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import PictureCard from '../components/PictureCard';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigation } from '@react-navigation/native';

export default function IdentityScreen() {
    const { user } = useAuth()
    const navigation = useNavigation()

    const [age, setAge] = useState('')
    const [job, setJob] = useState('')
    const [photoURL, setPhotoUrl] = useState('')

    const isFormInvalid = !age || !job || !photoURL

    const updateProfile = () => {
        setDoc(doc(db, 'users', user.uid), {
            id: user.uid,
            displayName: user.displayName,
            photoURL: photoURL,
            job: job,
            age: age,
            timestamp: serverTimestamp(),
        }).then(() => {
            navigation.navigate('HomeScreen')
        }).catch((error) => {
            alert(error.message)
        })
    }

    return (
        <SafeAreaView className="flex-1 mt-4">
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
                Picture
            </Text>
            <View className="flex-row bg-white"> 
                <TextInput
                    value={photoURL}
                    onChangeText={(text) => setPhotoUrl(text)}
                    className="flex-1 text-xl px-4 pt-2 pb-3" 
                    placeholder="Picture url"
                />
            </View>

            <Text className="text-xl font-semibold px-4 pb-2 mt-4">
                Age
            </Text>
            <View className="flex-row bg-white"> 
                <TextInput
                    value={age}
                    onChangeText={(text) => setAge(text)}
                    keyboardType='numeric'
                    maxLength={2}
                    className="flex-1 text-xl px-4 pt-2 pb-3" 
                    placeholder="Your age"
                />
            </View>

            <Text className="text-xl font-semibold px-4 pb-2 mt-4">
                Job
            </Text>
            <View className="flex-row bg-white"> 
                <TextInput
                    value={job}
                    onChangeText={(text) => setJob(text)}
                    className="flex-1 text-xl px-4 pt-2 pb-3" 
                    placeholder="Your occupation"
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

            <View className="absolute bottom-10 flex-row w-full">
                <TouchableOpacity 
                    disabled={isFormInvalid}
                    onPress={updateProfile}
                    className={`flex-1 bg-red-400 rounded-xl mx-4 p-4 ${isFormInvalid && "bg-gray-400"}`}
                >
                    <Text className="text-center text-xl text-white font-semibold">Update profile</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}