import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Login';
import Signup from './Signup';
import Reformer from './Reformer/Reformer';
import BasicForm, { BasicFormProps2 } from './BasicForm';
import ReformFormSubmit from './Reformer/ReformFormSubmit';
import { UpcyFormProfile } from '../Auth/Upcyer/Upcyer'
import { BottomSheetModalStackBehavior } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetModal';

export interface FormProps {
  route: any;
  navigation: any;
}

export interface BasicFormProps {
  route: any;
  navigation: any;
  is_reformer: boolean;
  is_consumer: boolean;
}

export type SignInParams = {
  Login: undefined;
  Signup: undefined;
  Reformer: undefined;
  Basic: { form?: any | undefined };
  ReformSubmit: undefined;
  Upcyer: { form: any };
};

export default function SignIn() { // 스택 네비게이터 설정 
  const SignInStack = createNativeStackNavigator<SignInParams>();

  return (
    <SignInStack.Navigator screenOptions={{ headerShown: false }}>
      <SignInStack.Screen name="Login" component={Login} />
      <SignInStack.Screen name="Signup" component={Signup} />
      <SignInStack.Screen name="Reformer" component={Reformer} />
      <SignInStack.Screen name="Basic" component={BasicForm} />
      <SignInStack.Screen name="ReformSubmit" component={ReformFormSubmit} />
      <SignInStack.Screen name="Upcyer" component={UpcyFormProfile} />
    </SignInStack.Navigator>
  );
}
