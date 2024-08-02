import { Alert, Button, FlatList, Image, ImageBackground, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {
  StackScreenProps,
  createStackNavigator,
} from '@react-navigation/stack';
import { TabProps } from '../../App';
import {
  getNickname,
  removeAccessToken,
  removeNickname,
  removeRefreshToken,
} from '../common/storage';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { LoginContext } from '../common/Context';
import { useFocusEffect } from '@react-navigation/native';
import DetailScreenHeader from '../components/Home/components/DetailScreenHeader';
import { Caption11M, Title20B } from '../styles/GlobalText';
import TextToggle from '../common/TextToggle';
import { BLACK, BLACK2 } from '../styles/GlobalColor';
import ReviewComment from '../components/Home/components/ReviewComment';
import { MaterialTabBar, Tabs } from 'react-native-collapsible-tab-view';
import OrderPage from './OrderPage';
import ServicePage from '../components/Home/Market/ServicePage';
import ScrollTopButton from '../common/ScrollTopButton';
import ReviewPage from '../components/Home/Market/ReviewPage';
import ScrollToTopButton from '../common/ScrollToTopButtonFlat';
import FixMyPage from './FixMyPage';
import { PhotoType } from '../hooks/useImagePicker';

export type MyPageStackParams = {
  MyPage: { userInfo?: any | undefined };
  FixMyPage: { userInfo: any };
};

export interface MypageStackProps {
  navigation: any;
  route: any;
}

const MyPageStack = createStackNavigator<MyPageStackParams>();

const MyPageScreen = ({
  navigation,
  route,
}: StackScreenProps<TabProps, '마이페이지'>) => {
  return (
    <MyPageStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <MyPageStack.Screen name="MyPage" component={MyPageMainScreen} />
      <MyPageStack.Screen name="FixMyPage" component={FixMyPage} />
    </MyPageStack.Navigator>
  );
};

const ProfileSection = ({ nickname, backgroundphoto, profilephoto, editProfile, introduce }: { nickname: string, backgroundphoto: any, profilephoto: PhotoType | any, editProfile: any, introduce: string }) => {

  return (
    <View style={{ alignItems: 'center' }}>
      <DetailScreenHeader
        title=''
        leftButton='CustomBack'
        onPressLeft={() => { }}
        rightButton='Edit'
        onPressRight={editProfile} />
      <ImageBackground
        style={{ width: '100%', height: 200 }}
        imageStyle={{ height: 160 }}
        source={{ uri: backgroundphoto }}>
        <View style={{ width: '100%', height: 160, backgroundColor: '#00000066', opacity: 0.7 }} />
        {(profilephoto === undefined) || (profilephoto.uri == undefined) ? ( // 전자는 편집페이지에서 사진 삭제했을 경우, 후자는 가장 처음에 로딩될 경우
          <Image
            style={{ alignSelf: 'center', width: 90, height: 90, borderRadius: 180, position: 'absolute', top: 110 }}
            source={{ uri: 'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp' }}
          />) : (<Image
            style={{ alignSelf: 'center', width: 90, height: 90, borderRadius: 180, position: 'absolute', top: 110 }}
            source={{ uri: profilephoto.uri }}
          />)
        }
      </ImageBackground>
      <Title20B style={{ marginTop: 8 }}>{nickname}</Title20B>
      <View style={{ padding: 20, paddingTop: 0, paddingBottom: 0 }}>
        <TextToggle text={introduce} />
      </View>
    </View>
  )
}

const MyPageMainScreen = ({ navigation, route }: MypageStackProps) => {
  const { isLogin, setLogin } = useContext(LoginContext);
  const [userInfo, setUserInfo] = useState({
    nickname: route.params?.nickname || '이하늘', backgroundphoto: 'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp',
    profilephoto: route.params?.profilephoto || 'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp',
    introduce: route.params?.introduce || "나는야 업씨러 이하늘 환경을 사랑하지요 눈누난나"
  });
  // 나중에 프로필수정 로직 구현되고 나면, profilepho랑 backgroundphoto 할당하면 됨 

  useEffect(() => {
    if (route.params?.userInfo) {
      setUserInfo(route.params.userInfo);
    }
  }, [route.params?.userInfo]);

  const getUserInfo = async () => {
    const userName = await getNickname();
    // const orderList = await getOrderList();
    // const backgroundPhoto = await getBackgroundPhoto();
    // const profilePhoto = await getProfilePhoto();
    // const selfIntroduce = await getSelfIntroduce();
    if (userName !== false) setUserInfo({
      nickname: userName, backgroundphoto: 'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp',
      profilephoto: 'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp',
      introduce: '나는야 업씨러 이하늘 환경을 사랑하지요 눈누난나'
    });
  };

  useFocusEffect(
    useCallback(() => {
      if (isLogin) getUserInfo();
    }, [isLogin]),
  );

  const handleLogout = () => {
    removeAccessToken();
    removeNickname();
    removeRefreshToken();
    setLogin(false);
    navigation.getParent()?.navigate('홈');
  };

  const goReformRegister = () => {
    navigation.navigate('ReformProfile');
  };

  const [routes] = useState([
    { key: 'order', title: '주문' },
    { key: 'lookbook', title: '룩북' },
    { key: 'like', title: '좋아요' }
  ]);
  const flatListRef = useRef<FlatList>(null);
  const scrollRef = useRef<ScrollView | null>(null);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* 이 밑의 탭들은 더미 데이터  */}
      <Tabs.Container
        renderHeader={props => <View>
          <ProfileSection nickname={userInfo.nickname} backgroundphoto={userInfo.backgroundphoto} profilephoto={userInfo.profilephoto}
            editProfile={() => navigation.navigate('FixMyPage', { userInfo })} introduce={userInfo.introduce} />
          {/* <Button onPress={goReformRegister} title="프로필 등록" />
          <Button onPress={handleLogout} title="로그아웃" /> */}
        </View>}
        headerContainerStyle={{
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderColor: '#D9D9D9'
        }}
        renderTabBar={props => (
          <MaterialTabBar
            {...props}
            indicatorStyle={{
              backgroundColor: '#BDBDBD',
              height: 2
            }}
            style={{
              backgroundColor: 'white',
            }}
            labelStyle={{
              color: BLACK,
              fontWeight: '700',
              fontSize: 16
            }}
            onTabPress={() => Alert.alert('준비중입니다!ㅠㅠ')}
          // 룩북, 좋아요 모아보기 기능 구현되면 위의 onTapPress는 삭제할 것 
          />
        )}
      >
        {routes.map(route =>
        (<Tabs.Tab key={route.key} name={route.title}>
          {route.key === 'order' && <OrderPage navigation={navigation} />}
          {route.key === 'lookbook' &&
            <View>
              <ServicePage scrollViewRef={scrollRef} />
              <ScrollTopButton scrollViewRef={scrollRef} />
            </View>
          }
          {route.key === 'like' &&
            <View>
              <ReviewPage flatListRef={flatListRef} />
              <ScrollToTopButton flatListRef={flatListRef} />
            </View>}
        </Tabs.Tab>)
        )}
      </Tabs.Container>

    </SafeAreaView>
  );
};

export default MyPageScreen;
