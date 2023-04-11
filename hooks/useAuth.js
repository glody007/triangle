import React, { 
    createContext, 
    useContext,
    useState,
    useEffect,
    useMemo
} from 'react'
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
    GoogleAuthProvider,
    signInWithCredential,
    onAuthStateChanged,
    signOut
} from "firebase/auth"
import { 
    IOS_CLIENT_ID,
    ANDROID_CLIENT_ID,
    EXPO_CLIENT_ID
} from '@env'
import { auth } from "../firebase"

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext({})

export function AuthProvider({ children }) {
    const [token, setToken] = useState("");
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false)
    const [loadingInitial, setLoadingInitial] = useState(true)
    const [loading, setLoading] = useState(false)

    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: IOS_CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID,
        expoClientId: EXPO_CLIENT_ID
    })

    const firebaseSignIn = async (authentication) => {
        const {idToken, accessToken} = authentication
        const credential = GoogleAuthProvider.credential(idToken, accessToken)
        
        await signInWithCredential(auth, credential)
    }

    useEffect(
        () => onAuthStateChanged(auth, (user) => {
            if(user) {
                setUser(user)
            } else {
                setUser(null)
            }

            setLoadingInitial(false)
        }),
        []
    )

    useEffect(() => {
        if (response?.type === "success") {
            setLoading(true)

            setToken(response.authentication.accessToken);
            firebaseSignIn(response.authentication)
                .catch(error => setError(error))
                .finally(() => setLoading(false))
        }
    }, [response, token]);

    const getUserInfo = async () => {
        try {
          const response = await fetch(
            "https://www.googleapis.com/userinfo/v2/me",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
    
          const user = await response.json();
          setUser(user);
        } catch (error) {
          // Add error handler here
        }
    };

    const googleAuth = () => {
        promptAsync()
    }

    const logout = () => {
        setLoading(true) 

        signOut(auth)
            .catch((error) => setError(error)) 
            .finally(() => setLoading(false))       
    }

    const memoedValue = useMemo(
        () => ({
            user,
            token,
            googleAuth,
            logout,
            loading,
            error
        }),
        [user, token, loading, error, googleAuth]
    )

    return (
        <AuthContext.Provider value={{
            user,
            token,
            googleAuth,
            logout,
            loading,
            error
        }}>
            {!loadingInitial && children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext)
}