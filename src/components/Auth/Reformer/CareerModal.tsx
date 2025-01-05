import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Alert } from 'react-native';
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
import Dropdown from '../../../common/Dropdown';
import PeriodPicker from '../../../common/PeriodPicker';
import FileBox from '../../../common/FileBox';
import CustomScrollView from '../../../common/CustomScrollView';
import DatePickerBox from '../../../common/DatePickerBox';
import { getAccessToken } from '../../../common/storage';

interface CareerModalProps extends ModalProps {
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
}

export default function CareerModal({
  open,
  setOpen,
  form,
  setForm,
  index,
  setIndex,
}: CareerModalProps) {
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
    const currentField = form.field[index];
    // 필수 항목이 모두 채워졌는지 확인
    const isFormComplete =
      currentField.name && // 이름이 입력되었는지 확인
      (currentField.type === '학력' ? currentField.major && currentField.status : true) && // 학력일 경우 전공과 상태 확인
      (currentField.type === '실무 경험' ? currentField.team && currentField.period : true) && // 실무 경험일 경우 부서와 기간 확인
      (currentField.type === '공모전' ? currentField.content : true) && // 공모전일 경우 내용 확인
      (currentField.type === '자격증' ? currentField.host : true) && // 자격증일 경우 발급 기관 확인
      (currentField.type?.includes('기타') ? currentField.content : true); // 기타일 경우 설명 확인

    if (isFormComplete) {
      // 모든 필드가 채워졌으면 모달을 닫음
      bottomSheetModalRef.current?.close();
    } else {
      // 필드가 비어 있을 경우 경고 메시지를 표시
      Alert.alert('모든 항목을 입력해 주세요.');
    }
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index < 0) {
      setOpen(false);
      setIndex(-1);
    }
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: string }) => (
      <View style={{ borderBottomColor: '#d9d9d9', borderBottomWidth: 0.5 }}>
        <TouchableOpacity
          style={styles.selectItem}
          onPress={() => handleTypeChange(item)}>
          <Body16B>{item}</Body16B>
          {item === form.field[index].type ? <Select /> : <Unselect />}
        </TouchableOpacity>
      </View>
    ),
    [form],
  );

  const handleContentChange = (v: any, t: string) => {
    const prevCareer = form.field;
    prevCareer[index] = { ...prevCareer[index], [t]: v };
    //console.log(prevCareer[index]);
    setForm(prev => {
      return { ...prev, field: prevCareer };
    });
  };

  const handleTypeChange = (type: string) => {
    const prevCareer = form.field;
    prevCareer[index] = { type: type, name: '', file: [] };
    setForm(prev => {
      return { ...prev, field: prevCareer };
    });
  };

  // const WorkPeriod = useCallback(() => {
  //   return (
  //     <View style={{ marginVertical: 10 }}>
  //       <Body16B>근무기간</Body16B>
  //       <PeriodPicker
  //         start={form.field[index].start}
  //         end={form.field[index].end}
  //         setStart={d => {
  //           handleContentChange(d, 'start');
  //         }}
  //         setEnd={d => {
  //           handleContentChange(d, 'end');
  //         }}
  //       />
  //     </View>
  //   );
  // }, [form.field[index].start, form.field[index].end]);

  const EduDetailSection = () => {
    return (
      <View key="education" style={{ marginVertical: 10 }}>
        <InputView
          title="학교명"
          value={form.field[index].name}
          setValue={v => {
            handleContentChange(v, 'name');
          }}
        />
        <InputView
          title="전공"
          value={form.field[index].major}
          setValue={v => {
            handleContentChange(v, 'major');
          }}
        />
        <InputView
          title="상태"
          value={form.field[index].status}
          setValue={v => {
            handleContentChange(v, 'status');
          }}
          placeholder="예시) 재학, 휴학, 졸업, 수료"
        />
      </View>
    );
  };

  const InterDetailSection = () => {
    return (
      <View key="intership" style={{ marginVertical: 10 }}>
        <InputView
          title="회사명"
          value={form.field[index].name}
          setValue={v => {
            handleContentChange(v, 'name');
          }}
        />
        <InputView
          title="근무부서 및 직책"
          value={form.field[index].team}
          setValue={v => {
            handleContentChange(v, 'team');
          }}
          placeholder="예시) 소품디자인팀 인턴"
        />
        <InputView
          title="근무기간"
          value={form.field[index].period}
          setValue={v => {
            handleContentChange(v, 'period');
          }}
          placeholder="예시) 6개월, 3년"
        />
      </View>
    );
  };

  const CertDetailSection = () => {
    return (
      <View key="certificate" style={{ marginVertical: 10 }}>
        <InputView
          title="자격증명"
          value={form.field[index].name}
          setValue={v => {
            handleContentChange(v, 'name');
          }}
        />
        <InputView
          title="발급기관"
          value={form.field[index].host}
          setValue={v => {
            handleContentChange(v, 'host');
          }}
        />
      </View>
    );
  };

  const ContDetailSection = () => {
    return (
      <View key="contest" style={{ marginVertical: 10 }}>
        <InputView
          title="공모전명"
          value={form.field[index].name}
          setValue={v => {
            handleContentChange(v, 'name');
          }}
        />
        <InputView
          title="수상 내역"
          value={form.field[index].content}
          setValue={v => {
            handleContentChange(v, 'content');
          }}
          placeholder="예시) 최우수상"
        />
      </View>
    );
  };

  const OutDetailSection = () => {
    return (
      <View key="outsourcing" style={{ marginVertical: 10 }}>
        <InputView
          title="프로젝트명"
          value={form.field[index].name}
          setValue={v => {
            handleContentChange(v, 'name');
          }}
        />
        <InputView
          title="상세 설명"
          value={form.field[index].content}
          setValue={v => {
            handleContentChange(v, 'content');
          }}
          long={true}
        />
      </View>
    );
  };

  useEffect(() => {
    if (open) handlePresentModalPress();
  }, [open]);

  const [section, setSection] = useState<'init' | 'form'>(
    form.field[index].type === undefined ? 'init' : 'form',
  );
  const [dropdown, setDropdown] = useState(false);
  const statusList = [
    '학력',
    '실무 경험',
    '공모전',
    '자격증',
    '기타 (개인 포트폴리오, 외주 등)',
  ];

  const sectionList = [
    <EduDetailSection key="education" />,
    <InterDetailSection key="internship" />,
    <ContDetailSection key="contest" />,
    <CertDetailSection key="certificate" />,
    <OutDetailSection key="outsourcing" />,
  ];

  const detailSection = useCallback(() => {
    return statusList.map((v, idx) => {
      if (v === form.field[index].type) return sectionList[idx];
    });
  }, [form.field[index].type]);

  // renders
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      onChange={handleSheetChanges}>
      {section === 'init' ? (
        <>
          <View style={styles.selectItem}>
            <Title20B>보유한 경력을 선택해 주세요</Title20B>
          </View>
          <BottomSheetFlatList data={statusList} renderItem={renderItem} />
          <View style={{ marginHorizontal: width * 0.04, marginTop: 'auto' }}>
            <BottomButton
              value="다음"
              pressed={false}
              disable={form.field[index].type === undefined}
              onPress={() => setSection('form')}
              style={{
                width: '75%',
                alignSelf: 'center',
                marginTop: 10,
                marginBottom: 30,
              }}
            />
          </View>
        </>
      ) : (
        <CustomScrollView minHeight={700}>
          <View
            style={{
              marginHorizontal: width * 0.04,
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
            }}>
            <View style={{ ...styles.selectItem, paddingHorizontal: 0 }}>
              <Title20B>보유한 경력을 작성해 주세요</Title20B>
            </View>
            <View style={{ zIndex: 1 }}>
              <Body16B>분류</Body16B>
              <Dropdown
                title="선택하기"
                width="100%"
                value={form.field[index].type}
                items={statusList}
                setValue={handleTypeChange}
              />
              {/* <SelectBox
                value={form.field[index].type}
                onPress={() => {
                  setDropdown(prev => {
                    return !prev;
                  });
                }}
                opened={dropdown}
              />
              {dropdown && (
                <Dropdown
                  items={statusList}
                  value={form.field[index].type}
                  open={dropdown}
                  setOpen={setDropdown}
                  setValue={handleTypeChange}
                  style={{
                    width: '100%',
                    height: 100,
                    top: 80,
                  }}
                />
              )} */}
            </View>
            {detailSection()}
            <View style={{ marginVertical: 10 }}>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Body16B>증빙자료첨부</Body16B>
                <Caption11M style={{ color: BLACK2 }}>
                  선택사항 (pdf, 최대 20MB)
                </Caption11M>
              </View>
              <FileBox
                data={form.field[index]?.file || []} // `undefined`이면 빈 배열로 전달
                setData={r => {
                  handleContentChange(r, 'file');
                }}
                max={1}
              />
            </View>
            {/* 파일 업로드 로직은 백엔드 구현되고 나면 다시 적용 */}
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
        </CustomScrollView>
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
