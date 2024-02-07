import { SafeAreaView, View, Dimensions } from 'react-native';
import {
  Body16B,
  Caption11M,
  Subtitle16B,
  Title20B,
} from '../../styles/GlobalText';
import styled from 'styled-components/native';
import { GRAY, PURPLE } from '../../styles/GlobalColor';
import CheckIcon from '../../assets/common/CheckIcon.svg';
import { FormProps } from './SignIn';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import InputBox from '../../common/InputBox';

const InputView = styled.View`
  margin-top: 10;
  margin-bottom: 10;
`;

const TermsView = styled(InputView)`
  flex-direction: row;
  align-items: center;
`;

function CheckButton() {
  const [checked, setChecked] = useState(false);
  return (
    <View style={{ marginLeft: 'auto', marginRight: 10 }}>
      <TouchableOpacity
        onPress={() => {
          setChecked(prev => {
            return !prev;
          });
        }}>
        <CheckIcon stroke={checked ? '#612FEF' : '#BDBDBD'} />
      </TouchableOpacity>
    </View>
  );
}

export default function BasicForm({ navigation, route }: FormProps) {
  const { width, height } = Dimensions.get('window');
  const { setForm } = route.params;
  const [temp, setTemp] = useState('');

  return (
    <SafeAreaView>
      <View style={{ marginTop: 100, marginHorizontal: width * 0.03 }}>
        <InputView>
          <Subtitle16B>이메일</Subtitle16B>
        </InputView>
        <InputView>
          <InputBox
            title="비밀번호"
            placeholder="입력해 주세요"
            text={route.params.form.password}
            onChangeText={text =>
              route.params.setForm((prev: any) => {
                return { ...prev, password: text };
              })
            }
            secure={true}
          />
          <Caption11M style={{ color: GRAY }}>비밀번호 조합</Caption11M>
        </InputView>
        <InputView>
          <InputBox
            title="비밀번호 확인"
            placeholder="입력해 주세요"
            text={temp}
            onChangeText={text => setTemp(text)}
            secure={true}
          />
        </InputView>
        <InputView>
          <Body16B>지역</Body16B>
        </InputView>
        <TermsView>
          <Caption11M>만 19세 이상입니다. </Caption11M>
          <Caption11M style={{ color: PURPLE }}>(필수)</Caption11M>
          <CheckButton />
        </TermsView>
        <TermsView>
          <Caption11M>서비스 이용약관에 동의합니다.</Caption11M>
          <Caption11M style={{ color: PURPLE }}>(필수)</Caption11M>
          <CheckButton />
        </TermsView>
        <TermsView>
          <Caption11M>개인정보 수집 이용에 동의합니다. </Caption11M>
          <Caption11M style={{ color: PURPLE }}>(필수)</Caption11M>
          <CheckButton />
        </TermsView>
        <TermsView>
          <Caption11M>
            마케팅 수신 홍보 목적의 개인정보 수집 및 이용에 동의합니다. (선택){' '}
          </Caption11M>
          <CheckButton />
        </TermsView>
      </View>
      {/* <TouchableOpacity onPress={route.params.handleSubmit}>
        <Title20B>consolelog</Title20B>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
}
