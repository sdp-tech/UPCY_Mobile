import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  Alert,
} from 'react-native';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import { Caption11M } from '../../../styles/GlobalText.tsx';
import { BLACK, BLACK2, PURPLE } from '../../../styles/GlobalColor.tsx';
// import StarIcon from '../../../assets/common/Star.svg';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParams } from '../../../pages/Home';
import InfoPage from './InfoPage.tsx';
import Footer from '../../../common/Footer.tsx';
import Request from '../../../common/requests.js';
// import Arrow from '../../../assets/common/Arrow.svg';
import ServicePage from './ServicePage.tsx';
import DetailScreenHeader from '../components/DetailScreenHeader.tsx';
import ScrollTopButton from '../../../common/ScrollTopButton.tsx';
import ReformerTag from '../components/ReformerTag.tsx';
import { defaultImageUri } from './Service.tsx';

export const ProfileSection = ({
  navigation,
  reformerName,
  backgroundImageUri,
}: {
  navigation: any;
  reformerName: string;
  backgroundImageUri?: string;
}) => {
  const marketName: string = reformerName;
  const selfIntroduce: string =
    '안녕하세요 리폼러 이하늘입니다! 저는 업씨대학교 패션디자인학과에 수석입학했고요 짱짱 천재에요';
  const rate: number = 4.5; // 평점
  const reviewNumber: number = 100; // 후기 개수

  return (
    <View style={{ alignItems: 'center' }}>
      <ProfileHeader
        marketName={marketName}
        backgroundImageUri={backgroundImageUri}
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
  backgroundImageUri,
  // rate,
  // reviewNumber,
}: {
  marketName: string;
  backgroundImageUri?: string;
  // rate: number;
  // reviewNumber: number;
}) => {
  return (
    <>
      <DetailScreenHeader
        title=""
        leftButton="CustomBack"
        onPressLeft={() => {}}
        rightButton="Edit"
        onPressRight={() => {}}
      />
      <ImageBackground
        style={{ width: '100%', height: 200 }}
        imageStyle={{ height: 160 }}
        source={{
          uri: backgroundImageUri ?? defaultImageUri,
        }}>
        <View
          style={{
            width: '100%',
            height: 160,
            backgroundColor: '#00000066',
            opacity: 0.7,
          }}
        />
        <Image
          style={{
            alignSelf: 'center',
            width: 90,
            height: 90,
            borderRadius: 180,
            position: 'absolute',
            top: 110,
          }}
          source={{
            uri: 'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp',
          }}
        />
      </ImageBackground>
      <View style={{ gap: 12, alignItems: 'center' }}>
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
  marketUuid: string;
  backgroundImageUri?: string;
};

export type MarketResponseType = {
  market_address: string;
  market_introduce: string;
  market_name: string;
  market_thumbnail: string;
  market_uuid: string;
};

const MarketTabView = ({
  navigation,
  route,
}: StackScreenProps<HomeStackParams, 'MarketTabView'>) => {
  const defaultMarketData = {
    reformerName: '정보 없음',
    marketUuid: '',
    backgroundImageUri: defaultImageUri,
  } as MarketTabViewProps;
  const { reformerName, marketUuid, backgroundImageUri }: MarketTabViewProps =
    route.params || defaultMarketData;
  const [routes] = useState([
    { key: 'profile', title: '프로필' },
    { key: 'service', title: '서비스' },
  ]);
  const scrollRef = useRef<ScrollView | null>(null);
  const request = Request();

  const defaultMarketResponseData: MarketResponseType = {
    market_address: '',
    market_introduce: '정보 없음',
    market_name: '정보 없음',
    market_thumbnail: '',
    market_uuid: '',
  };

  const [marketData, setMarketData] = useState<MarketResponseType>(
    defaultMarketResponseData,
  );

  const fetchData = async () => {
    try {
      // API 호출
      const response = await request.get(`/api/market/${marketUuid}`, {}, {});
      if (response && response.status === 200) {
        const marketResult: MarketResponseType = response.data;
        setMarketData(marketResult);
      } else {
        Alert.alert('오류가 발생했습니다.');
      }
    } catch (error) {
      console.error(error);
    } finally {
      // TODO: 로딩 상태 추가하기
    }
  };

  // 컴포넌트가 처음 렌더링될 때 API 호출
  useEffect(() => {
    fetchData();
  }, []);

  const renderHeader = useCallback(
    () => (
      <ProfileSection
        navigation={navigation}
        reformerName={reformerName}
        backgroundImageUri={backgroundImageUri}
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
});

export default MarketTabView;
