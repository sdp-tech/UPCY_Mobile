import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import CheckBox from '../../../common/CheckBox';
import DropDownIcon from '../../../assets/common/DropDown.svg';
import UpArrowIcon from '../../../assets/common/UpArrow.svg';
import { Body14R, Subtitle16B, Body16R } from '../../../styles/GlobalText';
import { BLACK, PURPLE, LIGHTGRAY } from '../../../styles/GlobalColor';
import { useNavigation } from '@react-navigation/native';


// OrderInfoBox 컴포넌트
const OrderInfoBox = ({ order }) => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(false);
  const [steps, setSteps] = useState([false, false, false, false]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSubmitModalVisible, setSubmitModalVisible] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCourier, setSelectedCourier] = useState('택배사 선택');
  const [isDeliverySubmitted, setDeliverySubmitted] = useState(false); // 전달 완료 여부 상태

  const courierOptions = ['CJ 대한통운', '우체국택배', '한진택배', '롯데택배'];

  const toggleExpanded = () => setExpanded(!expanded);

  const toggleStep = (index) => {
    const newSteps = [...steps];
    newSteps[index] = !newSteps[index];
    setSteps(newSteps);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleSubmitModal = () => setSubmitModalVisible(!isSubmitModalVisible);

  const confirmDelivery = () => setModalVisible(false);

  const handleDeliverySubmit = () => {
    console.log('Before Submit:', isDeliverySubmitted); // 상태 확인
    setDeliverySubmitted(true); // 전달 완료 상태로 설정
    setSubmitModalVisible(false);
  };
    console.log('Is Delivery Submitted:', isDeliverySubmitted);

//수정 버튼 핸들러
  const handleEdit = () => {
     console.log('Is Delivery Submitted before:', isDeliverySubmitted); // 상태 변경 전 확인
     setDeliverySubmitted(false); // 상태 초기화
  };

  const calculateHeight = (steps) => {
    if (!steps || steps.length === 0) return 0; // steps가 비어있거나 undefined일 때 기본값
    return (steps.filter(Boolean).length) * (100 / (steps.length - 1));
  };

  return (
    <OrderInfoContainer>
      <TopSection>
        <OrderID>{order.id}</OrderID>
        <ContentRow>
          <ImageContainer source={{ uri: order.image }} />
          <TextContainer>
            <Subtitle16B>{order.title}</Subtitle16B>
            <Body14R>주문자: {order.customer}</Body14R>
            <Body14R>주문 일시: {order.date}</Body14R>
            <Body14R>거래 방식: {order.method}</Body14R>
          </TextContainer>
        </ContentRow>
        <TouchableOpacity
            style = {{ marginTop: 10, alignSelf: 'flex-end'}}
            onPress= {()=>navigation.navigate('QuotationPage')}
            >
            <Text style={{color:'gray', fontSize:14, fontWeight:'bold', textDecorationLine:'underlined'}}>
            주문서확인
            </Text>
            </TouchableOpacity>

      </TopSection>

      {expanded && (
        <ExpandedContent>
          <FlowContainer>
            <FlowLine stepCount={4}>
              <CompletedFlowLine steps={steps} stepCount={4} height={calculateHeight(steps)} />
              {Array(4).fill(null).map((_, index) => (
                <Circle
                  key={`main-${index}`}
                  index={index}
                  completed={steps[index] || (index > 0 && steps[index - 1])}
                  stepCount={4}
                />
              ))}
            </FlowLine>

            <StepContainer>
              {["입금 확인", "재료 수령 완료", "제작 완료", "배송 정보 입력"].map((stepLabel, index) => (
                <StepRow key={index}>
                  <Body16R>{stepLabel}</Body16R>
                  {index < 3 && (
                    <CheckBoxWrapper>

                        <TouchableOpacity
                          style={[
                            styles.checkBox,
                            isDeliverySubmitted && styles.disabledCheckBox,
                          ]}
                          disabled={isDeliverySubmitted}
                          onPress={() => toggleStep(index)}
                        >
                          <View
                            style={[
                              styles.checkBoxIndicator,
                              steps[index] && styles.checked,
                              isDeliverySubmitted && styles.disabledCheckBoxIndicator,
                            ]}
                          />
                        </TouchableOpacity>

                    </CheckBoxWrapper>
                  )}
                </StepRow>
              ))}
            </StepContainer>
          </FlowContainer>

          {!isDeliverySubmitted && (
          <DropdownContainer>
            <TouchableOpacity
              onPress={() => setShowDropdown(!showDropdown)}
            style={[
              styles.dropdownButton,
              { borderColor: isDeliverySubmitted ? LIGHTGRAY : steps[2] ? PURPLE : LIGHTGRAY },
              { backgroundColor: isDeliverySubmitted ? LIGHTGRAY : 'white' },
            ]}
            disabled={isDeliverySubmitted || !steps[2]} // 전달 완료 시 비활성화
            >
             <Text style={[styles.dropdownButtonText, { color: isDeliverySubmitted ? 'gray' : 'black' }]}>
             {selectedCourier}
             </Text>
            <DropDownIcon width={20} height={20} />
            </TouchableOpacity>

            {showDropdown && (
              <DropdownList>
                {courierOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setSelectedCourier(option);
                      setShowDropdown(false);
                    }}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </DropdownList>
            )}
          </DropdownContainer>
        )}

          <TrackingNumberContainer>
            <TextInput
              placeholder="송장 번호 입력"
              editable={!isDeliverySubmitted && steps[2]} //전달완료 시 비활성화
              style={{
                borderColor: isDeliverySubmitted || !steps[2] ? LIGHTGRAY : PURPLE,
                borderWidth: 1,
                borderRadius: 4,
                flex: 0,
                paddingHorizontal: 10,
                backgroundColor: isDeliverySubmitted ? LIGHTGRAY : 'white',
              }}
            />
            {!isDeliverySubmitted && (
            <TouchableOpacity
              style={{
                backgroundColor: steps[2] ? PURPLE : LIGHTGRAY,
                borderRadius: 4,
                paddingHorizontal: 10, // 좌우 패딩만 설정
                paddingVertical: 5, // 상하 패딩을 줄여 텍스트 공간 확보
                marginLeft: 10,
                marginTop:10,
                height: 30,
              }}
              disabled={isDeliverySubmitted || !steps[2]} // 전달 완료 시 버튼 비활성화
              onPress={toggleModal}
            >
              <Text style={{ color: 'white' }}>확인</Text>
            </TouchableOpacity>
            )}
          </TrackingNumberContainer>

          <TrackingNumberContainer>
            <SubmitButton
              onPress={isDeliverySubmitted ? undefined : toggleSubmitModal}
              style={{
                backgroundColor: isDeliverySubmitted ? LIGHTGRAY : PURPLE,
              }}
            >
              <SubmitButtonText style={{ color: isDeliverySubmitted ? 'gray' : 'white' }}>
                전달 완료
              </SubmitButtonText>
            </SubmitButton>

            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                borderColor:PURPLE,
                borderRadius: 4,
                paddingHorizontal: 10, // 좌우 패딩만 설정
                paddingVertical: 5, // 상하 패딩을 줄여 텍스트 공간 확보
                marginLeft: 10,
                marginTop:10,
                height: 30,
              }}
              disabled={!steps[2]}
              onPress={handleEdit}
            >
              <Text style={{ color: PURPLE }}>수정</Text>
            </TouchableOpacity>
           </TrackingNumberContainer>





    <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
      <View style={styles.modalContainer}>
        {/* 상단 텍스트 */}
        <Subtitle16B style={{ textAlign: 'center' , marginBottom: 10 }}>입력한 배송 정보가 정확한지 {'\n'}확인하셨나요?</Subtitle16B>
        <Text style={{ textAlign: 'center', marginBottom: 15 }}>확인 후 '전달완료' 버튼을 누르면 업시러에게 배송 정보가 표시됩니다.</Text>

        {/* 버튼 영역 */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={toggleModal} >
            <Text style={[styles.buttonText, { fontWeight: 'bold' }]}>확인</Text>
          </TouchableOpacity>

          {/* 구분선 추가 */}
          <View style={styles.separator} />

          <TouchableOpacity onPress={toggleModal} >
            <Text style={[styles.buttonText,{ fontWeight: 'bold' }, { color: '#FF5F5F' }]}>취소</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>

        {/* 전달완료 모달 */}
    <Modal isVisible={isSubmitModalVisible} onBackdropPress={toggleModal}>
      <View style={styles.modalContainer}>
        {/* 상단 텍스트 */}
        <Subtitle16B style={{ textAlign: 'center' , marginBottom: 10 }}>전달 완료 하시겠습니까?</Subtitle16B>
        <Text style={{ textAlign: 'center' , marginBottom: 15 }}>전달 완료 후, 업시러가 ‘거래 완료’ 버튼을 누르면 거래가 완료됩니다.</Text>

        {/* 버튼 및 구분선 영역 */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleDeliverySubmit}>
            <Text style={[styles.buttonText, { fontWeight: 'bold' }]}>확인</Text>
          </TouchableOpacity>

          {/* 구분선 추가 (검은 가로선) */}
          <View style={styles.separator} />

          <TouchableOpacity onPress={toggleSubmitModal}>
            <Text style={[styles.buttonText,{ fontWeight: 'bold' }, { color: '#FF5F5F' }]}>취소</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>


    </ExpandedContent>
      )}

      <TouchableOpacity onPress={toggleExpanded} style={styles.centerIconContainer}>
        {expanded ? <UpArrowIcon width={40} height={40} /> : <DropDownIcon width={40} height={40} />}
      </TouchableOpacity>
    </OrderInfoContainer>
  );
};

// InProgressOrders 컴포넌트
const InProgressOrders = () => {
  const orders = [
    { id: '09230', title: '데님으로 만드는 숄더백', customer: '전예영', method: '비대면', date: '2024-05-22', is_online: false,     image: 'https://image.production.fruitsfamily.com/public/product/resized@width620/t6RDVV2b6--1703933039055.png' },
    { id: '92930', title: '내 옷을 반려동물 옷으로', customer: '전예영', method: '대면', date: '2024-05-22', is_online: true,     image:'https://m.lovecoco.co.kr/web/product/big/201911/55d890a77de72b7213b84fec2083e3fe.jpg' },
    { id: '23894', title: '평범했던 패딩, 퀼팅백으로', customer: '전예영', method: '대면', date: '2024-05-22', is_online: true,     image:'https://image.yes24.com/goods/118500067/XL' },
    {
      date: '2024-05-23',
      title: '주문 제목 예시',
      price: '30000',
      customer: '김철수',
      method: '택배',
      image: 'https://m.lovecoco.co.kr/web/product/big/201911/55d890a77de72b7213b84fec2083e3fe.jpg',
    },
  ];

  return (
    <SafeAreaView>
      {orders.map((order, index) => (
        <OrderInfoBox key={index} order={order} />
      ))}
    </SafeAreaView>
  );
};

// 스타일 정의
const OrderInfoContainer = styled.View`
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

const OrderID = styled.Text`
  font-size: 14px;
  color: black;
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

const ExpandedContent = styled.View`
  margin-top: 10px;
  width: 100%;
  align-items: center;
`;

const FlowContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
`;

const FlowLine = styled.View`
  width: 2px;
  background-color: ${LIGHTGRAY};
  margin-left: 50px;
  margin-right: 10px;
  position: relative;
  ${({ stepCount }) => `
    height: ${(stepCount - 1) * 60}px;
  `}
`;

const CompletedFlowLine = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  background-color: ${PURPLE};
  height: ${({ height }) => height}%;
`;

const Circle = styled.View`
  position: absolute;
  left: -5px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${({ completed }) => (completed ? PURPLE : LIGHTGRAY)};
  ${({ index, stepCount }) => `
    top: ${(index / (stepCount - 1)) * 100}%;
  `}
`;

const StepContainer = styled.View`
  flex: 1;
`;

const StepRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 30px;
  margin-bottom: 33px;
`;

const DropdownContainer = styled.View`
  width: 188px;
  height: 30px;
  margin-top: 10px;
  align-self: center;
`;

const DropdownList = styled.View`
  border: 1px solid ${PURPLE};
  border-radius: 4px;
  margin-top: 5px;
  background-color: white;
  z-index: 10;
`;
const TrackingNumberContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  justify-content: center;
  width:100%;
`;
const TextInput = styled.TextInput`
  width: 188px;
  max-width: 188px;
  height: 30px;
  padding: 0 10px;
  margin-top: 10px;
  border-width: 1px;
  border-color: ${PURPLE};
  border-radius: 4px;
  align-self: center;
  marginLeft: 55px;

`;
const SubmitButton = styled.TouchableOpacity`
  background-color: ${PURPLE};
  border-radius: 8px;
  padding: 0 20px;
  width: 116px;
  height: 33px;
  align-items: center;
  margin-top: 15px;
  marginLeft: 55px;
`;

const SubmitButtonText = styled.Text`
  color: white;
  font-size: 16px;

`;
const CheckBoxWrapper = styled.View`
  position: absolute;
  right: 50px;
`;





const styles = StyleSheet.create({
  dropdownButton: {
    width: 188,
    height: 30,
    borderWidth: 1,
    borderColor: PURPLE,
    borderRadius: 4,
    justifyContent: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownButtonText: {
    flex: 1,
  },
  optionText: {
    fontSize: 14,
    color: 'black',
  },
    checkBox: {
      width: 20,
      height: 20,
      borderWidth: 2,
      borderColor: PURPLE,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
    },
    disabledCheckBox: {
      borderColor: LIGHTGRAY,
      backgroundColor: LIGHTGRAY,
    },
    checkBoxIndicator: {
      width: 10,
      height: 10,
      backgroundColor: 'white',
    },
    checked: {
      backgroundColor: PURPLE,
    },
    disabledCheckBoxIndicator: {
      backgroundColor: LIGHTGRAY,
    },
  centerIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
  },
  confirmButton: {
    backgroundColor: PURPLE,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between', // 버튼 사이에 공간을 두기 위해
    width: '100%',
    alignItems:'center'
  },
  buttonText: {
    fontSize: 14,
    //fontWeight:'400',
  },
   separator: {
     width: 250,
     height: 1, // 버튼 높이와 맞추기
     backgroundColor: 'black',
     marginTop:20,
     marginBottom:20,
       },



});

export default InProgressOrders;
