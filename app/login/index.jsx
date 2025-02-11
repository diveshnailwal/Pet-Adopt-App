import { Text, Image, View, StyleSheet, Dimensions, Pressable } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';

const { width, height } = Dimensions.get('window');

// Warm-up the browser for OAuth authentication
const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

// Ensure the browser session completes if it was left open
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(tabs)/home'),
        useWebView: false, // Forces external browser instead of WebView
      });
  
      if (createdSessionId) {
        console.log('OAuth successful. Setting active session...');
        await setActive({ session: createdSessionId });
      } else {
        console.warn('OAuth completed but no session ID was returned.');
      }
    } catch (error) {
      console.error('OAuth error:', error);
    }
  }, [startOAuthFlow]);
  

  return (
    <View style={styles.container}>
      <Image 
        source={require('./../../assets/images/login.webp')} 
        style={styles.backgroundImage}  
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Want A Pet?</Text>
        <Text style={styles.subtitle}>
          Adopt a furry friend today! Give them a loving home and find a companion for life. 🐾❤️
        </Text>
      </View>

      <Pressable 
        style={styles.button} 
        onPress={onPress} 
        pointerEvents="auto" // Prevent accidental double-clicking
      >
        <Text style={styles.buttonText}>Login with Google</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: height * 0.5, 
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingHorizontal: 20, 
  },
  title: {
    fontFamily: 'Outfit', 
    fontSize: 30,
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginTop: 10,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#E8B20E',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    marginBottom: 80,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
  }
});
