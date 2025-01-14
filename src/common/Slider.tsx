import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { BLACK, BLACK2, LIGHTGRAY, PURPLE } from '../styles/GlobalColor';
import React from 'react';

interface SliderProps {
  total: number;
  page: number;
  rating?: boolean;
}

const Slider = ({ total, page, rating }: SliderProps) => {
  const loaderValue = useRef(new Animated.Value(0)).current;

  const load = (count: number) => {
    Animated.timing(loaderValue, {
      toValue: (count / total) * 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const width = loaderValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    load(page);
  }, [page]);

  return (
    <>
      <SliderBar
        style={{
          borderRadius: rating ? 2 : 0,
          backgroundColor: rating ? LIGHTGRAY : BLACK2,
        }}>
        <Animated.View
          style={{
            backgroundColor: rating ? PURPLE : BLACK,
            width,
            height: 3,
            borderRadius: rating ? 2 : 0,
          }}
        />
      </SliderBar>
    </>
  );
};

const SliderBar = styled.View`
  width: 100%;
  height: 3px;
  background: ${BLACK2};
`;

export default Slider;
