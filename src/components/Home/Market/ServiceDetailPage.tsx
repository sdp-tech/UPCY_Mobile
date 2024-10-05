import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  useWindowDimensions,
  ImageBackground,
  FlatList,
} from 'react-native';
import {
  StackScreenProps,
  createStackNavigator,
} from '@react-navigation/stack';
import { HomeStackParams } from '../../../pages/Home';
import Arrow from '../../../assets/common/Arrow.svg';
import Search from '../../../assets/common/Search.svg';
import Review from '../../../assets/common/Review.svg';
import UnFilledLike from '../../../assets/common/UnFilledLike.svg';
import React, { useEffect, useRef, useState } from 'react';
import DetailBox from './DetailBox';
import OptionBox from './OptionBox';
import CardView from '../../../common/CardView';
import Footer from '../../../common/Footer';
import { MaterialTabBar, Tabs } from 'react-native-collapsible-tab-view';
import { BLACK } from '../../../styles/GlobalColor';
import { useBottomBar } from '../../../../contexts/BottomBarContext';
import { CustomBackButton } from '../components/CustomBackButton';
import DetailScreenHeader from '../components/DetailScreenHeader';
import ScrollToTopButton from '../../../common/ScrollToTopButtonFlat';
import HeartButton from '../../../common/HeartButton';

const { width, height } = Dimensions.get('window');

export type DetailPageStackParams = {
  DetailPage: undefined;
};

const DetailPageStack = createStackNavigator<DetailPageStackParams>();

const ServiceDetailPageScreen = ({
  navigation,
  route,
}: StackScreenProps<HomeStackParams, 'ServiceDetailPage'>) => {
  return (
    <DetailPageStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <DetailPageStack.Screen
        name="DetailPage"
        component={ServiceDetailPageMainScreen}
      />
    </DetailPageStack.Navigator>
  );
};

type ProfileSectionProps = {
  navigation: any;
};

const ProfileSection: React.FC<ProfileSectionProps> = ({
  navigation,
}: {
  navigation: any;
}) => {
  const [like, setLike] = useState<boolean>(false);
  const { hideBottomBar, showBottomBar } = useBottomBar();

  useEffect(() => {
    hideBottomBar();
    return () => showBottomBar();
  }, []);
  return (
    <SafeAreaView>
      <DetailScreenHeader
        title=""
        leftButton="CustomBack"
        onPressLeft={() => {}}
        rightButton="Search"
        onPressRight={() => {}}
      />
      <Banner />
      <Header like={like} setLike={setLike} />
      <Profile navigation={navigation} />
    </SafeAreaView>
  );
};

const Banner = () => {
  return (
    <>
      <ImageBackground // 임시 이미지
        style={{ width: '100%', height: width * 0.5 }}
        imageStyle={{ height: width * 0.5 }}
        source={{
          uri: 'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp',
        }}>
        <View
          style={{
            width: '100%',
            height: width * 0.5,
            backgroundColor: '#00000066',
            opacity: 0.1,
          }}
        />
      </ImageBackground>
      <View style={styles.tagContainer}>
        {/* 보라색 태그 */}
        <View style={styles.tag}>
          <Text style={styles.tagText}>미니멀</Text>
        </View>
        <View style={styles.tag}>
          <Text style={styles.tagText}>빈티지</Text>
        </View>
      </View>
    </>
  );
};

type HeaderProps = {
  like: boolean;
  setLike: (like: boolean) => void;
};
const Header = ({ like, setLike }: HeaderProps) => {
  return (
    <View style={TextStyles.borderBottom1}>
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <Text style={TextStyles.Title}>서비스 이름</Text>
        <Text style={TextStyles.PriceInfo}>
          기본 <Text style={TextStyles.Price}> 20,000 원</Text>
        </Text>
        <Text style={TextStyles.PriceInfo}>
          최대 <Text style={TextStyles.Price}> 24,000 원</Text>
        </Text>
      </View>
      <View style={{ margin: 15 }}>
        <HeartButton like={like} onPress={() => setLike(!like)} />
      </View>
    </View>
  );
};

const Profile = ({ navigation }: { navigation: any }) => {
  return (
    <View
      style={{
        ...TextStyles.borderBottom2,
        justifyContent: 'space-between',
      }}>
      <View style={{ padding: 15, flexDirection: 'row' }}>
        <View
          style={{
            backgroundColor: 'gray',
            width: 50,
            height: 50,
            borderRadius: 25,
          }}></View>
        <View style={{ marginLeft: 20, justifyContent: 'center' }}>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => navigation.navigate('Market')}>
            <Text
              style={{
                fontSize: 14,
                padding: 3,
                fontWeight: '700',
                color: '#222222',
              }}>
              이하늘의 마켓
            </Text>
            <Arrow // Arrow at the right side of 'marketname'
              style={{ marginLeft: -4, transform: [{ scaleX: -1 }] }}
              color={BLACK}></Arrow>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 14,
              padding: 3,
              fontWeight: '700',
              color: '#222222',
            }}>
            이하늘
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              marginRight: 15,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => {}}>
              <Review color={BLACK} />
            </TouchableOpacity>
            <Text style={{ marginTop: 8 }}>후기(3)</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const ServiceDetailPageMainScreen = ({
  navigation,
}: StackScreenProps<DetailPageStackParams, 'DetailPage'>) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState<number>(0);
  const optionPageRef = useRef<FlatList<any>>(null);

  const handleScrollToHeader = () => {
    const currentFlatListRef = index === 0 ? flatListRef : optionPageRef;
    flatListRef.current?.scrollToOffset({ offset: -height, animated: true });
  };
  const [routes] = useState([
    { key: 'detail', title: '상세설명' },
    { key: 'option', title: '후기' },
  ]);
  const scrollRef = useRef<ScrollView>(null);
  const flatListRef = useRef<FlatList>(null);

  const renderHeader = () => <ProfileSection navigation={navigation} />;
  return (
    <SafeAreaView style={{ flex: 1, position: 'relative' }}>
      <Tabs.Container
        renderHeader={renderHeader}
        allowHeaderOverscroll={false}
        onIndexChange={setIndex}
        renderTabBar={props => (
          <MaterialTabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#BDBDBD', height: 2 }}
            style={{ backgroundColor: 'white' }}
            labelStyle={{ color: '#222222', fontWeight: '700', fontSize: 14 }}
          />
        )}>
        <Tabs.Tab name="상세설명">
          <DetailBox />
          <ScrollToTopButton flatListRef={flatListRef} />
        </Tabs.Tab>
        <Tabs.Tab name="후기(5)">
          {/*5는 임시 숫자임. 실제 데이터 넣어야 함.*/}
          <OptionBox flatListRef={optionPageRef} />
        </Tabs.Tab>
      </Tabs.Container>
      <Footer />
    </SafeAreaView>
  );
};

const TextStyles = StyleSheet.create({
  Title: {
    // fontFamily:"Inter",
    padding: 16,
    color: '#222222',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 24,
    width: '100%',
  },
  Sub: {
    width: '70%',
    fontWeight: '700',
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 10,
    fontSize: 14,
    lineHeight: 24,
    color: '#612EFE',
  },
  PriceInfo: {
    fontWeight: '600',
    fontSize: 14,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
    color: 'rgba(34, 34, 34, 0.50)',
  },
  Price: {
    fontWeight: '700',
    fontSize: 16,
    paddingLeft: 16,
    paddingTop: 5,
    paddingRight: 16,
    paddingBottom: 5,
    color: '#222222',
  },
  recommend: {
    color: '#FFFFFF',
    backgroundColor: '#67D393',
    fontSize: 14,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 5,
  },
  borderBottom1: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBlockColor: '#dcdcdc',
  },
  borderBottom2: {
    borderBottomWidth: 6,
    borderBlockColor: '#dcdcdc',
  },
  scrollToHeaderButton: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 50,
    zIndex: 1000,
  },
  scrollToHeaderText: {
    color: '#fff',
    fontSize: 16,
  },
});

const styles = StyleSheet.create({
  tagContainer: {
    position: 'absolute',
    top: 50,
    right: 16,
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 3,
    paddingBottom: 3,
    backgroundColor: '#612FEF',
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#612FEF',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  tagText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Pretendard Variable',
    fontWeight: '400',
    lineHeight: 24,
  },
});

export default ServiceDetailPageScreen;
