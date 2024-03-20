import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { View, Text, StyleSheet, Button, Dimensions } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import { Body16M, Title20B } from '../../../styles/GlobalText';
import Select from '../../../assets/common/Select.svg';
import Unselect from '../../../assets/common/Unselect.svg';
import { PURPLE } from '../../../styles/GlobalColor';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BottomButton from '../../../common/BottomButton';
import { ModalProps } from './Reformer';
import InputView from '../../../common/InputView';

export default function EducationModal({
  open,
  setOpen,
  form,
  setForm,
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
  const snapPoints = useMemo(() => ['85%'], []);
  const { width } = Dimensions.get('screen');

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

  useEffect(() => {
    if (open) handlePresentModalPress();
  }, [open]);

  const [section, setSection] = useState<'init' | 'status'>('init');

  // renders
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      onChange={handleSheetChanges}>
      {section === 'init' ? (
        <View
          style={{
            marginHorizontal: width * 0.04,
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}>
          <View style={styles.selectItem}>
            <Title20B>학력 전공을 작성해 주세요</Title20B>
          </View>
          <InputView
            title="학교명"
            value={form.education.school}
            setValue={v =>
              setForm(prev => {
                return {
                  ...prev,
                  education: { ...prev.education, school: v },
                };
              })
            }
          />
          <InputView
            title="전공"
            value={form.education.major}
            setValue={v =>
              setForm(prev => {
                return {
                  ...prev,
                  education: { ...prev.education, major: v },
                };
              })
            }
          />
          <View style={{ marginTop: 'auto' }}>
            <BottomButton
              value="적용"
              pressed={false}
              onPress={handlePresentModalClose}
              style={{
                width: '75%',
                alignSelf: 'center',
                marginTop: 10,
                marginBottom: 30,
              }}
            />
          </View>
        </View>
      ) : (
        <>
          <View style={styles.selectItem}>
            <Title20B>학력의 상태를 선택해 주세요</Title20B>
          </View>
          <View style={{ marginHorizontal: width * 0.04, marginTop: 'auto' }}>
            <BottomButton
              value="적용"
              pressed={false}
              onPress={handlePresentModalClose}
              style={{
                width: '75%',
                alignSelf: 'center',
                marginTop: 10,
                marginBottom: 30,
              }}
            />
          </View>
        </>
      )}
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
  selectList: {},
  selectItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
  },
});
