import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import { BLACK } from '../../../styles/GlobalColor.tsx';
import ServicePage from '../../../components/Home/Market/ServicePage';
import InfoPage, { MarketType } from '../../../components/Home/Market/InfoPage.tsx';
import ScrollTopButton from '../../../common/ScrollTopButton.tsx';
import { LoginContext } from '../../../common/Context';
import DetailScreenHeader from '../../../components/Home/components/DetailScreenHeader.tsx';
import { PhotoType } from '../../../hooks/useImagePicker.ts';
import Request from '../../../common/requests.js';
import { MypageStackProps } from '../../../pages/MyPage.tsx';
import { getAccessToken, getMarketUUID, getNickname, getRefreshToken, getUserRole, removeAccessToken, removeRefreshToken, setNickname, setUserRole } from '../../../common/storage.js';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { Title20B } from '../../../styles/GlobalText.tsx';
import DeleteModal from '../DeleteModal.tsx';
import { MarketResponseType } from '../../Home/Market/MarketTabView.tsx';
import { AwardsType, CareerType, CertifiType, EducType, FreeType, ReformerResponseType } from '../../../types/UserTypes.ts';

export const ReformerMyPageScreen = ({ navigation, route }: MypageStackProps) => {

  const ProfileSection = ({
    nickname,
    backgroundphoto,
    picture,
    editProfile,
    introduce,
  }: {
    nickname: string;
    backgroundphoto: any;
    picture: PhotoType;
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
          onPressRight={openModal}
        />
        <View>
          <View style={{ width: width, height: height * 0.11, backgroundColor: '#E9EBF8' }} />
          {picture === undefined || picture.uri === undefined ? ( // 전자는 편집페이지에서 사진 삭제했을 경우, 후자는 가장 처음에 로딩될 경우
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
                picture
                  ? { uri: picture.uri } // 유효한 URL이면 그대로 사용
                  : {
                    uri: 'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp',
                  } // 기본 이미지 URL 사용
              }
              alt={picture.fileName}
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

  const [activeTab, setActiveTab] = useState('profile');
  const scrollRef = useRef<ScrollView | null>(null);
  const defaultMarketResponseData: MarketResponseType = {
    market_address: '', // 링크 
    market_introduce: '정보 없음', // 자기소개 
    market_name: '정보 없음', // 닉네임 
    market_thumbnail: '', // 왜 안 나오지...? 원래없나 
    market_uuid: '',
  };
  const defaultReformerResponseData: ReformerResponseType = {
    nickname: '', // 닉네임 
    reformer_link: '', // 자기소개 
    reformer_area: '', // 활동지역 
    education: [], // 학력
    certification: [], // 자격증 
    awards: [], // 공모전 
    career: [], // 경력 
    freelancer: [] // 외주 
  }


  const [marketResponseData, setMarketResponseData] = useState<MarketResponseType>(
    defaultMarketResponseData,
  );
  const [reformerResponseData, setReformerResponseData] = useState<ReformerResponseType>(defaultReformerResponseData,);
  const [marketData, setMarketData] = useState<MarketType>({
    reformer_link: '', // 링크 
    market_introduce: '정보 없음', // 자기소개 
    market_name: '정보 없음', // 닉네임 
    market_thumbnail: '', // 왜 안 나오지...? 원래없나 
    market_uuid: '',
    reformer_area: '??',
  })
  const fetchMarketData = (data: Partial<MarketType>) => {

    setMarketData((prev) => ({
      ...prev, // 기존 데이터를 유지
      ...data, // 새로운 데이터로 업데이트
    }));

  };

  const request = Request();
  const { isLogin, setLogin } = useContext(LoginContext);
  const [reformerInfo, setReformerInfo] = useState({
    nickname: route.params?.nickname || '',
    backgroundphoto:
      'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp',
    picture:
      route.params?.picture ||
      'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp',
    introduce: route.params?.introduce || '',
    role: 'reformer',
    link: route.params?.link || '',
    region: route.params?.region || '',
  });

  useEffect(() => {
    if (route.params?.reformerInfo) {
      setReformerInfo(route.params.reformerInfo);
    }
  }, [route.params?.reformerInfo]);

  const getProfile = async () => {
    // 유저 프로필 가져오기-> setUserInfo로 관리
    const accessToken = await getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    try { // 닉네임, 소개글, 이미지 가져오는 로직 
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
        setReformerInfo({
          nickname: response.data.nickname,
          // 우선 기본이미지
          backgroundphoto:
            'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp',
          picture: profileImage,
          introduce:// 근데 이거 안씀 
            response.data.introduce ||
            '나는야 업씨러 이하늘 환경을 사랑하지요 눈누난나',
          role: 'reformer',
          link: response.data.address,
        });
        // setNickname(response.data.nickname);
        try { // 본인 마켓 정보 가져오기: 링크, 자기소개, 닉네임, uuid
          const response2 = await request.get(`/api/market`, {}, headers);
          if (response2 && response2.status === 200) {
            const marketResult: MarketResponseType = response2.data;
            setMarketResponseData(marketResult);
            fetchMarketData({
              market_introduce: marketResult.market_introduce,
              market_name: marketResult.market_name,
              market_thumbnail: marketResult.market_thumbnail || '', // 기본값 유지
              market_uuid: marketResult.market_uuid,
            });
            console.log('마켓 정보 가져오기 성공', response2.data);
            try { // reformer 정보 가져오기: 활동지역, 경력사항들 
              const response3 = await request.get(`/api/user/reformer`, {}, headers);
              if (response3 && response3.status === 200) {
                const reformerResult: ReformerResponseType = response3.data;
                setReformerResponseData(reformerResult);
                fetchMarketData({
                  reformer_link: reformerResult.reformer_link,
                  reformer_area: reformerResult.reformer_area,
                  education: reformerResult.education,
                  certification: reformerResult.certification,
                  awards: reformerResult.awards,
                  career: reformerResult.career,
                  freelancer: reformerResult.freelancer,
                });
                console.log('리폼러 정보 가져오기 성공 ', response3.data);
                console.log('마켓 최종 합산 데이터:', marketData);
              } else {
                console.log(response3);
              }
            } catch (error) {
              console.log(error);
            }
          } else {
            console.log('마켓 정보 가져오기에 실패했습니다.', response2);
          }
        } catch (error) {
          console.log(error);
        }
        return response.data;
      } else {
        console.log('Failed to fetch user data:', response);
        return null;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  useFocusEffect(
    useCallback(() => {
      getProfile();
    }, []),
  );

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleEdit = () => {
    closeModal();
    navigation.navigate('FixMyPage', { reformerInfo })
    console.log('수정 페이지로 이동')
  }

  const handleLogout = () => {
    closeModal();
    Alert.alert(
      "로그아웃 하시겠습니까?",
      "",
      [
        { text: "아니오", onPress: () => { }, style: "destructive" },
        { text: "네", onPress: Logout }
      ],
      { cancelable: false }
    );
  };

  const Logout = async () => {
    const role = getUserRole();
    const accessToken = await getAccessToken();
    const refreshToken = await getRefreshToken();
    const params = {
      refresh: refreshToken
    }
    const headers = {
      Authorization: `Bearer ${accessToken}`
    }
    try {
      const response = await request.post(`/api/user/logout`, params, headers)
      if (response && response.status === 200) {
        console.log('로그아웃 합니다.')
        removeAccessToken();
        removeRefreshToken();
        setLogin(false);
        setUserRole('customer');
        console.log('유저롤:', role);

        navigation.dispatch(
          CommonActions.navigate({
            name: "Main",
            params: {
              screen: "UPCY", // MainTabNavigator의 홈 화면으로 이동
            },
          })
        );
        console.log('AccessToken: ', { accessToken }, '| RefreshToken: ', { refreshToken });
      } else {
        console.log(response);
      }
    }
    catch (err) {
      console.error(err)
    }
  };

  const handleDeleteAccount = (password: string) => {
    closeModal();
    Alert.alert(
      "정말로 계정을 삭제 하시겠습니까? 되돌릴 수 없습니다.",
      "",
      [
        { text: "아니오", onPress: () => { }, style: "destructive" },
        { text: "네", onPress: () => handleDeleteAccountConfirm(password) } // 별도의 함수 호출
      ],
      { cancelable: false }
    );
  };

  // 비동기 작업을 수행하는 함수
  const handleDeleteAccountConfirm = async (password: string) => {
    try {
      await DeleteAccout(password);
    } catch (error) {
      console.error('계정 삭제 실패:', error);
    }
  };

  const DeleteAccout = async (password: string) => { // 수정 필요
    const accessToken = await getAccessToken();
    const refreshToken = await getRefreshToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      RefreshToken: refreshToken,
    };
    console.log(password);
    try {
      const response = await request.del(`/api/user/reformer`, {}, headers);
      if (response && response.status === 200) {
        console.log('리폼러 삭제 성공');
        try {
          const response = await request.del(`/api/user`, { password: password }, headers);
          if (response && response.status === 200) {
            console.log('계정 삭제 완료');
            removeAccessToken();
            removeRefreshToken();
            setLogin(false);
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Main', params: { screen: 'UPCY' } }],
              })
            );
          } else {
            console.log('계정 삭제 실패:', response.data);
            Alert.alert('계정 삭제 실패', '비밀번호를 다시 확인해주세요.');
          }
        } catch (err) {
          console.error(err);
        }
      } else {
        console.log('리폼러 삭제 실패:', response.data);
        Alert.alert('리폼러 삭제 실패', '비밀번호를 다시 확인해주세요.');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      Alert.alert('오류', '계정 삭제에 실패했습니다.');
    }

  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs.Container
        renderHeader={props => (
          <ProfileSection
            nickname={reformerInfo.nickname}
            backgroundphoto={reformerInfo.backgroundphoto}
            picture={reformerInfo.picture}
            editProfile={() => navigation.navigate('FixMyPage', { reformerInfo })}
            introduce={reformerInfo.introduce}
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
          {/* FIXME */}
          <InfoPage
            marketData={marketData}
          />
        </Tabs.Tab>
        <Tabs.Tab name="서비스" key="service">
            {/*<TouchableOpacity
              style={styles.saveButton}
              onPress={() => navigation.navigate('TempStorage')}>
              <Text style={styles.saveButtonText}>임시저장 (5)</Text>
              {/*수정 필요
            </TouchableOpacity>*/}
            <View>
                <ServicePage scrollViewRef={scrollRef} navigation={navigation} reformerName = {reformerInfo.nickname} marketUuid = {marketData.market_uuid}/>
                <ScrollTopButton scrollViewRef={scrollRef} />
            </View>
        </Tabs.Tab>
      </Tabs.Container>

      {activeTab === 'service' ? (
        <TouchableOpacity
          style={styles.fixedButton}
          onPress={() => {
            //navigation.navigate('TempStorage');
            navigation.navigate('ServiceRegistrationPage')
          }}>
          <Text style={styles.fixedButtonText}>서비스 추가</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.fixedButton}
          onPress={() => {
            navigation.navigate('FixMyPage', { reformerInfo });
          }}>
          <Text style={styles.fixedButtonText}>프로필 수정하기</Text>
        </TouchableOpacity>
      )}
      <DeleteModal
        visible={modalVisible}
        onClose={closeModal}
        onEdit={handleEdit}
        onLogout={handleLogout}
        onDeleteAccount={handleDeleteAccount}
      />
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
