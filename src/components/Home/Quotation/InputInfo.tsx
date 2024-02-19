import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-safearea-height';
import { Body14M, Subtitle16B, Title20B } from '../../../styles/GlobalText';
import { BLACK, PURPLE } from '../../../styles/GlobalColor';
import Arrow from '../../../assets/common/Arrow.svg';
import InputBox from '../../../common/InputBox';
import BottomButton from '../../../common/BottomButton';

interface InputInfoProps {
  onClose: () => void;
  onNavigate: () => void;
}

export interface InfoProps {
  name: string;
  tel: string;
  address: string;
}

const statusBarHeight = getStatusBarHeight(true);

const InputInfo = ({ onClose, onNavigate }: InputInfoProps) => {
  return (
    <SafeAreaView>
      <BackButton onPress={onClose}>
        <Arrow color={BLACK} />
      </BackButton>
      <Title20B style={{textAlign: 'center'}}>내 정보</Title20B>
      <View style={{padding: 20, marginVertical: 30}}>
        <Subtitle16B>이름</Subtitle16B>
        <InputBox style={{height: 40, paddingVertical: 10, marginTop: 10, borderColor: PURPLE}} placeholder='입력해주세요' />
        <Subtitle16B style={{marginTop: 25}}>연락처</Subtitle16B>
        <InputBox style={{height: 40, paddingVertical: 10, marginTop: 10, borderColor: PURPLE}} placeholder='입력해주세요' />
        <Subtitle16B style={{marginTop: 25}}>주소</Subtitle16B>
        <InputBox style={{height: 40, paddingVertical: 10, marginTop: 10, borderColor: PURPLE}} />
        <TouchableOpacity style={{position: 'absolute', top: 260, right: 30}}>
          <Body14M style={{color: PURPLE}}>주소 찾기</Body14M>
        </TouchableOpacity>
        <InputBox style={{height: 40, paddingVertical: 10, marginTop: 10, borderColor: PURPLE}} placeholder='입력해주세요' />
      </View>
      <View style={{paddingHorizontal: 45, paddingVertical: 20, marginTop: 250}}>
        <BottomButton value='다음' pressed={false} onPress={onNavigate} />
      </View>
    </SafeAreaView>
  )
}

const BackButton = styled.TouchableOpacity`
  padding: 10px;
  position: absolute;
  left: 0px;
  top: ${statusBarHeight-10}px;
  z-index: 1;
`

export default InputInfo;