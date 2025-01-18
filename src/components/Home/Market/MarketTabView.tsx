import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import { Caption11M } from '../../../styles/GlobalText.tsx';
import { BLACK, BLACK2 } from '../../../styles/GlobalColor.tsx';
// import StarIcon from '../../../assets/common/Star.svg';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParams } from '../../../pages/Home';
import InfoPage from './InfoPage.tsx';
// import Footer from '../../../common/Footer.tsx';
// import Arrow from '../../../assets/common/Arrow.svg';
import ServicePage from './ServicePage.tsx';
import DetailScreenHeader from '../components/DetailScreenHeader.tsx';
import ScrollTopButton from '../../../common/ScrollTopButton.tsx';
import ReformerTag from '../components/ReformerTag.tsx';
import { defaultImageUri } from './Service.tsx';
import { getUserRole, getNickname } from '../../../common/storage.js';
import Flag from '../../../assets/common/Flag.svg';
import { MarketType } from './InfoPage.tsx';

export const ProfileSection = ({
  navigation,
  reformerName,
  profileImageUri,
}: {
  navigation: any;
  reformerName: string;
  profileImageUri: string;
}) => {
  const marketName: string = reformerName;

  return (
    <View style={{ alignItems: 'center' }}>
      <ProfileHeader
        marketName={marketName}
        navigation={navigation}
        reformerName={reformerName}
        profileImageUri={profileImageUri}
        // rate={rate}
        // reviewNumber={reviewNumber}
      />
      <View style={{ padding: 20, paddingTop: 0, paddingBottom: 0 }}>
        {/* 이 밑에거 지우면 이상하게 에러남... 그냥 냅둬도 되는 거라 무시하셔도 됩니다.  */}
        <TouchableOpacity>
          <Caption11M style={{ color: BLACK2, marginLeft: 0 }}></Caption11M>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ProfileHeader = ({
  marketName,
  navigation,
  reformerName,
  profileImageUri,
  // rate,
  // reviewNumber,
}: {
  marketName: string;
  navigation: any;
  reformerName: string;
  profileImageUri: string;
  // rate: number;
  // reviewNumber: number;
}) => {
  const [userRole, setUserRole] = useState<string>('customer');
  const [userNickname, setUserNickname] = useState<string>('');
  useEffect(() => {
    const getUserRoleInfo = async () => {
      const userRole = await getUserRole();
      setUserRole(userRole ? userRole : 'customer');
    };
    const getUserNicknameInfo = async () => {
      const userNickname = await getNickname();
      setUserNickname(userNickname ? userNickname : '');
    };
    getUserRoleInfo();
    getUserNicknameInfo();
  }, []);

  const [reportButtonPressed, setReportButtonPressed] = useState(false);

  const onPressReport = () => {
    setReportButtonPressed(false);
    navigation.navigate('ReportPage');
  };

  return (
    <>
      <DetailScreenHeader
        title=""
        leftButton="CustomBack"
        onPressLeft={() => {}}
        rightButton={
          userRole === 'customer'
            ? 'Report'
            : userNickname == reformerName
              ? 'Edit'
              : 'Report'
        }
        onPressRight={() => {}}
        reportButtonPressed={reportButtonPressed}
        setReportButtonPressed={setReportButtonPressed}
      />
      <View
        style={{
          width: '100%',
          height: 150,
          backgroundColor: '#E9EBF8',
        }}>
        <Image
          style={{
            alignSelf: 'center',
            width: 90,
            height: 90,
            borderRadius: 180,
            position: 'absolute',
            top: 100,
          }}
          source={{
            uri: profileImageUri,
          }}
        />
        {reportButtonPressed && (
          <TouchableOpacity style={styles.reportWindow} onPress={onPressReport}>
            <View style={{ justifyContent: 'center' }}>
              <Flag />
            </View>
            <Text style={TextStyles.reportText}>신고</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{ marginTop: 50, gap: 12, alignItems: 'center' }}>
        <Text style={TextStyles.marketName}>{marketName}</Text>
        <ReformerTag />
      </View>
      {/* <View style={styles.profileHeaderRateBox}>
        <StarIcon color={PURPLE} />
        <Text style={TextStyles.rate}>{rate}</Text>
        <Text style={TextStyles.reviewNumber}>({reviewNumber})</Text>
        <Arrow color={BLACK} style={styles.arrow} />
      </View> */}
    </>
  );
};

type MarketTabViewProps = {
  reformerName: string;
  introduce: string;
  reformerArea: string;
  reformerLink: string;
  marketUuid: string;
  profileImageUri?: string;
  reformerEmail?: string;
};

export type MarketResponseType = {
  //TODO: 리폼러  지역, 경력사항 추가 필요
  market_address: string; // 이게 링크
  market_introduce: string;
  market_name: string;
  market_thumbnail: string;
  market_uuid: string;
};

export type ReformerDataResponseType = {
  awards: any[];
  career: any[];
  certification: any[];
  education: any[];
  freelancer: any[];
  nickname: string;
  reformer_area: string;
  reformer_link: string;
};

const MarketTabView = ({
  navigation,
  route,
}: StackScreenProps<HomeStackParams, 'MarketTabView'>) => {
  const defaultMarketData = {
    reformerName: '정보 없음',
    introduce: '',
    reformerArea: '정보 없음',
    reformerLink: '',
    marketUuid: '',
    profileImageUri: defaultImageUri,
    reformerEmail: '정보 없음',
  } as MarketTabViewProps;
  const {
    reformerName,
    introduce,
    reformerArea,
    reformerLink,
    marketUuid,
    profileImageUri,
    reformerEmail,
  }: MarketTabViewProps = route.params || defaultMarketData;
  const [routes] = useState([
    { key: 'profile', title: '프로필' },
    { key: 'service', title: '서비스' },
  ]);
  const scrollRef = useRef<ScrollView | null>(null);

  const defaultMarketResponseData: MarketType = {
    reformer_link: reformerLink,
    introduce: introduce,
    reformer_nickname: reformerName,
    market_thumbnail: '',
    market_uuid: marketUuid,
    reformer_area: reformerArea,
    education: [],
    certification: [],
    awards: [],
    career: [],
    freelancer: [],
  };

  const [marketData, setMarketData] = useState<MarketType>(
    defaultMarketResponseData,
  );

  const renderHeader = useCallback(
    () => (
      <ProfileSection
        navigation={navigation}
        reformerName={reformerName}
        profileImageUri={profileImageUri || defaultImageUri}
      />
    ),
    [navigation, reformerName],
  );

  const renderTabBar = useCallback(
    (props: any) => (
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
    ),
    [],
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs.Container
        renderHeader={renderHeader}
        headerContainerStyle={{
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderColor: '#D9D9D9',
        }}
        renderTabBar={renderTabBar}>
        {routes.map(route => (
          <Tabs.Tab key={route.key} name={route.title}>
            {route.key === 'profile' && <InfoPage marketData={marketData} />}
            {route.key === 'service' && (
              <View>
                <ServicePage
                  scrollViewRef={scrollRef}
                  navigation={navigation}
                  reformerName={reformerName}
                  marketUuid={marketUuid}
                />
                <ScrollTopButton scrollViewRef={scrollRef} />
              </View>
            )}
          </Tabs.Tab>
        ))}
      </Tabs.Container>
      {/* <Footer /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileHeaderRateBox: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    lineHeight: 24,
  },
  star: {
    width: 12,
    height: 12,
  },
  arrow: {
    transform: [{ rotate: '180deg' }],
    paddingHorizontal: 9,
    paddingVertical: 6,
    width: 6,
    height: 12,
    gap: 8,
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

const TextStyles = StyleSheet.create({
  marketName: {
    color: '#000',
    fontSize: 20,
    fontFamily: 'Pretendard Variable',
    fontWeight: '700',
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 8,
  },
  rate: {
    color: '#222',
    textAlign: 'center',
    fontFamily: 'Pretendard Variable',
    fontSize: 16,
    fontWeight: '600',
  },
  reviewNumber: {
    color: '#222',
    textAlign: 'center',
    fontFamily: 'Pretendard Variable',
    fontSize: 16,
    fontWeight: '400',
  },
  reportText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 48,
    marginLeft: 10,
  },
});

export default MarketTabView;
