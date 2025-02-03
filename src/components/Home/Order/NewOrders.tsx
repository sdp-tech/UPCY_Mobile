import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, } from 'react-native';
import styled from 'styled-components/native';
import { Body14R, Subtitle16B, } from '../../../styles/GlobalText';
import { LIGHTGRAY } from '../../../styles/GlobalColor.tsx';
import { StackScreenProps } from '@react-navigation/stack';
import { OrderStackParams } from './OrderManagement.tsx';

type OrderInfoType = {
  id: string;
  name: string;
  customer: string;
  orderDate: string;
  is_online: boolean;
  image: string;
};

const newOrders = [
  // Sample data for "새 주문"
  { title: '내 옷을 반려동물 옷으로', price: '25000원', customer: '전예영', orderDate: '2024-05-22', is_online: false, image: 'https://m.lovecoco.co.kr/web/product/big/201911/55d890a77de72b7213b84fec2083e3fe.jpg' },
  { title: '데님으로 만드는 숄더백', price: '28000원', customer: '전예영', orderDate: '2024-05-22', is_online: false, image: 'https://image.production.fruitsfamily.com/public/product/resized@width620/t6RDVV2b6--1703933039055.png' },
];


const NewOrders = ({ navigation, route }: StackScreenProps<OrderStackParams, 'NewOrders'>) => {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: LIGHTGRAY }}>
      <ScrollView>
        {newOrders.length > 0 ? (
          newOrders.map(order => (
            <OrderInfoBox key={order.orderDate}>
              <TopSection>
                <OrderDate>{order.orderDate}</OrderDate>
                <ContentRow>
                  <ImageContainer source={{ uri: order.image }} />
                  <TextContainer>
                    <Subtitle16B>{order.title}</Subtitle16B>
                    <Body14R>예상 결제 금액: {order.price}</Body14R>
                    <Body14R>주문자: {order.customer}</Body14R>
                    <Body14R>거래 방식: {order.is_online ? '비대면' : '대면'}</Body14R>
                  </TextContainer>
                </ContentRow>
              </TopSection>
              <BottomSection>
                <TouchableOpacity onPress={() => navigation.navigate('QuotationConfirm')}>
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

const BottomSection = styled.View`
  padding: 10px;
  border-top-width: 1px;
  border-color: #ddd;
  align-items: center;
`;

const OrderDate = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
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

export default NewOrders;