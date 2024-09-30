import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import styled from 'styled-components/native';

import ServiceImage2 from '../../../assets/common/ServiceImage2.svg';

import { ServiceCard } from '../Market/Service';

interface ServiceItemProps {
  onPress: () => void;
}

const ServiceItem = ({ onPress }: ServiceItemProps) => {
  const [like, setLike] = useState<boolean>(false);
  return (
    <>
      <ServiceCard
        name="똥구르리리"
        price="20,000원 ~ "
        tag="미니멀"
        image={ServiceImage2}
        title="커스텀 짐색"
        text="안입는 청바지를 활용한 나만의 에코백! 아주 좋은 에코백 환경에도 좋고 나에게도 좋고 어찌구저찌구한 에코백입니다 최고임 짱짱"
      />
      <View style={{ paddingBottom: 100 }} />
    </>
  );
};

const TitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-vertical: 5px;
`;

const TextStyles = StyleSheet.create({
  title: {
    color: '#222',
    fontFamily: 'Pretendard Variable',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
  },
  detail: {
    color: '#222',
    fontFamily: 'Pretendard Variable',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
  },
  price: {
    color: '#fff',
    textAlign: 'right',
    fontFamily: 'Pretendard Variable',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    marginRight: 11,
    marginBottom: 13,
  },
});

export default ServiceItem;
