import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ArtWorksList from './src/views/ArtWorksList';
import ArtWorkDetails from './src/views/ArtWorkDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <Stack.Navigator>
          <Stack.Screen
            name='Home'
            component={ArtWorksList}
            options={{ title: 'Listado de Obras de Arte' }}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
