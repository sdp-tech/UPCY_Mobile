import React, { useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity ,Dimensions} from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import styled from 'styled-components/native';
import { Picker } from '@react-native-picker/picker';
import { BLACK, LIGHTGRAY, PURPLE } from '../../../styles/GlobalColor';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParams } from '../../../pages/Home';





const OrderInfo = ({ name, customer,  estimated_price, is_online }) => (
  <InfoContainer>
    <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold', marginBottom: 4 }}>{name}</Text>
    <Text style={{ color: 'black', fontSize: 15, marginBottom: 4 }}>주문자: {customer}</Text>
    <Text style={{ color: 'black', fontSize: 15, marginBottom: 4 }}> </Text>
    <Text style={{ color: 'black', fontSize: 15, marginBottom: 4 }}>예상 결제 금액: {estimated_price}</Text>
    <Text style={{ color: 'black', fontSize: 15 }}>거래 방식: {is_online ? '비대면' : '대면'}</Text>
    <TouchableOpacity style={{ marginTop: 10, alignSelf: 'flex-end' }}>
      <Text style={{ color: 'gray', fontSize: 14, fontWeight: 'bold' , textDecorationLine: 'underline'}}>주문서 확인</Text>
    </TouchableOpacity>
  </InfoContainer>
);


const OrderStatusLabel = ({ status }) => {
  switch (status) {
    case 'progress':
      return <StatusText style={{ color: PURPLE }}>배송중</StatusText>;
    case 'completed':
      return <StatusText style={{ color: PURPLE }}>거래 완료</StatusText>;
    default:
      return null;
  }
};

const OrderActionButtons = ({ status, navigation }: { status: string; navigation: any }) => {

  return (
    <ButtonContainer>
      <ActionButton>
        <ActionText>오픈채팅</ActionText>
      </ActionButton>

      {status === 'progress' && (
        <ActionButton>
          <ActionText style={{ color: PURPLE }}>거래 완료</ActionText>
        </ActionButton>
      )}

      {status === 'completed' && (
        <ActionButton onPress={() => navigation.navigate('WriteReviewPage')}>
          <ActionText style={{ color: PURPLE }}>리뷰 작성</ActionText>
        </ActionButton>
      )}
    </ButtonContainer>
  );
};



// DropdownSection 컴포넌트 정의
const DropdownSection = ({ selectedFilter, setSelectedFilter }) => {''
    const screenWidth = Dimensions.get('window').width

  return (
    <View style={{ paddingVertical: 10, paddingHorizontal: 10, borderBottomColor: LIGHTGRAY , borderBottomWidth: 0}}>
      <PickerContainer screenWidth={screenWidth}>
      <Picker
        selectedValue={selectedFilter}
        onValueChange={(itemValue) => setSelectedFilter(itemValue)}
        style={{ height: 50, width: '100%', color:'white',   justifyContent: 'center',textAlignVertical: 'center',  }}
      >
        <Picker.Item label="전체" value="전체" style={{ fontSize: 13 }}  />
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
  margin-horizontal: 15px;
  margin-bottom: 10px;
  border: 1px solid white;
`;



interface OrderPageProps extends StackScreenProps<HomeStackParams, 'OrderPage'> {
  flatListRef: React.RefObject<FlatList<any>>;
}


const OrderPage: React.FC<OrderPageProps> = ({ flatListRef }) => {
   const [selectedFilter, setSelectedFilter] = useState('전체');
  const navigation = useNavigation();

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
   <SafeAreaView style={{ flex: 1 , backgroundColor: '#f0f0f0'}}>
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
          />
          </View>
          <OrderDateText style={{ color: BLACK }}>{order.orderDate}</OrderDateText>
          <OrderStatusLabel status={order.status} />
          <OrderActionButtons status={order.status} navigation={navigation} />
         </OrderInfoBox>
      )}
      keyExtractor={(item, index) => index.toString()}
      style={{ marginBottom: 60 }}
    />
   </SafeAreaView>
  );
};

// 스타일 정의
const OrderInfoBox = styled.View`
  flex-direction: column;
  border-radius: 14px;
  border-color: ${PURPLE};
  border-width: 1px;
  backgroundColor: white;
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
  width: ${(props) => props.screenWidth * 0.3};
  height: 40px;
  border-radius: 25px;
  background-color: ${PURPLE};
  justify-content: center;

`;


export default OrderPage;
