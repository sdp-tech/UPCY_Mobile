import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SignInParams } from '../components/Auth/SignIn';
import { useCallback } from 'react';
import { StackProps } from '../../App';

export default function useLoginGuard() {
  const isLoggedIn = false;
  const navigation = useNavigation<StackNavigationProp<StackProps>>();

  const goToSignIn = useCallback(() => {
    navigation.navigate('Signin');
  }, [navigation]);

  return useCallback(
    (callback: (...args: any) => void) => (isLoggedIn ? callback : goToSignIn),
    [isLoggedIn, goToSignIn],
  );
}
