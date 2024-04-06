import {
  SafeAreaView,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { Body16B, Body16M, Caption11M } from '../../styles/GlobalText';
import styled from 'styled-components/native';
import { BLACK2, GRAY, PURPLE } from '../../styles/GlobalColor';
import CheckIcon from '../../assets/common/CheckIcon.svg';
import DownArrow from '../../assets/common/DownArrow.svg';
import LeftArrow from '../../assets/common/Arrow.svg';
import Logo from '../../assets/common/Logo.svg';
import { FormProps } from './SignIn';
import { useState } from 'react';
import InputBox from '../../common/InputBox';
import InputView from '../../common/InputView';
import BottomButton from '../../common/BottomButton';
import Dropdown from '../../common/Dropdown';
import RegionModal from './RegionModal';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import SelectBox from '../../common/SelectBox';
import BasicSignupSplash from './BasicSignupSplash';
import CustomScrollView from '../../common/CustomScrollView';

interface SignupProps {
  mail: string;
  domain: string;
  password: string;
  region: string;
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
  const { width, height } = Dimensions.get('window');
  const [form, setForm] = useState<SignupProps>({
    mail: '',
    domain: '',
    password: '',
    region: '',
  });
  const [agreement, setAgreement] = useState({
    a: false,
    b: false,
    c: false,
    d: false,
  });
  const [checkPw, setCheckPw] = useState('');
  const [domainOpen, setDomainOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [splash, setSplash] = useState(false);

  const handleSubmit = () => {
    // request
    setSplash(true);
    setTimeout(() => {
      navigation.getParent()?.navigate('Home');
    }, 3000);
  };

  return (
    <BottomSheetModalProvider>
      {splash ? (
        <BasicSignupSplash />
      ) : (
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
                  <MailView>
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
                    <SelectView>
                      <TextInput
                        value={form.domain}
                        onChangeText={text =>
                          setForm(prev => {
                            return { ...prev, domain: text };
                          })
                        }
                        style={{ width: '70%' }}
                        placeholder="직접 입력"
                        placeholderTextColor={BLACK2}
                        readOnly={false}
                        autoCapitalize="none"
                        autoCorrect={false}
                      />
                      <Dropdown
                        open={domainOpen}
                        setOpen={setDomainOpen}
                        value={form.domain}
                        setValue={text =>
                          setForm(prev => {
                            return { ...prev, domain: text };
                          })
                        }
                        items={['gmail.com', 'naver.com', 'kakao.com']}
                        style={{ width: '100%', top: 44 }}
                      />
                      <TouchableOpacity
                        onPress={() =>
                          setDomainOpen(prev => {
                            return !prev;
                          })
                        }>
                        <DownArrow />
                      </TouchableOpacity>
                    </SelectView>
                  </MailView>
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
                  valid={form.password !== '' && form.password.length < 7}
                  caption={{
                    none: '비밀번호 조건',
                    invalid: '비밀번호가 올바르지 않습니다.',
                  }}
                />

                <InputView
                  title="비밀번호 확인"
                  value={checkPw}
                  setValue={text => setCheckPw(text)}
                  placeholder="입력해 주세요"
                  style={{ height: 44, marginTop: 8 }}
                  secure={true}
                  valid={checkPw !== form.password && checkPw !== ''}
                  caption={{ invalid: '비밀번호가 일치하지 않습니다.' }}
                />

                <SectionView>
                  <Body16B>지역</Body16B>
                  <SelectBox
                    value={form.region}
                    onPress={() => setModalOpen(true)}
                  />
                </SectionView>
                <TermsView>
                  <Caption11M>만 19세 이상입니다. </Caption11M>
                  <Caption11M style={{ color: PURPLE }}>(필수)</Caption11M>
                  <CheckButton
                    checked={agreement.a}
                    onPress={() =>
                      setAgreement(prev => {
                        return { ...prev, a: !prev.a };
                      })
                    }
                  />
                </TermsView>
                <TermsView>
                  <Caption11M>서비스 이용약관에 동의합니다.</Caption11M>
                  <Caption11M style={{ color: PURPLE }}>(필수)</Caption11M>
                  <CheckButton
                    checked={agreement.b}
                    onPress={() =>
                      setAgreement(prev => {
                        return { ...prev, b: !prev.b };
                      })
                    }
                  />
                </TermsView>
                <TermsView>
                  <Caption11M>개인정보 수집 이용에 동의합니다. </Caption11M>
                  <Caption11M style={{ color: PURPLE }}>(필수)</Caption11M>
                  <CheckButton
                    checked={agreement.c}
                    onPress={() =>
                      setAgreement(prev => {
                        return { ...prev, c: !prev.c };
                      })
                    }
                  />
                </TermsView>
                <TermsView>
                  <Caption11M>
                    마케팅 수신 홍보 목적의 개인정보 수집 및 이용에 동의합니다.
                    (선택){' '}
                  </Caption11M>
                  <CheckButton
                    checked={agreement.d}
                    onPress={() =>
                      setAgreement(prev => {
                        return { ...prev, d: !prev.d };
                      })
                    }
                  />
                </TermsView>
                <RegionModal
                  open={modalOpen}
                  setOpen={setModalOpen}
                  value={form.region}
                  setValue={text =>
                    setForm(prev => {
                      return { ...prev, region: text };
                    })
                  }
                />
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
                  onPress={handleSubmit}
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
        </SafeAreaView>
      )}
    </BottomSheetModalProvider>
  );
}
