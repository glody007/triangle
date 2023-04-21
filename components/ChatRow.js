import { 
    View, 
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import getMatchedUser from '../lib/getMatchedUser'
import useAuth from '../hooks/useAuth'
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'

export default function ChatRow({ matchedUsers }) {
    const navigation = useNavigation()
    const { user } = useAuth()
    const matchedUser = getMatchedUser(matchedUsers, user.uid)
    const [lastMessageData, setLastMessageData] = useState('')

    useEffect(() => {
        let unsub;

        const fetchLastMessage = async () => {
            unsub = onSnapshot(
                query(
                    collection(db, 'matches', matchedUsers.id, 'messages'),
                    orderBy("timestamp", "desc"),
                    limit(1)
                ), 
                (snapshot) => {
                    const messages = snapshot.docs
                                        .map(doc => ({
                                            id: doc.id,
                                            ...doc.data()
                                        })) 
                    if(messages?.length > 0) setLastMessageData(messages[0])

                })
        }

        fetchLastMessage()
        return unsub
    }, [])

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
                <Text className="text-gray-500">{lastMessageData.message}</Text>
            </View>
        </TouchableOpacity>
    )
}