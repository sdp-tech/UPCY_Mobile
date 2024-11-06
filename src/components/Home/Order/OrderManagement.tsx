import React, { useState, useRef } from 'react';
import { SafeAreaView, ScrollView, View, FlatList, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import styled from 'styled-components/native';

import { getStatusBarHeight } from 'react-native-safearea-height';
import { Title20B, Body14R, Caption11M } from '../../../styles/GlobalText.tsx';
import { BLACK, BLACK2 } from '../../../styles/GlobalColor.tsx';

import { useNavigation } from '@react-navigation/native';

import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParams } from '../../../pages/Home';

import Hashtag from '../../../common/Hashtag.tsx';

import DetailScreenHeader from '../components/DetailScreenHeader.tsx';
import ScrollToTopButton from '../../../common/ScrollToTopButtonFlat.tsx';
import ScrollTopButton from '../../../common/ScrollTopButton.tsx';

type OrderInfoType = {
  id: string;
  name: string;
  customer: string;
  orderDate: string;
  is_online: boolean;
  navigation: any;
}

const OrderInfo = ({ id, name, customer, orderDate, is_online, navigation }: OrderInfoType) => (
  <InfoContainer>
    <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold', marginBottom: 4 }}>{name}</Text>
    <Text style={{ color: 'black', fontSize: 15, marginBottom: 4 }}>주문자: {customer}</Text>
    <Text style={{ color: 'black', fontSize: 15, marginBottom: 4 }}>주문 일시: {orderDate}</Text>
    <Text style={{ color: 'black', fontSize: 15 }}>거래 방식: {is_online ? '비대면' : '대면'}</Text>
    <TouchableOpacity style={{ marginTop: 10, alignSelf: 'flex-end' }}
      onPress={() => navigation.navigate('QuotationPage')}
    >
      <Text style={{ color: 'gray', fontSize: 14, fontWeight: 'bold' }}>주문서 확인</Text>
    </TouchableOpacity>
  </InfoContainer>
);

const OrderManagement = () => {
  const { width } = Dimensions.get('window');
  const scrollRef = useRef<ScrollView | null>(null);
  const navigation = useNavigation();

  const [orderlist, setOrderList] = useState([
    {
      id: '00001',
      name: '청바지 서비스',
      customer: '###',
      orderDate: '2024-05-22',
      is_online: true,
      photoUri: 'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp',
      status: 'progress',
    },
    {
      id: '00002',
      name: '니트 서비스',
      customer: '@@@',
      orderDate: '2024-05-22',
      is_online: false,
      photoUri: 'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp',
      status: 'completed',
    },
    {
      id: '00003',
      name: '에코백 서비스',
      customer: '&&&',
      orderDate: '2024-05-22',
      is_online: false,
      photoUri: 'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp',
      status: 'before',
    },
    {
      id: '00004',
      name: '청바지 에코백 서비스',
      customer: '$$$',
      orderDate: '2024-06-22',
      is_online: true,
      photoUri: 'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp',
      status: 'completed',
    },
  ]);

  // order_status로 주문 필터링
  const newOrders = orderlist.filter(order => order.status === 'before'); // 거래 전
  const progressOrders = orderlist.filter(order => order.status === 'progress'); // 거래 중
  const completedOrders = orderlist.filter(order => order.status === 'completed'); // 거래 완료

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
      <Tabs.Container
        renderHeader={() => (
          <DetailScreenHeader
            title='주문 관리'
            leftButton='CustomBack'
            onPressLeft={() => { }}
            rightButton='None'
            onPressRight={() => { }}
          />
        )}

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

        {/* 거래 전 탭 */}
        <Tabs.Tab name="새 주문">
          <Tabs.ScrollView ref={scrollRef}>
            {newOrders.length > 0 ? (
              newOrders.map((order, index) => (
                <OrderInfoBox key={index}>
                  <IdText>{order.id}</IdText>
                  <ImageContainer source={{ uri: order.photoUri }} />
                  <OrderInfo
                    id={order.id}
                    name={order.name}
                    customer={order.customer}
                    orderDate={order.orderDate}
                    is_online={order.is_online}
                    navigation={navigation}

                  />
                </OrderInfoBox>
              ))
            ) : (
              <Text>새 주문이 없습니다.</Text>
            )}
          </Tabs.ScrollView>
        </Tabs.Tab>

        {/* 거래 중 탭 */}
        <Tabs.Tab name="거래 중">
          <Tabs.ScrollView ref={scrollRef}>
            {progressOrders.length > 0 ? (
              progressOrders.map((order, index) => (
                <OrderInfoBox key={index}>
                  <IdText>{order.id}</IdText>
                  <ImageContainer source={{ uri: order.photoUri }} />
                  <OrderInfo
                    id={order.id}
                    name={order.name}
                    customer={order.customer}
                    orderDate={order.orderDate}
                    is_online={order.is_online}
                    navigation={navigation}
wlr

                  />
                </OrderInfoBox>
              ))
            ) : (
              <Text>거래 중인 주문이 없습니다.</Text>
            )}
          </Tabs.ScrollView>
        </Tabs.Tab>

        {/* 완료/취소 탭 */}
        <Tabs.Tab name="완료/취소">
          <Tabs.ScrollView ref={scrollRef}>
            {completedOrders.length > 0 ? (
              completedOrders.map((order, index) => (
                <OrderInfoBox key={index}>
                  <IdText>{order.id}</IdText>
                  <ImageContainer source={{ uri: order.photoUri }} />
                  <OrderInfo
                    id={order.id}
                    name={order.name}
                    customer={order.customer}
                    orderDate={order.orderDate}
                    is_online={order.is_online}
                    navigation={navigation}
                  />
                </OrderInfoBox>
              ))
            ) : (
              <Text>완료된 주문이 없습니다.</Text>
            )}
          </Tabs.ScrollView>
        </Tabs.Tab>
      </Tabs.Container>
    </SafeAreaView>
  );
};

// 스타일 정의
const OrderInfoBox = styled.View`
  border-radius: 14px;
  border-color: white;
  border-width: 1px;
  flex-direction: row;
  padding: 19px;
  padding-top: 30px;
  margin: 10px;
  justify-content: space-between;
`;

const ImageContainer = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 8px;
`;

const InfoContainer = styled.View`
  flex: 1;
  padding-left: 10px;
`;


const IdText = styled.Text`
  position: absolute;
  top: 5px;
  left: 19px;
  color: black;
  font-size: 14px;
  padding: 2px 5px;
  border-radius: 4px;
`;

const BackButton = styled.TouchableOpacity`
  padding: 10px;
  position: absolute;
  left: 0;
  z-index: 1;
`;


export default OrderManagement;
