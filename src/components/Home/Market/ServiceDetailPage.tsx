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
import { useEffect, useRef, useState } from 'react';
import DetailBox from './DetailBox';
import Footer from '../../../common/Footer';
import { MaterialTabBar, Tabs } from 'react-native-collapsible-tab-view';
import { useBottomBar } from '../../../../contexts/BottomBarContext';
import DetailScreenHeader from '../components/DetailScreenHeader';
import ScrollToTopButton from '../../../common/ScrollToTopButtonFlat';
// import HeartButton from '../../../common/HeartButton';
import ReviewPage from './ReviewPage';
import DetailBox2 from './DetailBox2';

const { width, height } = Dimensions.get('window');

type ServiceDetailPageProps = {
  reformerName: string;
  serviceName: string;
  basicPrice: number;
  maxPrice: number;
  reviewNum: number;
  tags: string[];
  backgroundImageUri: string;
  profileImageUri?: string;
  servicePeriod: number;
  serviceContent: string;
};

export type DetailPageStackParams = {
  DetailPage: {
    reformerName: string;
    serviceName: string;
    basicPrice: number;
    maxPrice: number;
    reviewNum: number;
    tags: string[];
    backgroundImageUri: string;
    profileImageUri?: string;
    servicePeriod: number;
    serviceContent: string;
  };
};

const DetailPageStack = createStackNavigator<DetailPageStackParams>();

const ServiceDetailPageScreen = ({
  navigation,
  route,
}: StackScreenProps<HomeStackParams, 'ServiceDetailPage'>) => {
  const {
    reformerName,
    serviceName,
    basicPrice,
    maxPrice,
    reviewNum,
    tags,
    backgroundImageUri,
    profileImageUri,
    servicePeriod,
    serviceContent,
  }: ServiceDetailPageProps = route.params;
  return (
    <DetailPageStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <DetailPageStack.Screen
        name="DetailPage"
        component={ServiceDetailPageMainScreen}
        initialParams={{
          reformerName,
          serviceName,
          basicPrice,
          maxPrice,
          reviewNum,
          tags,
          backgroundImageUri,
          profileImageUri,
          servicePeriod,
          serviceContent,
        }}
      />
    </DetailPageStack.Navigator>
  );
};

type ProfileSectionProps = {
  navigation: any;
  reformerName: string;
  serviceName: string;
  basicPrice: number;
  maxPrice: number;
  reviewNum: number;
  tags: string[];
  backgroundImageUri: string;
  profileImageUri?: string;
};

const ProfileSection = ({
  navigation,
  reformerName,
  serviceName,
  basicPrice,
  maxPrice,
  reviewNum,
  tags,
  backgroundImageUri,
  profileImageUri,
}: ProfileSectionProps) => {
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
        onPressRight={() => {}}
      />
      <Banner backgroundImageUri={backgroundImageUri} tags={tags} />
      <Profile
        reformerName={reformerName}
        reviewNum={reviewNum}
        navigation={navigation}
      />
      <Header
        like={like}
        setLike={setLike}
        serviceName={serviceName}
        basicPrice={basicPrice}
        maxPrice={maxPrice}
      />
    </SafeAreaView>
  );
};

type BannerProps = {
  backgroundImageUri: string;
  tags: string[];
};

const Banner = ({ backgroundImageUri, tags }: BannerProps) => {
  return (
    <>
      <ImageBackground // 임시 이미지
        style={{ width: '100%', height: width * 0.5 }}
        imageStyle={{ height: width * 0.5 }}
        source={{
          uri:
            backgroundImageUri ||
            'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp',
          // backgroundImageUri가 없는 경우 기본 이미지
        }}
      />
      <View style={styles.tagContainer}>
        {tags?.length > 0 &&
          tags.map((tag, index) => {
            return (
              <View style={styles.tag} key={index}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            );
          })}
      </View>
    </>
  );
};

type HeaderProps = {
  like: boolean;
  setLike: (like: boolean) => void;
  serviceName: string;
  basicPrice: number;
  maxPrice: number;
};

const Header = ({
  like,
  setLike,
  serviceName,
  basicPrice,
  maxPrice,
}: HeaderProps) => {
  return (
    <View style={TextStyles.borderBottom1}>
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <Text style={TextStyles.Title}>{serviceName}</Text>
        <Text style={TextStyles.PriceInfo}>
          기본 <Text style={TextStyles.Price}> {basicPrice} 원</Text>
        </Text>
        <Text style={TextStyles.PriceInfo}>
          최대 <Text style={TextStyles.Price}> {maxPrice} 원</Text>
        </Text>
      </View>
      {/* <View style={{ margin: 15 }}>
        <HeartButton like={like} onPress={() => setLike(!like)} />
      </View> */}
    </View>
  );
};

type ProfileProps = {
  profilePictureUri?: string;
  reformerName: string;
  reviewNum: number;
  navigation: any;
};

const Profile = ({
  profilePictureUri,
  reformerName,
  reviewNum,
  navigation,
}: ProfileProps) => {
  return (
    <View style={{ justifyContent: 'space-between' }}>
      <View style={{ padding: 15, flexDirection: 'row' }}>
        {/* TODO: add profile picture here */}
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
            onPress={() =>
              navigation.navigate('MarketTabView', {
                reformerName: reformerName,
              })
            }>
            <Text style={TextStyles.reformerName}>{reformerName}</Text>
            <Arrow style={styles.marketArrow} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const ServiceDetailPageMainScreen = ({
  navigation,
  route,
}: StackScreenProps<DetailPageStackParams, 'DetailPage'>) => {
  const {
    reformerName,
    serviceName,
    basicPrice,
    maxPrice,
    reviewNum,
    tags,
    backgroundImageUri,
    profileImageUri,
    servicePeriod,
    serviceContent,
  } = route.params;

  const [index, setIndex] = useState<number>(0);
  const optionPageRef = useRef<FlatList<any>>(null);

  // const flatListRef = useRef<FlatList>(null);

  // const renderHeader = () => (
  //   <ProfileSection
  //     navigation={navigation}
  //     reformerName={reformerName}
  //     serviceName={serviceName}
  //     basicPrice={basicPrice}
  //     maxPrice={maxPrice}
  //     reviewNum={reviewNum}
  //     tags={tags}
  //     backgroundImageUri={backgroundImageUri}
  //     profileImageUri={profileImageUri}
  //   />
  // );

  return (
    <SafeAreaView style={{ flex: 1, position: 'relative' }}>
      {/* <Tabs.Container
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
        <Tabs.Tab name={`후기(${reviewNum})`}>
          <ReviewPage flatListRef={optionPageRef} />
        </Tabs.Tab>
      </Tabs.Container> */}
      <ProfileSection
        navigation={navigation}
        reformerName={reformerName}
        serviceName={serviceName}
        basicPrice={basicPrice}
        maxPrice={maxPrice}
        reviewNum={reviewNum}
        tags={tags}
        backgroundImageUri={backgroundImageUri}
        profileImageUri={profileImageUri}
      />
      <DetailBox2
        servicePeriod={servicePeriod}
        // serviceContent={serviceContent}
      />
      <View style={{ marginBottom: 400 }} />
      <Footer />
    </SafeAreaView>
  );
};

const TextStyles = StyleSheet.create({
  Title: {
    paddingHorizontal: 16,
    paddingBottom: 12,
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
    fontWeight: '700',
    fontSize: 14,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
    color: 'rgba(34, 34, 34, 0.50)',
    lineHeight: 24,
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
    paddingBottom: 20,
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
  marketName: {
    fontSize: 14,
    padding: 3,
    fontWeight: '700',
    color: '#222222',
  },
  reformerName: {
    fontSize: 14,
    padding: 3,
    fontWeight: '700',
    color: '#222222',
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
  marketArrow: {
    paddingLeft: 9,
    marginLeft: -4,
    transform: [{ scaleX: -1 }],
    color: '#000',
  },
});

export default ServiceDetailPageScreen;
