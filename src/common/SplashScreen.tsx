import React from 'react';
import LottieView from 'lottie-react-native';
import { Dimensions, View } from 'react-native';
import { PURPLE } from '../styles/GlobalColor';

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const { width, height } = Dimensions.get('screen');

  return (
    <View
      style={{
        height: height,
        width: width,
        backgroundColor: PURPLE,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: '90%',
          height: '80%',
        }}>
        <LottieView
          source={require('../assets/common/lottie/animation/SplashAnimation.json')}
          onAnimationFinish={onFinish}
          loop={false}
          autoPlay
        />
      </View>
    </View>
  );
};

export default SplashScreen;
