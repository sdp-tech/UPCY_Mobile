import React, { useContext, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import HomeScreen from './src/pages/Home';
import MyPageScreen from './src/pages/MyPage';
import OrderManagement from './src/components/Home/Order/OrderManagement';

import useLoginGuard from './src/hooks/useLoginGuard';

import HomeIcon from './src/assets/navbar/Home.svg';
import MyPageIcon from './src/assets/navbar/MyPage.svg';
import OrderManagementIcon from './src/assets/navbar/OrderManagement.svg';
import SignIn from './src/components/Auth/SignIn';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomBarProvider, useBottomBar } from './contexts/BottomBarContext';
import { LoginContext, LoginProvider, UserProvider } from './src/common/Context';
import Reformer from './src/components/Auth/Reformer/Reformer';
import SplashScreen from './src/common/SplashScreen';

export type StackProps = {
  Home: undefined;
  Signin: undefined;
  ReformProfile: undefined;
};

const Stack = createNativeStackNavigator<StackProps>();

const GlobalTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

function App(): React.JSX.Element {
  const [isSplashFinished, setIsSplashFinished] = useState(false);

  const finishSplash = () => {
    console.log('finished');
    setIsSplashFinished(true);
  };

  return (
    <BottomBarProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <LoginProvider>
          <UserProvider>
            <NavigationContainer theme={GlobalTheme}>
              {!isSplashFinished ? (
                <SplashScreen onFinish={finishSplash} />
              ) : (
                <Stack.Navigator
                  screenOptions={() => ({
                    headerShown: false,
                  })}>
                  <Stack.Screen name="Home" component={HomeTab} />
                  <Stack.Screen name="Signin" component={SignIn} />
                  <Stack.Screen name="ReformProfile" component={Reformer} />
                </Stack.Navigator>
              )}
            </NavigationContainer>
          </UserProvider>
        </LoginProvider>
      </GestureHandlerRootView>
    </BottomBarProvider>
  );
}

export type TabProps = {
  홈: undefined;
  마이페이지: undefined;
};

const CustomTab = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const loginGuard = useLoginGuard();
  const { options } = descriptors;
  const { isVisible } = useBottomBar(); // 바텀바 보임/숨김 상태를 가져옵니다.

  if (!isVisible) {
    return null; // isVisible이 false일 경우 탭바를 렌더링하지 않습니다.
  }

  return (
    <View
      style={{
        display: 'flex',
        height: 86,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
      }}>
      {state.routes.map((route, index) => {
        const isFocused = state.index == index;
        const onPress = () => { // 하단 탭바 추가하면 여기 수정해야합니다!!!! 
          if (route.name == '홈') {
            if (isFocused)
              navigation.reset({
                routes: [{ name: route.name, params: { id: undefined } }],
              });
            else navigation.navigate(route.name, { id: undefined });
          } else if (route.name == '주문관리') {
            if (isFocused)
              navigation.reset({
                routes: [{ name: route.name, params: { id: undefined } }],
              });
            else navigation.navigate(route.name, { id: undefined });
          } else if (route.name == '마이페이지') {
            if (isFocused)
              navigation.reset({
                routes: [{ name: route.name, params: { id: undefined } }],
              });
            else navigation.navigate(route.name, { id: undefined });
          }
        };
        return (
          <TouchableOpacity
            key={index}
            onPress={route.name == '마이페이지' ? loginGuard(onPress) : onPress}
            // onPress={onPress}
            style={{
              width: '20%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {
              {
                0: <HomeIcon color="#000000" opacity={isFocused ? 1 : 0.4} />,
                1: <OrderManagementIcon color="#000000" opacity={isFocused ? 1 : 0.4} />,
                2: <MyPageIcon color="#000000" opacity={isFocused ? 1 : 0.4} />,

              }[index]
            }

            <Text
              style={{
                color: '#000000',
                opacity: isFocused ? 1 : 0.4,
                marginVertical: 5,
                fontSize: 12,
              }}>
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Tab = createBottomTabNavigator<TabProps>();
const HomeTab = (): JSX.Element => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTab {...props} />}
      id="MainHome"
      initialRouteName="홈"
      screenOptions={() => ({
        headerShown: false,
      })}>
      <Tab.Screen
        name={'홈'}
        component={HomeScreen}
        options={{ tabBarStyle: { display: 'none' } }}
      />
      <Tab.Screen name={'주문관리'} component={OrderManagement} />
      <Tab.Screen name={'마이페이지'} component={MyPageScreen} />
    </Tab.Navigator>
  );
};

export default App;
