import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, Alert, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import { Body14R, Subtitle16B, Body16R, Caption11M } from '../../../styles/GlobalText';
import { BLACK, LIGHTGRAY, PURPLE } from '../../../styles/GlobalColor';
import DropDownIcon from '../../../assets/common/DropDown.svg';
import UpArrowIcon from '../../../assets/common/UpArrow.svg';
import CheckBox from '../../../common/CheckBox';

const InProgressOrders = () => {
  const [expanded, setExpanded] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false); //확인 모달 관리
  const [isSubmitModalVisible, setSubmitModalVisible] = useState(false); // 전달 완료 모달
  const [isDeliveryConfirmed, setDeliveryConfirmed] = useState(false); //전달 완료 이후 상태 관리
  const [steps, setSteps] = useState([false, false, false, false]); // 각 단계의 상태 관리
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCourier, setSelectedCourier] = useState('택배사 선택');
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

    const toggleSubmitModal = () => {
      setSubmitModalVisible(!isSubmitModalVisible);
    };

     const confirmDelivery = () => {
      setDeliveryConfirmed(true); // 전달 완료 설정
      setModalVisible(false); // 모달 닫기
    };
  const isCircleCompleted = (index) => {
    // 현재 인덱스가 체크되었거나, 직전 단계까지 체크된 경우 원을 보라색으로 변경
    return steps[index] || (index > 0 && steps[index - 1]);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <OrderInfoBox>
          <TopSection>
            <OrderDate>2024-05-22</OrderDate>
            <ContentRow>
              <ImageContainer source={{ uri: 'https://m.lovecoco.co.kr/web/product/big/201911/55d890a77de72b7213b84fec2083e3fe.jpg' }} />
              <TextContainer>
                <Subtitle16B>내 옷을 반려동물 옷으로</Subtitle16B>
                <Body14R>예상 결제 금액: 25000원</Body14R>
                <Body14R>주문자: 전예영</Body14R>
                <Body14R>거래 방식: 대면</Body14R>
              </TextContainer>
            </ContentRow>
          </TopSection>

          {expanded && (
            <ExpandedContent>
              <FlowContainer>
                {/* FlowLine 컴포넌트 */}
                <FlowLine stepCount={4}>
                  <CompletedFlowLine steps={steps} />

                  {/* 총 4개의 주요 단계 원 */}
                  {Array(4).fill(null).map((_, index) => (
                    <Circle
                      key={`main-${index}`}
                      index = {index}
                      completed={isCircleCompleted(index)}
                      style={{ top: `${index * 25}%` }}
                    />
                  ))}
                </FlowLine>

                <StepContainer>
                  {["입금 확인", "재료 수령 완료", "제작 완료", "배송 정보 입력"].map((stepLabel, index) => (
                    <StepRow key={index} stepCount ={4}>
                      <Body16R>{stepLabel}</Body16R>
                      {index < 3 && (
                       <CheckBoxWrapper>
                        <CheckBox pressed={steps[index]} onPress={() => toggleStep(index)} />
                       </CheckBoxWrapper>

                      )}
                    </StepRow>
                  ))}
                </StepContainer>
              </FlowContainer>

              {/* 택배사 선택 및 송장 번호 입력 */}
              <View>
                <DropdownContainer>
                  <TouchableOpacity
                    onPress={() => setShowDropdown(!showDropdown)}
                    style={[styles.dropdownButton, !steps[2] && styles.disabledButton]} // step3 이전에 비활성화
                    disabled={!steps[2]} // step3 이전에 클릭 불가
                  >
                    <Text style={styles.dropdownButtonText}>{selectedCourier}</Text>
                    <DropDownIcon width={35} height={35} style={styles.icon} />
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
                          style={styles.option}
                        >
                          <Text style={styles.optionText}>{option}</Text>
                        </TouchableOpacity>
                      ))}
                    </DropdownList>
                  )}
                </DropdownContainer>

               <TrackingNumberContainer>
                  <TextInput
                    placeholder="송장 번호 입력"
                    editable={steps[2]}
                    style={[styles.textInput, !steps[2] && styles.disabledTextInput]}
                  />
                <TouchableOpacity
                    style={[
                      styles.confirmButton,
                      !steps[2] && styles.disabledConfirmButton,
                    ]}
                    disabled={!steps[2]}
                    onPress={toggleModal} // 모달 표시
                  >
                    <Text style={styles.confirmButtonText}>
                    확인
                    </Text>
                  </TouchableOpacity>
                </TrackingNumberContainer>
              </View>
              <SubmitButton onPress={() => Alert.alert('전달 완료하시겠습니까?')}>
                <SubmitButtonText>전달 완료</SubmitButtonText>
              </SubmitButton>
            </ExpandedContent>
          )}

          <TouchableOpacity onPress={toggleExpanded} style={styles.centerIconContainer}>
            {expanded ? <UpArrowIcon width={35} height={35} style={styles.icon} /> : <DropDownIcon width={35} height={35} style={styles.icon} />}
          </TouchableOpacity>
        </OrderInfoBox>

        {/* 모달 - 확인 */}
         <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
           <View style={styles.modalContainer}>
             <Subtitle16B style={{textAlign:'center'}}>입력한 배송 정보가 정확한지{"\n"} 확인하셨나요?</Subtitle16B>
             <Text style={[styles.modalMessage, , { textAlign: 'center' }]}>확인 후 "전달 완료" 버튼을 누르면, 업씨러에게{"\n"} 배송 정보가 표시됩니다.</Text>
             <View style={styles.modalButtons}>
           <ButtonContainer>
               <View style={styles.separator} />
               <TouchableOpacity onPress={toggleModal} style={styles.modalButton}>
                 <Text style={styles.modalButtonText}>확인</Text>
               </TouchableOpacity>
               <View style={styles.separator} />
               <TouchableOpacity onPress={toggleModal} style={styles.modalButton}>
                 <Text style={styles.modalCancelButtonText}>취소</Text>
               </TouchableOpacity>
           </ButtonContainer>
             </View>
           </View>
         </Modal>


 {/* 전달 완료 모달 */}
        <Modal isVisible={isSubmitModalVisible} onBackdropPress={toggleSubmitModal}>
          <View style={styles.modalContainer}>
            <Subtitle16B style={{ textAlign: 'center' }}>전달 완료 하시겠습니까?</Subtitle16B>
            <Text style={[styles.modalMessage, { textAlign: 'center' }]}>전달 완료 후, 임시처리가 '거래 완료' 버튼을 누르면{"\n"}거래가 완료됩니다.</Text>
            <View style={styles.modalButtons}>
              <View style={styles.separator} />
              <TouchableOpacity onPress={confirmDelivery} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>확인</Text>
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity onPress={toggleSubmitModal} style={styles.modalButton}>
                <Text style={styles.modalCancelButtonText}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

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
  height: ${({ stepCount }) => `${stepCount * 50 -10}px`};
  `;

const CompletedFlowLine = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: ${({ steps }) => (steps.filter(Boolean).length / 4) * 100}%;
  background-color: ${PURPLE};
`;

const Circle = styled.View`
  position: absolute;
  left: -5px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${({ completed }) => (completed ? PURPLE : LIGHTGRAY)};
  top: ${({ index, stepCount }) => `${(index / (stepCount - 1)) * 100}%`};

`;

const StepContainer = styled.View`
  flex: 1;
`;

const StepRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 30px;
  margin-bottom: ${({ index, stepCount }) => (index === stepCount - 1 ? '0px' : '20px')};

`;

const TextInput = styled.TextInput`
  width: 188px;
  height: 30px;
  padding: 0 10px;
  margin-top: 10px;
  margin-right: 8px;
  border-width: 1px;
  border-color: ${PURPLE};
  border-radius: 4px;
`;

const SubmitButton = styled.TouchableOpacity`
  margin-top: 15px;
  padding: 10px 20px;
  background-color: ${PURPLE};
  border-radius: 8px;
  align-items: center;
`;

const SubmitButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

const DropdownContainer = styled.View`
  width: 188px;
  margin-top: 10px;
`;

const DropdownList = styled.View`
  border: 1px solid ${PURPLE};
  border-radius: 4px;
  margin-top: 5px;
`;

const CheckBoxWrapper = styled.View`
  position: absolute;
  right: 50;
`;
const TrackingNumberContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;
const ButtonContainer = styled.View`
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  align-items: center;

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
  option: {
    padding: 10,
  },
  optionText: {
    fontSize: 14,
    color: 'black',
  },
  centerIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  icon: {
    alignSelf: 'center',
  },
  disabledButton: {
    borderColor: LIGHTGRAY,
  },
  disabledTextInput: {
    borderColor: LIGHTGRAY,
  },
 modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    width: 300,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    marginTop:20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalButtonText: {
    color: 'red',
    fontWeight: 'bold',
  },
  modalCancelButtonText: {
    color: 'black',
  },

  confirmButton: {
    backgroundColor: PURPLE,
    borderRadius: 4,
    marginLeft: 8,
    marginTop: 11,
    width:39,
    height:30,
    justifyContent: 'center',
    alignItems:'center',
  },

  disabledConfirmButton: {
    backgroundColor: LIGHTGRAY,
  },

  separator: {
    width: '100%',
    height: 1,
    backgroundColor: LIGHTGRAY,
  },
  confirmButtonText: {
    color: 'white',
  },
});

export default InProgressOrders;
