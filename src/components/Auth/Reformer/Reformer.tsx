import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import ReformFormHeader from './ReformFormHeader';
import BasicForm from '../BasicForm';
import ReformFormProfile from './ReformFormProfile';

export interface ReformProps {
  navigation: any;
  route: any;
}

export type ReformStackParams = {
  Basic: {};
  Profile: {};
};

interface BasicFormProp {
  email: string;
  mailDomain: string;
  password: string;
  region: string;
  marketing: boolean;
}

type ReformProfileType = {
  nickname: string;
  market: string;
};

export type RpContextType = {
  value: ReformProfileType;
  setValue: Dispatch<SetStateAction<ReformProfileType>>;
};

export const ReformProfileContext = createContext<RpContextType | null>(null);

export default function Reformer() {
  const defaultProfile: ReformProfileType = {
    nickname: '',
    market: '',
  };
  const [steps, setSteps] = useState(1);
  const Stack = createNativeStackNavigator<ReformStackParams>();
  const [profileForm, setProfileForm] = useState(defaultProfile);

  return (
    <ReformProfileContext.Provider
      value={{ value: profileForm, setValue: setProfileForm }}>
      <Stack.Navigator
        initialRouteName="Profile"
        screenOptions={{
          header: ({ navigation, route }) => (
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
          initialParams={{ title: '테스트' }}
        />
      </Stack.Navigator>
    </ReformProfileContext.Provider>
  );
}
