import React, { useEffect } from 'react';
import { Dimensions, View } from 'react-native';
import { PURPLE } from '../styles/GlobalColor';
import Logo from '../assets/common/Logo.svg';

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const { width, height } = Dimensions.get('screen');
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000); // 2초 후 실행

    return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머 정리
  }, []);

  return (
    <View
      style={{
        height: height,
        width: width,
        backgroundColor: PURPLE,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Logo
        color="#fff"
        width="90px"
        height="40px"
      />
    </View>
  );
};

export default SplashScreen;
