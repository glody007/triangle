import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './navigation/MainNavigation';
import { AuthProvider } from './hooks/useAuth';

export default function App() {

  return (
    <NavigationContainer>
      {/* HOC - Higher Order Component */}
      <AuthProvider>
        <MainNavigation />
      </AuthProvider>
    </NavigationContainer>
  );
}
