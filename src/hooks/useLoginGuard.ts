import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SignInParams } from '../components/Auth/SignIn';
import { useCallback, useContext } from 'react';
import { StackProps } from '../../App';
import { LoginContext } from '../common/Context';

export default function useLoginGuard() {
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
