import React, { useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, Dimensions, Modal, StyleSheet } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import styled from 'styled-components/native';
import { Picker } from '@react-native-picker/picker';
import { BLACK, LIGHTGRAY, PURPLE, GREEN } from '../../../styles/GlobalColor';
import { Title20B, Body14R, Body16B, Caption11M } from '../../../styles/GlobalText.tsx';

import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParams } from '../../../pages/Home';





interface OrderInfoProps {
  name: string;
  customer: string;
  estimated_price: string;
  is_online: boolean;
  navigation: any;
}

const OrderInfo: React.FC<OrderInfoProps> = ({ name, customer, estimated_price, is_online, navigation }) => (
  <InfoContainer>
    <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold', marginBottom: 4 }}>{name}</Text>
    <Text style={{ color: 'black', fontSize: 15, marginBottom: 4 }}>주문자: {customer}</Text>
    <Text style={{ color: 'black', fontSize: 15, marginBottom: 4 }}> </Text>
    <Text style={{ color: 'black', fontSize: 15, marginBottom: 4 }}>예상 결제 금액: {estimated_price}</Text>
    <Text style={{ color: 'black', fontSize: 15 }}>거래 방식: {is_online ? '비대면' : '대면'}</Text>
    <TouchableOpacity style={{ marginTop: 10, alignSelf: 'flex-end' }}
      onPress={() => navigation.navigate('QuotationPage')}
    >
      <Text style={{ color: 'gray', fontSize: 14, fontWeight: 'bold', textDecorationLine: 'underline' }}>주문서 확인</Text>
    </TouchableOpacity>
  </InfoContainer>
);


const OrderStatusLabel = ({ status }: any) => {
  switch (status) {
    case 'progress':
      return <StatusText style={{ color: PURPLE }}>배송중</StatusText>;
    case 'completed':
      return <StatusText style={{ color: PURPLE }}>거래 완료</StatusText>;
    default:
      return null;
  }
};

const OrderActionButtons = ({ status, navigation, onPress }: { status: string; navigation: any; onPress: () => void }) => (


  <ButtonContainer>
    <ActionButton>
      <ActionText>오픈채팅</ActionText>
    </ActionButton>

    {status === 'progress' && (
      <ActionButton onPress={onPress}>
        <ActionText style={{ color: PURPLE }} >거래 완료</ActionText>
      </ActionButton>
    )}

    {status === 'completed' && (
      <ActionButton onPress={() => navigation.navigate('WriteReviewPage')}>
        <ActionText style={{ color: PURPLE }}>리뷰 작성</ActionText>
      </ActionButton>
    )}
  </ButtonContainer>
);

interface FilterProps {
  selectedFilter: any;
  setSelectedFilter: any;
}


// DropdownSection 컴포넌트 정의
const DropdownSection = ({ selectedFilter, setSelectedFilter }: FilterProps) => {
  const screenWidth = Dimensions.get('window').width

  return (
    <View style={{ paddingVertical: 10, paddingHorizontal: 10, borderBottomColor: LIGHTGRAY, borderBottomWidth: 0 }}>
      <PickerContainer screenWidth={screenWidth}>
        <Picker
          selectedValue={selectedFilter}
          onValueChange={(itemValue) => setSelectedFilter(itemValue)}
          style={{ height: 50, width: '100%', color: 'white', justifyContent: 'center', textAlignVertical: 'center', }}
        >
          <Picker.Item label="전체" value="전체" style={{ fontSize: 13 }} />
          <Picker.Item label="거래 전" value="거래 전" style={{ fontSize: 13 }} />
          <Picker.Item label="거래 중" value="거래 중" style={{ fontSize: 13 }} />
          <Picker.Item label="완료" value="완료" style={{ fontSize: 13 }} />
        </Picker>
      </PickerContainer>
    </View>
  );
};





// OrderInfoContainer 스타일 정의
const OrderInfoContainer = styled.View`
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: white;
  border-radius: 8px;
  margin-bottom: 10px;
  border: 1px solid white;
`;



export interface OrderPageProps extends StackScreenProps<HomeStackParams, 'OrderManagement'> {
  flatListRef: React.RefObject<FlatList<any>>;
  navigation: any;
  route: any;
}


const OrderPage: React.FC<OrderPageProps> = ({ flatListRef, navigation, route }) => {
  const [selectedFilter, setSelectedFilter] = useState('전체');
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 거래 완료 버튼 클릭 핸들러
  const handleCompletedPress = () => {
    setIsModalVisible(true);
  };

  // 모달에서 "거래 완료" 클릭 핸들러
  const handleConfirmCompleted = () => {
    setIsModalVisible(false);
    console.log('거래 완료 선택');
    navigation.navigate('CompletedOrder');
  };

  // 모달에서 "나중에" 클릭 핸들러
  const handleCancel = () => {
    setIsModalVisible(false);
    console.log('나중에 선택');
  };



  const [orderlist, setOrderList] = useState([
    {
      id: '00001',
      name: '청바지 서비스',
      customer: '###',
      orderDate: '2024-05-22',
      estimated_price: '25000원',
      is_online: true,
      photoUri: 'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp',
      status: 'progress',
    },
    {
      id: '00002',
      name: '니트 서비스',
      customer: '@@@',
      orderDate: '2024-05-22',
      estimated_price: '25000원',
      is_online: false,
      photoUri: 'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp',
      status: 'completed',
    },
    {
      id: '00003',
      name: '에코백 서비스',
      customer: '&&&',
      orderDate: '2024-05-22',
      estimated_price: '25000원',
      is_online: false,
      photoUri: 'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp',
      status: 'before',
    },
    {
      id: '00004',
      name: '청바지 에코백 서비스',
      customer: '$$$',
      orderDate: '2024-06-22',
      estimated_price: '25000원',
      is_online: true,
      photoUri: 'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp',
      status: 'completed',
    },
  ]);

  // 필터링된 주문 목록
  const filteredOrders = orderlist.filter(order => {
    if (selectedFilter === '전체') return true;
    if (selectedFilter === '거래 전') return order.status === 'before';
    if (selectedFilter === '거래 중') return order.status === 'progress';
    if (selectedFilter === '완료') return order.status === 'completed';
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
      <Tabs.FlatList
        ref={flatListRef}
        bounces={false}
        overScrollMode="never"
        data={filteredOrders}
        ListHeaderComponent={() => (
          <DropdownSection selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
        )}
        renderItem={({ item: order }: any) => (
          <OrderInfoBox>
            <View style={{ marginTop: 15 }} />
            <View style={{ flexDirection: 'row' }}>
              <ImageContainer source={{ uri: order.photoUri }} />
              <OrderInfo
                name={order.name}
                customer={order.customer}
                estimated_price={order.estimated_price}
                is_online={order.is_online}
                navigation={navigation}
              />
            </View>
            <OrderDateText style={{ color: BLACK }}>{order.orderDate}</OrderDateText>
            <OrderStatusLabel status={order.status} />
            <OrderActionButtons status={order.status} navigation={navigation} onPress={handleCompletedPress} />
          </OrderInfoBox>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={{ marginBottom: 60 }}
      />

      <Modal transparent={true} visible={isModalVisible} onRequestClose={handleCancel}>
        <ModalContainer>
          <ModalBox>
            <Body14R style={{ color: BLACK, textAlign: 'center', marginBottom: 10 }}>
              거래 완료된 상품의 경우 반품/교환 요청이 {'\n'} 불가능하므로 신중히 결정해주세요.
            </Body14R>
            <ButtonContainer>
              <TouchableOpacity onPress={handleCancel} style={styles.laterButton}>
                <Body16B style={{ color: 'white', textAlign: 'center' }}>나중에</Body16B>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleConfirmCompleted} style={styles.completeButton}>
                <Body16B style={{ color: PURPLE, textAlign: 'center' }}>거래 완료</Body16B>
              </TouchableOpacity>
            </ButtonContainer>
          </ModalBox>
        </ModalContainer>
      </Modal>


    </SafeAreaView>
  );
};

// 스타일 정의
const OrderInfoBox = styled.View`
  flex-direction: column;
  border-radius: 14px;
  border-color: ${PURPLE};
  border-width: 1px;
  padding: 19px;
  margin: 10px;
  justify-content: space-between;
`;

const StatusText = styled.Text`
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 14px;
  font-weight: bold;
`;

const OrderDateText = styled.Text`
  position: absolute;
  left: 10px;
  top: 10px;
  font-size: 14px;
  font-weight: bold;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
  width: '100%';
`;

const ActionText = styled.Text`
  color: ${BLACK};
  font-size: 14px;
  font-weight: bold;
`;

const ActionButton = styled.TouchableOpacity`
  flex: 1;
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${LIGHTGRAY};
  background-color: white;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.Image`
  width: 130px;
  height: 130px;
  border-radius: 8px;
`;

const InfoContainer = styled.View`
  flex: 1;
  padding-left: 10px;
`;

const PickerContainer = styled.View`
  width: ${(props: any) => props.screenWidth * 0.3};
  height: 40px;
  border-radius: 25px;
  background-color: ${PURPLE};
  justify-content: center;

`;


const ModalBox = styled.View`
  width: 300px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
`;


const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const styles = StyleSheet.create({

  laterButton: {
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },


  completeButton: {
    backgroundColor: '#CCFF90',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
  },

});



export default OrderPage;
