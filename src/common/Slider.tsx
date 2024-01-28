import { useState, useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import styled from 'styled-components/native';
import { BLACK, BLACK2 } from '../styles/GlobalColor';

interface SliderProps {
  total: number;
  page: number;
}

const Slider = ({ total, page }: SliderProps) => {
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
    outputRange: ['10%', '100%'],
    extrapolate: 'clamp'
  });

  useEffect(() => {
    load(page)
  }, [page]);

  return (
    <>
      <SliderBar>
        <Animated.View
          style={{
            backgroundColor: BLACK,
            width,
            height: 3
          }}
        />
      </SliderBar>
    </>
  )
}

const SliderBar = styled.View`
  width: 100%;
  height: 3px;
  background: ${BLACK2};
`

export default Slider;