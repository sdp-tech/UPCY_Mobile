import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { Body14R, Subtitle16B } from '../../../styles/GlobalText';
import { BLACK, LIGHTGRAY } from '../../../styles/GlobalColor.tsx';

const completedOrders = [
  {
    id : '02902',
    title: '내 옷을 반려동물 옷으로',
    price: '25000원',
    customer: '전예영',
    completedDate: '2024-05-22',
    image: 'https://m.lovecoco.co.kr/web/product/big/201911/55d890a77de72b7213b84fec2083e3fe.jpg',
    status: '거절한 주문',
    is_completed: false,
  },

  {
    id: '29821',
    title: '데님으로 만드는 숄더백',
    price: '25000원',
    customer: '홍길동',
    completedDate: '2024-05-20',
    image: 'https://image.production.fruitsfamily.com/public/product/resized@width620/t6RDVV2b6--1703933039055.png' },
    status: '거래 완료',
    is_completed: true,
  },

  {
    id : '39202',
    title: '평범했던 패딩, 퀼팅 백으로',
    price: '32000원',
    customer: '오민영',
    completedDate: '2024-05-15',
    image:'https://image.yes24.com/goods/118500067/XL',
    status: '거래 완료',
    is_completed: true,
  },

  {
    id : '21292',
    title: '청바지 에코백 서비스',
    price: '25000원',
    customer: '권수현',
    completedDate: '2024-05-15',
    image: 'https://m.lovecoco.co.kr/web/product/big/201911/55d890a77de72b7213b84fec2083e3fe.jpg',
    status: '거절한 주문',
    is_completed: false,
  },
];

const CompletedOrders = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: LIGHTGRAY }}>
      <ScrollView>
        {completedOrders.length > 0 ? (
          completedOrders.map((order, index) => (
            <OrderInfoBox key={`${order.completedDate}-${index}`}>
              <TopSection>
                <TopRow>
                  <OrderDate> {order.is_completed ? `완료일: ${order.completedDate}` : `취소일: ${order.completedDate}`}</OrderDate>
                  <OrderStatus status={order.status}>{order.status}</OrderStatus>
                </TopRow>
                <ContentRow>
                  <ImageContainer source={{ uri: order.image }} />
                  <TextContainer>
                    <Subtitle16B>{order.title}</Subtitle16B>
                    <Body14R>결제 금액: {order.price}</Body14R>
                    <Body14R>주문자: {order.customer}</Body14R>
                    <Body14R>주문 번호: {order.id}</Body14R>
                  </TextContainer>
                </ContentRow>
              </TopSection>
              <BottomSection>
                <TouchableOpacity onPress={() => navigation.navigate('QuotationPage')}>
                  <CheckOrderText>주문서 확인</CheckOrderText>
                </TouchableOpacity>
              </BottomSection>
            </OrderInfoBox>
          ))
        ) : (
          <Text>새 주문이 없습니다.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// 스타일 정의
const OrderInfoBox = styled.View`
  flex-direction: column;
  border-radius: 12px;
  border-width: 1px;
  border-color: #ddd;
  margin: 10px;
  background-color: #fff;
`;

const TopSection = styled.View`
  padding: 15px;
`;

const TopRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const BottomSection = styled.View`
  padding: 10px;
  border-top-width: 1px;
  border-color: #ddd;
  align-items: center;
`;

const OrderDate = styled.Text`
  font-size: 14px;
  color: #666;
`;

const OrderStatus = styled.Text`
  font-size: 14px;
  font-weight: 400;
`;

const ContentRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ImageContainer = styled.Image`
  width: 108px;
  height: 108px;
  border-radius: 8px;
  margin-right: 15px;
`;

const TextContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

const CheckOrderText = styled.Text`
  font-size: 16px;
  color: #000;
`;

export default CompletedOrders;
