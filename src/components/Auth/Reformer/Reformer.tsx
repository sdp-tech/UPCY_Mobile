import { Dispatch, SetStateAction, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import ReformFormProfile from './ReformFormProfile';
import BackArrow from '../../../assets/common/Arrow.svg'; // Import the back arrow icon
import { PhotoType } from '../../../hooks/useImagePicker';
import { RegionType, EducType, CareerType, AwardsType, CertifiType, FreeType, FieldType } from '../../../types/UserTypes';

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

export default function Reformer({ navigation }) {
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

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
      <BottomSheetModalProvider>
        {/* Custom Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <BackArrow width={24} height={24} color="#222" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>프로필 등록</Text>
        </View>

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

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 5, // Position the back arrow 16px from the left
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontStyle: 'normal',
    fontFamily: "Pretendard Variable",
    fontWeight: '700', // Make the title bold
    color: '#222',
    textAlign: 'center',
    lineHeight: 24,
  },
});
