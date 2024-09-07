import { useState } from 'react';
import styled from 'styled-components/native';
import HeartButton from './HeartButton';
import BottomButton from './BottomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';

const Footer = () => {
  // API 연결 전, 인터랙션만
  const [like, setLike] = useState<boolean>(false);
  const [pressed, setPressed] = useState<boolean>(false);
  return (
    <View >
      <FooterContainer style={{ paddingTop: 10 }} >
        <HeartButton like={like} onPress={() => { setLike(!like) }} blank />
        <BottomButton value={'주문서 보내기'} pressed={pressed} onPress={() => { }} />
      </FooterContainer>
    </View>
  )
}

const FooterContainer = styled.View`
  position: absolute;
  bottom: 0;
  left:0;
  right:0;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: space-around;
  background-color: white;
`

export default Footer;