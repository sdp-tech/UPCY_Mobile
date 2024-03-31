import { Dispatch, SetStateAction, createContext, useState } from 'react';
import { View } from 'react-native';
import { FormProps } from '../SignIn';
import ReformFormHeader from './ReformFormHeader';
import ReformFormProfile from './ReformFormProfile';
import {
  CareerType,
  EducType,
  MaterialType,
  RegionType,
  StyleType,
} from '../../../types/UserTypes';
import ReformFormStyle from './ReformFormStyle';
import ReformCareer from './ReformFormCareer';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

type page = 'profile' | 'style' | 'career';

export interface ReformProps {
  form: ReformProfileType;
  setForm: Dispatch<SetStateAction<ReformProfileType>>;
}

export interface PageProps extends ReformProps {
  setNext: () => void;
}
export interface ModalProps extends ReformProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

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

export default function Reformer({ navigation }: FormProps) {
  const defaultProfile: ReformProfileType = {
    picture: undefined,
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
      file: [],
    },
    career: [],
  };
  const [page, setPage] = useState<page>('profile');
  const [profileForm, setProfileForm] = useState(defaultProfile);

  const handleSubmit = () => {
    navigation.navigate('ReformSubmit');
  };

  return (
    <View style={{ flex: 1 }}>
      <BottomSheetModalProvider>
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
                setNext={() => setPage('style')}
                form={profileForm}
                setForm={setProfileForm}
              />
            ),
            style: (
              <ReformFormStyle
                setNext={() => setPage('career')}
                form={profileForm}
                setForm={setProfileForm}
              />
            ),
            career: (
              <ReformCareer
                setNext={() => handleSubmit()}
                form={profileForm}
                setForm={setProfileForm}></ReformCareer>
            ),
          }[page]
        }
      </BottomSheetModalProvider>
    </View>
  );
}
