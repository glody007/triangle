import { 
    View, 
    Text, 
    TouchableOpacity,
    Image
} from 'react-native'
import React, { 
    useRef, 
    useLayoutEffect, 
    useEffect,
    useState 
} from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import useAuth from '../hooks/useAuth'
import Swiper from 'react-native-deck-swiper';
import UserCard from '../components/UserCard';
import NoProfile from '../components/NoProfile';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'


export default function HomeScreen() {
    const { logout, user } = useAuth()
    const swiperRef = useRef()
    const navigation = useNavigation()
    const [profiles, setProfiles] = useState([])

    useLayoutEffect(() => {
        const unsub = onSnapshot(doc(db, 'users', user.uid), (snapshot) => {
            if(!snapshot.exists()) {
                navigation.navigate('IdentityScreen')
            }
        })

        return unsub
    }, [])

    useEffect(() => {
        let unsub;

        const fetchProfiles = async () => {
            unsub = onSnapshot(collection(db, 'users'), (snapshot) => {
                setProfiles(
                    snapshot.docs
                        .filter((doc) => doc.id !== user.uid)
                        .map((doc) => ({
                            id: doc.id,
                            ...doc.data()
                        }))
                )
            })
        }

        fetchProfiles()
        return unsub
    }, [])

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
                <TouchableOpacity onPress={() => navigation.navigate('IdentityScreen')}>
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
                <NoProfile />
                <Swiper
                    ref={swiperRef}
                    cards={profiles}
                    renderCard={(card) => card ? <UserCard card={card} /> : <></>}
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
                    onSwipedLeft={(cardIndex) => {
                        console.log(`Card ${cardIndex} swiped NONE`)
                    }}
                    onSwipedRight={(cardIndex) => {
                        console.log(`Card ${cardIndex} swiped LIKE`)
                    }}
                    onSwipedAll={(
                        console.log('Swiped ALL')
                    )}
                    cardIndex={0}
                    backgroundColor={'transparent'}
                    stackSize={5}>
                </Swiper>
            </View>

            <View className="flex-row justify-evenly">
                <TouchableOpacity
                    onPress={() => swiperRef.current.swipeLeft()}
                    className="bg-red-200 rounded-full p-4"
                >
                    <Entypo name="cross" size={24} color="red" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => swiperRef.current.swipeRight()}
                    className="bg-green-200 rounded-full p-4"
                >
                    <AntDesign name="heart" size={24} color="green" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}