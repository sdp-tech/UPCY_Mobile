import {
  SafeAreaView,
  View,
  Dimensions,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components/native';
import { Caption11M, Subtitle16B } from '../../../styles/GlobalText';
import { ReformProfileType, ReformProps } from './Reformer';
import BottomButton from '../../../common/BottomButton';
import PlusIcon from '../../../assets/common/Plus.svg';
import PencilIcon from '../../../assets/common/Pencil.svg';
import CloseIcon from '../../../assets/header/Close.svg';
import { useEffect, useRef, useState } from 'react';
import { BLACK, GRAY, PURPLE } from '../../../styles/GlobalColor';
import CareerModal from './CareerModal';
import Request from '../../../common/requests';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SignInParams } from '../SignIn';
import { getAccessToken, getMarketUUID, setMarketUUID } from '../../../common/storage';
import { PhotoType } from '../../../hooks/useImagePicker';
import { Files } from '../../../types/UserTypes';


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

export default function ReformCareer({ fix, form, setForm }: ReformProps) {
  const [loading, setLoading] = useState(false);
  const { width } = Dimensions.get('screen');
  const [careerModal, setCareerModal] = useState(false);
  const [careerIndex, setCareerIndex] = useState(-1);
  const navigation = useNavigation<StackNavigationProp<SignInParams>>();
  const request = Request();
  // `form`의 초기 상태를 저장
  const memorizedForm = useRef<ReformProfileType | null>(null);
  const [isFormInitialized, setIsFormInitialized] = useState(false);

  // `form`이 초기화되었는지 확인하는 useEffect
  useEffect(() => {
    // form이 완전히 초기화되었는지 확인
    if (!isFormInitialized && form.link && form.region && form.field) {
      memorizedForm.current = JSON.parse(JSON.stringify(form)); // 깊은 복사로 저장
      setIsFormInitialized(true); // 초기화 완료 표시
      console.log("Initial form state saved in memorizedForm:", memorizedForm.current);
    }
  }, [form.picture, isFormInitialized]);

  const handleAddCareer = () => { // 빈 필드 생성
    const newIndex = form.field.length;
    setForm(prev => {
      return {
        ...prev,
        field: [...prev.field, { name: '', file: [], type: '' }],
      };
    });
    setCareerIndex(newIndex); // 인덱스값 추가해서 모달 열기 
  };

  const handleEditCareer = (index: number) => {
    setCareerIndex(index); // 특정 인덱스값으로 변경해서 모달 열기 
  };

  const handleDeleteCareer = (delIndex: number) => {
    const newCareer = form.field.filter((_, i) => i !== delIndex);
    setForm(prev => {
      return { ...prev, field: newCareer };
    });
  };

  useEffect(() => { // 인덱스 변경될 때마다 추가용 모달 열기 
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

  const putUserData = async () => {
    const updatedForm = { ...form };
    const accessToken = await getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };
    const params = {
      nickname: updatedForm.nickname,
      introduce: updatedForm.introduce,
    }
    try { // 자기소개, 닉네임 업데이트
      const response = await request.put(`/api/user`, params, headers);
      if (response && response.status === 200) {
        try {
          const marketUUID = await getMarketUUID();
          const params_ = {
            //nickname: updatedForm.nickname,
            reformer_link: updatedForm.link,
            reformer_area: updatedForm.region,
            //introduce: updatedForm.introduce,
          } // 리포머 정보 업데이트하기:  링크, 지역
          const response2 = await request.put(`/api/market/${marketUUID}`, params_, headers)
          if (response2 && response2.status === 200) {
            console.log('마켓 정보 업데이트 성공: ', updatedForm.nickname, updatedForm.link, updatedForm.introduce);
          } else {
            console.log('마켓 정보 업데이트 실패 ');
          }
        } catch (error) {
          console.log(error);
        }
        console.log('닉네임, 소개글 업데이트 완료!');
      } else {
        console.log('닉네임, 소개글 업데이트 실패:', response)
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleEducationUpdate = async () => {
    const updatedForm = { ...form };
    const accessToken = await getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    // updatedForm에서 type이 '학력'인 요소들만 추출
    const updatedEducationFields = updatedForm.field.filter(
      (item) => item.type === '학력'
    );
    // 초기 데이터와 비교하여 변경사항 확인 (예시로 memorizedForm 사용)
    const initialEducationFields = memorizedForm.current?.field.filter(
      (item) => item.type === '학력'
    );
    const hasChanges = JSON.stringify(updatedEducationFields) !== JSON.stringify(initialEducationFields);
    const hasAdded = !initialEducationFields || initialEducationFields.length === 0; // 이전에 없었을 때 
    console.log(JSON.stringify(updatedEducationFields), '///', JSON.stringify(initialEducationFields));
    if (hasAdded && hasChanges) { // 새롭게 추가됐을 때 
      for (const edu of updatedEducationFields) {
        const response3 = await request.post(
          `/api/user/reformer/education`,
          {
            school: edu.name, // 학교 이름
            major: edu.major, // 전공
            academic_status: edu.status, // 학업 상태
          },
          headers
        );
        if (response3.status === 201) {
          console.log("학력 데이터 추가 성공:", response3.data);
        } else {
          console.log("학력 데이터 추가 실패:", response3.status, response3.data);
        }
      }
      console.log("새 학력 데이터 등록 완료");
    } else if (hasChanges && !hasAdded) { // 새롭게 추가된 건 아니지만 변경되었을 경우 
      try {
        // Step 1: 기존 학력 데이터의 UUID를 가져오기 위해 GET 요청
        const response = await request.get(`/api/user/reformer/education`, headers);
        console.log(response);
        const existingEducationUUIDs = response.data.map((edu: any) => edu.education_uuid);
        // Step 2: 학력 데이터 삭제 요청
        for (const uuid of existingEducationUUIDs) {
          const response2 = await request.del(`/api/user/reformer/education/${uuid}`, {}, headers);
          if (response2.status === 200) {
            console.log(`학력 데이터 삭제 성공 (UUID: ${uuid})`);
          } else {
            console.log(`학력 데이터 삭제 실패 (UUID: ${uuid}):`, response2.status);
          }
        }
        console.log("기존 학력 데이터 삭제 완료");
        // Step 3: 새 학력 데이터를 추가하기 위해 POST 요청
        for (const edu of updatedEducationFields) {
          const response3 = await request.post(
            `/api/user/reformer/education`,
            {
              school: edu.name, // 학교 이름
              major: edu.major, // 전공
              academic_status: edu.status, // 학업 상태
            },
            headers
          );
          if (response3.status === 201) {
            console.log("학력 데이터 추가 성공:", response3.data);
          } else {
            console.log("학력 데이터 추가 실패:", response3.status, response3.data);
          }
        }

      } catch (error) {
        console.error("Error updating education data:", error);
        Alert.alert("학력 정보 업데이트 중 오류가 발생했습니다.");
      }
    } else {
      console.log("학력 정보에 변동사항 없음");
    }
  };

  const handleCareerUpdate = async () => {
    const updatedForm = { ...form };
    const accessToken = await getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const updatedCareerFields = updatedForm.field.filter((item) => item.type === '실무 경험');
    const initialCareerFields = memorizedForm.current?.field.filter((item) => item.type === '실무 경험');
    const hasChanges = JSON.stringify(updatedCareerFields) !== JSON.stringify(initialCareerFields);
    const hasAdded = !initialCareerFields || initialCareerFields.length === 0;

    if (hasAdded && hasChanges) {
      for (const career of updatedCareerFields) {
        const response3 = await request.post(
          `/api/user/reformer/career`,
          {
            company_name: career.name,
            department: career.team,
            period: career.period,
          },
          headers
        );
        if (response3.status === 201) {
          console.log("실무 경험 데이터 추가 성공:", response3.data);
        } else {
          console.log("실무 경험 데이터 추가 실패:", response3.status, response3.data);
        }
      }
      console.log("새 실무 경험 데이터 등록 완료");
    } else if (hasChanges && !hasAdded) {
      try {
        const response = await request.get(`/api/user/reformer/career`, headers);
        const existingCareerUUIDs = response.data.map((career: any) => career.career_uuid);

        for (const uuid of existingCareerUUIDs) {
          const response2 = await request.del(`/api/user/reformer/career/${uuid}`, {}, headers);
          if (response2.status === 200) {
            console.log(`실무 경험 데이터 삭제 성공 (UUID: ${uuid})`);
          } else {
            console.log(`실무 경험 데이터 삭제 실패 (UUID: ${uuid}):`, response2.status);
          }
        }
        console.log("기존 실무 경험 데이터 삭제 완료");

        for (const career of updatedCareerFields) {
          const response3 = await request.post(
            `/api/user/reformer/career`,
            {
              company_name: career.name,
              department: career.team,
              period: career.period,
            },
            headers
          );
          if (response3.status === 201) {
            console.log("실무 경험 데이터 추가 성공:", response3.data);
          } else {
            console.log("실무 경험 데이터 추가 실패:", response3.status, response3.data);
          }
        }
        console.log("새 실무 경험 데이터 등록 완료");
      } catch (error) {
        console.error("Error updating career data:", error);
        Alert.alert("실무 경험 정보 업데이트 중 오류가 발생했습니다.");
      }
    } else {
      console.log("실무 경험 정보에 변동사항 없음");
    }
  };

  const handleAwardsUpdate = async () => {
    const updatedForm = { ...form };
    const accessToken = await getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const updatedAwardFields = updatedForm.field.filter((item) => item.type === '공모전');
    const initialAwardFields = memorizedForm.current?.field.filter((item) => item.type === '공모전');
    const hasChanges = JSON.stringify(updatedAwardFields) !== JSON.stringify(initialAwardFields);
    const hasAdded = !initialAwardFields || initialAwardFields.length === 0;

    if (hasAdded && hasChanges) {
      for (const award of updatedAwardFields) {
        const response3 = await request.post(
          `/api/user/reformer/awards`,
          {
            competition: award.name,
            prize: award.content,
          },
          headers
        );
        if (response3.status === 201) {
          console.log("공모전 데이터 추가 성공:", response3.data);
        } else {
          console.log("공모전 데이터 추가 실패:", response3.status, response3.data);
        }
      }
      console.log("새 공모전 데이터 등록 완료");
    } else if (hasChanges && !hasAdded) {
      try {
        const response = await request.get(`/api/user/reformer/awards`, headers);
        const existingAwardUUIDs = response.data.map((award: any) => award.award_uuid);

        for (const uuid of existingAwardUUIDs) {
          const response2 = await request.del(`/api/user/reformer/awards/${uuid}`, {}, headers);
          if (response2.status === 200) {
            console.log(`공모전 데이터 삭제 성공 (UUID: ${uuid})`);
          } else {
            console.log(`공모전 데이터 삭제 실패 (UUID: ${uuid}):`, response2.status);
          }
        }
        console.log("기존 공모전 데이터 삭제 완료");

        for (const award of updatedAwardFields) {
          const response3 = await request.post(
            `/api/user/reformer/awards`,
            {
              competition: award.name,
              prize: award.content,
            },
            headers
          );
          if (response3.status === 201) {
            console.log("공모전 데이터 추가 성공:", response3.data);
          } else {
            console.log("공모전 데이터 추가 실패:", response3.status, response3.data);
          }
        }
        console.log("새 공모전 데이터 등록 완료");
      } catch (error) {
        console.error("Error updating awards data:", error);
        Alert.alert("공모전 정보 업데이트 중 오류가 발생했습니다.");
      }
    } else {
      console.log("공모전 정보에 변동사항 없음");
    }
  };

  const handleCertificationUpdate = async () => {
    const updatedForm = { ...form };
    const accessToken = await getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const updatedCertificationFields = updatedForm.field.filter((item) => item.type === '자격증');
    const initialCertificationFields = memorizedForm.current?.field.filter((item) => item.type === '자격증');
    const hasChanges = JSON.stringify(updatedCertificationFields) !== JSON.stringify(initialCertificationFields);
    const hasAdded = !initialCertificationFields || initialCertificationFields.length === 0;

    if (hasAdded && hasChanges) {
      for (const cert of updatedCertificationFields) {
        const response3 = await request.post(
          `/api/user/reformer/certification`,
          {
            name: cert.name,
            issuing_authority: cert.host,
          },
          headers
        );
        if (response3.status === 201) {
          console.log("자격증 데이터 추가 성공:", response3.data);
        } else {
          console.log("자격증 데이터 추가 실패:", response3.status, response3.data);
        }
      }
      console.log("새 자격증 데이터 등록 완료");
    } else if (hasChanges && !hasAdded) {
      try {
        const response = await request.get(`/api/user/reformer/certification`, headers);
        const existingCertificationUUIDs = response.data.map((cert: any) => cert.certification_uuid);

        for (const uuid of existingCertificationUUIDs) {
          const response2 = await request.del(`/api/user/reformer/certification/${uuid}`, {}, headers);
          if (response2.status === 200) {
            console.log(`자격증 데이터 삭제 성공 (UUID: ${uuid})`);
          } else {
            console.log(`자격증 데이터 삭제 실패 (UUID: ${uuid}):`, response2.status);
          }
        }
        console.log("기존 자격증 데이터 삭제 완료");

        for (const cert of updatedCertificationFields) {
          const response3 = await request.post(
            `/api/user/reformer/certification`,
            {
              name: cert.name,
              issuing_authority: cert.host,
            },
            headers
          );
          if (response3.status === 201) {
            console.log("자격증 데이터 추가 성공:", response3.data);
          } else {
            console.log("자격증 데이터 추가 실패:", response3.status, response3.data);
          }
        }
        console.log("새 자격증 데이터 등록 완료");
      } catch (error) {
        console.error("Error updating certification data:", error);
        Alert.alert("자격증 정보 업데이트 중 오류가 발생했습니다.");
      }
    } else {
      console.log("자격증 정보에 변동사항 없음");
    }
  };

  const handleFreelancerUpdate = async () => {
    const updatedForm = { ...form };
    const accessToken = await getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const updatedFreelancerFields = updatedForm.field.filter((item) => item.type === '기타 (개인 포트폴리오, 외주 등)');
    const initialFreelancerFields = memorizedForm.current?.field.filter((item) => item.type === '기타 (개인 포트폴리오, 외주 등)');
    const hasChanges = JSON.stringify(updatedFreelancerFields) !== JSON.stringify(initialFreelancerFields);
    const hasAdded = !initialFreelancerFields || initialFreelancerFields.length === 0;

    if (hasAdded && hasChanges) {
      for (const project of updatedFreelancerFields) {
        const response3 = await request.post(
          `/api/user/reformer/freelancer`,
          {
            project_name: project.name,
            description: project.content,
          },
          headers
        );
        if (response3.status === 201) {
          console.log("프리랜서 프로젝트 데이터 추가 성공:", response3.data);
        } else {
          console.log("프리랜서 프로젝트 데이터 추가 실패:", response3.status, response3.data);
        }
      }
      console.log("새 프리랜서 프로젝트 데이터 등록 완료");
    } else if (hasChanges && !hasAdded) {
      try {
        const response = await request.get(`/api/user/reformer/freelancer`, headers);
        const existingFreelancerUUIDs = response.data.map((project: any) => project.freelancer_uuid);

        for (const uuid of existingFreelancerUUIDs) {
          const response2 = await request.del(`/api/user/reformer/freelancer/${uuid}`, {}, headers);
          if (response2.status === 200) {
            console.log(`프리랜서 프로젝트 데이터 삭제 성공 (UUID: ${uuid})`);
          } else {
            console.log(`프리랜서 프로젝트 데이터 삭제 실패 (UUID: ${uuid}):`, response2.status);
          }
        }
        console.log("기존 프리랜서 프로젝트 데이터 삭제 완료");

        for (const project of updatedFreelancerFields) {
          const response3 = await request.post(
            `/api/user/reformer/freelancer`,
            {
              project_name: project.name,
              description: project.content,
            },
            headers
          );
          if (response3.status === 201) {
            console.log("프리랜서 프로젝트 데이터 추가 성공:", response3.data);
          } else {
            console.log("프리랜서 프로젝트 데이터 추가 실패:", response3.status, response3.data);
          }
        }
        console.log("새 프리랜서 프로젝트 데이터 등록 완료");
      } catch (error) {
        console.error("Error updating freelancer data:", error);
        Alert.alert("프리랜서 프로젝트 정보 업데이트 중 오류가 발생했습니다.");
      }
    } else {
      console.log("프리랜서 프로젝트 정보에 변동사항 없음");
    }
  };

  // 경력 전체 업데이트 함수
  const handleProfileUpdate = async () => {
    await handleEducationUpdate();
    await handleCareerUpdate();
    await handleAwardsUpdate();
    await handleCertificationUpdate();
    await handleFreelancerUpdate();
    await uploadProfileImage();
  };

  const handleFix = async () => {
    if (!isFormInitialized) return; // 초기화 전에는 handleFix 실행 방지
    const updatedForm = { ...form }; // form을 복사하여 사용
    if (updatedForm.nickname === '' || updatedForm.link === '' || updatedForm.region === '') {
      Alert.alert('필수 사항을 모두 입력해주세요')
    } else if (updatedForm.picture === undefined) {
      Alert.alert('프로필 사진을 등록해주세요.')
    } else if (!updatedForm.link.startsWith('https')) {
      Alert.alert('오픈채팅방 링크를 제대로 입력해주세요')
    } else if (form.field.length < 1) {
      Alert.alert('경력을 최소 1개 작성해주세요')
    } else { // 필수 사항 모두 입력되었을 경우 
      setLoading(true);
      const accessToken = await getAccessToken();
      const headers = {
        Authorization: `Bearer ${accessToken}`
      };
      await putUserData(); // 닉네임, 소개글 업데이트
      // 아래는 초기 값과 비교하여 변경된 값만 업데이트하기 위한 변수
      const linkChanged = JSON.stringify(memorizedForm.current?.link) !== JSON.stringify(updatedForm.link);
      const regionChanged = JSON.stringify(memorizedForm.current?.region) !== JSON.stringify(updatedForm.region);
      // 변경된 항목만 포함하는 params 객체 생성
      const params: Partial<{ reformer_link: string; reformer_area: string; }> = {};
      if (linkChanged) params.reformer_link = updatedForm.link;
      if (regionChanged) params.reformer_area = updatedForm.region;
      if (linkChanged || regionChanged) {
        try {
          const response = await request.put(`/api/user/reformer`, params, headers);
          if (response && response.status === 200) {
            console.log('지역, 링크 업데이트 성공:', updatedForm.link, updatedForm.region);
            navigation.goBack();
          } else {
            Alert.alert('지역, 링크 업데이트 실패');
            console.log(response);
          }
        } catch (error) {
          console.error("Error updating reformer data:", error);
          Alert.alert('업데이트 중 오류가 발생했습니다.');
        }
      } else { console.log('지역, 링크 변동 없음'); }
      // 아래는 필드 확인해서 타입에 따라 uuid 겟하고 그걸로 delete하고 POST 요청하는 코드
      await handleProfileUpdate();
      setLoading(false);
    }
  }

  const handleSubmit = async () => {
    const updatedForm = { ...form }; // form을 복사하여 사용
    if (updatedForm.nickname === '' || updatedForm.link === '' || updatedForm.region === '') {
      Alert.alert('필수 사항을 모두 입력해주세요')
    } else if (updatedForm.picture === undefined) {
      Alert.alert('프로필 사진을 등록해주세요.')
    } else if (!updatedForm.link.startsWith('https')) {
      Alert.alert('오픈채팅방 링크를 제대로 입력해주세요')
    } else if (form.field.length < 1) {
      Alert.alert('경력을 최소 1개 작성해주세요')
    } else { // 필수 사항 모두 입력되었을 경우 
      setLoading(true);
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
        // 링크, 지역, 학력 post
        console.log(params);
        const response = await request.post(`/api/user/reformer`, params, headers);
        if (response?.status === 201) {
          console.log(response?.data);
          await createMarket();
          console.log('리폼러 프로필 생성 성공')
        } else if (response?.status === 500) {
          console.log(response);
          Alert.alert('다시 시도해주세요.')
        } else {
          console.log(response);
          Alert.alert('프로필 등록에 실패했습니다.');
          return;
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
        const updateResponse = await request.put(`/api/user`, data, headers);
        if (updateResponse && updateResponse.status === 200) {
          console.log(data, '닉네임, 소개글 등록 성공');
          // 이 아래는 프로필 이미지, 파일 등록 
          await uploadProfileImage();
        }
        else {
          console.log(updateResponse);
          return;
        }

        navigation.navigate('ReformSubmit'); // 모든 작업 완료 후 이동
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
  };

  const uploadProfileImage = async () => { // 이미지 새롭게 등록, 수정 모두 같음 
    const accessToken = await getAccessToken();
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
        // 모든 uploadFiles 호출을 Promise.all로 처리
        const uploadPromises = form.field
          .filter((data) => Array.isArray(data.file) && data.file.length > 0) // file이 배열이고 빈 배열이 아닌 경우만 필터링
          .map((data) => uploadFiles(data.type, data)); // 필터링된 데이터로 uploadFiles 호출

        await Promise.all(uploadPromises);
        if (fix) { // 수정하러 들어왔을 경우
          Alert.alert(
            "프로필 수정이 완료되었습니다.",
            "",
            [
              {
                text: "확인",
                onPress: () => {
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 0, // 새로운 스택의 첫 번째 화면
                      routes: [
                        { name: 'Main', params: { screen: 'UPCY' } }
                      ]
                    })
                  );
                }
              }
            ]
          );
        }
      } else {
        console.log('이미지 업로드 실패');
        console.log(response);
      }
    }
    catch (err) {
      console.error(err)
    }
  }

  // FormData 내부 데이터를 직접 확인하는 함수
  const logFormData = (formData: FormData) => {
    console.log("✅ FormData 확인:");

    (formData as any)._parts.forEach((part: any) => {
      console.log(`Field: ${part[0]}`);
      if (typeof part[1] === 'object') {
        console.log(`   ➤ File Info: ${JSON.stringify(part[1], null, 2)}`);
      } else {
        console.log(`   ➤ Value: ${part[1]}`);
      }
    });
  };

  const uploadFiles = async (Type: any, data: { file: Files }) => {
    // data가 객체이고, data.file이 배열인지 확인
    if (!data || !Array.isArray(data.file)) {
      console.error("data.file is not an array or undefined:", data);
      return;
    }

    const formData = new FormData();
    const accessToken = await getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    // Type에 따라 engType 결정
    const engType = Type === '학력' ? 'education'
      : Type === '실무 경험' ? 'career'
        : Type === '공모전' ? 'awards'
          : Type === '자격증' ? 'certification'
            : 'freelancer';
    const uuidKey = `${engType}_uuid`; // 각 타입에 따른 UUID 키 생성
    // 🔹 파일 추가 (React Native에서 사용되는 `uri` 방식)
    for (const file of data.file) {
      if (!file.uri) {
        console.error("❌ 파일 URI가 없습니다:", file);
        continue;
      }

      formData.append('document', {
        uri: file.uri,
        type: 'application/pdf',
        name: file.name || 'document.pdf',
      } as any);

      console.log(`✅ 추가된 파일: ${file.name}, URI: ${file.uri}`);
    }
    logFormData(formData);

    console.log("FormData for upload:", formData);

    try {
      // Step 1: 기존 데이터의 UUID를 가져오기 위해 GET 요청
      const response = await request.get(`/api/user/reformer/${engType}`, headers);
      if (response && response.status === 200) {
        const UUIDs = response.data.map((item: any) => item[uuidKey]);
        console.log(`받아온 UUID들:`, UUIDs)
        // Step 2: 파일 업로드 요청

        for (const uuid of UUIDs) {
          const response2 = await request.post(
            `/api/user/reformer/${engType}/${uuid}/document`,
            formData,
            headers
          );
          if (response2.status === 201) {
            console.log(engType, '자격증명 파일 업로드 성공');
          } else {
            console.log(response2);
            console.log(engType, '자격증명 파일 업로드 실패', response2.status);
            Alert.alert('Failed uploading files.');
          }
        }
      } else {
        console.log('upliadFiles에서 데이터 get 실패')
      }

    } catch (error) {
      console.error('Error uploading files:', error);
      Alert.alert('Failed uploading files.');
    }
  };

  useEffect(() => { // 수정하려고 들어왔을때 패치 
    if (fix) {
      waitFetch()
      console.log('리폼러 데이터 패치');
    };
  }, []);

  const waitFetch = async () => {
    await fetchLink();
    await fetchIntro();
    await fetchImage();
  }

  const fetchImage = async () => {
    const accessToken = await getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };
    try { //이미지 가져오는 로직 
      const response = await request.get(`/api/user`, {}, headers);
      const encodedUrl = encodeURI(response.data.profile_image_url);
      const decodedUri = decodeURIComponent(encodedUrl);
      const profileImage: PhotoType = {
        fileName: response.data.profile_image_url ? 'profile.jpg' : undefined,
        width: undefined, // width는 알 수 없으므로 undefined로 설정
        height: undefined, // height는 알 수 없으므로 undefined로 설정
        uri:
          decodedUri ||
          'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp',
      };
      if (response && response.status === 200) {
        console.log('이미지 패치:', profileImage);
        setForm(prev => {
          return { ...prev, picture: profileImage }
        })
      } else {
        console.log('유저 프로필 이미지 패치 실패:', response);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  const fetchIntro = async () => {
    const accessToken = await getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };
    try {
      const response = await request.get(`/api/user`, {}, headers);
      if (response && response.status === 200) {
        setForm(prev => {
          return { ...prev, introduce: response.data.introduce }
        })
        console.log('자기소개 패치:', response.data.introduce)
      } else {
        console.log('자기소개 패치 실패:', response);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const fetchLink = async () => {
    const accessToken = await getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };
    try { // 링크, 지역, 자기소개
      const response = await request.get(`/api/user/reformer`, {}, headers);
      if (response && response.status === 200) {
        const data = response.data;
        console.log('패치한 리폼러 데이터:', data);
        // 각 항목을 form.field 형식에 맞게 변환하여 추가
        const newFields: any[] = [];
        // 학력 데이터 추가
        if (data.education) {
          data.education.forEach((edu: any) => {
            newFields.push({
              name: edu.school,
              type: "학력",
              major: edu.major,
              status: edu.academic_status,
            });
          });
        }
        // 자격증 데이터 추가
        if (data.certification) {
          data.certification.forEach((cert: any) => {
            newFields.push({
              name: cert.name,
              type: "자격증",
              host: cert.issuing_authority,
            });
          });
        }
        // 공모전 데이터 추가
        if (data.awards) {
          data.awards.forEach((award: any) => {
            newFields.push({
              name: award.competition,
              type: "공모전",
              content: award.prize,
            });
          });
        }
        // 실무 경험 데이터 추가
        if (data.career) {
          data.career.forEach((career: any) => {
            newFields.push({
              name: career.company_name,
              type: "실무 경험",
              team: career.department,
              period: career.period,
            });
          });
        }
        // 프리랜서 프로젝트 추가
        if (data.freelancer) {
          data.freelancer.forEach((project: any) => {
            newFields.push({
              name: project.project_name,
              type: "기타 (개인 포트폴리오, 외주 등)",
              content: project.description,
            });
          });
        }
        // 기존 form.field에 새로운 데이터 추가
        setForm(prevForm => ({
          ...prevForm,
          introduce: data.user_info.introduce || prevForm.introduce,
          nickname: data.user_info.nickname || prevForm.nickname,
          link: data.reformer_link || prevForm.link,
          region: data.reformer_area || prevForm.region,
          field: [...prevForm.field, ...newFields], // 기존 field에 newFields 추가
        }));
      } else {
        console.log(response);
        console.log('리폼러 데이터 패치 실패')
      }
    } catch (err) {
      console.error(err);
    }
  }
  // 로딩 중일 때 로딩 스피너 표시
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.formView}>
        <View style={{ flexDirection: "row" }}>
          <Subtitle16B>경력</Subtitle16B>
          <Subtitle16B style={{ color: PURPLE }}>{' *'}</Subtitle16B>
        </View>
        {form.field != undefined && form.field.length < 3 && ( // 개수 3개 미만일 때만 추가버튼 노출 
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
          value={!fix ? '다음' : '완료'}
          pressed={false}
          onPress={
            !fix ?
              handleSubmit
              : handleFix}
          style={{ width: '90%', alignSelf: 'center', marginBottom: 10 }}
        />
        {fix && // TODO: 이거 배포 전에는 삭제하기! (디버깅용)
          <View>
            <BottomButton
              value="check"
              pressed={false}
              onPress={() => {
                console.log(form);
              }}
              style={{ width: '90%', alignSelf: 'center', marginBottom: 10 }}
            />
          </View>}
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
