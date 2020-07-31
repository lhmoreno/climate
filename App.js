import React from 'react'
import Routes from './src/routes'
import { useFonts, JosefinSans_700Bold, JosefinSans_300Light } from '@expo-google-fonts/josefin-sans'
import { View, Text } from 'react-native'

export default function App() {
  const [fontsLoaded] = useFonts({
    JosefinSans_700Bold,
    JosefinSans_300Light
  })

  if (!fontsLoaded) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <Routes />
  )
}