import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Login';
import Signup from './Signup';
import ReformForm from './Reformer/ReformForm';

export type SignInParams = {
  Login: undefined;
  Signup: undefined;
  Reformer: undefined;
};

export default function SignIn() {
  const Stack = createNativeStackNavigator<SignInParams>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Reformer" component={ReformForm} />
    </Stack.Navigator>
  );
}
