import React, {
  Dispatch,
  SetStateAction,
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
import Dropdown from '../../../common/Dropdown';
import PeriodPicker from '../../../common/PeriodPicker';
import FileBox from '../../../common/FileBox';
import CustomScrollView from '../../../common/CustomScrollView';
import DatePickerBox from '../../../common/DatePickerBox';

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
    bottomSheetModalRef.current?.close();
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
          {item === form.career[index].type ? <Select /> : <Unselect />}
        </TouchableOpacity>
      </View>
    ),
    [form],
  );

  const handleContentChange = (v: any, t: string) => {
    const prevCareer = form.career;
    prevCareer[index] = { ...prevCareer[index], [t]: v };
    console.log(prevCareer[index]);
    setForm(prev => {
      return { ...prev, career: prevCareer };
    });
  };

  const handleTypeChange = (type: string) => {
    const prevCareer = form.career;
    prevCareer[index] = { type: type, name: '', file: [] };
    setForm(prev => {
      return { ...prev, career: prevCareer };
    });
  };

  const WorkPeriod = useCallback(() => {
    return (
      <View style={{ marginVertical: 10 }}>
        <Body16B>근무기간</Body16B>
        <PeriodPicker
          start={form.career[index].start}
          end={form.career[index].end}
          setStart={d => {
            handleContentChange(d, 'start');
          }}
          setEnd={d => {
            handleContentChange(d, 'end');
          }}
        />
      </View>
    );
  }, [form.career[index].start, form.career[index].end]);

  const FreeDetailSection = () => {
    return <View key="freelancer" style={{ marginVertical: 10 }}></View>;
  };

  const InterDetailSection = () => {
    return (
      <View key="intership" style={{ marginVertical: 10 }}>
        <InputView
          title="회사명"
          value={form.career[index].name}
          setValue={v => {
            handleContentChange(v, 'name');
          }}
        />
        <InputView
          title="근무부서"
          value={form.career[index].team}
          setValue={v => {
            handleContentChange(v, 'team');
          }}
        />
        <InputView
          title="직위"
          value={form.career[index].position}
          setValue={v => {
            handleContentChange(v, 'position');
          }}
        />
        <WorkPeriod />
      </View>
    );
  };

  const CertDetailSection = () => {
    return (
      <View key="certificate" style={{ marginVertical: 10 }}>
        <InputView
          title="자격증명"
          value={form.career[index].name}
          setValue={v => {
            handleContentChange(v, 'name');
          }}
        />
        <InputView
          title="발급기관"
          value={form.career[index].host}
          setValue={v => {
            handleContentChange(v, 'host');
          }}
        />
        <View style={{ marginVertical: 10 }}>
          <Body16B>발급일</Body16B>
          <DatePickerBox
            title="발급일"
            date={form.career[index].date}
            setDate={v => {
              handleContentChange(v, 'date');
            }}
          />
        </View>
      </View>
    );
  };

  const ContDetailSection = () => {
    return (
      <View key="contest" style={{ marginVertical: 10 }}>
        <InputView
          title="공모전명"
          value={form.career[index].name}
          setValue={v => {
            handleContentChange(v, 'name');
          }}
        />
        <InputView
          title="주최"
          value={form.career[index].host}
          setValue={v => {
            handleContentChange(v, 'host');
          }}
        />
        <View style={{ marginVertical: 10 }}>
          <Body16B>수상일</Body16B>
          <DatePickerBox
            title="수상일"
            date={form.career[index].date}
            setDate={v => {
              handleContentChange(v, 'date');
            }}
          />
        </View>
      </View>
    );
  };

  const OutDetailSection = () => {
    return (
      <View key="outsourcing" style={{ marginVertical: 10 }}>
        <InputView
          title="프로젝트명"
          value={form.career[index].name}
          setValue={v => {
            handleContentChange(v, 'name');
          }}
        />
        <InputView
          title="클라이언트"
          value={form.career[index].client}
          setValue={v => {
            handleContentChange(v, 'client');
          }}
        />
        <InputView
          title="주요업무"
          value={form.career[index].content}
          setValue={v => {
            handleContentChange(v, 'content');
          }}
        />
        <WorkPeriod />
      </View>
    );
  };

  useEffect(() => {
    if (open) handlePresentModalPress();
  }, [open]);

  const [section, setSection] = useState<'init' | 'form'>(
    form.career[index].type === undefined ? 'init' : 'form',
  );
  const [dropdown, setDropdown] = useState(false);
  const statusList = [
    '프리랜서',
    '실무 / 인턴',
    '공모전',
    '자격증',
    '기타 (외주)',
  ];

  const sectionList = [
    <FreeDetailSection key="freelancer" />,
    <InterDetailSection key="internship" />,
    <ContDetailSection key="contest" />,
    <CertDetailSection key="certificate" />,
    <OutDetailSection key="outsourcing" />,
  ];

  const detailSection = useCallback(() => {
    return statusList.map((v, idx) => {
      if (v === form.career[index].type) return sectionList[idx];
    });
  }, [form.career[index].type]);

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
              disable={form.career[index].type === undefined}
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
                value={form.career[index].type}
                items={statusList}
                setValue={handleTypeChange}
              />
              {/* <SelectBox
                value={form.career[index].type}
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
                  value={form.career[index].type}
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
                <Caption11M style={{ color: BLACK2 }}>선택사항</Caption11M>
              </View>
              <FileBox
                data={form.career[index].file}
                setData={r => {
                  handleContentChange(r, 'file');
                }}
                max={1}
              />
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
