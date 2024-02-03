import { useState } from 'react';
import styled from 'styled-components/native';
import HeartButton from './HeartButton';
import BottomButton from './BottomButton';

const Footer = () => {
  // API 연결 전, 인터랙션만
  const [like, setLike] = useState<boolean>(false);
  const [pressed, setPressed] = useState<boolean>(false);
  return (
    <FooterContainer>
      <HeartButton like={like} onPress={() => {setLike(!like)}} blank />
      <BottomButton value={'견적서 보내기'} pressed={pressed} onPress={() => {}} />
    </FooterContainer>
  )
}

const FooterContainer = styled.View`
  position: absolute;
  bottom: 0px;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  padding: 5px 15px;
`

export default Footer;