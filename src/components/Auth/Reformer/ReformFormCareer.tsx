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
import { ReformProfileType, ReformProps } from './Reformer';
import BottomButton from '../../../common/BottomButton';
import RightArrow from '../../../assets/common/RightArrow.svg';
import PlusIcon from '../../../assets/common/Plus.svg';
import PencilIcon from '../../../assets/common/Pencil.svg';
import CloseIcon from '../../../assets/header/Close.svg';
import { useEffect, useState } from 'react';
import { BLACK, BLACK2, GRAY, PURPLE } from '../../../styles/GlobalColor';
import SelectBox from '../../../common/SelectBox';
import CareerModal from './CareerModal';
import CustomScrollView from '../../../common/CustomScrollView';
import Request from '../../../common/requests';
import { err } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SignInParams } from '../SignIn';
import { getAccessToken, getMarketUUID, setMarketUUID } from '../../../common/storage';

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
  edit: (index: number) => void;
  onDelete: (index: number) => void;
  _2nd?: string | undefined;
  _3rd?: string | undefined;
}

const FixSection: React.FC<FixSectionProps> = ({ index, type, _1st, edit, onDelete, _2nd, _3rd }) => {
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
    const newIndex = form.field.length;
    setForm(prev => {
      return {
        ...prev,
        field: [...prev.field, { name: '', file: [], type: undefined }],
      };
    });
    setCareerIndex(newIndex);
  };

  const handleEditCareer = (index: number) => {
    setCareerIndex(index);
  };

  const handleDeleteCareer = (delIndex: number) => {
    const newCareer = form.field.filter((_, i) => i !== delIndex);
    setForm(prev => {
      return { ...prev, field: newCareer };
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

  const createMarket = async () => { // 마켓 등록 함수
    const form_ = { ...form };
    const accessToken = await getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };
    const params = {
      market_name: form_.nickname,
      market_introduce: form_.introduce,
      market_address: form_.link,
    };
    try {
      const response = await request.post(`/api/market`, params, headers);
      if (response?.status === 201) {
        console.log(response?.data);
        setMarketUUID(response?.data.market_uuid);
      } else if (response?.status === 400) {
        Alert.alert('이미 등록된 사용자입니다. 부계정 생성의 경우, 잠시 후 다시 시도해주세요.');
      } else {
        Alert.alert('프로필 등록에 실패했습니다.');
      }
    } catch (err) {
      console.error(err);
    }
  }

  const handleSubmit = async () => {
    const updatedForm = { ...form }; // form을 복사하여 사용
    if (updatedForm.nickname === '' || updatedForm.link === '' || updatedForm.region === '') {
      Alert.alert('필수 사항을 모두 입력해주세요')
    } else if (!updatedForm.link.startsWith('https')) {
      Alert.alert('오픈채팅방 링크를 제대로 입력해주세요')
    } else if (form.field.length < 1) {
      Alert.alert('경력을 최소 1개 작성해주세요')
    } else { // 필수 사항 모두 입력되었을 경우 

      form.field.forEach(value => {
        if (value.type === '학력') {
          updatedForm.education = updatedForm.education || []; // null일 경우 빈 배열로 초기화
          updatedForm.education = [
            ...updatedForm.education, // 기존 education 배열 복사
            {
              school: value.name, // 학교 이름
              major: value.major, // 전공
              academic_status: value.status, // 상태
            }
          ];
        } else if (value.type === '실무 경험') {
          updatedForm.career = updatedForm.career || [];
          updatedForm.career = [
            ...updatedForm.career,
            {
              company_name: value.name, // 회사명
              department: value.team, // 근무 부서 및 직책
              period: value.period // 근무 기간
            }
          ];
        } else if (value.type === '공모전') {
          updatedForm.awards = updatedForm.awards || [];
          updatedForm.awards = [
            ...updatedForm.awards,
            {
              competition: value.name, // 공모전 명
              prize: value.content, // 수상 내역
            }
          ];
        } else if (value.type === '자격증') {
          updatedForm.certification = updatedForm.certification || [];
          updatedForm.certification = [
            ...updatedForm.certification,
            {
              name: value.name, // 자격증 명
              issuing_authority: value.host, // 발급 기관
            }
          ];
        } else if (value.type === '기타 (개인 포트폴리오, 외주 등)') {
          updatedForm.freelancer = updatedForm.freelancer || [];
          updatedForm.freelancer = [
            ...updatedForm.freelancer,
            {
              project_name: value.name, // 프로젝트명
              description: value.content, // 상세 설명
            }
          ];
        }

      });
      const accessToken = await getAccessToken();
      const headers = {
        Authorization: `Bearer ${accessToken}`
      };
      const params = {
        reformer_link: updatedForm.link,
        reformer_area: updatedForm.region,
        education: updatedForm.education,
        career: updatedForm.career,
        awards: updatedForm.awards,
        certification: updatedForm.certification,
        freelancer: updatedForm.freelancer,
      };
      try {
        console.log(params);
        const response = await request.post(`/api/user/reformer`, params, headers);
        if (response?.status === 201) {
          console.log(response?.data);
          await createMarket();
          navigation.navigate('ReformSubmit');
        } else if (response?.status === 500) {
          console.log(response);
          Alert.alert('다시 시도해주세요.')
        } else {
          console.log(response);
          Alert.alert('프로필 등록에 실패했습니다.');
        }
      } catch (err) {
        console.log(err);
        // 이 아래는 닉네임, 소개글 
      }
      const data = {
        nickname: updatedForm.nickname,
        introduce: updatedForm.introduce,
      }
      try {
        const response = await request.put(`/api/user`, data, headers);
        if (response && response.status === 200) {
          console.log(data, '닉네임, 소개글 등록 성공');
        }
        else {
          console.log(response);
        }
      } catch (err) {
        console.error(err);
      }
      // 이 아래는 프로필 이미지 등록 
      const headers_ = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data', // multipart/form-data 설정
      };
      const formData = new FormData();
      formData.append('profile_image', {
        uri: form.picture?.uri, // 파일의 URI
        type: 'image/jpeg', // 이미지 형식 (예: 'image/jpeg')
        name: form.picture?.fileName || 'profile.jpg', // 파일 이름
      });
      try {
        const response = await request.post(`/api/user/profile-image`, formData, headers_)
        if (response && response.status === 201) {
          console.log(formData, '프로필 이미지 등록 성공')
        } else {
          console.log('이미지 업로드 실패');
          console.log(response);
        }
      }
      catch (err) {
        console.error(err)
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.formView}>
        <View style={{ flexDirection: "row" }}>
          <Subtitle16B>경력</Subtitle16B>
          <Subtitle16B style={{ color: PURPLE }}>{' *'}</Subtitle16B>
        </View>
        {form.field.length < 3 && ( // 개수 3개 미만일 때만 추가버튼 노출 
          <AddTouchable onPress={handleAddCareer}>
            <PlusIcon color={GRAY} />
          </AddTouchable>
        )}
        <View style={styles.bottomView}>
          <Caption11M style={{ color: 'white' }}>
            최대 추가 개수 {form.field.length}/3개
          </Caption11M>
        </View>
        {form.field.map((item, index) => (
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
              <FixSection index={index} type={item.type} _1st={item.host} _2nd={item.name} edit={() => handleEditCareer(index)} onDelete={() => handleDeleteCareer(index)}></FixSection>
            }
            {item.type === '공모전' &&
              <FixSection index={index} type={item.type} _1st={item.name} _2nd={item.content} edit={() => handleEditCareer(index)} onDelete={() => handleDeleteCareer(index)} ></FixSection>
            }
            {item.type === '실무 경험' &&
              <FixSection index={index} type={item.type} _1st={item.name} _2nd={item.team} edit={() => handleEditCareer(index)} onDelete={() => handleDeleteCareer(index)} _3rd={item.period}></FixSection>
            }
            {item.type?.includes('기타') &&
              <FixSection index={index} type={'기타'} _1st={item.name} edit={() => handleEditCareer(index)} onDelete={() => handleDeleteCareer(index)} ></FixSection>
            }
          </View>
        ))}

      </View>

      <View style={{ marginHorizontal: width * 0.04 }}>
        <BottomButton
          value="다음"
          pressed={false}
          onPress={handleSubmit}
          style={{ width: '90%', alignSelf: 'center', marginBottom: 10 }}
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
