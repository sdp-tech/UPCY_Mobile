import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './src/pages/Home';
import MyPageScreen from './src/pages/MyPage';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={() => ({
          headerShown: false,
        })}>
        <Stack.Screen name="Home" component={HomeTab} />
        {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export type TabProps = {
  홈: undefined;
  마이페이지: undefined;
};

const Tab = createBottomTabNavigator<TabProps>();
const HomeTab = (): JSX.Element => {
  return (
    <Tab.Navigator
      initialRouteName="홈"
      screenOptions={() => ({
        headerShown: false,
      })}>
      <Tab.Screen name={'홈'} component={HomeScreen} />
      <Tab.Screen name={'마이페이지'} component={MyPageScreen} />
    </Tab.Navigator>
  );
};

export default App;
