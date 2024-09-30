import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import styled from 'styled-components/native';
import { Subtitle18B } from '../../../styles/GlobalText';
import Carousel from '../../../common/Carousel';

import ServiceItem from '../components/ServiceItem';

import { LIGHTGRAY } from '../../../styles/GlobalColor';

interface ServicePageProps {
  scrollViewRef: React.RefObject<ScrollView>;
}

const ServicePage: React.FC<ServicePageProps> = ({ scrollViewRef }) => {
  const [service, setService] = useState<boolean>(false);
  const [product, setProduct] = useState<boolean>(false);

  // 한 줄에 2개씩 상품 아이템 배치
  const items = [...new Array(6).keys()];
  const splitArrayIntoPairs = (arr: any[], pairSize: number) => {
    return arr.reduce((result, item, index) => {
      if (index % pairSize === 0) {
        result.push([]);
      }
      result[result.length - 1].push(item);
      return result;
    }, []);
  };

  return (
    <Tabs.ScrollView
      ref={scrollViewRef}
      style={{ marginBottom: service || product ? 60 : -2000 }}
      bounces={false}
      overScrollMode="never">
      <View>
        <LabelButton onPress={() => setService(!service)}>
          <Subtitle18B>리폼러의 서비스</Subtitle18B>
        </LabelButton>
        {service ? (
          <View>
            {items.map((item, index) => (
              <ServiceItem key={index} onPress={() => {}} />
            ))}
          </View>
        ) : (
          <Carousel
            data={[...new Array(6).keys()]}
            renderItem={({ item, index }: any) => {
              return <ServiceItem onPress={() => {}} key={index} />;
            }}
            slider
          />
        )}
        <View style={{ paddingBottom: 100 }} />
      </View>
    </Tabs.ScrollView>
  );
};

const LabelButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  padding: 4px 16px;
  margin-top: 12px;
`;

export default ServicePage;
