import { Key, useState } from 'react';
import { View, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import styled from 'styled-components/native';
import { Subtitle18B } from '../../../styles/GlobalText';
import Carousel from '../../../common/Carousel';

import ServiceItem from '../components/ServiceItem';
import ProductItem from '../components/ProductItem';

import Arrow from '../../../assets/common/Arrow.svg';
import { BLACK, LIGHTGRAY } from '../../../styles/GlobalColor';

interface ServicePageProps {
  scrollViewRef: React.RefObject<ScrollView>;
}

const ServicePage: React.FC<ServicePageProps> = ({ scrollViewRef }) => {
  const [service, setService] = useState<boolean>(false);
  const [product, setProduct] = useState<boolean>(false);

  // 한 줄에 2개씩 상품 아이템 배치
  const items = [...new Array(6).keys()]
  const splitArrayIntoPairs = (arr: any[], pairSize: number) => {
    return arr.reduce((result, item, index) => {
      if (index % pairSize === 0) {
        result.push([]);
      }
      result[result.length - 1].push(item);
      return result;
    }, []);
  };
  const splitItems = splitArrayIntoPairs(items, 2);

  return (
    <Tabs.ScrollView
      ref={scrollViewRef}
      style={{ marginBottom: (service || product) ? 60 : -2000 }}
      bounces={false} overScrollMode="never">
      <View >
        <LabelButton onPress={() => setService(!service)}>
          <Subtitle18B>리폼러의 서비스</Subtitle18B>
          {!service && <Arrow transform={[{ rotate: '180deg' }]} color={BLACK} />}
        </LabelButton>
        {service ?
          <View>
            {items.map((item, index) => (
              <ServiceItem key={index} onPress={() => { }} />
            ))}
          </View>
          :
          <Carousel
            data={[...new Array(6).keys()]}
            renderItem={({ item, index }: any) => {
              return (
                <ServiceItem onPress={() => { }} key={index} />
              )
            }}
            slider
          />
        }
        <View style={{ height: 1, backgroundColor: LIGHTGRAY, marginTop: 10 }} />
      </View>
    </Tabs.ScrollView>
  )
}

const LabelButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  padding: 16px;
`

export default ServicePage;