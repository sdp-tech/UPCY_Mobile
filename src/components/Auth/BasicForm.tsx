import {
  SafeAreaView,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Body16B, Body16M, Caption11M } from '../../styles/GlobalText';
import styled from 'styled-components/native';
import { BLACK2, PURPLE } from '../../styles/GlobalColor';
import CheckIcon from '../../assets/common/CheckIcon.svg';
import DownArrow from '../../assets/common/DownArrow.svg';
import LeftArrow from '../../assets/common/Arrow.svg';
import Logo from '../../assets/common/Logo.svg';
import { FormProps } from './SignIn';
import { useEffect, useState } from 'react';
import InputBox from '../../common/InputBox';
import InputView from '../../common/InputView';
import BottomButton from '../../common/BottomButton';
import Dropdown from '../../common/Dropdown';
import Request from '../../common/requests';
import RegionModal from './RegionModal';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import SelectBox from '../../common/SelectBox';
import BasicSignupSplash from './BasicSignupSplash';
import CustomScrollView from '../../common/CustomScrollView';
import DropdownWrite from '../../common/DropdownWrite';
import SignupCompleteModal from '../../common/SignUpCompleteModal';
import { CommonActions } from '@react-navigation/native';
import { getAccessToken, setAccessToken, setRefreshToken } from '../../common/storage';
import { processLoginResponse2 } from './Login';
import { PhotoType } from '../../hooks/useImagePicker';

interface Agreement {
  a: boolean;
  b: boolean;
  c: boolean;
  d: boolean;
}

export interface BasicFormProps2 {
  mail: string;
  domain: string | undefined;
  password: string;
  nickname?: string;
  agreement: Agreement;
  introduce?: string;
  profile_image: PhotoType | undefined;
}

interface CheckBtnProps {
  checked: boolean;
  onPress: () => void;
}

const SectionView = styled.View`
  position: relative;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const TermsView = styled(SectionView)`
  flex-direction: row;
  align-items: center;
`;

const MailView = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SelectView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 44px;
  width: 44%;
  border-width: 2px;
  border-color: #929292;
  border-radius: 5px;
  padding-left: 16px;
  padding-right: 10px;
`;

// 페이지 들어올 때, is_reformer인지 is_consumer인지 받아오는거 해야함.
// 그 이후, 그에 따라서 '다음' 눌렀을 때에 이동하는 페이지가 달라져야...

function CheckButton({ checked, onPress }: CheckBtnProps) {
  return (
    <View style={{ marginLeft: 'auto', marginRight: 10 }}>
      <TouchableOpacity onPress={onPress}>
        <CheckIcon color={checked ? '#612FEF' : '#BDBDBD'} />
      </TouchableOpacity>
    </View>
  );
}

export default function BasicForm({ navigation, route }: FormProps) {
  const is_reformer = route.params?.is_reformer ?? false;
  const { width, height } = Dimensions.get('window');
  const [form, setForm] = useState<BasicFormProps2>({
    mail: route.params?.mail || '',
    domain: route.params?.domain || undefined,
    password: route.params?.password || '',
    nickname: route.params?.nickname || '',
    agreement: route.params?.agreement || {
      a: false,
      b: false,
      c: false,
      d: false,
    },
    introduce: route.params?.introduce || '',
    profile_image: route.params?.profile_image || undefined,
  });
  const [checkPw, setCheckPw] = useState('');
  const [isModalVisible, setModalVisible] = useState(false); // 리폼러 가입 모달 

  const request = Request();
  const passwordRegExp = new RegExp(
    '^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$',
  );

  useEffect(() => {
    if (route.params?.form) {
      setForm(route.params.form)
    }
  }, [route.params?.form]);

  const handleLogin = async () => { // 로그인 API 사용해서 토큰 발급 
    const params = {
      email: form.mail + '@' + form.domain,
      password: form.password
    }
    if (form.mail === '' || form.password === '') {
      Alert.alert('이메일과 비밀번호를 모두 입력해주세요.')
    } else {
      const response = await request.post(`/api/user/login`, params);
      await processLoginResponse2( // userRole 설정 함수 
        response
      );
    }
  };

  const passwordValidation = async () => {
    const form_ = { ...form }
    if (form_.agreement.a === false || form_.agreement.b === false || form_.agreement.c === false ||
      form_.domain === undefined || form_.mail === '') {
      Alert.alert('필수 사항들을 모두 입력해주세요.')
    } else if (!form_.domain.includes('.')) {
      Alert.alert('올바른 이메일 형식이 아닙니다.')
    } else { // 누락된거 없을 때 
      if (passwordRegExp.exec(form_.password)) {
        if (is_reformer === true) { // 리폼러의 경우 
          await handleSubmit(); // 일단 회원가입 하고, 
          handleLogin(); // 토큰 발급 로직 
        } else { // 업씨러의 경우 
          navigation.navigate('Upcyer', { form_ })
        }
      } else {
        Alert.alert('비밀번호가 올바르지 않습니다.');
        setForm(prev => {
          return { ...prev, password: '' };
        });
        setCheckPw('');
      }
    }
  };

  const handleSubmit = async () => { // 수정된 백 API 따라서 수정 필요
    const params = {
      email: form.mail + '@' + form.domain,
      password: form.password,
      agreement_terms: form.agreement.d,
    };
    try {
      const response = await request.post(`/api/user/signup`, params);
      if (response?.status === 201) {
        console.log(params);
        const accessToken = await response.data.access;
        const refreshToken = await response.data.refresh;
        console.log({ accessToken }, '||', { refreshToken });
        handleNext();
      } else if (response?.status === 500) {
        console.log(response);
        Alert.alert('이미 가입된 이메일입니다.');
      } else {
        console.error('Error Status:', response?.status);
        Alert.alert('가입에 실패했습니다.');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleNext = () => {
    setModalVisible(true); // 모달 열기
  };

  const handleCloseModal = async () => {
    setModalVisible(false); // 모달 닫기
  };



  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <CustomScrollView>
          <View style={{ flex: 1, minHeight: 800 }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                alignSelf: 'flex-start',
                marginTop: height * 0.02,
                marginLeft: width * 0.03,
              }}>
              <LeftArrow color="#222" />
            </TouchableOpacity>
            <Logo
              color="#612FEF"
              width={150}
              height={40}
              style={{ alignSelf: 'center', marginVertical: 20 }}
            />
            <View
              style={{
                marginHorizontal: width * 0.04,
                flex: 1,
              }}>
              <SectionView style={{ zIndex: 1 }}>
                <Body16B>이메일</Body16B>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <InputBox
                    value={form.mail}
                    setValue={text =>
                      setForm(prev => {
                        return { ...prev, mail: text };
                      })
                    }
                    placeholder="입력해 주세요"
                    style={{ height: 44, marginTop: 8, width: '44%' }}
                  />
                  <Body16M style={{ color: BLACK2 }}>@</Body16M>
                  <DropdownWrite
                    title="직접 입력"
                    width="44%"
                    value={form.domain}
                    setValue={text =>
                      setForm(prev => {
                        return { ...prev, domain: text };
                      })
                    }
                    items={['gmail.com', 'naver.com', 'kakao.com']}
                  />
                </View>
              </SectionView>
              <InputView
                title="비밀번호"
                value={form.password}
                setValue={text =>
                  setForm(prev => {
                    return { ...prev, password: text };
                  })
                }
                placeholder="입력해 주세요"
                style={{ height: 44, marginTop: 8 }}
                secure={true}
                caption={{
                  default:
                    '숫자, 영문, 특수문자를 하나 이상 포함해 8자 이상 16자 이하로 설정해 주세요.',
                }}
              />

              <InputView
                title="비밀번호 확인"
                value={checkPw}
                setValue={text => setCheckPw(text)}
                placeholder="입력해 주세요"
                style={{ height: 44, marginTop: 8 }}
                secure={true}
                caption={{
                  invalid:
                    checkPw !== form.password &&
                    checkPw !== '' &&
                    '비밀번호가 일치하지 않습니다.',
                }}
              />

              <TermsView>
                <Caption11M>만 19세 이상입니다. </Caption11M>
                <Caption11M style={{ color: PURPLE }}>(필수)</Caption11M>
                <CheckButton
                  checked={form.agreement?.a ?? false}
                  onPress={() =>
                    setForm(prev => ({
                      ...prev, // 기존의 form 데이터를 유지
                      agreement: {
                        ...prev.agreement, // 기존의 agreement 데이터를 유지
                        a: !prev.agreement?.a,
                      }
                    }))
                  }
                />
              </TermsView>
              <TermsView>
                <Caption11M>서비스 이용약관에 동의합니다.</Caption11M>
                <Caption11M style={{ color: PURPLE }}>(필수)</Caption11M>
                <CheckButton
                  checked={form.agreement?.b ?? false}
                  onPress={() =>
                    setForm(prev => ({
                      ...prev, // 기존의 form 데이터를 유지
                      agreement: {
                        ...prev.agreement, // 기존의 agreement 데이터를 유지
                        b: !prev.agreement?.b,
                      }
                    }))
                  }
                />
              </TermsView>
              <TermsView>
                <Caption11M>개인정보 수집 이용에 동의합니다. </Caption11M>
                <Caption11M style={{ color: PURPLE }}>(필수)</Caption11M>
                <CheckButton
                  checked={form.agreement?.c ?? false}
                  onPress={() =>
                    setForm(prev => ({
                      ...prev, // 기존의 form 데이터를 유지
                      agreement: {
                        ...prev.agreement, // 기존의 agreement 데이터를 유지
                        c: !prev.agreement?.c,
                      }
                    }))
                  }
                />
              </TermsView>
              <TermsView>
                <Caption11M>
                  마케팅 수신 홍보 목적의 개인정보 수집 및 이용에 동의합니다.
                  (선택){' '}
                </Caption11M>
                <CheckButton
                  checked={form.agreement?.d ?? false}
                  onPress={() =>
                    setForm(prev => ({
                      ...prev, // 기존의 form 데이터를 유지
                      agreement: {
                        ...prev.agreement, // 기존의 agreement 데이터를 유지
                        d: !prev.agreement?.d,
                      }
                    }))
                  }
                />
              </TermsView>
              <BottomButton
                disable={
                  false
                  // !agreement.a ||
                  // !agreement.b ||
                  // !agreement.c ||
                  // form.mail === '' ||
                  // form.domain === '' ||
                  // form.password === '' ||
                  // form.password !== checkPw ||
                  // form.region !== ''
                }
                value="다음"
                pressed={false}
                onPress={() => {
                  console.log(form);
                  passwordValidation();
                }}
                // onPress={() => handleNext()} // 이건 임시. 
                style={{
                  width: '75%',
                  alignSelf: 'center',
                  marginTop: 'auto',
                  marginBottom: 30,
                }}
              />
            </View>
          </View>
        </CustomScrollView>
        <SignupCompleteModal visible={isModalVisible} onClose={handleCloseModal} />
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
}
