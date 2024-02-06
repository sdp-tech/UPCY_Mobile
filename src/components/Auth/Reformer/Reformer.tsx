import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import ReformFormHeader from './ReformFormHeader';
import BasicForm from '../BasicForm';
import ReformFormProfile from './ReformFormProfile';

export type ReformProps = {
  navigation: any;
  route: any;
};

export type ReformStackParams = {
  Basic: undefined;
  Profile: {
    goBack: () => void;
    goNext: () => void;
    title: string;
  };
};

export default function Reformer() {
  const [steps, setSteps] = useState(1);
  const Stack = createNativeStackNavigator<ReformStackParams>();

  return (
    <Stack.Navigator
      initialRouteName="Basic"
      screenOptions={{
        header: ({ navigation }) => (
          <ReformFormHeader step={steps} navigation={navigation} />
        ),
      }}>
      <Stack.Screen
        name="Basic"
        component={BasicForm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ReformFormProfile}
        initialParams={{ goNext: () => setSteps(2), title: '테스트' }}
      />
    </Stack.Navigator>
  );
}
