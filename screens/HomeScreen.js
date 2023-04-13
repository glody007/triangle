import { 
    View, 
    Text, 
    TouchableOpacity,
    Image,
    SafeAreaView
} from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import useAuth from '../hooks/useAuth'
import Swiper from 'react-native-deck-swiper';
import UserCard from '../components/UserCard';

const DUMMY_DATA = [
    {
        firstName: "Kalash",
        lastName: "Criminel",
        occupation: "Singer",
        photoURL: "https://www.lalibre.be/resizer/k5_yG4xruQAq4jtsj41CXCr_0pA=/0x201:1706x1334/1200x800/filters:format(jpeg)/cloudfront-eu-central-1.images.arcpublishing.com/ipmgroup/CID3DIATEVEY3AFXVG6DBAA52Q.jpg",
        age: 27
    },
    {
        firstName: "Maitre",
        lastName: "Yoda",
        occupation: "Jedi",
        photoURL: "https://www.projet-voltaire.fr/pv-wp/wp-content/uploads/2015/05/Ton-pere-il-est-Yoda-grand-maitre-de-lanastrophe-918x1024.jpg",
        age: 1000
    },
    {
        firstName: "Ada",
        lastName: "Lovelace",
        occupation: "Software Developer",
        photoURL: "https://www.bibmath.net/bios/images/lovelace.jpg",
        age: 1000
    },
    {
        firstName: "Donald",
        lastName: "Knuth",
        occupation: "Software Developer",
        photoURL: "https://static01.nyt.com/images/2018/12/18/science/18SCI-KNUTH1/merlin_148126767_cd44bb13-bc4d-4eeb-b1b7-73cc4dc174e7-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
        age: 80
    },
    {
        firstName: "Grace",
        lastName: "Hopper",
        occupation: "Compiler Developer",
        photoURL: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-515352074.jpg",
        age: 1000
    },
]

export default function HomeScreen() {
    const { logout, user } = useAuth()

    return (
        <SafeAreaView className="flex-1">
            {/* Header */}
            <View className="flex-row items-center justify-between mx-4">
                <TouchableOpacity>
                    <Image 
                        source={{
                            uri: user.photoURL
                        }}
                        className="h-10 w-10 rounded-full"
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image 
                        source={require('../assets/logo.png')}
                        className="h-16 w-16 rounded-full"
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="chatbubbles" size={30} color="#FF5864" />
                </TouchableOpacity>
            </View>

            {/* Body */}
            <View className="flex-1 -mt-6">
                <Swiper
                    cards={DUMMY_DATA}
                    renderCard={(card) => {
                        return (
                            <UserCard card={card} />
                        )
                    }}
                    overlayLabels={{
                        left: {
                            title: 'NOPE',
                            style: {
                                label: {
                                  backgroundColor: 'transparent',
                                  borderColor: '#FF5864',
                                  color: '#FF5864',
                                  borderWidth: 4
                                },
                                wrapper: {
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    justifyContent: 'flex-start',
                                    transform: [
                                        {rotate: '30deg'}, 
                                        {translateY: 40}, 
                                        {translateX: -200}
                                    ]
                                }
                            }
                          },
                          right: {
                            title: 'LIKE',
                            style: {
                                label: {
                                    backgroundColor: 'transparent',
                                    borderColor: '#2dd4bf',
                                    color: '#2dd4bf',
                                    borderWidth: 4
                                },
                                wrapper: {
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    transform: [
                                        {rotate: '-30deg'}, 
                                        {translateY: 40}, 
                                        {translateX: 200}
                                    ]
                                }
                            }
                          },
                    }}
                    verticalSwipe={false}
                    animateCardOpacity
                    onSwiped={(cardIndex) => {console.log(cardIndex)}}
                    onSwipedAll={() => {console.log('onSwipedAll')}}
                    cardIndex={0}
                    backgroundColor={'transparent'}
                    stackSize= {5}>
                </Swiper>
            </View>
        </SafeAreaView>
    )
}