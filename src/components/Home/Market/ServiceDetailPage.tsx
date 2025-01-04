import {
  Dimensions,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ImageBackground,
  // FlatList,
  ScrollView,
  Image,
} from 'react-native';
import {
  StackScreenProps,
  createStackNavigator,
} from '@react-navigation/stack';
import { HomeStackParams } from '../../../pages/Home';
import Arrow from '../../../assets/common/Arrow.svg';
import { useEffect, useRef, useState } from 'react';
// import DetailBox from './DetailBox';
import Footer from '../../../common/Footer';
// import { MaterialTabBar, Tabs } from 'react-native-collapsible-tab-view';
import { useBottomBar } from '../../../../contexts/BottomBarContext';
import DetailScreenHeader from '../components/DetailScreenHeader';
// import ScrollToTopButton from '../../../common/ScrollToTopButtonFlat';
// import HeartButton from '../../../common/HeartButton';
// import ReviewPage from './ReviewPage';
import DetailBox2 from './DetailBox2';
import {
  defaultImageUri,
  MaterialDetail,
  ServiceDetailOption,
} from './Service';
import Flag from '../../../assets/common/Flag.svg';
import { getUserRole } from '../../../common/storage';
import { numberToPrice } from './functions';

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
  serviceMaterials: MaterialDetail[];
  serviceContent: string;
  serviceOptions: ServiceDetailOption[];
  marketUuid: string;
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
    serviceMaterials: MaterialDetail[];
    serviceOptions: ServiceDetailOption[];
    marketUuid: string;
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
    serviceMaterials,
    serviceContent,
    serviceOptions,
    marketUuid,
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
          serviceMaterials,
          serviceContent,
          serviceOptions,
          marketUuid,
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
  marketUuid: string;
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
  marketUuid,
}: ProfileSectionProps) => {
  const [like, setLike] = useState<boolean>(false);
  const { hideBottomBar, showBottomBar } = useBottomBar();

  const [reportButtonPressed, setReportButtonPressed] = useState(false);
  const [userRole, setUserRole] = useState<string>('customer');

  useEffect(() => {
    const getUserRoleInfo = async () => {
      const userRole = await getUserRole();
      setUserRole(userRole ? userRole : 'customer');
    };
    getUserRoleInfo();
    hideBottomBar();
    return () => showBottomBar();
  }, []);

  return (
    <SafeAreaView>
      <DetailScreenHeader
        title=""
        leftButton="CustomBack"
        rightButton={userRole === 'customer' ? 'Report' : 'Edit'} // FIXME: 업씨러가 소유하는 마켓
        onPressLeft={() => {}}
        onPressRight={() => {}}
        reportButtonPressed={reportButtonPressed}
        setReportButtonPressed={setReportButtonPressed}
      />
      <Banner
        backgroundImageUri={backgroundImageUri}
        tags={tags}
        reportButtonPressed={reportButtonPressed}
        setReportButtonPressed={setReportButtonPressed}
        navigation={navigation}
      />
      <Profile
        backgroundImageUri={backgroundImageUri}
        profilePictureUri={profileImageUri}
        reformerName={reformerName}
        reviewNum={reviewNum}
        navigation={navigation}
        marketUuid={marketUuid}
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
  reportButtonPressed: boolean;
  setReportButtonPressed: (reportButtonPressed: boolean) => void;
  navigation: any;
};

const Banner = ({
  backgroundImageUri,
  tags,
  reportButtonPressed,
  setReportButtonPressed,
  navigation,
}: BannerProps) => {
  const onPressReport = () => {
    setReportButtonPressed(false);
    navigation.navigate('ReportPage');
  };

  return (
    <ImageBackground // 임시 이미지
      style={{ width: '100%', height: width * 0.5, position: 'relative' }}
      imageStyle={{ height: width * 0.5 }}
      source={{
        uri: backgroundImageUri || defaultImageUri,
        // backgroundImageUri가 없는 경우 기본 이미지
      }}>
      {reportButtonPressed && (
        <TouchableOpacity style={styles.reportWindow} onPress={onPressReport}>
          <View style={{ justifyContent: 'center' }}>
            <Flag />
          </View>
          <Text style={TextStyles.reportText}>신고</Text>
        </TouchableOpacity>
      )}
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
    </ImageBackground>
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
          기본
          <Text style={TextStyles.Price}> {numberToPrice(basicPrice)} 원</Text>
        </Text>
        <Text style={TextStyles.PriceInfo}>
          최대
          <Text style={TextStyles.Price}> {numberToPrice(maxPrice)} 원</Text>
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
  backgroundImageUri?: string;
  reformerName: string;
  reviewNum: number;
  navigation: any;
  marketUuid: string;
};

const Profile = ({
  profilePictureUri,
  backgroundImageUri,
  reformerName,
  reviewNum,
  navigation,
  marketUuid,
}: ProfileProps) => {
  return (
    <View style={{ justifyContent: 'space-between' }}>
      <View style={{ padding: 15, flexDirection: 'row' }}>
        {/* TODO: add profile picture here */}
        {profilePictureUri && profilePictureUri !== '' ? (
          <Image
            style={{ width: 50, height: 50, borderRadius: 25 }}
            source={{ uri: profilePictureUri }}
          />
        ) : (
          <View
            style={{
              backgroundColor: 'gray',
              width: 50,
              height: 50,
              borderRadius: 25,
            }}></View>
        )}
        <View style={{ marginLeft: 10, justifyContent: 'center' }}>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() =>
              navigation.navigate('MarketTabView', {
                reformerName: reformerName,
                marketUuid: marketUuid,
                backgroundImageUri: backgroundImageUri ?? defaultImageUri,
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
    serviceMaterials,
    serviceContent,
    serviceOptions,
    marketUuid,
  } = route.params;

  // const [index, setIndex] = useState<number>(0);
  // const optionPageRef = useRef<FlatList<any>>(null);

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

  const [userRole, setUserRole] = useState<string>('customer');

  useEffect(() => {
    const getUserRoleInfo = async () => {
      const userRole = await getUserRole();
      setUserRole(userRole ? userRole : '');
    };
    getUserRoleInfo();
  }, []);

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
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
          marketUuid={marketUuid}
        />
        <DetailBox2
          servicePeriod={servicePeriod}
          serviceMaterials={serviceMaterials}
          serviceContent={serviceContent}
          serviceOptions={serviceOptions}
          marketUuid={marketUuid}
        />
      </ScrollView>
      {userRole === 'customer' && (
        <View style={styles.footerContainer}>
          <Footer />
        </View>
      )}
    </View>
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
  reportText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 48,
    marginLeft: 10,
  },
});

const styles = StyleSheet.create({
  tagContainer: {
    position: 'absolute',
    top: 10,
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
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 15,
    backgroundColor: '#fff',
  },
  reportWindow: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    width: 186,
    height: 48,
    borderRadius: 8,
    zIndex: 1000,
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: 13,
    display: 'flex',
    flexDirection: 'row',
  },
});

export default ServiceDetailPageScreen;
