import { useState } from 'react';
import { View, Dimensions } from 'react-native';
import CarouselModule from 'react-native-snap-carousel';
import Slider from './Slider';
import styled from 'styled-components/native';
import { LIGHTGRAY, PURPLE } from '../styles/GlobalColor';

interface CarouselProps {
  data: any[];
  renderItem: any;
  dot?: boolean;
  slider?: boolean;
}

const { width } = Dimensions.get('window');

const Carousel = ({ data, renderItem, dot, slider }: CarouselProps) => {
  const [page, setPage] = useState<number>(0);
  return (
    <>
      <CarouselModule
        data={data}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width}
        onSnapToItem={(index: number) => setPage(index)}
        keyExtractor={(item, index) => index.toString()}
      />
      {dot ? (
        <DotContainer>
          {Array.from({ length: data.length }, (_, i) => i).map(i => (
            <Dot key={i} focused={i === page ? true : false} />
          ))}
        </DotContainer>
      ) : (
        <></>
      )}
      {slider ? (
        <SliderContainer>
          <Slider total={data.length - 1} page={page} />
        </SliderContainer>
      ) : (
        <></>
      )}
    </>
  );
};

const Dot = styled.View<{ focused: boolean }>`
  width: ${(props: { focused: boolean }) => (props.focused ? 10 : 7)}px;
  height: ${(props: { focused: boolean }) => (props.focused ? 10 : 7)}px;
  margin: 0px 6px;
  border-radius: 16px;
  background: ${(props: { focused: boolean }) =>
    props.focused ? PURPLE : LIGHTGRAY};
  opacity: ${(props: { focused: boolean }) => (props.focused ? 1 : 0.5)};
`;

const DotContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SliderContainer = styled.View`
  display: flex;
  padding: 0px 20px;
`;

export default Carousel;
