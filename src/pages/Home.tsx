import { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { Filter14M } from '../styles/GlobalText';

import {
  StackScreenProps,
  createStackNavigator,
} from '@react-navigation/stack';
import { TabProps } from '../../App';
import { TouchableOpacity } from 'react-native-gesture-handler';

import CustomHeader from '../common/CustomHeader';
import MarketTabView from '../components/Home/Market/MarketTabView';
import QuotationForm from '../components/Home/Quotation/QuotationForm';
import TempStorage from '../components/Home/Market/TempStorage';
import ServiceRegistrationPage from '../components/Home/Market/ServiceRegistration';
import ServiceDetailPageScreen from '../components/Home/Market/ServiceDetailPage';
import GoodsDetailPageScreen from '../components/Home/Market/GoodsDetailPage';
import GoodsRegistrationPage from '../components/Home/Market/GoodsRegistration';
import TempStorageEdit from '../components/Home/Market/TempStorageEdit';
import WriteDetailPage from '../components/Home/Market/WriteDetailPage';

export type HomeStackParams = {
  Home: undefined;
  Market: undefined;
  ServiceDetailPage: {
    id?: number;
  };
  GoodsDetailPage: undefined;
  Quotation: undefined;
  ServiceRegistrationPage: undefined;
  GoodsRegistrationPage: undefined;
  TempStorage: undefined;
  TempStorageEdit: undefined;
  WriteDetailPage: undefined;
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
      <HomeStack.Screen name='Home' component={HomeMainScreen} />
      <HomeStack.Screen name='Market' component={MarketTabView} />
      <HomeStack.Screen name='ServiceDetailPage' component={ServiceDetailPageScreen} />
      <HomeStack.Screen name='ServiceRegistrationPage' component={ServiceRegistrationPage} />
      <HomeStack.Screen name='Quotation' component={QuotationForm} />
      <HomeStack.Screen name='GoodsDetailPage' component={GoodsDetailPageScreen} />
      <HomeStack.Screen name='GoodsRegistrationPage' component={GoodsRegistrationPage} />
      <HomeStack.Screen name='TempStorage' component={TempStorage} />
      <HomeStack.Screen name='TempStorageEdit' component={TempStorageEdit} />
      <HomeStack.Screen name='WriteDetailPage' component={WriteDetailPage} />
    </HomeStack.Navigator>
  );
};

const HomeMainScreen = ({
  navigation,
}: StackScreenProps<HomeStackParams, 'Home'>) => {
  return (
    <SafeAreaView>
      <CustomHeader onSearch={() => {}} />
      <Text>홈</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Market')}>
        <Text>마켓</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Quotation')}>
        <Text>견적서</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ServiceDetailPage', {})}>
        <Text>서비스 디테일</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ServiceRegistrationPage')}>
        <Text>서비스등록</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('GoodsDetailPage')}>
        <Text>상품 디테일</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('GoodsRegistrationPage')}>
        <Text>상품등록</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;
