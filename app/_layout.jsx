import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { ClerkProvider } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

// Ensure SplashScreen does not auto-hide
SplashScreen.preventAutoHideAsync();

// Create Token Cache for Secure Storage
const createTokenCache = () => {
  return {
    getToken: async (key) => {
      try {
        const item = await SecureStore.getItemAsync(key);
        if (item) {
          console.log(`${key} was used 🔐 \n`);
        } else {
          console.log('No values stored under key: ' + key);
        }
        return item;
      } catch (error) {
        console.error('Secure store get item error: ', error);
        await SecureStore.deleteItemAsync(key);
        return null;
      }
    },
    saveToken: (key, token) => {
      return SecureStore.setItemAsync(key, token);
    },
  };
};

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const tokenCache = createTokenCache(); // Fix: Properly instantiate token cache

  const [fontsLoaded] = useFonts({
    'Outfit': require("../assets/fonts/DeliciousHandrawn-Regular.ttf"),
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
        setIsReady(true);
      }
    }
    prepare();
  }, [fontsLoaded]);

  if (!isReady) {
    return null; // Keep splash screen until everything is loaded
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)"
        options={{
          headerShown: false
        }}/>
        <Stack.Screen 
          name="login/index"
          options={{
            headerShown: false
          }}
        />
      </Stack>
    </ClerkProvider>
  );
}
