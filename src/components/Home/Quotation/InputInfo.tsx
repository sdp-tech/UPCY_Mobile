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

interface InputInfoProps {
  onClose: () => void;
  onNavigate: () => void;
  navigation: StackNavigationProp<RootStackParamList, 'InputInfo'>; // 여기서 'InputInfo'는 이 컴포넌트가 속한 스택 네비게이터 내의 경로 이름입니다.
}

export interface InfoProps {
  name: string;
  tel: string;
  address: string;
  zonecode: string;
}

const statusBarHeight = getStatusBarHeight(true);

const InputInfo = ({ onClose, navigation, onNavigate }: InputInfoProps) => {
  const [postModal, setPostModal] = useState(false); // 모달 가시성 상태를 관리합니다.
  const [selectedAddress, setSelectedAddress] = useState(''); // 선택한 주소를 저장할 상태 변수
  const [postalCode, setPostalCode] = useState(''); // 우편번호를 저장할 상태 변수

  // 주소 선택을 처리하는 함수
  const handleAddressSelect = (data: any) => {
    const { zonecode, address } = data;

    setPostalCode(zonecode); // 우편번호 상태 업데이트
    setSelectedAddress(address); // 선택한 주소를 상태 변수에 저장
    setPostModal(false); // 주소 선택 후 모달을 닫습니다.
    console.log(`Selected Address: ${address}, Postal Code: ${zonecode}`); // 디버깅 로그
  };

  const handleNextPress = () => {
    navigation.navigate('QuotationPage');
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
          <InputBox style={{ height: 40, paddingVertical: 10, marginTop: 10, borderColor: PURPLE }} placeholder='입력해주세요' />
          <Subtitle16B style={{ marginTop: 25 }}>연락처</Subtitle16B>
          <InputBox style={{ height: 40, paddingVertical: 10, marginTop: 10, borderColor: PURPLE }} placeholder='입력해주세요' />
          <Subtitle16B style={{ marginTop: 25 }}>우편번호</Subtitle16B>
          <InputBox
            style={{ height: 40, paddingVertical: 10, marginTop: 10, borderColor: PURPLE }}
            value={postalCode} // 우편번호 입력란에 우편번호를 설정
            placeholder='입력해주세요'
          />
          <Subtitle16B style={{ marginTop: 25 }}>주소</Subtitle16B>
          <InputBox
            style={{ height: 40, paddingVertical: 10, marginTop: 10, borderColor: PURPLE }}
            value={selectedAddress} // 선택한 주소를 입력란에 자동으로 설정
            placeholder='입력해주세요'
          />
          <TouchableOpacity style={{ position: 'absolute', top: 260, right: 30 }} onPress={() => setPostModal(true)}>
            <Body14M style={{ color: PURPLE }}>주소 찾기</Body14M>
          </TouchableOpacity>
          <InputBox style={{ height: 40, paddingVertical: 10, marginTop: 10, borderColor: PURPLE }} placeholder='상세 주소를 입력해주세요' />
        </View>
        <View style={{ paddingHorizontal: 45, paddingVertical: 20 }}>
          <BottomButton
            value={'다음'}
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
