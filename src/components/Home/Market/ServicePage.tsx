import { useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import Carousel from '../../../common/Carousel';

import ServiceItem from '../components/ServiceItem';

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
      <View style={styles.container}>
        <Text style={TextStyles.title}>리폼러의 서비스</Text>
        {service ? (
          <View>
            {items.map((item, index) => (
              <ServiceItem key={index} onPress={() => {}} />
            ))}
          </View>
        ) : (
          <Carousel
            data={[...new Array(1).keys()]}
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

const styles = StyleSheet.create({
  container: {},
});

const TextStyles = StyleSheet.create({
  title: {
    color: '#222',
    fontFamily: 'Pretendard Variable',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    marginTop: 12,
    marginHorizontal: 16,
  },
});

export default ServicePage;
