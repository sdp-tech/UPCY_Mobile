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
import DetailPageScreen from '../components/Home/Market/DetailPage';
import QuotationForm from '../components/Home/Quotation/QuotationForm';
import RegistrationPage from '../components/Home/Market/ServiceRegistration';
import TempStorage from '../components/Home/Market/TempStorage';

export type HomeStackParams = {
  Home: undefined;
  Market: undefined;
  DetailPage: {
    id?: number;
  };
  Quotation: undefined;
  RegistrationPage: undefined;
  TempStorage: undefined;
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
      <HomeStack.Screen name='DetailPage' component={DetailPageScreen} />
      <HomeStack.Screen name='Quotation' component={QuotationForm} />
      <HomeStack.Screen name='RegistrationPage' component={RegistrationPage} />
      <HomeStack.Screen name='TempStorage' component={TempStorage} />
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
      <TouchableOpacity onPress={() => navigation.navigate('DetailPage', {})}>
        <Text>상품 디테일</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Market')}>
        <Text>마켓</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Quotation')}>
        <Text>견적서</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('RegistrationPage')}>
        <Text>상품등록</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;
