import { 
    View, 
    Text, 
    Image,
    SafeAreaView, 
    TouchableOpacity,
    TextInput,
    ScrollView,
    FlatList
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { addDoc, collection, doc, onSnapshot, query, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import useAuth from '../hooks/useAuth';
import getMatchedUser from '../lib/getMatchedUser';
import SenderMessage from '../components/SenderMessage';
import ReceiverMessage from '../components/ReceiverMessage';

export default function MessageScreen() {
    const [inputText, setInputText] = useState('')
    const [messages, setMessages] = useState([])
    const navigation = useNavigation()
    const { user } = useAuth()
    const { matchedUsers } = useRoute().params
    const matchedUser = getMatchedUser(matchedUsers, user.uid)
    
    useEffect(() => {
        let unsub;

        const fetchMessages = async () => {
            unsub = onSnapshot(
                query(
                    collection(db, 'matches', matchedUsers.id, 'messages')
                ), 
                (snapshot) => {
                    setMessages(
                        snapshot.docs
                            .map(doc => ({
                                id: doc.id,
                                ...doc.data()
                            })) 
                    )
                })
        }

        fetchMessages()
        return unsub
    }, [])

    const sendMessage = () => {
        addDoc(collection(db, 'matches', matchedUsers.id, 'messages'), {
            timestamp: serverTimestamp(),
            senderId: user.uid,
            message: inputText,
        })
        setInputText('')
    }

    return (
        <SafeAreaView className="flex-1">
            {/* Header */}
            <View className="flex-row items-center border-gray-200 border-b px-4 pb-2">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons 
                        name="arrow-back" 
                        size={24} 
                        color="gray" 
                    />
                </TouchableOpacity>
                <Image 
                    source={{
                        uri: matchedUser.photoURL
                    }}
                    style={{
                        resizeMode: 'cover'
                    }}
                    className="h-10 w-10 rounded-full ml-6"
                />
                <Text className="font-semibold text-2xl ml-2">
                    {matchedUser.displayName}
                </Text>
            </View>

            {/* Body */}
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
                style={{ flex: 1 }}
            >
                <View className="flex-1 justify-end">
                    {/* Messages */}
                    <FlatList 
                        inverted
                        data={messages}
                        renderItem={({ item }) => item.senderId === user.uid ? (
                            <ReceiverMessage data={item} />
                        ) : (
                            <SenderMessage user={matchedUser} data={item} />
                        )}
                        className="py-4"
                    />

                    {/* Bottom Actions */}
                    <View className="flex-row px-4 space-x-2">
                        <TouchableOpacity
                            className="bg-blue-500 h-8 w-8 justify-center items-center rounded-full"
                        >
                            <Text className="font-semibold text-white">GIF</Text>
                        </TouchableOpacity>
                        <View className="flex-1 flex-row border-gray-300 border rounded-2xl py-2 px-4">
                            <TextInput 
                                placeholder='Rediger un message' 
                                className="flex-1"
                                value={inputText}
                                onChangeText={(text) => setInputText(text)}
                            />
                            <TouchableOpacity onPress={sendMessage}>
                                <Text className="font-bold text-gray-500">
                                    ENVOYER
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}