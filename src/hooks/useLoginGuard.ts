import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SignInParams } from '../components/Auth/SignIn';
import { useCallback, useContext } from 'react';
import { StackProps } from '../../App';
import { LoginContext } from '../common/Context';

export default function useLoginGuard() { // 로그인 상태면 콜백함수 호출, 아니면 회원가입 페이지로
  const { isLogin } = useContext(LoginContext);
  const navigation = useNavigation<StackNavigationProp<StackProps>>();

  const goToSignIn = useCallback(() => {
    navigation.navigate('Signin');
  }, [navigation]);

  return useCallback(
    (callback: (...args: any) => void) => (isLogin ? callback : goToSignIn),
    [isLogin, goToSignIn],
  );
}
