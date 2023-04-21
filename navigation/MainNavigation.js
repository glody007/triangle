import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import LoginScreen from '../screens/LoginScreen';
import IdentityScreen from '../screens/IdentityScreen';
import MatchScreen from '../screens/MatchScreen';
import MessageScreen from '../screens/MessageScreen';
import useAuth from "../hooks/useAuth"

const Stack = createNativeStackNavigator()

export default function MainNavigation() {
  const { user } = useAuth()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
        {user ? (
          <>
            <Stack.Group>
              <Stack.Screen name="HomeScreen" component={HomeScreen} />
              <Stack.Screen name="ChatScreen" component={ChatScreen} />
              <Stack.Screen name="MessageScreen" component={MessageScreen} />
            </Stack.Group>
            <Stack.Group screenOptions={{
              presentation: 'modal'
            }}>
              <Stack.Screen name="IdentityScreen" component={IdentityScreen} />
            </Stack.Group>
            <Stack.Group screenOptions={{
              presentation: 'transparentModal'
            }}>
              <Stack.Screen name="MatchScreen" component={MatchScreen} />
            </Stack.Group>
          </>
        ) : (
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
        )}
    </Stack.Navigator>
  )
}