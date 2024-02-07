import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import ReformFormHeader from './ReformFormHeader';
import BasicForm from '../BasicForm';
import ReformFormProfile from './ReformFormProfile';

export interface ReformProps {
  navigation: any;
  route: any;
}

export type ReformStackParams = {
  Basic: {
    form: BasicFormProp;
    setForm: React.Dispatch<React.SetStateAction<BasicFormProp>>;
    handleSubmit: () => void;
  };
  Profile: {
    goBack: () => void;
    goNext: () => void;
    title: string;
  };
};

interface BasicFormProp {
  email: string;
  mailDomain: string;
  password: string;
  region: string;
  marketing: boolean;
}

export default function Reformer() {
  const [steps, setSteps] = useState(1);
  const [basicform, setBasicform] = useState({
    email: '',
    mailDomain: '',
    password: '',
    region: '',
    marketing: false,
  });
  const Stack = createNativeStackNavigator<ReformStackParams>();

  const handleSubmit = () => {
    console.log(basicform);
  };

  return (
    <Stack.Navigator
      initialRouteName="Basic"
      screenOptions={{
        header: ({ navigation, route }) => (
          <ReformFormHeader step={steps} navigation={navigation} />
        ),
      }}>
      <Stack.Screen
        name="Basic"
        component={BasicForm}
        options={{ headerShown: false }}
        initialParams={{
          form: basicform,
          setForm: setBasicform,
          handleSubmit: handleSubmit,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ReformFormProfile}
        initialParams={{ goNext: () => setSteps(2), title: '테스트' }}
      />
    </Stack.Navigator>
  );
}
