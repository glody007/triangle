import { 
  View, 
  Text,
  Image, 
  TouchableOpacity
} from 'react-native'
import React from 'react'
import useAuth from '../hooks/useAuth'

export default function NoProfile() {
  const { user } = useAuth()

  return (
    <View className="flex-1 justify-center items-center">
      <View className="bg-red-50 rounded-full p-6 border-red-200 border">
        <View className="bg-red-100 rounded-full p-2 border-red-200 border">
          <Image 
              source={{
                  uri: user.photoURL
              }}
              className="h-14 w-14 rounded-full border-white border-2"
          />
        </View>
      </View>

      <Text className="text-lg font-semibold mt-10">
        Plus aucun profil dans ta zone.
      </Text>

      <Text className="text-center text-lg text-gray-500 w-64 mt-2">
        Augmente tes parametres de distance pour voir plus de profils autour de toi.
      </Text>
    </View>
  )
}