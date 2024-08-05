import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { Body16M, Subtitle16B, Filter11B, Filter14B } from '../../../styles/GlobalText';
import Select from '../../../assets/common/Select.svg';
import Unselect from '../../../assets/common/Unselect.svg';
import Dot from '../../../assets/common/Dot.svg';
import { PURPLE } from '../../../styles/GlobalColor';

const screenWidth = Dimensions.get('window').width;

const StyleBox = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  gap: 12px;
  padding: 0 ${(screenWidth - 324) / 2}px;
  flex-wrap: wrap;
`;

const StyleButton = styled.TouchableOpacity<{ pressed: boolean }>`
  display: flex;
  padding: 6px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  border: 1px solid #612FEF;
  background-color: ${(props) => (props.pressed ? '#612FEF' : '#FFFFFF')};
`;

const StyleButtonText = styled.Text<{ pressed: boolean }>`
  color: ${(props) => (props.pressed ? '#FFFFFF' : '#222222')};
`;

interface ModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  value?: string;
  setValue: (text: string) => void;
  selectedStyles: string[];
  setSelectedStyles: Dispatch<SetStateAction<string[]>>;
}

export default function DetailModal({
  open,
  setOpen,
  value,
  setValue,
  selectedStyles,
  setSelectedStyles
}: ModalProps) {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [selectedOption, setSelectedOption] = useState<string>('추천순');
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

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

  const styleOptions = [
    '빈티지',
    '미니멀',
    '캐주얼',
    '페미닌',
    '글램',
    '스트릿',
    '키치',
    '스포티',
    '걸리시',
    '홈웨어',
    '+',
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

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const selectOption = (option: string) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  const toggleStyleSelection = (style: string) => {
    setSelectedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  useEffect(() => {
    if (open) handlePresentModalPress();
  }, [open]);

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
        <View style={styles.rightSection}>
          <Dot />
          <Filter11B>중복가능</Filter11B>
        </View>
      </View>
      <StyleBox>
        {styleOptions.map((style) => (
          <StyleButton
            key={style}
            pressed={selectedStyles.includes(style)}
            onPress={() => toggleStyleSelection(style)}
          >
            <StyleButtonText pressed={selectedStyles.includes(style)}>
              {style}
            </StyleButtonText>
          </StyleButton>
        ))}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  styleButton: {
    backgroundColor: PURPLE,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  styleText: {
    color: '#fff',
    fontSize: 16,
  },
  dropdownContainer: {
    position: 'relative',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownButtonText: {
    fontSize: 16,
    marginRight: 5,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 30,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    zIndex: 1000,
  },
  dropdownOption: {
    padding: 10,
  },
  dropdownOptionText: {
    fontSize: 16,
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
    zIndex: 1001,
    flex: 1,
    justifyContent: 'flex-end', 
    margin: 0, 
  },
});
