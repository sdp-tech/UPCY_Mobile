import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { View } from 'react-native';
import { FormProps } from '../SignIn';
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
import ReformFormStyle from './ReformFormStyle';
import ReformCareer from './ReformFormCareer';

type page = 'profile' | 'style' | 'career';

export interface ReformProps {
  setPage: Dispatch<SetStateAction<page>>;
  form: ReformProfileType;
  setForm: Dispatch<SetStateAction<ReformProfileType>>;
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
  style: string[];
  material: string[];
  education: EducType;
  career: CareerType;
};

export type RpContextType = {
  value: ReformProfileType;
  steps: number;
  setValue: Dispatch<SetStateAction<ReformProfileType>>;
  setSteps: Dispatch<SetStateAction<number>>;
};

export const ReformProfileContext = createContext<RpContextType | null>(null);

export default function Reformer({ navigation }: FormProps) {
  const defaultProfile: ReformProfileType = {
    picture: null,
    nickname: '',
    market: '',
    introduce: '',
    link: '',
    region: undefined,
    style: [],
    material: [],
    education: {
      school: '',
      major: '',
      status: undefined,
      file: undefined,
    },
    career: [],
  };
  const [page, setPage] = useState<page>('profile');
  const [profileForm, setProfileForm] = useState(defaultProfile);

  console.log('rerender');

  return (
    <View style={{ flex: 1 }}>
      <ReformFormHeader
        step={{ profile: 1, style: 2, career: 3 }[page]}
        onPressLeft={
          {
            profile: () => {
              navigation.goBack();
            },
            style: () => {
              setPage('profile');
            },
            career: () => {
              setPage('style');
            },
          }[page]
        }
      />
      {
        {
          profile: (
            <ReformFormProfile
              setPage={setPage}
              form={profileForm}
              setForm={setProfileForm}
            />
          ),
          style: (
            <ReformFormStyle
              setPage={setPage}
              form={profileForm}
              setForm={setProfileForm}
            />
          ),
          career: (
            <ReformCareer
              setPage={setPage}
              form={profileForm}
              setForm={setProfileForm}></ReformCareer>
          ),
        }[page]
      }
    </View>
  );
}
