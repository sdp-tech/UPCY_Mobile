import { useState } from 'react';
import { View, TouchableOpacity, ImageBackground } from 'react-native';
import styled from 'styled-components/native';

import HeartButton from '../../../common/HeartButton';
import { Body14R, Body16M } from '../../../styles/GlobalText';
import ThumbnailHashtag from '../../../common/ThumbnailHashtag';

interface ProductItemProps {
  onPress: () => void;
}

const ProductItem = ({ onPress }: ProductItemProps) => {
  const [like, setLike] = useState<boolean>(false);
  return (
    <TouchableOpacity style={{paddingHorizontal: 20, paddingVertical: 5, width: '50%'}} onPress={onPress}>
      <ImageBackground
        style={{width: '100%', height: 170, justifyContent: 'flex-end', alignItems: 'flex-end'}}
        source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuOFPZloY83xIUAOR_4ADrZzBhXt7UZH7qJA&usqp=CAU'}}
      >
        <HeartButton like={like} onPress={() => setLike(!like)} />
      </ImageBackground>
      <Body14R>청바지 에코백</Body14R>
      <TextContainer>
        <Body16M>25,000</Body16M>
        <ThumbnailHashtag value={'빈티지'} />
      </TextContainer>
    </TouchableOpacity>
  )
}

const TextContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-vertical: 5px;
`

export default ProductItem;