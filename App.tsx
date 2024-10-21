import React from 'react';

import { observer } from 'mobx-react-lite';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import authStore from './src/stores/AuthStore';

import AuthScreen from './src/screens/AuthScreen';
import MapViewScreen from './src/screens/MapViewScreen';

const Stack = createStackNavigator();

const App = observer(() => {
  const key = authStore.key;

    return (
        <NavigationContainer>
            <Stack.Navigator>
              {
                key
                ? <Stack.Screen name="MapView" component={MapViewScreen} />
                : <Stack.Screen name="Auth" component={AuthScreen} />
              }
            </Stack.Navigator>
        </NavigationContainer>
    );
});

export default App;
