import {
  // Alert,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import {
  StackScreenProps,
  createStackNavigator,
} from '@react-navigation/stack';
import {
  getAccessToken,
  removeAccessToken,
  removeNickname,
  removeRefreshToken,
} from '../../../common/storage';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { LoginContext } from '../../../common/Context';
import DetailScreenHeader from '../../../components/Home/components/DetailScreenHeader';
import { Title20B } from '../../../styles/GlobalText';
import TextToggle from '../../../common/TextToggle';
import { BLACK } from '../../../styles/GlobalColor';
import { MaterialTabBar, Tabs } from 'react-native-collapsible-tab-view';
// import ReviewPage from '../../../components/Home/Market/ReviewPage';
// import ScrollToTopButton from '../../../common/ScrollToTopButtonFlat';
import FixMyPage from '../../../pages/FixMyPage';
import Login from '../../../components/Auth/Login';

import Request from '../../../common/requests';
import OrderPage from '../../../components/Home/Order/OrderPage';
import { useFocusEffect } from '@react-navigation/native';
import { print } from '@gorhom/bottom-sheet/lib/typescript/utilities/logger';
import { TabProps } from '../../../../App';
import { PhotoType } from '../../../hooks/useImagePicker';
import { MyPageStackParams, MypageStackProps } from '../../../pages/MyPage';

export const UpcyerMyPageMainScreen = ({ navigation, route }: MypageStackProps) => {
  const { width, height } = Dimensions.get('screen');
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

      </View>
    );
  };

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

  // const goReformRegister = () => {
  //   navigation.navigate('ReformProfile');
  // };

  const [routes] = useState([
    { key: 'order', title: '주문내역' },
    // { key: 'like', title: '좋아요' },
  ]);
  const flatListRef = useRef<FlatList>(null);
  const scrollRef = useRef<ScrollView | null>(null);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* 탭은 수정 필요 */}
      <Tabs.Container
        renderHeader={props => (
          <View>
            <ProfileSection
              nickname={userInfo.nickname}
              backgroundphoto={userInfo.backgroundphoto}
              profile_image={userInfo.profile_image}
              editProfile={() => navigation.navigate('FixMyPage', { userInfo })}
              introduce={userInfo.introduce}
            />
          </View>
        )}
        headerContainerStyle={{
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderColor: '#D9D9D9',
        }}
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
          //onTabPress={() => Alert.alert('준비중입니다!ㅠㅠ')}
          // 룩북, 좋아요 모아보기 기능 구현되면 위의 onTapPress는 삭제할 것
          />
        )}>
        {routes.map(route_ => (
          (<Tabs.Tab key={route_.key} name={route_.title}>
            {route_.key === 'order' && <OrderPage flatListRef={flatListRef} navigation={navigation} route={route} />}
            {/* {route.key === 'like' &&
                 <View>
                     <ReviewPage flatListRef={flatListRef} />
                     <ScrollToTopButton flatListRef={flatListRef} />
                     </View>}
                 </View>} */}
          </Tabs.Tab>)
        ))}
      </Tabs.Container>
    </SafeAreaView>
  );
};
