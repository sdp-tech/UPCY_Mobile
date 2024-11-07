import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import { BLACK, PURPLE } from '../../../styles/GlobalColor.tsx';
import StarIcon from '../../../assets/common/Star.svg';
import Arrow from '../../../assets/common/Arrow.svg';
import ServicePage from '../../../components/Home/Market/ServicePage';
import InfoPage from '../../../components/Home/Market/InfoPage.tsx';
import TempStorage from '../../../components/Home/Market/TempStorage.tsx';
import ServiceRegistration from '../../../components/Home/Market/ServiceRegistration.tsx';
import FixMyPage from '../../../pages/FixMyPage.tsx';
import ScrollTopButton from '../../../common/ScrollTopButton.tsx';
import LoginContext from '../../../common/Context';
import {
  StackScreenProps,
  createStackNavigator,
} from '@react-navigation/stack';
import styled from 'styled-components/native';
import DetailScreenHeader from '../../../components/Home/components/DetailScreenHeader.tsx';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="MarketTabView"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MarketTabView" component={MarketTabView} />
      <Stack.Screen name="TempStorage" component={TempStorage} />
      <Stack.Screen
        name="ServiceRegistration"
        component={ServiceRegistration}
      />
      <Stack.Screen name="FixMyPage" component={FixMyPage} />
    </Stack.Navigator>
  );
}

export const ProfileSection = ({
  navigation,
  userInfo,
}: {
  navigation: any;
  userInfo: any;
}) => {
  const marketName = '이하늘의 마켓';

  return (
    <View style={{backgroundColor: "#FFF"}}>
      <DetailScreenHeader
        title=''
        onPressLeft={() => {}}
        onPressRight={() => navigation.navigate('FixMyPage', { userInfo })}
        leftButton='CustomBack'
        rightButton='Fix'
        style = {{ backgroundColor: '#E9EBF8' }}
      />
      <View style={{ width: '100%', height: 119, backgroundColor: '#E9EBF8' }}>
        <View
          style={{

            width: '100%',
            height: 119,
            backgroundColor: '#E9EBF8',
          }}
        />
        <Image
          style={{
            alignSelf: 'center',
            width: 90,
            height: 90,
            borderRadius: 180,
            position: 'absolute',
            top: 74,
          }}
          source={{
            uri: 'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp',
          }}
        />
      </View>
      <View style={{ height: 57 }} />
      <Text style={TextStyles.marketName}>{marketName}</Text>
      <View style={{ height: 10 }} />
    </View>
  );
};

const MarketTabView = ({
  navigation,
  route,
}: StackScreenProps<HomeStackParams, 'MarketTabView'>) => {
  const [activeTab, setActiveTab] = useState('profile');
  const scrollRef = useRef<ScrollView | null>(null);

  const userInfo = {
    nickname: '이하늘',
    introduce: '나는야 업씨러 이하늘 환경을 사랑하지요 눈누난나',
    profile_image:
      'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp',
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs.Container
        renderHeader={props => (
          <ProfileSection navigation={navigation} userInfo={userInfo} />
        )}
        headerContainerStyle={{
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderColor: '#D9D9D9',
        }}
        onIndexChange={index =>
          setActiveTab(index === 0 ? 'profile' : 'service')
        }
        renderTabBar={props => (
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
        )}>
        <Tabs.Tab name="프로필" key="profile">
          <InfoPage />
        </Tabs.Tab>
        <Tabs.Tab name="서비스" key="service">
          <View>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => navigation.navigate('TempStorage')}>
              <Text style={styles.saveButtonText}>임시저장 (5)</Text>
            </TouchableOpacity>
            <ServicePage scrollViewRef={scrollRef} navigation={navigation} />
            <ScrollTopButton scrollViewRef={scrollRef} />
          </View>
        </Tabs.Tab>
      </Tabs.Container>

      {activeTab === 'service' ? (
        <TouchableOpacity
          style={styles.fixedButton}
          onPress={() => navigation.navigate(
              'ServiceRegistration')}>
          <Text style={styles.fixedButtonText}>서비스 추가</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.fixedButton}
          onPress={() => navigation.navigate('FixMyPage', { userInfo })}>
          <Text style={styles.fixedButtonText}>프로필 수정하기</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
   saveButton: {
      height: 35,
      paddingVertical: 10,
      paddingHorizontal: 16,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      backgroundColor: '#DBFC72', // var(--NeonGreen-upcy-green) 값으로 설정
      flexDirection: 'row', // 가로 방향 배치 설정
      alignSelf: 'flex-start',
   },
   saveButtonText: {
       marginLeft: 10, // gap 대신 텍스트에 좌측 여백 설정
      color: '#612FEF',
      fontSize: 14,
      fontWeight: '600',
      lineHeight: 24,
  },
  fixedButton: {
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
  fixedButtonText: {
    color: '#612FEF',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
  },
  profileHeaderRateBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  arrow: {
    paddingHorizontal: 6,
    paddingVertical: 6,
    width: 12,
    height: 12,
    marginLeft: 3,
    transform: [{ rotate: '180deg' }],
  },
});

const TextStyles = StyleSheet.create({
  marketName: {
    color: '#000',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  rate: {
    color: '#222',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  reviewNumber: {
    color: '#222',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
});
