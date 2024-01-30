import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, FlatList, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import { getStatusBarHeight } from 'react-native-safearea-height';
import { Title20B, Body14R, Caption11M } from '../../../styles/GlobalText.tsx';
import { BLACK, BLACK2 } from '../../../styles/GlobalColor.tsx';

import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParams } from '../../../pages/Home';

import InfoPage from './InfoPage.tsx';
import ProductPage from './ProductPage.tsx';
import ReviewPage from './ReviewPage.tsx';

import Hashtag from '../../../common/Hashtag.tsx';
import Footer from '../../../common/Footer.tsx';

import Arrow from '../../../assets/common/Arrow.svg';

const ProfileSection = ({ navigation }: {navigation: any}) => {
  const filter = ['스포티', '영캐주얼', '깔끔']
  return (
    <View style={{alignItems: 'center'}}>
      <BackButton onPress={() => navigation.goBack()}>
        <Arrow color={'white'} />
      </BackButton>
      <ImageBackground
        style={{width: '100%', height: 200}}
        imageStyle={{height: 160}}
        source={{uri: 'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp'}}>
        <View style={{width: '100%', height: 160, backgroundColor: '#00000066', opacity: 0.7}} />
        <Image
          style={{alignSelf: 'center', width: 90, height: 90, borderRadius: 180, position: 'absolute', top: 110}}
          source={{uri: 'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp'}}
        />
      </ImageBackground>
        <Title20B style={{marginTop: 8}}>이하늘의 마켓</Title20B>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Body14R>안녕하세요 리폼러 이하늘입니다!</Body14R>
          <TouchableOpacity>
            <Caption11M style={{color: BLACK2, marginLeft: 5}}>...더보기</Caption11M>
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

const statusBarHeight = getStatusBarHeight(true);

const MarketTabView = ({ navigation, route } : StackScreenProps<HomeStackParams, 'Market'>) => {
  const [routes] = useState([
    { key: 'info', title: '정보'},
    { key: 'product', title: '상품' },
    { key: 'review', title: '리뷰' }
  ]);

  return (
    <View style={{flex: 1}}>
      <Tabs.Container
        renderHeader={props => <ProfileSection navigation={navigation} />}
        headerContainerStyle={{
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderColor: '#D9D9D9'
        }}
        renderTabBar={props => (
          <MaterialTabBar
            {...props}
            indicatorStyle={{
              backgroundColor: '#BDBDBD',
              height: 2
            }}
            style={{
              backgroundColor: 'white',
            }}
            labelStyle={{
              color: BLACK,
              fontWeight: '700',
              fontSize: 16
            }}
          />
        )}
      >
        {routes.map(route =>
          (<Tabs.Tab key={route.key} name={route.title}>
            {route.key === 'info' && <InfoPage />}
            {route.key === 'product' && <ProductPage />}
            {route.key === 'review' && <ReviewPage />}
          </Tabs.Tab>)
        )}
      </Tabs.Container>
      <Footer />
    </View>
  )
}

const BackButton = styled.TouchableOpacity`
  padding: 10px;
  position: absolute;
  left: 0px;
  top: ${statusBarHeight-10}px;
  z-index: 1;
`

export default MarketTabView;