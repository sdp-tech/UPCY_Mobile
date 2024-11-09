import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import { BLACK, PURPLE } from '../../../styles/GlobalColor.tsx';
import StarIcon from '../../../assets/common/Star.svg';
import Arrow from '../../../assets/common/Arrow.svg';
import ServicePage from '../../../components/Home/Market/ServicePage';
import InfoPage from '../../../components/Home/Market/InfoPage.tsx';
import TempStorage from '../../../components/Home/Market/TempStorage.tsx';
import FixMyPage from '../../../pages/FixMyPage.tsx';
import ScrollTopButton from '../../../common/ScrollTopButton.tsx';
import { LoginContext } from '../../../common/Context';
import {
  StackScreenProps,
  createStackNavigator,
} from '@react-navigation/stack';
import styled from 'styled-components/native';
import DetailScreenHeader from '../../../components/Home/components/DetailScreenHeader.tsx';
import { HomeStackParams } from '../../../pages/Home.tsx';
import { PhotoType } from '../../../hooks/useImagePicker.ts';
import ServiceRegistrationPage from '../../../components/Home/Market/ServiceRegistration.tsx';
import WriteDetailPage from '../../Home/Market/WriteDetailPage.tsx';
import Request from '../../../common/requests.js';
import { MypageStackProps } from '../../../pages/MyPage.tsx';
import { getAccessToken } from '../../../common/storage.js';
import { useFocusEffect } from '@react-navigation/native';
import { Title20B } from '../../../styles/GlobalText.tsx';


const ProfileSection = ({
  nickname,
  backgroundphoto,
  profile_image,
  editProfile,
  introduce,
}: {
  nickname: string;
  backgroundphoto: any;
  profile_image: PhotoType;
  editProfile: any;
  introduce: string;
}) => {
  const { width, height } = Dimensions.get('screen');
  return (
    <View style={{ alignItems: 'center' }}>
      <DetailScreenHeader
        title=""
        leftButton="CustomBack"
        onPressLeft={() => { }}
        rightButton="Fix"
        onPressRight={editProfile}
      />
      <View>
        <View style={{ width: width, height: height * 0.11, backgroundColor: '#E9EBF8' }} />
        {profile_image === undefined || profile_image.uri === undefined ? ( // 전자는 편집페이지에서 사진 삭제했을 경우, 후자는 가장 처음에 로딩될 경우
          <Image
            style={{
              alignSelf: 'center',
              width: width * 0.21,
              height: width * 0.21,
              borderRadius: 180,
              position: 'absolute',
              top: height * 0.06,
            }}
            source={{
              uri: 'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp',
            }}
          />
        ) : (
          <Image
            style={{
              alignSelf: 'center',
              width: width * 0.21,
              height: width * 0.21,
              borderRadius: 180,
              position: 'absolute',
              top: height * 0.06,
            }}
            source={
              profile_image
                ? { uri: profile_image.uri } // 유효한 URL이면 그대로 사용
                : {
                  uri: 'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp',
                } // 기본 이미지 URL 사용
            }
          />
        )}
      </View>
      <Title20B style={{ marginTop: height * 0.06 }}>{nickname}</Title20B>
      <View style={{ backgroundColor: "#E9EBF8", borderRadius: 20, paddingVertical: height * 0.005, paddingHorizontal: height * 0.012, marginTop: height * 0.02 }}>
        <Text style={{ color: "#612FEF", fontSize: width * 0.03, fontWeight: "600" }}>리폼러</Text>
      </View>
    </View>
  );
};

export const ReformerMyPageScreen = ({ navigation, route }: MypageStackProps) => {
  const [activeTab, setActiveTab] = useState('profile');
  const scrollRef = useRef<ScrollView | null>(null);

  const request = Request();
  const { isLogin, setLogin } = useContext(LoginContext);
  const [userInfo, setUserInfo] = useState({
    nickname: route.params?.nickname || '',
    backgroundphoto:
      'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp',
    profile_image:
      route.params?.profile_image ||
      'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp',
    introduce: route.params?.introduce || '',
    role: 'reformer',
  });

  useEffect(() => {
    if (route.params?.userInfo) {
      setUserInfo(route.params.userInfo);
    }
  }, [route.params?.userInfo]);

  const getProfile = async () => {
    // 유저 프로필 가져오기-> setUserInfo로 관리
    const accessToken = await getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    try {
      const response = await request.get(`/api/user`, {}, headers);
      const encodedUrl = encodeURI(response.data.profile_image_url);
      const decodedUri = decodeURIComponent(encodedUrl);
      const profileImage: PhotoType = {
        fileName: response.data.profile_image_url ? 'profile.jpg' : undefined,
        width: undefined, // width는 알 수 없으므로 undefined로 설정
        height: undefined, // height는 알 수 없으므로 undefined로 설정
        uri:
          decodedUri ||
          'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp',
      };
      if (response.status === 200) {
        console.log('User data fetched successfully:', response.data);
        setUserInfo({
          nickname: response.data.nickname,
          // 우선 기본이미지
          backgroundphoto:
            'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp',
          profile_image: profileImage,
          introduce:
            response.data.introduce ||
            '나는야 업씨러 이하늘 환경을 사랑하지요 눈누난나',
          role: 'reformer'
        });
        return response.data;
      } else {
        console.log('Failed to fetch user data:', response);
        return null;
      }
    } catch (error) {
      // 에러 처리
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (isLogin) {
        getProfile(); // 로그인 상태일 때 프로필을 가져옴
      }
    }, [isLogin]),
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs.Container
        renderHeader={props => (
          <ProfileSection
            nickname={userInfo.nickname}
            backgroundphoto={userInfo.backgroundphoto}
            profile_image={userInfo.profile_image}
            editProfile={() => navigation.navigate('FixMyPage', { userInfo })}
            introduce={userInfo.introduce}
          />
        )}
        headerContainerStyle={{
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderColor: '#D9D9D9',
        }}
        onIndexChange={index =>
          setActiveTab(index === 0 ? 'profile' : 'service')
        }
        renderTabBar={props => (
          <MaterialTabBar
            {...props}
            indicatorStyle={{
              backgroundColor: '#BDBDBD',
              height: 2,
            }}
            style={{
              backgroundColor: 'white',
            }}
            labelStyle={{
              color: BLACK,
              fontWeight: '700',
              fontSize: 16,
            }}
          />
        )}>
        <Tabs.Tab name="프로필" key="profile">
          <InfoPage />
        </Tabs.Tab>
        <Tabs.Tab name="서비스" key="service">
          <View>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => navigation.navigate('TempStorage')}>
              <Text style={styles.saveButtonText}>임시저장 (5)</Text>
              {/*수정 필요*/}
            </TouchableOpacity>
            <ServicePage scrollViewRef={scrollRef} navigation={navigation} />
            <ScrollTopButton scrollViewRef={scrollRef} />
          </View>
        </Tabs.Tab>
      </Tabs.Container>

      {activeTab === 'service' ? (
        <TouchableOpacity
          style={styles.fixedButton}
          onPress={() => {
            navigation.navigate(
              'ServiceRegistrationPage')
          }}>
          <Text style={styles.fixedButtonText}>서비스 추가</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.fixedButton}
          onPress={() => { navigation.navigate('FixMyPage', { userInfo }) }}>
          <Text style={styles.fixedButtonText}>프로필 수정하기</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  saveButton: {
    height: 35,
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#DBFC72', // var(--NeonGreen-upcy-green) 값으로 설정
    flexDirection: 'row', // 가로 방향 배치 설정
    alignSelf: 'flex-start',
  },
  saveButtonText: {
    marginLeft: 10, // gap 대신 텍스트에 좌측 여백 설정
    color: '#612FEF',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 24,
  },
  fixedButton: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: '#DBFC72',
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  fixedButtonText: {
    color: '#612FEF',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
  },
  profileHeaderRateBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  arrow: {
    paddingHorizontal: 6,
    paddingVertical: 6,
    width: 12,
    height: 12,
    marginLeft: 3,
    transform: [{ rotate: '180deg' }],
  },
});

const TextStyles = StyleSheet.create({
  marketName: {
    color: '#000',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  rate: {
    color: '#222',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  reviewNumber: {
    color: '#222',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
});
