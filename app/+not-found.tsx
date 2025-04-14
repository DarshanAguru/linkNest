import { View, StyleSheet, Text, Vibration } from 'react-native';
import { Link, Stack, useRouter } from 'expo-router';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

export default function NotFoundScreen() {
    const navigation = useRouter();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack.Screen options={{ title: 'Oops! Not Found' , headerShadowVisible: false,headerBackVisible: false, headerLeft: () => <TouchableOpacity onPress={()=>{Vibration.vibrate(10);navigation.back()}}><Text><AntDesign name="back" size={22} color="white" /></Text></TouchableOpacity>}} />
      <View style={styles.container}>
        <Link href="/" style={styles.button}>
          <Text>Go back to Home screen!</Text>
        </Link>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
