import { 
    View, 
    Text,
    Image
} from 'react-native'
import React from 'react'

export default function UserCard({ card }) {
    
  return (
    <View className="relative bg-white h-3/4 rounded-xl">
        <Image
            source={{
                uri: card.photoURL
            }}
            className="absolute h-full w-full rounded-xl"
        />
        <View className="absolute bottom-0 rounded-b-xl bg-white w-full flex-row items-center p-4">
            <View className="flex-1">
                <Text className="font-bold text-xl">{card.firstName} {card.lastName}</Text>
                <Text className="text-gray-500">{card.occupation}</Text>
            </View>
            <View>
                <Text className="font-bold text-2xl">{card.age}</Text>
            </View>
        </View>
    </View>
  )
}