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
  const Stack = createNativeStackNavigator<SignInParams>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Reformer" component={Reformer} />
      <Stack.Screen name="Basic" component={BasicForm} />
      <Stack.Screen name="ReformSubmit" component={ReformFormSubmit} />
      <Stack.Screen name="Upcyer" component={UpcyFormProfile} />
    </Stack.Navigator>
  );
}
