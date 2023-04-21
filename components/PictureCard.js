import { 
  View, 
  TouchableOpacity,
  Image
} from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';

export default function PictureCard({ photoURL }) {
  return (
    <TouchableOpacity 
      disabled={photoURL !== ''} 
      className={`relative h-40 bg-slate-100 rounded-xl ${!photoURL && "border-dashed border-gray-300 border-2"}`}
    >
      {photoURL ? (
        <>
          <Image 
            source={{ uri: photoURL }}
            className="absolute h-full w-full rounded-xl"
          />
          <TouchableOpacity className="absolute -bottom-3 -right-3 bg-white rounded-full p-1">
            <Entypo name="cross" size={24} color="#f87171" />
          </TouchableOpacity>
        </> 
      ) : (
        <TouchableOpacity className="absolute -bottom-3 -right-3 bg-red-400 rounded-full p-1">
          <Entypo name="plus" size={24} color="white" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  )
}