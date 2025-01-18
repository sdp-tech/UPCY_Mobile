import {
  Dimensions,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Modal,
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
import {
  getUserRole,
  getAccessToken,
  getNickname,
} from '../../../common/storage';
import Request from '../../../common/requests.js';
import { numberToPrice } from './functions';

// 전체 홈 화면에서, 특정 서비스 누르면 넘어오는 페이지 (개별 서비스 페이지)

const { width, height } = Dimensions.get('window');

type ServiceDetailPageProps = {
  reformerName: string;
  introduce: string;
  reformerArea: string;
  reformerLink: string;
  serviceName: string;
  basicPrice: number;
  maxPrice: number;
  reviewNum: number;
  tags: string[];
  imageUris: any[];
  profileImageUri?: string;
  servicePeriod: number;
  serviceMaterials: MaterialDetail[];
  serviceContent: string;
  serviceOptions: ServiceDetailOption[];
  marketUuid: string;
  serviceUuid: string;
};

export type DetailPageStackParams = {
  DetailPage: {
    reformerName: string;
    introduce: string;
    reformerArea: string;
    reformerLink: string;
    serviceName: string;
    basicPrice: number;
    maxPrice: number;
    reviewNum: number;
    tags: string[];
    imageUris: any[];
    profileImageUri?: string;
    servicePeriod: number;
    serviceContent: string;
    serviceMaterials: MaterialDetail[];
    serviceOptions: ServiceDetailOption[];
    marketUuid: string;
    serviceUuid: string;
  };
};

const DetailPageStack = createStackNavigator<DetailPageStackParams>();

const ServiceDetailPageScreen = ({
  navigation,
  route,
}: StackScreenProps<HomeStackParams, 'ServiceDetailPage'>) => {
  const {
    reformerName,
    introduce,
    reformerArea,
    reformerLink,
    serviceName,
    basicPrice,
    maxPrice,
    reviewNum,
    tags,
    imageUris,
    profileImageUri,
    servicePeriod,
    serviceMaterials,
    serviceContent,
    serviceOptions,
    marketUuid,
    serviceUuid,
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
          introduce,
          reformerArea,
          reformerLink,
          serviceName,
          basicPrice,
          maxPrice,
          reviewNum,
          tags,
          imageUris,
          profileImageUri,
          servicePeriod,
          serviceMaterials,
          serviceContent,
          serviceOptions,
          marketUuid,
          serviceUuid,
        }}
      />
    </DetailPageStack.Navigator>
  );
};

type ProfileSectionProps = {
  navigation: any;
  reformerName: string;
  introduce: string;
  reformerArea: string;
  reformerLink: string;
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
  introduce,
  reformerArea,
  reformerLink,
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
  const [userNickname, setUserNickname] = useState<string>('');

  useEffect(() => {
    const getUserRoleInfo = async () => {
      const userRole = await getUserRole();
      setUserRole(userRole ? userRole : 'customer');
      console.log(userRole); // debug
    };
    const getUserNicknameInfo = async () => {
      const userNickname = await getNickname();
      setUserNickname(userNickname ? userNickname : '');
    };
    getUserRoleInfo();
    getUserNicknameInfo();
    hideBottomBar();
    return () => showBottomBar();
  }, []);

  return (
    <SafeAreaView>
      <DetailScreenHeader
        title=""
        leftButton="CustomBack"
        rightButton={
          userRole === 'customer'
            ? 'Report'
            : userRole === 'customer' && userNickname == reformerName
              ? 'Edit'
              : 'Report'
        }
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
        introduce={introduce}
        reformerArea={reformerArea}
        reformerLink={reformerLink}
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
  introduce: string;
  reformerArea: string;
  reformerLink: string;
  reviewNum: number;
  navigation: any;
  marketUuid: string;
};

const Profile = ({
  profilePictureUri,
  backgroundImageUri,
  reformerName,
  introduce,
  reformerArea,
  reformerLink,
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
                // 프로필 사진 옆에 있는 이름 눌렀을 때
                reformerName: reformerName,
                introduce: introduce,
                reformerArea: reformerArea,
                reformerLink: reformerLink,
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
    introduce,
    reformerArea,
    reformerLink,
    serviceName,
    basicPrice,
    maxPrice,
    reviewNum,
    tags,
    imageUris,
    profileImageUri,
    servicePeriod,
    serviceMaterials,
    serviceContent,
    serviceOptions,
    marketUuid,
    serviceUuid,
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

  const [suspended, setSuspended] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string>('customer');
  const [isServiceQuitPopupVisible, setServiceQuitPopupVisible] =
    useState(false);
  const [isServiceResumePopupVisible, setServiceResumePopupVisible] =
    useState(false);

  const request = Request();

  useEffect(() => {
    const getUserRoleInfo = async () => {
      const userRole = await getUserRole();
      setUserRole(userRole ? userRole : 'customer');
    };
    getUserRoleInfo();

    const fetchServiceStatus = async () => {
      try {
        const response = await request.get(
          `/api/market/${marketUuid}/service/${serviceUuid}`,
          {},
        );
        if (response && response.status === 200) {
          setSuspended(response.data.suspended); // 서비스 상태 (중단 여부) 받아오기
        }
      } catch (error) {
        console.error('Error fetching service status:', error);
      }
    };

    fetchServiceStatus();
  }, [marketUuid, serviceUuid]);

  const handleServiceQuit = async () => {
    const accessToken = await getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    try {
      const response = await request.put(
        `/api/market/${marketUuid}/service/${serviceUuid}`,
        { suspended: true },
        headers,
      );
      //console.log(response.data);
      if (response && response.status === 200) {
        setSuspended(true);
        setServiceQuitPopupVisible(false);
      }
    } catch (error) {
      console.error('Error quitting service:', error);
    }
  };

  const handleServiceResume = async () => {
    const accessToken = await getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const handleServiceResume = async () => {
      const accessToken = await getAccessToken();
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      try {
        const response = await request.put(
          `/api/market/${marketUuid}/service/${serviceUuid}`,
          { suspended: false },
          headers,
        );
        if (response && response.status === 200) {
          setSuspended(false);
          setServiceResumePopupVisible(false);
        }
      } catch (error) {
        console.error('Error quitting service:', error);
      }
    };
  };

  const handlePopup = (suspended: boolean) => {
    if (suspended) {
      setServiceResumePopupVisible(true);
    } else {
      setServiceQuitPopupVisible(true);
    }
  };

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
          introduce={introduce}
          reformerArea={reformerArea}
          reformerLink={reformerLink}
          serviceName={serviceName}
          basicPrice={basicPrice}
          maxPrice={maxPrice}
          reviewNum={reviewNum}
          tags={tags}
          backgroundImageUri={imageUris?.[0]?.image}
          profileImageUri={profileImageUri}
          marketUuid={marketUuid}
        />
        <DetailBox2
          servicePeriod={servicePeriod}
          serviceMaterials={serviceMaterials}
          serviceContent={serviceContent}
          serviceOptions={serviceOptions}
          imageUris={imageUris}
          marketUuid={marketUuid}
        />
      </ScrollView>
      <View style={styles.footerContainer}>
        <Footer suspended={false} />
        {/* TODO: 위 수정 필요  */}
      </View>
      {userRole === 'reformer' && (
        <TouchableOpacity
          style={
            suspended ? styles.serviceResumeButton : styles.serviceQuitButton
          }
          onPress={() => handlePopup(suspended)}>
          <Text
            style={
              suspended
                ? styles.serviceResumeButtonText
                : styles.serviceQuitButtonText
            }>
            {suspended ? '서비스 재개' : '서비스 중단'}
          </Text>
        </TouchableOpacity>
      )}

      <CustomPopup
        visible={isServiceQuitPopupVisible}
        title="서비스 주문 받기를 정말 중단할까요?"
        subtitle="서비스 재개를 통해 다시 주문을 받을 수 있습니다."
        confirmText="중단"
        onConfirm={handleServiceQuit}
        onCancel={() => setServiceQuitPopupVisible(false)}
      />
      <CustomPopup
        visible={isServiceResumePopupVisible}
        title="서비스 주문 받기를 재개할까요?"
        subtitle="서비스 중단을 통해 다시 주문을 받지 않을 수 있습니다."
        confirmText="재개"
        onConfirm={handleServiceResume}
        onCancel={() => setServiceResumePopupVisible(false)}
      />
    </View>
  );
};

type CustomPopupProps = {
  visible: boolean;
  title: string;
  subtitle: string;
  confirmText: string;
  onConfirm: any;
  onCancel: any;
};

const CustomPopup = ({
  visible,
  title,
  subtitle,
  confirmText,
  onConfirm,
  onCancel,
}: CustomPopupProps) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.popupContainer}>
          <View style={styles.messageContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmText}>{confirmText}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>취소</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmText}>{confirmText}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
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
    backgroundColor: 'rgba(97, 47, 239, 0.80)',
    borderRadius: 8,
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
  serviceQuitButton: {
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
  serviceQuitButtonText: {
    color: '#612FEF',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
  },
  serviceResumeButton: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: '#612FEF',
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  serviceResumeButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center', // 화면 중앙 정렬
    alignItems: 'center', // 가로 중앙 정렬
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
  },
  popupContainer: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    overflow: 'hidden',
  },
  messageContainer: {
    height: 154, // 메시지 영역 높이 고정
    width: '100%', // 가로 전체 사용
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#929292',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  confirmButton: {
    height: 60, // 버튼 높이 줄임 (62 -> 60)
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5', // 회색 구분선
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF3B30', // 빨간색 텍스트
  },
  cancelButton: {
    height: 60, // 버튼 높이 줄임 (62 -> 60)
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default ServiceDetailPageScreen;
