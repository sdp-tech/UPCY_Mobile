import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
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
import {
  LoginContext,
  LoginProvider,
  UserProvider,
} from './src/common/Context';
import Reformer from './src/components/Auth/Reformer/Reformer';
import SplashScreen from './src/common/SplashScreen';

export type StackProps = {
  Main: undefined;
  Signin: undefined;
  ReformProfile: undefined;
};

const AppStack = createNativeStackNavigator<StackProps>(); // 최상위 스택. SignInStack에는 바텀바 안 뜸.

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
                <AppStack.Navigator screenOptions={{ headerShown: false }}>
                  <AppStack.Screen name="Main" component={MainTabNavigator} />
                  <AppStack.Screen name="Signin" component={SignIn} />
                  <AppStack.Screen name="ReformProfile" component={Reformer} />
                </AppStack.Navigator>
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
  주문관리: undefined;
};

const CustomTab = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const loginGuard = useLoginGuard();
  const { isVisible } = useBottomBar(); // 바텀바 보임/숨김 상태를 가져옴.

  if (!isVisible) {
    return null; // isVisible이 false일 경우 탭바를 렌더링하지 않음.
  }

  return (
    <View
      style={{
        height: 86,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
      }}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index; // 한 번 더 눌렀을 때
        const onPress = () => {
          if (isFocused) {
            navigation.reset({
              routes: [{ name: route.name }],
            });
          } else {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={
              route.name === '마이페이지' ? loginGuard(onPress) : onPress
            }
            style={{
              width: '20%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {
              {
                홈: <HomeIcon color="#000000" opacity={isFocused ? 1 : 0.4} />,
                주문관리: (
                  <OrderManagementIcon
                    color="#000000"
                    opacity={isFocused ? 1 : 0.4}
                  />
                ),
                마이페이지: (
                  <MyPageIcon color="#000000" opacity={isFocused ? 1 : 0.4} />
                ),
              }[route.name]
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

// 하단 탭 네비게이터 정의
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTab {...props} />}
      initialRouteName="홈"
      screenOptions={{ headerShown: false }}>
      <Tab.Screen name="홈" component={HomeScreen} />
      <Tab.Screen name="주문관리" component={OrderManagement} />
      <Tab.Screen name="마이페이지" component={MyPageScreen} />
    </Tab.Navigator>
  );
};

export default App;
