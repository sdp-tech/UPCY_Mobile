import React, { useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-safearea-height';
import { Body14R, Subtitle18B, Subtitle18M, Title20B } from '../../../styles/GlobalText';
import { BLACK, LIGHTGRAY, PURPLE } from '../../../styles/GlobalColor';
import Arrow from '../../../assets/common/Arrow.svg';
import InputBox from '../../../common/InputBox';
import BottomButton from '../../../common/BottomButton';
import { useNavigation } from '@react-navigation/native';

interface RejectionProps {
  onClose: () => void;
}

const statusBarHeight = getStatusBarHeight(true);

const data = [
  { id: 1, text: "요청하신 리폼을 할 수 없는 의류" },
  { id: 2, text: "재료 부족" },
  { id: 3, text: "기간 내 작업 어려움" },
  { id: 4, text: "원하는 디자인이 아님" },
  { id: 5, text: "하기 싫음" },
  { id: 6, text: "기타 사유(직접입력)" }
];

const Rejection = ({ onClose }: RejectionProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [customReason, setCustomReason] = useState<string>('');
  const handlePress = (id: number) => {
    setSelectedId(id);
  };
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <BackButton onPress={onClose}>
        <Arrow color={BLACK} />
      </BackButton>

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
        <View style={{ marginTop: 30 }}>
          <Title20B style={{ textAlign: 'center' }}>견적서 거절 사유</Title20B>
          <View style={{ padding: 20, marginVertical: 15, alignItems: 'center' }}>
            <Subtitle18B>견적서를 거절한 이유가 무엇인가요?</Subtitle18B>
            <Body14R>다음 견적서를 작성할 때 많은 도움이 돼요.</Body14R>
            <FlatList
              data={data}
              style={{ height: 400 }}
              renderItem={({ item }: any) => {
                return (
                  <TouchableOpacity
                    style={{
                      borderRadius: 8,
                      borderColor: item.id === selectedId ? PURPLE : '#F4F4F4',
                      borderWidth: 1,
                      backgroundColor: item.id === selectedId ? PURPLE : '#F4F4F4',
                      paddingHorizontal: 55,
                      paddingVertical: 15,
                      marginVertical: 5
                    }}
                    onPress={() => handlePress(item.id)}
                  >
                    <Subtitle18M style={{ color: item.id === selectedId ? 'white' : BLACK, textAlign: 'center' }}>
                      {item.text}
                    </Subtitle18M>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={item => item.id.toString()}
            />

            {selectedId === 6 && (
            <View style={{ width: '100%', marginTop: 20 }}>
                 <Body14R style={{ marginBottom: 10, textAlign: 'left' }}>추가적인 의견이나 거절 사유가 있다면 작성해주세요.</Body14R>
                 <InputBox
                   placeholder='입력해 주세요'
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

      <View style={{ position: 'absolute', width: '100%', bottom: 0, borderTopWidth: 8, borderColor: 'white', zIndex: 1, backgroundColor: 'white', paddingHorizontal: 20 }}>
        <View style={{ paddingHorizontal: 30, paddingVertical: 20 }}>
          <BottomButton value='거절 사유 보내기' pressed={false}
             onPress={() => navigation.navigate('SentRejection')}
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

export default Rejection;
