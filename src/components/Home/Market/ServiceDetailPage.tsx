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
  Animated,
} from 'react-native';
import {
  StackScreenProps,
  createStackNavigator,
} from '@react-navigation/stack';
import { HomeStackParams } from '../../../pages/Home';
import Arrow from '../../../assets/common/Arrow.svg';
import { useContext, useEffect, useRef, useState } from 'react';
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
  ServiceOptionImage,
} from './Service';
import Flag from '../../../assets/common/Flag.svg';
import Trash from '../../../assets/common/Trash.svg';
import Pencil from '../../../assets/common/Pencil2.svg';
import {
  getUserRole,
  getAccessToken,
  getNickname,
  getMarketUUID,
} from '../../../common/storage';
import Request from '../../../common/requests.js';
import { LoginContext } from '../../../common/Context.tsx';
// import { numberToPrice } from './functions';

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
  education: any[];
  certification: any[];
  awards: any[];
  career: any[];
  freelancer: any[];
};

type ServiceData = {
  service_uuid: string;
  service_title: string;
  service_content: string;
  service_category: string;
  service_period: number;
  basic_price: number;
  max_price: number;
  service_style: string[];
  service_material: any[];
  service_option: {
    option_name: string;
    option_content: string;
    option_price: number;
    service_option_image: ServiceOptionImage[];
  }[];
  thumbnail_photo: string;
  detail_photos: string[];
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
    education: any[];
    certification: any[];
    awards: any[];
    career: any[];
    freelancer: any[];
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
    imageUris,
    profileImageUri,
    servicePeriod,
    serviceMaterials,
    serviceContent,
    serviceOptions,
    marketUuid,
    serviceUuid,
    education,
    certification,
    awards,
    career,
    freelancer,
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
          imageUris,
          profileImageUri,
          servicePeriod,
          serviceMaterials,
          serviceContent,
          serviceOptions,
          marketUuid,
          serviceUuid,
          education,
          certification,
          awards,
          career,
          freelancer,
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
  education: any[];
  certification: any[];
  awards: any[];
  career: any[];
  freelancer: any[];
  onPressDelete: () => void;
  serviceData: ServiceData;
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
  education,
  certification,
  awards,
  career,
  freelancer,
  serviceData,
  onPressDelete,
}: ProfileSectionProps) => {
  const [like, setLike] = useState<boolean>(false);
  const { hideBottomBar, showBottomBar } = useBottomBar();

  const [reportButtonPressed, setReportButtonPressed] = useState(false);
  const [editDeleteButtonPressed, setEditDeleteButtonPressed] = useState(false);
  const [userRole, setUserRole] = useState<string>('customer');
  const [myMarketUuid, setMyMarketUuid] = useState<string>('');

  useEffect(() => {
    const getUserRoleInfo = async () => {
      const userRole = await getUserRole();
      setUserRole(userRole ? userRole : 'customer');
      console.log(userRole); // debug
    };
    const getMyMarketUuidInfo = async () => {
      const myMarketUuid = await getMarketUUID();
      setMyMarketUuid(myMarketUuid ? myMarketUuid : '');
    };
    getUserRoleInfo();
    getMyMarketUuidInfo();
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
            : (userRole === 'reformer' && marketUuid == myMarketUuid)
              ? 'Edit'
              : 'Report'
        }
        onPressLeft={() => { }}
        onPressRight={() => { }}
        reportButtonPressed={reportButtonPressed}
        setReportButtonPressed={setReportButtonPressed}
        editDeleteButtonPressed={editDeleteButtonPressed}
        setEditDeleteButtonPressed={setEditDeleteButtonPressed}
      />
      <Banner
        backgroundImageUri={backgroundImageUri}
        tags={tags}
        reportButtonPressed={reportButtonPressed}
        setReportButtonPressed={setReportButtonPressed}
        editDeleteButtonPressed={editDeleteButtonPressed}
        setEditDeleteButtonPressed={setEditDeleteButtonPressed}
        navigation={navigation}
        onPressDelete={onPressDelete}
        serviceData={serviceData}
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
        education={education}
        certification={certification}
        awards={awards}
        career={career}
        freelancer={freelancer}
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
  editDeleteButtonPressed: boolean;
  setEditDeleteButtonPressed: (setEditDeleteButtonPressed: boolean) => void;
  navigation: any;
  onPressDelete: () => void;
  serviceData: ServiceData;
};

const Banner = ({
  backgroundImageUri,
  tags,
  reportButtonPressed,
  setReportButtonPressed,
  editDeleteButtonPressed,
  setEditDeleteButtonPressed,
  navigation,
  onPressDelete,
  serviceData,
}: BannerProps) => {
  const onPressReport = () => {
    setReportButtonPressed(false);
    navigation.navigate('ReportPage', { service_key: serviceData.service_uuid });
  };
  const onPressEdit = () => {
    setEditDeleteButtonPressed(false);
    navigation.navigate('ServiceRegistrationPage', {serviceData: serviceData, fix: true });
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
      {editDeleteButtonPressed && (
        <View
          style={{
            flexDirection: 'column',
            position: 'absolute',
            top: 0,
            right: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            width: 186,
            height: 97,
            borderRadius: 8,
            zIndex: 1000,
            display: 'flex',
          }}>
          <TouchableOpacity style={styles.editDeleteWindow} onPress={onPressEdit}>
            <View style={{ justifyContent: 'center' }}>
              <Pencil />
            </View>
            <Text style={TextStyles.reportText}>수정</Text>
          </TouchableOpacity>
          <View
            style={{
              height: 1,
              backgroundColor: '#E5E5E5', // 버튼 사이 회색 선
              marginHorizontal: 10,
              width: '100%',
              marginLeft: 0,
            }}
          />
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 13,}} onPress={onPressDelete}>
            <View style={{ justifyContent: 'center' }}>
              <Trash />
            </View>
            <Text style={TextStyles.reportText}>삭제</Text>
          </TouchableOpacity>
        </View>
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
          <Text style={TextStyles.Price}> {basicPrice} 원</Text>
        </Text>
        <Text style={TextStyles.PriceInfo}>
          최대
          <Text style={TextStyles.Price}> {maxPrice} 원</Text>
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
  education: any[];
  certification: any[];
  awards: any[];
  career: any[];
  freelancer: any[];
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
  education,
  certification,
  awards,
  career,
  freelancer,
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
                profileImageUri: profilePictureUri ?? defaultImageUri,
                education: education,
                certification: certification,
                awards: awards,
                career: career,
                freelancer: freelancer,
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
  navigation, route
}: StackScreenProps<HomeStackParams, 'ServiceDetailPage'>) => {
  const { isLogin } = useContext(LoginContext);
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
    education,
    certification,
    awards,
    career,
    freelancer,
  } = route.params;

  const serviceData: ServiceData = { // 담솔님이 추가하신거
    service_uuid: serviceUuid,
    service_title: serviceName,
    service_content: serviceContent,
    service_category: tags?.[0] || '',
    service_period: servicePeriod,
    basic_price: basicPrice,
    max_price: maxPrice,
    service_style: tags || [],
    service_material: serviceMaterials?.map((material) => (material.material_name || '')) || [],
    service_option: serviceOptions?.map((option) => ({
      option_name: option.option_name || '',
      option_content: option.option_content || '',
      option_price: option.option_price || 0,
      service_option_image: option.service_option_image || [],
    })) || [],
    thumbnail_photo: imageUris?.[0],
    detail_photos: imageUris,
  };
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
  const [myMarketUuid, setMyMarketUuid] = useState<string>('');
  const [isServiceQuitPopupVisible, setServiceQuitPopupVisible] = useState(false);
  const [isServiceResumePopupVisible, setServiceResumePopupVisible] = useState(false);
  const [isDeletePopupVisible, setDeletePopupVisible] = useState(false);

  const request = Request();

  useEffect(() => {
    const getUserRoleInfo = async () => {
      const userRole = await getUserRole();
      setUserRole(userRole ? userRole : 'customer');
    };
    const getMyMarketUuidInfo = async () => {
      const myMarketUuid = await getMarketUUID();
      setMyMarketUuid(myMarketUuid ? myMarketUuid : '');
    };
    getUserRoleInfo();
    getMyMarketUuidInfo();

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

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const animationValue = useRef(new Animated.Value(0)).current;

  const showMessage = (text: string, type: string) => {
    console.log('showMessage called with:', text, type);
    setMessage(text);
    setMessageType(type);
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      console.log('Animation started');
      setTimeout(() => {
        Animated.timing(animationValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, 2000);
    });
  };

  const handleDelete = async () => {    //todo: 진행중인 주문이 있으면 삭제 안되게 설정
    const accessToken = await getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    try {
      const response = await request.del(
        `/api/market/${marketUuid}/service/${serviceUuid}`,
        { headers }
      );
      if (response && response.status === 200) {
        setDeletePopupVisible(false);
        showMessage('삭제 완료되었습니다.', 'success');
        setTimeout(() => {
          navigation.goBack();
        }, 2300);
      } else {
        console.error('Error deleting service');
        setDeletePopupVisible(false);
        showMessage('문제가 생겼습니다. 잠시 후에 다시 시도해주세요.', 'error');
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      showMessage('문제가 생겼습니다. 잠시 후에 다시 시도해주세요.', 'error');
      setDeletePopupVisible(false);
    }
  };

  const onPressDelete = () => {
    setDeletePopupVisible(true);
  };

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

  const handlePopup = (suspended: boolean) => {
    if (suspended) {
      setServiceResumePopupVisible(true);
    } else {
      setServiceQuitPopupVisible(true);
    }
  };

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} bounces={false} overScrollMode="never">
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
          education={education}
          certification={certification}
          awards={awards}
          career={career}
          freelancer={freelancer}
          onPressDelete={onPressDelete}
          serviceData={serviceData}
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
        {isLogin &&
          <Footer
            suspended={suspended}
            hideButton={userRole === 'reformer'}
            serviceUuid={serviceUuid}
            onNavigate={(uuid) => navigation.navigate('QuotationForm', { serviceUuid: uuid, marketUuid: marketUuid, })}
          />
        }
      </View>
      {userRole === 'reformer' && marketUuid === myMarketUuid && (
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

      <Animated.View
        style={[
          styles.animationMessageContainer,
          {
            opacity: animationValue,
            backgroundColor: '#E9EBF8',
          },
        ]}
      >
        <Text style={styles.animationMessageText}>{message}</Text>
      </Animated.View>

      <CustomPopup
        visible={isDeletePopupVisible}
        title="해당 서비스를 삭제할까요?"
        subtitle="한번 삭제한 서비스는 복구할 수 없습니다."
        confirmText="삭제"
        onConfirm={handleDelete}
        onCancel={() => setDeletePopupVisible(false)}
      />
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
  onConfirm: () => void;
  onCancel: () => void;
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
  editDeleteWindow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
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
  animationMessageContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -150 }, { translateY: -25 }],
    width: 300,
    height: 45,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animationMessageText: {
    color: '#929292',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
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
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  confirmText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF3B30',
  },
  cancelButton: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default ServiceDetailPageMainScreen;
