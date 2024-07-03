import { useState } from 'react';
import CarouselModule from 'react-native-snap-carousel';
import { PhotoType, useImagePickers } from '../hooks/useImagePicker';
import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
import { Body16B } from '../styles/GlobalText';
import styled from 'styled-components/native';
import { LIGHTGRAY, LIGHTGRAY2 } from '../styles/GlobalColor';
import Slider from './Slider';
import PhotoIcon from '../assets/common/Photo.svg';

interface ImageCarouselProps {
  images: PhotoType[];
  setFormImages: (images: PhotoType[]) => void;
  max: number;
  originalSize?: boolean;
  originalHeight?: number;
  originalWidth?: number;
  unTouchable?: boolean
}

const ImageCarousel = ({ images, setFormImages, max,
  originalSize = false, originalHeight, originalWidth, unTouchable = false }: ImageCarouselProps) => {
  const { width } = Dimensions.get('screen');
  const [page, setPage] = useState(0);

  const imagePickerCallback = (newPhotos: PhotoType[]) => {
    setFormImages(newPhotos);
  };

  const { handleAddButtonPress, handleImagePress } = useImagePickers(max);

  const PhotoTypeCarousel = CarouselModule<PhotoType | undefined>;

  return (
    <View>
      <PhotoTypeCarousel
        data={images.length < max ? [...images, undefined] : images}
        renderItem={({
          item,
          index,
        }: {
          item: PhotoType | undefined;
          index: number;
        }) => {
          return item === undefined ? (
            <TouchableOpacity
              style={{
                backgroundColor: LIGHTGRAY2,
                alignItems: 'center',
                justifyContent: 'center',
                height: originalSize ? originalHeight : 320,
              }}
              onPress={() => handleAddButtonPress(images, imagePickerCallback)}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: LIGHTGRAY,
                  borderRadius: 4,
                  paddingHorizontal: 16,
                  paddingVertical: 6,
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <PhotoIcon />
                {!originalSize &&
                  <Body16B>이미지 첨부</Body16B>}
              </View>
            </TouchableOpacity>
          ) : (!unTouchable ? (
            <TouchableOpacity
              onPress={() =>
                handleImagePress(index, images, imagePickerCallback)
              }>
              <Image src={item.uri} style={{ height: originalSize ? originalHeight : 320, width: originalSize ? originalWidth : width }} />
            </TouchableOpacity>
          ) : (
            <Image src={item.uri} style={{ height: originalSize ? originalHeight : 320, width: originalSize ? originalWidth : width }} />
          )
          );
        }}
        onSnapToItem={(index: number) => setPage(index)}
        keyExtractor={(item, index) => index.toString()}
        itemWidth={originalSize ? originalWidth : width}
        sliderWidth={originalSize ? originalWidth : width}></PhotoTypeCarousel>
      {!originalSize &&
        <SliderContainer>
          <Slider
            total={images.length < max ? images.length + 1 : max}
            page={page + 1}
            rating={true}
          />
        </SliderContainer>
      }
    </View>
  );
};

const SliderContainer = styled.View`
  display: flex;
  padding: 0px;
`;

export default ImageCarousel;
