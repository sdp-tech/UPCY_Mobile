import { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { Filter14M } from '../styles/GlobalText';

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

export type HomeStackParams = {
  Home: undefined;
  Market: undefined;
  ServiceDetailPage: {
    id?: number;
  };
  GoodsDetailPage: undefined;
  QuotationForm: undefined;
  QuotationPage: undefined;
  SentQuotation: undefined;
  ServiceRegistrationPage: undefined;
  GoodsRegistrationPage: undefined;
  TempStorage: undefined;
  TempStorageEdit: undefined;
  WriteDetailPage: undefined;
  AddPortfolio: undefined;
};

const HomeStack = createStackNavigator<HomeStackParams>();

const HomeScreen = ({
  navigation,
  route,
}: StackScreenProps<TabProps, '홈'>) => {
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
    </HomeStack.Navigator>
  );
};

const HomeMainScreen = ({
  navigation,
}: StackScreenProps<HomeStackParams, 'Home'>) => {
  return (
    <SafeAreaView>
      <CustomHeader onSearch={() => {}} />
      <HomeTabView onSearch={() => {}} />
      <ScrollView>
        <Button onPress={() => navigation.navigate('Market')}>
          <Text>마켓</Text>
        </Button>
        <Button onPress={() => navigation.navigate('QuotationForm')}>
          <Text>견적서</Text>
        </Button>
        <Button onPress={() => navigation.navigate('QuotationPage')}>
          <Text>견적서 확인</Text>
        </Button>
        <Button onPress={() => navigation.navigate('ServiceDetailPage', {})}>
          <Text>서비스 디테일</Text>
        </Button>
        <Button onPress={() => navigation.navigate('ServiceRegistrationPage')}>
          <Text>서비스등록</Text>
        </Button>
        <Button onPress={() => navigation.navigate('GoodsDetailPage')}>
          <Text>상품 디테일</Text>
        </Button>
        <Button onPress={() => navigation.navigate('GoodsRegistrationPage')}>
          <Text>상품등록</Text>
        </Button>
        <Button onPress={() => navigation.navigate('AddPortfolio')}>
          <Text>포트폴리오 등록</Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
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
`;

export default HomeScreen;
