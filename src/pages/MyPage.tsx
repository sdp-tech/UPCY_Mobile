import { Button, SafeAreaView, Text } from 'react-native';
import {
  StackScreenProps,
  createStackNavigator,
} from '@react-navigation/stack';
import { TabProps } from '../../App';
import {
  getNickname,
  removeAccessToken,
  removeNickname,
  removeRefreshToken,
} from '../common/storage';
import { useCallback, useContext, useState } from 'react';
import { LoginContext } from '../common/Context';
import { useFocusEffect } from '@react-navigation/native';

type MyPageStackParams = {
  MyPage: undefined;
};

export interface MypageStackProps {
  navigation: any;
  route: any;
}

const MyPageStack = createStackNavigator<MyPageStackParams>();

const MyPageScreen = ({
  navigation,
  route,
}: StackScreenProps<TabProps, '마이페이지'>) => {
  return (
    <MyPageStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <MyPageStack.Screen name="MyPage" component={MyPageMainScreen} />
    </MyPageStack.Navigator>
  );
};

const MyPageMainScreen = ({ navigation, route }: MypageStackProps) => {
  const { isLogin, setLogin } = useContext(LoginContext);
  const [userInfo, setUserInfo] = useState({ nickname: '' });

  const getUserInfo = async () => {
    const userName = await getNickname();
    if (userName !== false) setUserInfo({ nickname: userName });
  };

  useFocusEffect(
    useCallback(() => {
      if (isLogin) getUserInfo();
    }, [isLogin]),
  );

  const handleLogout = () => {
    removeAccessToken();
    removeNickname();
    removeRefreshToken();
    setLogin(false);
    navigation.getParent()?.navigate('홈');
  };

  const goReformRegister = () => {
    navigation.navigate('ReformProfile');
  };

  return (
    <SafeAreaView>
      <Text>마이페이지</Text>
      <Text>{userInfo.nickname}님 안녕하세요.</Text>
      <Button onPress={goReformRegister} title="프로필 등록" />
      <Button onPress={handleLogout} title="로그아웃" />
    </SafeAreaView>
  );
};

export default MyPageScreen;
