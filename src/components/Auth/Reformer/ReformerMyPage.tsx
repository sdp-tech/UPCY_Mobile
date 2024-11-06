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
import {
  StackScreenProps,
  createStackNavigator,
} from '@react-navigation/stack';
import styled from 'styled-components/native';

// Stack Navigator 생성
const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="MarketTabView"
      screenOptions={{
        headerShown: false, // 헤더를 아예 숨기도록 설정
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
  const rate = 4.5;
  const reviewNumber = 100;

  return (
    <View>
      {/* 배경 이미지와 프로필 사진 추가 */}
      <ImageBackground
        style={{ width: '100%', height: 200 }}
        imageStyle={{ height: 160 }}
        source={{
          uri: 'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp',
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
      <Text style={TextStyles.marketName}>{marketName}</Text>
      <View style={styles.profileHeaderRateBox}>
        <StarIcon color={PURPLE} />
        <Text style={TextStyles.rate}>{rate}</Text>
        <Text style={TextStyles.reviewNumber}>({reviewNumber})</Text>
        <Arrow color={BLACK} style={styles.arrow} />
      </View>
    </View>
  );
};

const MarketTabView = ({
  navigation,
  route,
}: StackScreenProps<HomeStackParams, 'MarketTabView'>) => {
  const [activeTab, setActiveTab] = useState('profile'); // 활성화된 탭 상태 관리
  const scrollRef = useRef<ScrollView | null>(null);

  // userInfo 예시 데이터
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
        } // 탭 변경 시 상태 업데이트
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
            <ServicePage scrollViewRef={scrollRef} navigation={navigation} />
            <ScrollTopButton scrollViewRef={scrollRef} />
            {/* 리폼러의 서비스 아래에 임시저장 버튼 추가 */}
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => navigation.navigate('TempStorage')}>
              <Text style={styles.saveButtonText}>임시저장 (2)</Text>
            </TouchableOpacity>
          </View>
        </Tabs.Tab>
      </Tabs.Container>

      {/* 조건부로 버튼을 렌더링 */}
      {activeTab === 'service' ? (
        <TouchableOpacity
          style={styles.fixedButton}
          onPress={() => navigation.navigate('ServiceRegistration')}>
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
    marginTop: 10, // 리폼러의 서비스 아래에 위치
    marginHorizontal: 15,
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#612fef',
    fontWeight: 'bold',
  },
  fixedButton: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: '#612fef',
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  fixedButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  profileHeaderRateBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center', // 별점 중앙 정렬
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
