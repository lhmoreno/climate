import React from 'react'
import Climate from './src/Climate'
import { useFonts, JosefinSans_700Bold, JosefinSans_300Light } from '@expo-google-fonts/josefin-sans'
import { AppLoading } from 'expo'

export default function App() {
  const [fontsLoaded] = useFonts({
    JosefinSans_700Bold,
    JosefinSans_300Light
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <Climate />
  )
}