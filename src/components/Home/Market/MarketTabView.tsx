import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, ScrollView, View, FlatList, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import { getStatusBarHeight } from 'react-native-safearea-height';
import { Title20B, Body14R, Caption11M } from '../../../styles/GlobalText.tsx';
import { BLACK, BLACK2 } from '../../../styles/GlobalColor.tsx';

import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParams } from '../../../pages/Home';

import InfoPage from './InfoPage.tsx';
import ProductPage from './ServicePage.tsx';
import ReviewPage from './ReviewPage.tsx';

import Hashtag from '../../../common/Hashtag.tsx';
import Footer from '../../../common/Footer.tsx';

import Arrow from '../../../assets/common/Arrow.svg';
import Pencil from '../../../assets/common/Pencil.svg';
import ServicePage from './ServicePage.tsx';
import { CustomBackButton } from '../components/CustomBackButton.tsx';
import DetailScreenHeader from '../components/DetailScreenHeader.tsx';
import { useBottomBar } from '../../../../contexts/BottomBarContext.tsx';
import TextToggle from '../../../common/TextToggle.tsx';
import ScrollToTopButton from '../../../common/ScrollToTopButtonFlat.tsx';
import ScrollTopButton from '../../../common/ScrollTopButton.tsx';
import ReviewComment from '../components/ReviewComment.tsx';

export const ProfileSection = ({ navigation }: { navigation: any }) => {

  const filter = [
    { id: 1, tag: '스포티' }, { id: 2, tag: '영캐주얼' }, { id: 3, tag: '깔끔' }
  ]
  const tagList = filter.map(item => item.tag);
  const markerName = '이하늘의 마켓';
  const selfIntroduce = '안녕하세요 리폼러 이하늘입니다! 저는 업씨대학교 패션디자인학과에 수석입학했고요 짱짱 천재에요'
  return (
    <View style={{ alignItems: 'center' }}>
      <DetailScreenHeader
        title=''
        leftButton='CustomBack'
        onPressLeft={() => { }}
        rightButton='Edit'
        onPressRight={() => { }} />
      <ImageBackground
        style={{ width: '100%', height: 200 }}
        imageStyle={{ height: 160 }}
        source={{ uri: 'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp' }}>
        <View style={{ width: '100%', height: 160, backgroundColor: '#00000066', opacity: 0.7 }} />
        <Image
          style={{ alignSelf: 'center', width: 90, height: 90, borderRadius: 180, position: 'absolute', top: 110 }}
          source={{ uri: 'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp' }}
        />
      </ImageBackground>
      <Title20B style={{ marginTop: 8 }}>{markerName}</Title20B>
      <View style={{ padding: 20, paddingTop: 0, paddingBottom: 0 }}>
        <TextToggle text={selfIntroduce} />
        {/* 이 밑에거 지우면 이상하게 에러남... 그냥 냅둬도 되는 거라 무시하셔도 됩니다.  */}
        <TouchableOpacity>
          <Caption11M style={{ color: BLACK2, marginLeft: 0 }}></Caption11M>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        scrollEnabled={false}
        data={tagList}
        keyExtractor={(index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <ReviewComment value={item} backgroundColor='#612FEF' />
          )
        }}
      />
    </View>
  )
}

const MarketTabView = ({ navigation, route }: StackScreenProps<HomeStackParams, 'Market'>) => {

  const [routes] = useState([
    { key: 'info', title: '정보' },
    { key: 'service', title: '서비스' },
    { key: 'review', title: '리뷰' }
  ]);
  const flatListRef = useRef<FlatList>(null);
  const scrollRef = useRef<ScrollView | null>(null);

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          {route.key === 'service' &&
            <View>
              <ServicePage scrollViewRef={scrollRef} />
              <ScrollTopButton scrollViewRef={scrollRef} />
            </View>
          }
          {route.key === 'review' &&
            <View>
              <ReviewPage flatListRef={flatListRef} />
              <ScrollToTopButton flatListRef={flatListRef} />
            </View>}
        </Tabs.Tab>)
        )}
      </Tabs.Container>
      <Footer />
    </SafeAreaView>
  )
}

const BackButton = styled.TouchableOpacity`
  padding: 10px;
  position: absolute;
  left: 0px;
  z-index: 1;
`

const EditButton = styled.TouchableOpacity`
  padding: 10px;
  position: absolute;
  right: 7px;
  z-index: 1;
`

export default MarketTabView;