import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { RootStackParamList } from './src/types';
import ArtWorksList from './src/views/ArtWorksList';
import ArtWorkDetails from './src/views/ArtWorkDetails';
import FavoriteArtWorks from './src/views/FavoriteArtworks';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/config/toastConfig';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
      'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
      'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SafeAreaView style={styles.container} edges={['bottom']} onLayout={onLayoutRootView}>
          <StatusBar style="dark" />
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: '#b50938',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontFamily: 'Inter-Bold',
              },
            }}
          >
            <Stack.Screen
              name='ArtWorksList'
              component={ArtWorksList}
              options={({ navigation }) => ({
                title: 'Artworks list',
                headerRight: () => (
                  <TouchableOpacity
                  style={{ marginRight: 16 }}
                    onPress={() => navigation.navigate('FavoriteArtWorks')}
                  >
                    <Ionicons name="heart" size={24} color="#fff" />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen
              name='ArtWorkDetails'
              component={ArtWorkDetails}
              options={{
                title: 'Artwork details',
              }}
            />
            <Stack.Screen
              name='FavoriteArtWorks'
              component={FavoriteArtWorks}
              options={{
                title: 'My favorite artworks',
              }}
            />
          </Stack.Navigator>
        </SafeAreaView>
        <Toast config={toastConfig} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
