import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import Climate from './Climate'
import Config from './Config'

const Stack = createStackNavigator()

function Routes() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" headerMode="none">
            <Stack.Screen name="Home" component={Climate} />
            <Stack.Screen name="Settings" component={Config} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes