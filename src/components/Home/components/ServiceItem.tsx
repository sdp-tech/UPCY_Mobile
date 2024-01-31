import { useState } from 'react';
import { View, TouchableOpacity, ImageBackground } from 'react-native';
import styled from 'styled-components/native';

import HeartButton from '../../../common/HeartButton';
import { Body16B, Caption12M, Subtitle16B } from '../../../styles/GlobalText';
import { BLACK2 } from '../../../styles/GlobalColor';

interface ServiceItemProps {
  onPress: () => void;
}

const ServiceItem = ({ onPress }: ServiceItemProps) => {
  const [like, setLike] = useState<boolean>(false);
  return (
    <TouchableOpacity style={{paddingHorizontal: 20, paddingBottom: 10}} onPress={onPress}>
      <ImageBackground
        style={{width: '100%', height: 180, justifyContent: 'flex-end', alignItems: 'flex-end'}}
        source={{uri: 'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp'}}
      >
        <HeartButton like={like} onPress={() => setLike(!like)} />
      </ImageBackground>
      <TitleContainer>
        <Subtitle16B>청바지 에코백 서비스</Subtitle16B>
        <Body16B style={{color: BLACK2}}>20000원 ~</Body16B>
      </TitleContainer>
      <Caption12M style={{color: BLACK2}}>안입는 청바지를 활용한 나만의 에코백! 아주 좋은 에코백 환경에도 좋고 나에게도 좋고 어쩌구저쩌구한 에코백입니다 최고임 짱짱</Caption12M>
    </TouchableOpacity>
  )
}

const TitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-vertical: 5px;
`

export default ServiceItem;