import { FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import ChatRow from './ChatRow'
import { 
    collection, 
    onSnapshot, 
    query, 
    where 
} from 'firebase/firestore'
import useAuth from '../hooks/useAuth'
import { db } from '../firebase'
import getMatchedUser from '../lib/getMatchedUser'

export default function ChatList() {
    const { user } = useAuth()
    const [matchedUsers, setMatchedUsers] = useState([])

    useEffect(() => {
        let unsub;

        const fetchMatches = async () => {
            unsub = onSnapshot(
                query(
                    collection(db, 'matches'),
                    where("usersMatched", "array-contains", user.uid)
                ), 
                (snapshot) => { 
                    const matchedUsers = snapshot.docs
                                            .map(doc => ({
                                                id: doc.id,
                                                ...doc.data()
                                            }))  
                    setMatchedUsers(matchedUsers) 
                }
            )
        }

        fetchMatches()
        return unsub
    }, [])

    return (
        <FlatList 
            data={matchedUsers}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <ChatRow matchedUsers={item} />}
        />
    )
}