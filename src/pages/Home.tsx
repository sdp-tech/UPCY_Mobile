import React, { Fragment, useEffect, useState,useRef,forwardRef } from 'react';

import { SafeAreaView, Text, View, StyleSheet, Alert, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { Filter14M } from '../styles/GlobalText';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import {
  StackScreenProps,
  createStackNavigator,
} from '@react-navigation/stack';
import { TabProps } from '../../App';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import CustomHeader from '../common/CustomHeader';
import HomeTabView from '../components/Home/HomeMain';
import MarketTabView from '../components/Home/Market/MarketTabView';
import QuotationForm from '../components/Home/Quotation/QuotationForm';
import QuotationPage from '../components/Home/Quotation/QuotationPage';
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
import InputInfo from '../components/Home/Quotation/InputInfo';
import QuotationConfirm from '../components/Home/Quotation/QuotationConfirm';
import Rejection from '../components/Home/Quotation/Rejection';
import SentRejection from '../components/Home/Quotation/SentRejection';
import WriteReviewPage from '../components/Home/Market/WriteReviewPage';
import { BottomBarProvider } from '../../contexts/BottomBarContext';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import ComponentsTest from './ComponentsTest';
import { PURPLE } from '../styles/GlobalColor';
import { ProfileSection } from '../components/Home/Market/MarketTabView';
import ServicePage from '../components/Home/Market/ServicePage';
import ScrollToTopButton from '../common/ScrollToTopButtonFlat';
import ReviewPage from '../components/Home/Market/ReviewPage';
import ScrollTopButton from '../common/ScrollTopButton';
import Footer from '../common/Footer';
import { BLACK, White } from '../styles/GlobalColor';
import InfoPage from '../components/Home/Market/InfoPage'; import OrderPage from './OrderPage';
import ReformerMarket from '../components/Home/Market/ReformerMarket';
import Service from '../components/Home/Market/Service';
export type HomeStackParams = {
  Home: undefined;
  Market: undefined;
  ServiceDetailPage: {
    id?: number;
  };
  OrderPage: undefined;
  GoodsDetailPage: undefined;
  QuotationForm: undefined;
  QuotationPage: undefined;
  SentQuotation: undefined;
  ServiceRegistrationPage: { inputText?: string };
  GoodsRegistrationPage: undefined;
  TempStorage: undefined;
  TempStorageEdit: undefined;
  WriteDetailPage: { inputText: string };
  AddPortfolio: undefined;
  InputInfo: undefined;
  QuotationConfirm: undefined;
  Rejection: undefined;
  SentRejection: undefined;
  WriteReviewPage: undefined;
  ReformerMarket: undefined;

  TestComponents: undefined;
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
      <HomeStack.Screen name="Market" component={MarketTabView} />
      <HomeStack.Screen
        name="ServiceDetailPage"
        component={ServiceDetailPageScreen}
      />
      <HomeStack.Screen
        name="ServiceRegistrationPage"
        component={ServiceRegistrationPage}
      />
      <HomeStack.Screen name="QuotationForm" component={QuotationForm} />
      <HomeStack.Screen name="QuotationPage" component={QuotationPage} />
      <HomeStack.Screen name="SentQuotation" component={SentQuotation} />
      <HomeStack.Screen name="OrderPage" component={OrderPage} />
      <HomeStack.Screen
        name="GoodsDetailPage"
        component={GoodsDetailPageScreen}
      />
      <HomeStack.Screen
        name="GoodsRegistrationPage"
        component={GoodsRegistrationPage}
      />
      <HomeStack.Screen name="TempStorage" component={TempStorage} />
      <HomeStack.Screen name="TempStorageEdit" component={TempStorageEdit} />
      <HomeStack.Screen name="WriteDetailPage" component={WriteDetailPage} />
      <HomeStack.Screen name="AddPortfolio" component={AddPortfolio} />
      <HomeStack.Screen name="InputInfo" component={InputInfo} />
      <HomeStack.Screen name="QuotationConfirm" component={QuotationConfirm} />
      <HomeStack.Screen name="Rejection" component={Rejection} />
      <HomeStack.Screen name="SentRejection" component={SentRejection} />
      <HomeStack.Screen name="WriteReviewPage" component={WriteReviewPage} />
      <HomeStack.Screen name="TestComponents" component={ComponentsTest} />
      <HomeStack.Screen name="ReformerMarket" component={ReformerMarket} />
    </HomeStack.Navigator>
  );
};

const HomeMainScreen = ({
  navigation,
}: StackScreenProps<HomeStackParams, 'Home'>) => {
  const [selectedTab, setSelectedTab] = useState<'Goods' | 'Market' | 'temp'>('Goods');
  const ServicePageRef = useRef<ScrollView>(null);
  const handlePopupButtonPress = () => {
    Alert.alert(
      '알림', // 팝업제목
      '견적서가 들어왔어요. \n 확인해보시겠어요?',
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
  const items = [...new Array(6).keys()]
  const splitArrayIntoPairs = (arr: any[], pairSize: number) => {
    return arr.reduce((result, item, index) => {
      if (index % pairSize === 0) {
        result.push([]);
      }
      result[result.length - 1].push(item);
      return result;
    }, []);
  };
  const splitItems = splitArrayIntoPairs(items, 2);

  return (
    <Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: PURPLE }} />
      <SafeAreaView style={{ flex: 1 }}>
        <CustomHeader onSearch={() => { }} onTabChange={handleTabChange} />
        <BottomSheetModalProvider>
          <View>
            <HomeTabView
              onSearch={() => { }}
              selectedTab={selectedTab}
              onTabChange={handleTabChange}
            />
          </View>
          
          {selectedTab === 'Goods' &&(
            <Service/>
          )}
          {selectedTab === 'Market' &&(
            <ReformerMarket />
          )}
          {selectedTab === 'temp' &&(
          <ScrollView>
            <Button onPress={handlePopupButtonPress}>
              <ButtonText>팝업 표시</ButtonText>
            </Button>
            <Button onPress={() => navigation.navigate('Market')}>
              <Text>마켓</Text>
            </Button>
            <Button onPress={() => navigation.navigate('QuotationForm')}>
              <Text>견적서</Text>
            </Button>
            <Button onPress={() => navigation.navigate('QuotationPage')}>
              <Text>견적서 확인</Text>
            </Button>
            <Button
              onPress={() => navigation.navigate('ServiceDetailPage', {})}>
              <Text>서비스 디테일</Text>
            </Button>
            <Button
              onPress={() =>
                navigation.navigate('ServiceRegistrationPage', {})
              }>
              <Text>서비스등록</Text>
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

            <Button onPress={() => navigation.navigate('WriteReviewPage')}>
              <Text>후기 작성 페이지</Text>
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
`

export default HomeScreen;
