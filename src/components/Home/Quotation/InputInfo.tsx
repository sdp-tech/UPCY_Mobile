import React, { useState } from 'react';
import { Text, SafeAreaView, ScrollView, TouchableOpacity, View, Modal, Alert } from 'react-native';
import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-safearea-height';
import { Body14M, Subtitle16B, Title20B } from '../../../styles/GlobalText';
import { BLACK, PURPLE } from '../../../styles/GlobalColor';
import Arrow from '../../../assets/common/Arrow.svg';
import InputBox from '../../../common/InputBox';
import BottomButton from '../../../common/BottomButton';
import Postcode from '@actbase/react-daum-postcode';
import { StackScreenProps } from '@react-navigation/stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParams } from '../../../pages/Home';

import Request from '../../../common/requests';
import { OrderStackParams } from '../Order/OrderManagement';


export type InputInfoProps = {
  navigation: StackNavigationProp<OrderStackParams, 'InputInfo'>;
  route: any;
}



const statusBarHeight = getStatusBarHeight(true);

const InputInfo = ({ navigation, route }: InputInfoProps): React.JSX.Element => {
  console.log("🚀 Received options in InputInfo:", route.params.options ?? "No options received");
  console.log("🚀 Received materials in InputInfo:", route.params.materials ?? "No materials received");

  // 컴포넌트 내부 구현
  const [postModal, setPostModal] = useState(false); // 모달 가시성 관리
  const [selectedAddress, setSelectedAddress] = useState(''); // 선택한 주소를 저장
  const [postalCode, setPostalCode] = useState(''); // 우편번호를 저장
  const [detailedAddress, setDetailedAddress] = useState('');
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const request = Request();

  const handleAddressSelect = (data: any) => {
    const { zonecode, address } = data;
    setPostalCode(zonecode); // 우편번호
    setSelectedAddress(address); // 주소
    setPostModal(false); // 주소 선택 후 모달을 닫음
  };


  const handleNextPress = async () => {
    if (!name || !tel || !selectedAddress) {
      Alert.alert('필수 정보를 입력해주세요.');
      return;
    }


    navigation.navigate('QuotationPage', {
      ...route.params, // 이전 데이터를 유지
      name, // 이름
      tel, // 전화번호
      address: selectedAddress, // 주소
      detailedAddress, // 상세 주소
      zonecode: postalCode, // 우편번호
    });
  };











  return (
    <ScrollView>
      <SafeAreaView>
        <BackButton onPress={() => navigation.goBack()}>
          <Arrow color={BLACK} />
        </BackButton>
        <View style={{ marginTop: 40 }}>
          <Title20B style={{ textAlign: 'center' }}>내 정보</Title20B>
        </View>
        <View style={{ padding: 20, marginVertical: 30 }}>
          <Subtitle16B>이름</Subtitle16B>
          <InputBox
            style={{ height: 40, paddingVertical: 10, marginTop: 10, borderColor: PURPLE }}
            placeholder="입력해주세요"
            value={name} // 이름 상태 값
            onChangeText={(text) => setName(text)} // 이름 입력 핸들러
          />
          <Subtitle16B style={{ marginTop: 25 }}>연락처</Subtitle16B>
          <InputBox
            style={{ height: 40, paddingVertical: 10, marginTop: 10, borderColor: PURPLE }}
            placeholder="입력해주세요"
            value={tel} // 연락처 상태 값
            onChangeText={(text) => setTel(text)} // 연락처 입력 핸들러
          />
          <Subtitle16B style={{ marginTop: 25 }}>우편번호</Subtitle16B>
          <InputBox
            style={{ height: 40, paddingVertical: 10, marginTop: 10, borderColor: PURPLE }}
            value={postalCode}
            placeholder="입력해주세요"
          />
          <Subtitle16B style={{ marginTop: 25 }}>주소</Subtitle16B>
          <InputBox
            style={{ height: 40, paddingVertical: 10, marginTop: 10, borderColor: PURPLE }}
            value={selectedAddress}
            placeholder="입력해주세요"
          />
          <TouchableOpacity style={{ position: 'absolute', top: 260, right: 30 }} onPress={() => setPostModal(true)}>
            <Body14M style={{ color: PURPLE }}>주소 찾기</Body14M>
          </TouchableOpacity>
          <InputBox
            style={{ height: 40, paddingVertical: 10, marginTop: 10, borderColor: PURPLE }}
            placeholder='상세 주소를 입력해주세요'
            value={detailedAddress} // 상태값 연결
            onChangeText={(text) => setDetailedAddress(text)}
          />
        </View>
        <View style={{ paddingHorizontal: 45, paddingVertical: 20 }}>
          <BottomButton value={'다음'}
            pressed={false}
            onPress={handleNextPress}
          />
          <View style={{ marginVertical: 5 }} />
        </View>

        {/* 주소 검색 모달 */}
        <Modal
          visible={postModal}
          animationType="slide"
          transparent={true}
        >
          <TouchableOpacity
            style={{ flex: 1, justifyContent: 'flex-end' }}
            onPress={() => setPostModal(false)}
          />
          <View style={{
            backgroundColor: 'white',
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 40,
            height: '85%',
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 20
          }}>
            <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 40 }}>
              <Subtitle16B>주소 검색</Subtitle16B>
              <TouchableOpacity onPress={() => setPostModal(false)}>
                <Subtitle16B>닫기</Subtitle16B>
              </TouchableOpacity>
            </View>
            {/* 주소 검색을 위해 Postcode 컴포넌트 사용 */}
            <Postcode
              style={{ width: '100%', height: '100%' }}
              onError={() => {
                Alert.alert('주소 검색에 실패하였습니다.');
              }}
              jsOptions={{ animation: true, hideMapBtn: true }}
              onSelected={(data) => handleAddressSelect(data)} // 주소 선택을 처리
            />
          </View>
        </Modal>
      </SafeAreaView>
    </ScrollView>
  );
}

const BackButton = styled.TouchableOpacity`
  padding: 10px;
  position: absolute;
  left: 0px;
  top: ${statusBarHeight - 10}px;
  z-index: 1;
`;

export default InputInfo;
