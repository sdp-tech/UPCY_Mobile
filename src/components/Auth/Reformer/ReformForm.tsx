import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ReformFormProfile from './ReformFormProfile';

export type ReformStackParams = {
  Profile: undefined;
};

export default function ReformForm() {
  const Stack = createNativeStackNavigator<ReformStackParams>();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ReformFormProfile} />
    </Stack.Navigator>
  );
}
