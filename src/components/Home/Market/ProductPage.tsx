import { useState } from 'react';
import { View, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import styled from 'styled-components/native';
import { Subtitle18B } from '../../../styles/GlobalText';
import Carousel from '../../../common/Carousel';

import ServiceItem from '../components/ServiceItem';
import ProductItem from '../components/ProductItem';

import Arrow from '../../../assets/common/Arrow.svg';
import { BLACK, LIGHTGRAY } from '../../../styles/GlobalColor';

const ProductPage = () => {
  // 한 줄에 2개씩 상품 아이템 배치
  const product = [...new Array(6).keys()]
  const splitArrayIntoPairs = (arr: any[], pairSize: number) => {
    return arr.reduce((result, item, index) => {
      if (index % pairSize === 0) {
        result.push([]);
      }
      result[result.length - 1].push(item);
      return result;
    }, []);
  };
  const splitProduct = splitArrayIntoPairs(product, 2);

  return (
    <Tabs.ScrollView>
      <View>
        <LabelButton>
          <Subtitle18B>리폼러의 서비스</Subtitle18B>
          <Arrow transform={[{ rotate: '180deg' }]} color={BLACK} />
        </LabelButton>
        <Carousel
          data={[...new Array(6).keys()]}
          renderItem={({item}: any) => {
            return (
              <ServiceItem onPress={() => {}} />
            )
          }}
          slider
        />
        <View style={{height: 1, backgroundColor: LIGHTGRAY, marginTop: 10 }} />
        <LabelButton>
          <Subtitle18B>리폼러의 판매상품</Subtitle18B>
          <Arrow transform={[{ rotate: '180deg' }]} color={BLACK} />
        </LabelButton>
        <Carousel
          data={splitProduct}
          renderItem={({item}: any) => {
            return (
              <View style={{ flexDirection: 'row' }}>
                {item.map((subItem: any) => (
                  <ProductItem key={subItem.id} onPress={() => {}} />
                ))}
              </View>
            )
          }}
          dot
        />
      </View>
    </Tabs.ScrollView>
  )
}

const LabelButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  padding: 16px;
`

export default ProductPage;