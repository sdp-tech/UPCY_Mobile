import {
  SafeAreaView,
  View,
  Dimensions,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import { Body14M, Caption11M, Subtitle16B } from '../../../styles/GlobalText';
import { ReformProps } from './Reformer';
import BottomButton from '../../../common/BottomButton';
import RightArrow from '../../../assets/common/RightArrow.svg';
import PlusIcon from '../../../assets/common/Plus.svg';
import PencilIcon from '../../../assets/common/Pencil.svg';
import CloseIcon from '../../../assets/header/Close.svg';
import { useEffect, useState } from 'react';
import { BLACK, BLACK2, GRAY } from '../../../styles/GlobalColor';
import SelectBox from '../../../common/SelectBox';
import CareerModal from './CareerModal';
import CustomScrollView from '../../../common/CustomScrollView';
import Request from '../../../common/requests';
import { CareerType, Careers } from '../../../types/UserTypes';
import { err } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SignInParams } from '../SignIn';

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

interface FixSectionProps {
  index: number;
  type: string | undefined;
  _1st: string | undefined;
  _2nd: string | undefined;
  edit: (index: number) => void;
  onDelete: (index: number) => void;
  _3rd?: string | undefined;
}

const FixSection: React.FC<FixSectionProps> = ({ index, type, _1st, _2nd, edit, onDelete, _3rd }) => {
  return (
    <View style={{ flex: 1, flexDirection: "row", height: 44, justifyContent: "space-between", alignItems: "center" }}>
      <View style={{ flex: 4, flexDirection: "row" }}>
        <View style={{ borderRadius: 4, backgroundColor: "#eaeaea", justifyContent: "center", alignItems: "center", paddingVertical: 3, paddingHorizontal: 6 }}>
          <Text>{type}</Text>
        </View>
        <View style={{ gap: 4, flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 3, paddingHorizontal: 6 }}>
          <Text>{_1st}</Text>
          <Text>{_2nd}</Text>
          {_3rd && <Text>{_3rd}</Text>}
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 3, paddingHorizontal: 6, gap: 15 }}>
        <TouchableOpacity onPress={() => edit(index)}>
          <PencilIcon fill="#000000" strokeWidth={1} width={32} height={32} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(index)} >
          <CloseIcon color="#000000" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default function ReformCareer({ form, setForm }: ReformProps) {
  const { width } = Dimensions.get('screen');
  const [careerModal, setCareerModal] = useState(false);
  const [careerIndex, setCareerIndex] = useState(-1);
  const navigation = useNavigation<StackNavigationProp<SignInParams>>();
  const request = Request();

  const handleAddCareer = () => {
    const newIndex = form.career.length;
    setForm(prev => {
      return {
        ...prev,
        career: [...prev.career, { name: '', file: [], type: undefined }],
      };
    });
    setCareerIndex(newIndex);
  };

  const handleEditCareer = (index: number) => {
    setCareerIndex(index);
  };

  const handleDeleteCareer = (delIndex: number) => {
    const newCareer = form.career.filter((_, i) => i !== delIndex);
    setForm(prev => {
      return { ...prev, career: newCareer };
    });
  };

  const handlePressCareer = (index: number) => {
    Alert.alert('경력을 수정하시겠습니까?', undefined, [
      { text: '수정하기', onPress: () => handleEditCareer(index) },
      { text: '삭제하기', onPress: () => handleDeleteCareer(index) },
    ]);
  };

  useEffect(() => {
    if (careerIndex >= 0) setCareerModal(true);
  }, [careerIndex]);

  const handleCareerRegister = async (career: object) => { // (param, path)
    const response = await request.post('/api/user/reformer', { career }, {});
    // http://52.78.43.6:8000/users/education_register/ 이런 식
    if (response?.status !== 200) {
      console.log(response);
      throw Error('career register failed');
    }
  };

  const handleSubmit = async () => {
    let param = {};
    form.career.map(value => {
      if (value.type === '학력') {
        param = {
          education: [{
            school: value.name,
            major: value.major,
            academic_status: value.status,
          }]
        };
      } else if (value.type === '실무 경험') {
        param = {
          career: [{
            company_name: value.name,
            department: value.team, // 근무 부서 및 직책 
            period: value.period // 근무 기간 
          }]
        };
      } else if (value.type === '공모전') {
        param = {
          awards: [{
            name: value.name,
            prize: value.content, // 수상 내역 
          }]
        };
      } else if (value.type === '자격증') {
        param = {
          certicication: [{
            name: value.name,
            issuing_authority: value.host,
          }]
        };
      } else if (value.type === '기타 (개인 포트폴리오, 외주 등)') {
        param = {
          freelancer: [{
            project_name: value.name,
            explain: value.content, // 상세 설명
          }]
        };
      }
      try {
        handleCareerRegister(param);
      } catch (error) {
        console.log(error);
      }
    });
    const profileForm = { // 수정 필요?
      nickname: form.nickname,
      market_name: form.market,
      market_intro: form.introduce,
      links: form.link,
      area: form.region,
    };
    const response = await request.post('users/profile_register/', profileForm);
    if (response?.status === 200) {
      navigation.navigate('ReformSubmit');
    } else {
      console.log(response);
      Alert.alert('프로필 등록에 실패했습니다.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.formView}>
        <Subtitle16B>보유한 학력 / 경력을 작성해 주세요</Subtitle16B>
        {form.career.length < 3 && ( // 개수 3개 미만일 때만 추가버튼 노출 
          <AddTouchable onPress={handleAddCareer}>
            <PlusIcon color={GRAY} />
          </AddTouchable>
        )}
        <View style={styles.bottomView}>
          <Caption11M style={{ color: 'white' }}>
            최대 추가 개수 {form.career.length}/3개
          </Caption11M>
        </View>
        {form.career.map((item, index) => (
          <View key={index}>
            {/* <SelectTouchable
              onPress={() => {
                handlePressCareer(index);
              }}>
              {item.name === '' && item.type === undefined &&  // 학력이나 경력 추가되지 않은 상태 
                <Body14M style={{ color: BLACK2 }}>선택해 주세요</Body14M>
              }
              {item.type === '학력' &&
                <Body14M>
                  {item.type} / {item.name}
                </Body14M>}

              <RightArrow color={BLACK2} />
            </SelectTouchable> */}
            {item.type === '학력' &&
              <FixSection index={index} type={item.type} _1st={item.name} _2nd={item.major} edit={() => handleEditCareer(index)} onDelete={() => handleDeleteCareer(index)} _3rd={item.status}></FixSection>
            }
            {item.type === '자격증' &&
              <FixSection index={index} type={item.type} _1st={item.name} _2nd={item.host} edit={() => handleEditCareer(index)} onDelete={() => handleDeleteCareer(index)}></FixSection>
            }
            {item.type === '공모전' &&
              <FixSection index={index} type={item.type} _1st={item.name} _2nd={item.content} edit={() => handleEditCareer(index)} onDelete={() => handleDeleteCareer(index)} ></FixSection>
            }
            {item.type === '실무 경험' &&
              <FixSection index={index} type={item.type} _1st={item.name} _2nd={item.team} edit={() => handleEditCareer(index)} onDelete={() => handleDeleteCareer(index)} _3rd={item.period}></FixSection>
            }
            {item.type?.includes('기타') &&
              <FixSection index={index} type={item.type} _1st={item.name} _2nd={item.content} edit={() => handleEditCareer(index)} onDelete={() => handleDeleteCareer(index)} ></FixSection>
            }
          </View>
        ))}

      </View>

      <View style={{ marginHorizontal: width * 0.04 }}>
        <BottomButton
          value="다음"
          pressed={false}
          onPress={handleSubmit}
          style={{ width: '75%', alignSelf: 'center', marginBottom: 10 }}
        />
      </View>
      {careerIndex >= 0 && (
        <CareerModal
          open={careerModal}
          setOpen={setCareerModal}
          form={form}
          setForm={setForm}
          index={careerIndex}
          setIndex={setCareerIndex}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  formView: {
    marginTop: 10,
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
