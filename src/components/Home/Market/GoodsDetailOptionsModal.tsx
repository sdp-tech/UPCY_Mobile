import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { View, Text, StyleSheet, Button, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { Body16M, Subtitle16B, Filter11B, Filter14B} from '../../../styles/GlobalText';
import Select from '../../../assets/common/Select.svg';
import Unselect from '../../../assets/common/Unselect.svg';
import Dot from '../../../assets/common/Dot.svg';
import { PURPLE } from '../../../styles/GlobalColor';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BottomButton from '../../../common/BottomButton';

const screenWidth = Dimensions.get('window').width;

const StyleBox = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  gap: 12px;
  padding: 0 {(screenWidth-324)/2}px;
  flex-wrap: wrap;
`
//padding 계산 후 왼쪽 정렬
const StyleButton = styled.TouchableOpacity<{pressed:boolean}>`
  display: flex;
  padding: 6px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  border: 1px solid #612FEF;
`

interface ModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  value?: string;
  setValue: (text: string) => void;
}

export default function DetailModal({
  open,
  setOpen,
  value,
  setValue,
}: ModalProps) {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        disappearsOnIndex={-1}
        opacity={1}
      />
    ),
    [],
  );

  // variables
  const snapPoints = useMemo(() => ['35%'], []);
  const { width } = Dimensions.get('screen');

  const regionList = [
    '서울 전체',
    '강남구',
    '강동구',
    '강북구',
    '강서구',
    '관악구',
    '광진구',
    '구로구',
    '금천구',
    '노원구',
  ];

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handlePresentModalClose = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index < 0) setOpen(false);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: string }) => (
      <View style={{ borderBottomColor: '#d9d9d9', borderBottomWidth: 0.5 }}>
        <TouchableOpacity
          style={styles.selectItem}
          onPress={() => setValue(item)}>
          <Body16M>{item}</Body16M>
          {item === value ? <Select /> : <Unselect />}
        </TouchableOpacity>
      </View>
    ),
    [value],
  );

  useEffect(() => {
    if (open) handlePresentModalPress();
  }, [open]);

  // renders
  return (
    <BottomSheetModal 
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      onChange={handleSheetChanges}
      containerStyle={styles.modalContainer}
      >
      
      <View style={styles.selectItem}>
        <Subtitle16B>스타일</Subtitle16B>
        <View style = {styles.rightSection}>
        <Dot/>
        <Filter11B>중복가능</Filter11B>
        </View>
      </View>
      <StyleBox>
        <StyleButton>
          <Filter14B>빈티지</Filter14B>
        </StyleButton>
        <StyleButton>
          <Filter14B>미니멀</Filter14B>
        </StyleButton>
        <StyleButton>
          <Filter14B>캐주얼</Filter14B>
        </StyleButton>
        <StyleButton>
          <Filter14B>페미닌</Filter14B>
        </StyleButton>
        <StyleButton>
          <Filter14B>글램</Filter14B>
        </StyleButton>
        <StyleButton>
          <Filter14B>스트릿</Filter14B>
        </StyleButton>
        <StyleButton>
          <Filter14B>키치</Filter14B>
        </StyleButton>
        <StyleButton>
          <Filter14B>스포티</Filter14B>
        </StyleButton>
        <StyleButton>
          <Filter14B>걸리시</Filter14B>
        </StyleButton>
        <StyleButton>
          <Filter14B>홈웨어</Filter14B>
        </StyleButton>
        <StyleButton>
          <Filter14B>+</Filter14B>
        </StyleButton>
      </StyleBox>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'black',
    
  },
  selectItem: {
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 15,
    
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end', // 맨 아래로 정렬
    margin: 0, // 기본 마진 제거
  },
});


