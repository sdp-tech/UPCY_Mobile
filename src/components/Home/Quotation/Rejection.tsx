import React, { useState } from 'react';
import { FlatList, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, View, Modal, Text } from 'react-native';
import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-safearea-height';
import { Body14R, Subtitle18B, Subtitle18M, Subtitle16B, Subtitle16M, Title20B } from '../../../styles/GlobalText';
import { BLACK, LIGHTGRAY, PURPLE } from '../../../styles/GlobalColor';
import Arrow from '../../../assets/common/Arrow.svg';
import InputBox from '../../../common/InputBox';
import BottomButton from '../../../common/BottomButton';
import { StackScreenProps } from '@react-navigation/stack';
import { OrderStackParams } from '../Order/OrderManagement';

interface RejectionProps extends StackScreenProps<OrderStackParams, 'Rejection'> {
  onClose?: () => void;
}

const statusBarHeight = getStatusBarHeight(true);

const data = [
  { id: 1, text: "요청하신 리폼을 할 수 없는 소재" },
  { id: 2, text: "요청하신 리폼을 할 수 없는 원단 크기" },
  { id: 3, text: "서비스 주문량 폭증으로 수락 불가" },
  { id: 4, text: "제작하기 어려운 요청 사항" },
  { id: 5, text: "기타" },
];

const Rejection = ({ navigation, route, onClose }: RejectionProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [customReason, setCustomReason] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const handlePress = (id: number) => {
    setSelectedId(id);
  };

  const handleConfirmRejection = () => {
    setIsModalVisible(false);
    navigation.navigate('SentRejection');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <BackButton onPress={onClose}>
        <Arrow color={BLACK} />
      </BackButton>

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
        <View style={{ marginTop: 30 }}>
          <Title20B style={{ textAlign: 'center' }}>주문서 거절 사유</Title20B>
          <View style={{ padding: 20, marginVertical: 15, alignItems: 'center' }}>
            <Subtitle18B>주문서를 거절한 이유가 무엇인가요?</Subtitle18B>
            <View style={{ marginVertical: 3 }} />
            <Body14R>다음 주문서를 작성할 때 많은 도움이 돼요.</Body14R>
            <View style={{ marginVertical: 20 }} />
            <FlatList
              data={data}
              style={{ height: 400 }}
              renderItem={({ item }: any) => {
                return (
                  <TouchableOpacity
                    style={{
                      borderRadius: 8,
                      borderColor: PURPLE,
                      borderWidth: 1,
                      backgroundColor: item.id === selectedId ? PURPLE : 'white',
                      paddingHorizontal: 55,
                      paddingVertical: 15,
                      marginVertical: 5
                    }}
                    onPress={() => handlePress(item.id)}
                  >
                    <Subtitle16M style={{ color: item.id === selectedId ? 'white' : PURPLE, textAlign: 'center' }}>
                      {item.text}
                    </Subtitle16M>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={item => item.id.toString()}
            />

            {selectedId === 5 && (
              <View style={{ width: '100%', marginTop: 2 }}>
                <InputBox
                  placeholder='추가적인 의견이나 거절 사유가 있다면 작성해 주세요'
                  long
                  value={customReason}
                  onChangeText={setCustomReason}
                  style={{ width: '100%' }}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <Modal transparent={true} visible={isModalVisible} onRequestClose={handleCancel}>
        <ModalContainer>
          <ModalBox>
            <Subtitle16B style={{ textAlign: 'center', marginBottom: 10 }}>
              해당 거래를 정말 거절하시겠어요?
            </Subtitle16B>
            <Text style={{ textAlign: 'center', marginBottom: 15 }}>
              거절 사유가 업씨러에게 전달됩니다
            </Text>

            <ButtonContainer>
              <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>취소</Text>
              </TouchableOpacity>

              <View style={styles.separator} />

              <TouchableOpacity onPress={handleConfirmRejection} style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>확인</Text>
              </TouchableOpacity>
            </ButtonContainer>
          </ModalBox>
        </ModalContainer>
      </Modal>



      <View style={{ position: 'absolute', width: '100%', bottom: 0, borderTopWidth: 8, borderColor: 'white', zIndex: 1, backgroundColor: 'white', paddingHorizontal: 10 }}>
        <View style={{ paddingHorizontal: 30, paddingVertical: 20 }}>
          <BottomButton value='주문 거절하기' pressed={false}
            onPress={() => setIsModalVisible(true)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const BackButton = styled.TouchableOpacity`
  padding: 10px;
  position: absolute;
  left: 0px;
  top: ${statusBarHeight - 10}px;
  z-index: 1;
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalBox = styled.View`
  width: 300px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  align-items: center;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  width: 100%;
`;

const styles = StyleSheet.create({
  cancelButton: {
    flex: 1,
    padding: 10,
    backgroundColor: LIGHTGRAY,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmButton: {
    flex: 1,
    padding: 10,
    backgroundColor: PURPLE,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  separator: {
    width: 10,
  },
});


export default Rejection;
