import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import { Body16B, Caption11M, Title20B } from '../../../styles/GlobalText';
import Select from '../../../assets/common/Select.svg';
import Unselect from '../../../assets/common/Unselect.svg';
import { BLACK2, PURPLE, PURPLE3 } from '../../../styles/GlobalColor';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BottomButton from '../../../common/BottomButton';
import { ModalProps } from './Reformer';
import InputView from '../../../common/InputView';
import SelectBox from '../../../common/SelectBox';
import FileBox from '../../../common/FileBox';

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

  const renderItem = useCallback(
    ({ item }: { item: string }) => (
      <View style={{ borderBottomColor: '#d9d9d9', borderBottomWidth: 0.5 }}>
        <TouchableOpacity
          style={styles.selectItem}
          onPress={() =>
            setForm(prev => {
              return {
                ...prev,
                education: { ...prev.education, status: item },
              };
            })
          }>
          <Body16B>{item}</Body16B>
          {item === form.education.status ? <Select /> : <Unselect />}
        </TouchableOpacity>
      </View>
    ),
    [form],
  );

  useEffect(() => {
    if (open) handlePresentModalPress();
  }, [open]);

  const [section, setSection] = useState<'init' | 'status'>('init');
  const statusList = ['재학', '휴학', '졸업', '수료'];

  // renders
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      onChange={handleSheetChanges}>
      {section === 'init' ? (
        <ScrollView
          alwaysBounceVertical={false}
          contentContainerStyle={{ flexGrow: 1, minHeight: 700 }}>
          <View
            style={{
              marginHorizontal: width * 0.04,
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
            }}>
            <View style={{ ...styles.selectItem, paddingHorizontal: 0 }}>
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
            <View style={{ marginVertical: 10 }}>
              <Body16B>상태</Body16B>
              <SelectBox
                value={form.education.status}
                onPress={() => setSection('status')}
              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Body16B>증빙자료첨부</Body16B>
                <Caption11M style={{ color: BLACK2 }}>선택사항</Caption11M>
              </View>
              <FileBox data={form.education.file} max={1} />
            </View>
            <View style={styles.info}>
              <Caption11M style={{ color: PURPLE }}>
                증빙자료를 첨부하시면 담당자 검토 후, 확인 마크를 달아드립니다.
              </Caption11M>
              <Caption11M style={{ color: PURPLE }}>
                첨부 가능 자료 : 재학증명서, 졸업증명서, 성적증명서
              </Caption11M>
              <Caption11M style={{ color: PURPLE, marginTop: 8 }}>
                ~이하 ~파일만 등록 가능합니다.
              </Caption11M>
              <Caption11M style={{ color: PURPLE }}>
                제출한 자료는 의뢰인에게 노출되지 않습니다.
              </Caption11M>
            </View>
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
        </ScrollView>
      ) : (
        <>
          <View style={styles.selectItem}>
            <Title20B>학력의 상태를 선택해 주세요</Title20B>
          </View>
          <BottomSheetFlatList data={statusList} renderItem={renderItem} />
          <View style={{ marginHorizontal: width * 0.04, marginTop: 'auto' }}>
            <BottomButton
              value="적용"
              pressed={false}
              onPress={() => setSection('init')}
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
  info: {
    borderColor: PURPLE,
    backgroundColor: PURPLE3,
    borderWidth: 1,
    borderRadius: 5,
    padding: 18,
    marginTop: 10,
  },
  selectItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 15,
  },
});
