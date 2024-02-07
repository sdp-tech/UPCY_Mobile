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

import Logo from '../assets/common/Logo.svg';
import Search from '../assets/common/Search.svg';
import Bell from '../assets/common/Bell.svg';

export type HomeStackParams = {
  Home: undefined;
  Market: undefined;
  DetailPage: {
    id?: number;
  };
  Quotation: undefined;
  RegistrationPage: undefined;
};

const HomeStack = createStackNavigator<HomeStackParams>();

interface ToggleButtonParams {
  pressable?: boolean;
}

const Toggletag = ({pressable} : ToggleButtonParams) => {
  const [pressed, setPressed] = useState<boolean>(false);
  return (
    <ToggleButton pressed={pressed} onPress={() => setPressed(!pressed)} disabled={!pressable}>
      <Filter14M style={{color: pressed ?'white' : '#CEBFFA'}}></Filter14M>
    </ToggleButton>
  )
}


const FrameBox = styled. View`
  display: flex;
  flex-direction: row;
  height: 51px;
  padding: 0px 16px;
  align-items: center;
  justify-content: center;
  background: #E7E0FD;
`
const ToggleBox = styled. View `
  display: flex;
  flex-direction: row;
  padding: 2px;
  width: 140px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: #FFF;
  align-self: center;
`

const ToggleButton = styled. TouchableOpacity<{pressed: boolean}>`
  display: flex;
  height: 28px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background:  ${(props: { pressed: boolean }) => props.pressed ? '#DBFC72' : '#FFF' };
`


interface ToggleButtonParams {
  pressable?: boolean;
}


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
    </HomeStack.Navigator>
  );
};

interface HomeMainScreenProps extends StackScreenProps<HomeStackParams, 'Home'> {
  selectedTab: 'Product' | 'Market';
  setSelectedTab: (tab: 'Product' | 'Market') => void;
}

const HomeMainScreen = ({
  navigation,
}: StackScreenProps<HomeStackParams, 'Home'>) => {
  
  const [selectedTab, setSelectedTab] = useState<'Product' | 'Market'>('Product');
  
  return (
    <SafeAreaView>
      <CustomHeader onSearch={() => {}} />
      <TouchableOpacity>
        <FrameBox>
          <Logo />
          <View style={{flex: 1}}>
          <ToggleBox>
            <ToggleButton pressed={selectedTab === 'Product'} onPress={() => setSelectedTab('Product')}>
              <Text style={{ fontSize: 16, fontWeight: '500', marginRight: 5 }}>상품</Text>
            </ToggleButton>
            <ToggleButton pressed={selectedTab === 'Market'} onPress={() => setSelectedTab('Market')}>
              <Text style={{ fontSize: 16, fontWeight: '500', marginRight: 5 }}>마켓</Text>
            </ToggleButton>
            
          </ToggleBox>
          </View>
          <Search />
          <Bell />
        </FrameBox>
      </TouchableOpacity>
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
