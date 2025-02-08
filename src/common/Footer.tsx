import { useState } from 'react';
import styled from 'styled-components/native';
import HeartButton from './HeartButton';
import BottomButton from './BottomButton';
import { Alert, View } from 'react-native';
interface FooterProps {
  suspended: boolean; // 중단된 서비스인지 여부.
  hideButton: boolean;
  onNavigate?: (serviceUuid: string) => void;
  serviceUuid: string;
}

const Footer: React.FC<FooterProps> = ({ suspended, hideButton, onNavigate, serviceUuid }) => {
  // API 연결 전, 인터랙션만
  // const [like, setLike] = useState<boolean>(false);
  const [pressed, setPressed] = useState<boolean>(false);

  const handleNavigation = () => {
    if (suspended) {
      Alert.alert('현재 서비스가 중단되었습니다.');
      return;
    } else if (onNavigate) {
      onNavigate(serviceUuid);
    }
  };

  const value = suspended ? '중단된 서비스입니다' : '주문서 보내기'
  return (
    <View>
      <FooterContainer style={{ paddingTop: 10 }}>
        {/* <HeartButton like={like} onPress={() => { setLike(!like) }} blank /> */}
        {!hideButton && (
            <BottomButton
                value={value}
                pressed={pressed}
                onPress={handleNavigation}
                style={{
                  width: 358,
                  height: 48,
                  marginBottom: 34,
                  marginHorizontal: 16,
                }}
            />
        )}
      </FooterContainer>
    </View>
  );
};

const FooterContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

export default Footer;