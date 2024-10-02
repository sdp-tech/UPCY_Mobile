import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { FormProps } from '../SignIn';
import ReformFormHeader from './ReformFormHeader';
import ReformFormProfile from './ReformFormProfile';
import {
  FieldType,
  EducType,
  MaterialType,
  RegionType,
  StyleType,
  CareerType,
  AwardsType,
  CertifiType,
  FreeType
} from '../../../types/UserTypes';
import ReformFormStyle from './ReformFormStyle';
import ReformCareer from './ReformFormCareer';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { PhotoType } from '../../../hooks/useImagePicker';
import DetailScreenHeader from '../../Home/components/DetailScreenHeader';
import { SignupProp } from '../Signup';
import { SafeAreaView } from 'react-native-safe-area-context';

// type page = 'profile' | 'style' | 'field';

export interface ReformProps {
  form: ReformProfileType;
  setForm: Dispatch<SetStateAction<ReformProfileType>>;
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

export type ReformProfileType = {
  picture?: undefined | PhotoType;
  nickname: string;
  introduce?: string | undefined;
  link: string;
  region: RegionType;
  education: EducType;
  career: CareerType;
  awards: AwardsType;
  certification: CertifiType;
  freelancer: FreeType;
  field: FieldType;
};

export type RpContextType = {
  value: ReformProfileType;
  steps: number;
  setValue: Dispatch<SetStateAction<ReformProfileType>>;
  setSteps: Dispatch<SetStateAction<number>>;
};

export default function Reformer({ navigation, route }: SignupProp) {
  const defaultProfile: ReformProfileType = {
    picture: undefined,
    nickname: '',
    introduce: '',
    link: '',
    region: '',
    education: [],
    career: [],
    awards: [],
    certification: [],
    freelancer: [],
    field: [],
  };
  const [profileForm, setProfileForm] = useState(defaultProfile);

  const handleSubmit = () => {
    navigation.navigate('ReformSubmit');
  };

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
      <BottomSheetModalProvider>
        <DetailScreenHeader
          title=''
          leftButton='LeftArrow'
          rightButton='None'
          onPressLeft={() => { navigation.getParent()?.navigate('Home') }}
          onPressRight={() => { }} />
        <View style={{ flex: 1 }}>
          <ReformFormProfile
            form={profileForm}
            setForm={setProfileForm}
          />

        </View>
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
}
