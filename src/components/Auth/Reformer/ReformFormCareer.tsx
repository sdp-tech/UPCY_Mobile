import {
  SafeAreaView,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import styled from 'styled-components/native';
import {
  Body14M,
  Caption11M,
  Subtitle16B,
  Title20B,
} from '../../../styles/GlobalText';
import { ReformProps } from './Reformer';
import BottomButton from '../../../common/BottomButton';
import RightArrow from '../../../assets/common/RightArrow.svg';
import PlusIcon from '../../../assets/common/Plus.svg';
import { Dispatch, SetStateAction, useState } from 'react';
import FilterBox from '../../../common/FilterBox';
import { BLACK, BLACK2, GRAY } from '../../../styles/GlobalColor';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import EducationModal from './EducationModal';

const SelectView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 44px;
  width: 100%;
  border-width: 2px;
  border-color: #929292;
  border-radius: 5px;
  margin-top: 8px;
`;

const SelectTouchable = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 44px;
  padding-left: 16px;
  padding-right: 16px;
`;

const AddTouchable = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 44px;
  width: 100%;
  border-width: 2px;
  border-color: #bdbdbd;
  border-radius: 5px;
  border-style: dashed;
  margin-top: 8px;
`;

export default function ReformCareer({ setPage, form, setForm }: ReformProps) {
  const { width } = Dimensions.get('screen');
  const [educationModal, setEducationModal] = useState(false);

  const handleAddCareer = () => {};

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        alwaysBounceVertical={false}
        contentContainerStyle={{
          minHeight: 500,
          flexGrow: 1,
        }}>
        <View style={{ flexGrow: 1 }}>
          <View style={{ marginHorizontal: width * 0.04 }}>
            <View style={styles.formView}>
              <Subtitle16B>학력 전공을 작성해 주세요</Subtitle16B>
              <SelectView>
                <SelectTouchable
                  onPress={() => {
                    setEducationModal(true);
                  }}>
                  {form.education.school === '' ? (
                    <Body14M style={{ color: BLACK2 }}>추가해 주세요</Body14M>
                  ) : (
                    <Body14M>{form.education.school}</Body14M>
                  )}

                  <PlusIcon color={BLACK2} />
                </SelectTouchable>
              </SelectView>
            </View>
            <View style={styles.formView}>
              <Subtitle16B>보유한 경력을 작성해 주세요</Subtitle16B>
              {form.career.map((item, index) => (
                <SelectView key={index}>
                  <SelectTouchable onPress={() => {}}>
                    {item.name === '' ? (
                      <Body14M style={{ color: BLACK2 }}>선택해 주세요</Body14M>
                    ) : (
                      <Body14M>{form.education.school}</Body14M>
                    )}

                    <RightArrow stroke={BLACK2} />
                  </SelectTouchable>
                </SelectView>
              ))}
              {form.career.length < 3 && (
                <AddTouchable onPress={() => {}}>
                  <PlusIcon color={GRAY} />
                </AddTouchable>
              )}
            </View>
          </View>
          <View style={styles.bottomView}>
            <Caption11M style={{ color: 'white' }}>
              최대 추가 개수 {form.career.length}/3개
            </Caption11M>
          </View>
          <View style={{ marginHorizontal: width * 0.04 }}>
            <BottomButton
              value="다음"
              pressed={false}
              onPress={() => {
                setPage('career');
              }}
              style={{ width: '75%', alignSelf: 'center', marginBottom: 10 }}
            />
          </View>
        </View>
      </ScrollView>
      <EducationModal
        open={educationModal}
        setOpen={setEducationModal}
        form={form}
        setForm={setForm}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  formView: {
    marginTop: 30,
  },
  bottomView: {
    marginTop: 'auto',
    marginBottom: 10,
    width: '100%',
    height: 32,
    backgroundColor: BLACK,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
