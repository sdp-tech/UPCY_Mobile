import React, { Fragment, useState, useRef } from 'react';

import { SafeAreaView, Text, View, Alert } from 'react-native';
import styled from 'styled-components/native';
import {
  StackScreenProps,
  createStackNavigator,
} from '@react-navigation/stack';
import { TabProps } from '../../App';
import { ScrollView } from 'react-native-gesture-handler';

// TODO: 나중에 CustomHeader2 사용
import CustomHeader from '../common/CustomHeader';
import CustomHeader2 from '../common/CustomHeader2';
import HomeTabView, { SelectedOptionProps } from '../components/Home/HomeMain';
import MarketTabView from '../components/Home/Market/MarketTabView';
import QuotationForm from '../components/Home/Quotation/QuotationForm';
import QuotationPage, {
  QuotationProps,
} from '../components/Home/Quotation/QuotationPage';
import SentQuotation from '../components/Home/Quotation/SentQuotation';
import TempStorage from '../components/Home/Market/TempStorage';
import ServiceRegistrationPage from '../components/Home/Market/ServiceRegistration';
import ServiceDetailPageScreen from '../components/Home/Market/ServiceDetailPage';
import GoodsDetailPageScreen from '../components/Home/Market/GoodsDetailPage';
import GoodsRegistrationPage from '../components/Home/Market/GoodsRegistration';
import TempStorageEdit from '../components/Home/Market/TempStorageEdit';
import WriteDetailPage from '../components/Home/Market/WriteDetailPage';
import AddPortfolio from '../components/Home/Portfolio/AddPortfolio';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import InputInfo, {
  InputInfoProps,
} from '../components/Home/Quotation/InputInfo';
import QuotationConfirm from '../components/Home/Quotation/QuotationConfirm';
import Rejection from '../components/Home/Quotation/Rejection';
import SentRejection from '../components/Home/Quotation/SentRejection';
import WriteReviewPage from '../components/Home/Market/WriteReviewPage';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import ComponentsTest from './ComponentsTest';
import { PURPLE } from '../styles/GlobalColor';
import OrderManagement from '../components/Home/Order/OrderManagement';
import CompletedOrder from '../components/Home/Order/CompletedOrder';
import ReformerMarket from '../components/Home/Market/ReformerMarket';
import Service from '../components/Home/Market/Service';
import { PhotoType } from '../hooks/useImagePicker';
import { stylesList } from '../components/Home/HomeMain';

export type HomeStackParams = {
  Home: undefined;
  // 혼란 방지를 위해 Market -> MarketTabView로 수정하였습니다.
  // Market: undefined;
  ServiceDetailPage: {
    // TODO: add later
    // id: string;
    serviceName: string;
    reformerName: string;
    basicPrice: number;
    maxPrice: number;
    tags: string[];
    reviewNum: number;
    backgroundImageUri: string;
    profileImageUri?: string;
  };
  GoodsDetailPage: undefined;
  QuotationForm: undefined;
  QuotationPage: QuotationProps;
  SentQuotation: undefined;
  // ServiceRegistrationPage: { inputText?: string; detailphoto?: PhotoType[] };
  GoodsRegistrationPage: undefined;
  TempStorageEdit: undefined;
  WriteDetailPage: { inputText: string; detailphoto?: PhotoType[] };
  AddPortfolio: undefined;
  InputInfo: undefined;
  QuotationConfirm: undefined;
  Rejection: undefined;
  SentRejection: undefined;
  ReformerMarket: undefined;
  TestComponents: undefined;
  MarketTabView: {
    // TODO: add later
    // id: string;
    reformerName: string;
  };
};

const HomeStack = createStackNavigator<HomeStackParams>();

const HomeScreen = ({
  navigation,
  route,
}: BottomTabScreenProps<TabProps, '홈'>) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'AddPortfolio') {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex' } });
    }
  }, [navigation, route]);

  return (
    <HomeStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <HomeStack.Screen name="Home" component={HomeMainScreen} />
      <HomeStack.Screen name="MarketTabView" component={MarketTabView} />
      <HomeStack.Screen
        name="ServiceDetailPage"
        component={ServiceDetailPageScreen}
      />
      {/* <HomeStack.Screen
        name="ServiceRegistrationPage"
        component={ServiceRegistrationPage}
      /> */}
      <HomeStack.Screen name="QuotationForm" component={QuotationForm} />
      <HomeStack.Screen name="QuotationPage" component={QuotationPage} />
      <HomeStack.Screen name="SentQuotation" component={SentQuotation} />
      <HomeStack.Screen
        name="GoodsDetailPage"
        component={GoodsDetailPageScreen}
      />
      <HomeStack.Screen
        name="GoodsRegistrationPage"
        component={GoodsRegistrationPage}
      />
      <HomeStack.Screen name="TempStorageEdit" component={TempStorageEdit} />
      <HomeStack.Screen name="WriteDetailPage" component={WriteDetailPage} />
      <HomeStack.Screen name="AddPortfolio" component={AddPortfolio} />
      <HomeStack.Screen name="InputInfo" component={InputInfo} />
      <HomeStack.Screen name="QuotationConfirm" component={QuotationConfirm} />
      <HomeStack.Screen name="Rejection" component={Rejection} />
      <HomeStack.Screen name="SentRejection" component={SentRejection} />
      <HomeStack.Screen name="TestComponents" component={ComponentsTest} />
      <HomeStack.Screen name="ReformerMarket" component={ReformerMarket} />
    </HomeStack.Navigator>
  );
};

const HomeMainScreen = ({
  navigation,
}: StackScreenProps<HomeStackParams, 'Home'>) => {
  const [selectedTab, setSelectedTab] = useState<'Goods' | 'Market' | 'temp'>(
    'Goods',
  );
  const ServicePageRef = useRef<ScrollView>(null);
  const handlePopupButtonPress = () => {
    Alert.alert(
      '알림', // 팝업제목
      '주문서가 들어왔어요. \n 확인해보시겠어요?',
      [
        {
          text: '네',
          onPress: () => {
            console.log('네 선택');
            navigation.navigate('QuotationConfirm');
          },
        },
        {
          text: '나중에요',
          onPress: () => console.log('나중에요 선택'),
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );
  };

  const handleTabChange = (tab: 'Goods' | 'Market' | 'temp') => {
    setSelectedTab(tab);
  };
  const items = [...new Array(6).keys()];
  const splitArrayIntoPairs = (arr: any[], pairSize: number) => {
    return arr.reduce((result, item, index) => {
      if (index % pairSize === 0) {
        result.push([]);
      }
      result[result.length - 1].push(item);
      return result;
    }, []);
  };

  const [selectedFilterOption, setSelectedFilterOption] = useState<
    SelectedOptionProps | undefined
  >('추천순');

  const [selectedStylesList, setSelectedStylesList] =
    useState<string[]>(stylesList);

  return (
    <Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: PURPLE }} />
      <SafeAreaView style={{ flex: 1 }}>
        {/* TODO: 나중에 CustomHeader2 사용 */}
        <CustomHeader onSearch={() => {}} onTabChange={handleTabChange} />
        {/* <CustomHeader2 /> */}
        <BottomSheetModalProvider>
          <View>
            <HomeTabView
              onSearch={() => {}}
              selectedTab={selectedTab}
              onTabChange={handleTabChange}
              setSelectedFilterOption={setSelectedFilterOption}
              setSelectedStylesList={setSelectedStylesList}
            />
          </View>
          {selectedTab === 'Goods' && (
            <Service
              selectedStylesList={selectedStylesList}
              selectedFilterOption={selectedFilterOption}
              navigation={navigation}
            />
          )}
          {selectedTab === 'Market' && <ReformerMarket />}
          {selectedTab === 'temp' && (
            <ScrollView>
              <Button onPress={handlePopupButtonPress}>
                <ButtonText>팝업 표시</ButtonText>
              </Button>
              <Button
                onPress={() =>
                  navigation.navigate('MarketTabView', { reformerName: '예시' })
                }>
                <Text>마켓</Text>
              </Button>
              <Button onPress={() => navigation.navigate('QuotationForm')}>
                <Text>주문서</Text>
              </Button>
              <Button onPress={() => navigation.navigate('QuotationPage')}>
                <Text>주문서 확인</Text>
              </Button>
              <Button
                onPress={() => navigation.navigate('ServiceDetailPage', {})}>
                <Text>서비스 디테일</Text>
              </Button>
              <Button onPress={() => navigation.navigate('GoodsDetailPage')}>
                <Text>상품 디테일</Text>
              </Button>
              <Button
                onPress={() => navigation.navigate('GoodsRegistrationPage')}>
                <Text>상품등록</Text>
              </Button>
              <Button onPress={() => navigation.navigate('AddPortfolio')}>
                <Text>포트폴리오 등록</Text>
              </Button>
              <Button onPress={() => navigation.navigate('TestComponents')}>
                <Text>공통 컴포넌트 테스트</Text>
              </Button>
            </ScrollView>
          )}
        </BottomSheetModalProvider>
      </SafeAreaView>
    </Fragment>
  );
};

const Button = styled.TouchableOpacity`
  background-color: white;
  padding: 10px;
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 15px;
  border: #612fef;
  border-radius: 14px;
  position: relative;
  z-index: -1;
`;

const ButtonText = styled.Text`
  color: #612fef;
  font-weight: bold;
`;

const LabelButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  padding: 16px;
`;

export default HomeScreen;
