import { useState } from 'react';
import { SafeAreaView, ScrollView, View, FlatList, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import { Title20B, Body14R, Caption11M } from '../../../styles/GlobalText.tsx';

import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParams } from '../../../pages/Home';

import InfoPage from './InfoPage.tsx';
import ProductPage from './ProductPage.tsx';
import Footer from '../../../common/Footer.tsx';

import Arrow from '../../../assets/common/Arrow.svg';
import Hashtag from '../../../common/Hashtag.tsx';

const ProfileSection = () => {
  const filter = ['스포티', '영캐주얼', '깔끔']
  return (
    <View style={{alignItems: 'center'}}>
      <View style={{backgroundColor: '#BDBDBD', width: 90, height: 90, borderRadius: 180}} />
        <Title20B style={{marginTop: 8}}>이하늘의 마켓</Title20B>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Body14R>안녕하세요 리폼러 이하늘입니다!</Body14R>
          <TouchableOpacity>
            <Caption11M style={{opacity: 0.5, marginLeft: 5}}>...더보기</Caption11M>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          scrollEnabled={false}
          data={filter}
          renderItem={({item}) => {
            return (
              <Hashtag value={item} pressable={false} />
            )
          }}
        />
    </View>
  )
}

const ReviewPage = () => {
  return (
    <View>
      <Text>리뷰</Text>
    </View>
  )
}

const MarketTabView = ({ navigation, route } : StackScreenProps<HomeStackParams, 'Market'>) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState<number>(0);
  const [routes] = useState([
    { key: 'info', title: '정보'},
    { key: 'product', title: '상품' },
    { key: 'review', title: '리뷰' }
  ]);

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 'info':
        return <InfoPage />;
      case 'product':
        return <ProductPage />;
      case 'review':
        return <ReviewPage />;
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <BackButton onPress={() => navigation.goBack()}>
        <Arrow />
      </BackButton>
      <ProfileSection />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorContainerStyle={{
              borderBottomColor: '#DFDFDF',
              borderBottomWidth: 1
            }}
            indicatorStyle={{
              backgroundColor: '#BDBDBD',
              height: 2
            }}
            style={{
              backgroundColor: 'white',
            }}
            labelStyle={{
              color: 'black'
            }}
            pressColor='black'
          />
        )}
      />
      <Footer />
    </SafeAreaView>
  )
}

const BackButton = styled.TouchableOpacity`
  padding: 10px;
`

export default MarketTabView;