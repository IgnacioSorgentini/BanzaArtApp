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

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SafeAreaView style={styles.container} edges={['bottom']}>
          <StatusBar style="dark" />
          <Stack.Navigator>
            <Stack.Screen
              name='ArtWorksList'
              component={ArtWorksList}
              options={({ navigation }) => ({
                title: 'Listado de Obras de Arte',
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('FavoriteArtWorks')}
                  >
                    <Ionicons name="heart" size={24} color="blue" />
                  </TouchableOpacity>
                ),
                headerStyle: {
                  backgroundColor: '#b50938', // Color de fondo del encabezado
                },
                headerTintColor: '#fff', // Color del texto del encabezado
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              })}
            />
            <Stack.Screen
              name='ArtWorkDetails'
              component={ArtWorkDetails}
              options={{
                title: 'Detalle de Obra',
                headerStyle: {
                  backgroundColor: '#b50938',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name='FavoriteArtWorks'
              component={FavoriteArtWorks}
              options={{
                title: 'Mis Favoritos',
                headerStyle: {
                  backgroundColor: '#b50938',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
