import {
  SafeAreaView,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Body16B, Body16M, Caption11M } from '../../styles/GlobalText';
import styled from 'styled-components/native';
import { BLACK, BLACK2, GRAY, PURPLE } from '../../styles/GlobalColor';
import CheckIcon from '../../assets/common/CheckIcon.svg';
import DownArrow from '../../assets/common/DownArrow.svg';
import RightArrow from '../../assets/common/RightArrow.svg';
import LeftArrow from '../../assets/common/Arrow.svg';
import Logo from '../../assets/common/Logo.svg';
import { FormProps } from './SignIn';
import { useState } from 'react';
import InputBox from '../../common/InputBox';
import BottomButton from '../../common/BottomButton';
import Dropdown from '../../common/Dropdown';
import RegionModal from './RegionModal';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

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

const InputView = styled.View`
  position: relative;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const TermsView = styled(InputView)`
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
  height: 44;
  width: 44%;
  border-width: 2px;
  border-color: #929292;
  border-radius: 5px;
  padding-left: 16;
  padding-right: 10;
`;

function CheckButton({ checked, onPress }: CheckBtnProps) {
  return (
    <View style={{ marginLeft: 'auto', marginRight: 10 }}>
      <TouchableOpacity onPress={onPress}>
        <CheckIcon stroke={checked ? '#612FEF' : '#BDBDBD'} />
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
  const [checkPw, setCheckPw] = useState({ text: '', bool: false });
  const [domainOpen, setDomainOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = () => {};

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
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
          <InputView style={{ zIndex: 1 }}>
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
          </InputView>
          <InputView>
            <Body16B>비밀번호</Body16B>
            <InputBox
              value={form.password}
              setValue={text =>
                setForm(prev => {
                  return { ...prev, password: text };
                })
              }
              placeholder="입력해 주세요"
              style={{ height: 44, marginTop: 8 }}
              secure={true}
              onEndEditing={e =>
                setCheckPw(prev => {
                  return { ...prev, bool: true };
                })
              }
            />
            <Caption11M style={{ color: GRAY }}>비밀번호 조합</Caption11M>
          </InputView>
          <InputView>
            <Body16B>비밀번호 확인</Body16B>
            <InputBox
              value={checkPw.text}
              setValue={text =>
                setCheckPw(prev => {
                  return { ...prev, text: text };
                })
              }
              placeholder="입력해 주세요"
              style={{ height: 44, marginTop: 8 }}
              secure={true}
            />
            <Caption11M style={{ color: PURPLE }}>
              {checkPw.text !== form.password && checkPw.bool
                ? '비밀번호가 일치하지 않습니다.'
                : ''}
            </Caption11M>
          </InputView>
          <InputView>
            <Body16B>지역</Body16B>
            <SelectView style={{ marginVertical: 8, width: '100%' }}>
              <TextInput
                value={form.region}
                style={{ width: '70%' }}
                placeholder="선택해 주세요"
                placeholderTextColor={BLACK2}
                readOnly={true}></TextInput>
              <TouchableOpacity onPress={() => setModalOpen(true)}>
                <RightArrow stroke={BLACK2} />
              </TouchableOpacity>
            </SelectView>
          </InputView>
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
              마케팅 수신 홍보 목적의 개인정보 수집 및 이용에 동의합니다. (선택){' '}
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
          <View style={{ marginTop: 'auto' }}>
            <BottomButton
              disable={
                !agreement.a ||
                !agreement.b ||
                !agreement.c ||
                form.mail === '' ||
                form.domain === '' ||
                form.password === '' ||
                form.password !== checkPw.text ||
                form.region !== ''
              }
              value="다음"
              pressed={false}
              onPress={handleSubmit}
              style={{ width: '75%', alignSelf: 'center' }}
            />
          </View>
        </View>
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
}
