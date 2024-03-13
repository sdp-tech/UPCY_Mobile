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
import {
  CareerType,
  EducType,
  MaterialType,
  RegionType,
  StyleType,
} from '../../../types/UserTypes';
import ProfileSubmit from './ProfileSubmit';

export interface ReformProps {
  navigation: any;
  route: any;
}

export type ReformStackParams = {
  Basic: {};
  Profile: {};
  tmp: {};
};

interface BasicFormProp {
  email: string;
  mailDomain: string;
  password: string;
  region: string;
  marketing: boolean;
}

type ReformProfileType = {
  picture: any;
  nickname: string;
  market: string;
  introduce: string;
  link: string;
  region: RegionType;
  style: StyleType;
  material: MaterialType;
  education: EducType[];
  career: CareerType;
};

export type RpContextType = {
  value: ReformProfileType;
  setValue: Dispatch<SetStateAction<ReformProfileType>>;
};

export const ReformProfileContext = createContext<RpContextType | null>(null);

export default function Reformer() {
  const defaultProfile: ReformProfileType = {
    picture: null,
    nickname: '',
    market: '',
    introduce: '',
    link: '',
    region: undefined,
    style: [],
    material: [],
    education: [],
    career: undefined,
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
        <Stack.Screen name="tmp" component={ProfileSubmit} />
      </Stack.Navigator>
    </ReformProfileContext.Provider>
  );
}
