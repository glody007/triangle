import React, { 
    createContext, 
    useContext,
    useState,
    useEffect
} from 'react'
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { 
    IOS_CLIENT_ID,
    ANDROID_CLIENT_ID,
    EXPO_CLIENT_ID
} from '@env'

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext({})

export function AuthProvider({ children }) {
    const [token, setToken] = useState("");
    const [userInfo, setUserInfo] = useState(null);

    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: IOS_CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID,
        expoClientId: EXPO_CLIENT_ID
    })

    useEffect(() => {
        if (response?.type === "success") {
            setToken(response.authentication.accessToken);
            getUserInfo();
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
          setUserInfo(user);
        } catch (error) {
          // Add error handler here
        }
    };

    return (
        <AuthContext.Provider value={{
            user: userInfo,
            toke: token,
            googleAuth: () => promptAsync({ useProxy: true })
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext)
}