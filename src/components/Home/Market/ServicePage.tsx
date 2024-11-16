import { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, Alert } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import Request from '../../../common/requests';
import { ServiceCard } from './Service';
import { ServiceResponseType } from './Service';

// 이거는 리폼러마이페이지에 있는 서비스 탭!

interface ServicePageProps {
  scrollViewRef: React.RefObject<ScrollView>;
  navigation: any;
  reformerName?: string;
  marketUuid?: string;
}

const ServicePage: React.FC<ServicePageProps> = ({
  scrollViewRef,
  navigation,
  reformerName = '리폼러',
  marketUuid,
}) => {
  const [service, setService] = useState<boolean>(false);
  const [product, setProduct] = useState<boolean>(false);
  const request = Request();
  const [items, setItems] = useState<ServiceResponseType[]>([]);

  const fetchData = async () => {
    try {
      // API 호출
      const response = await request.get(
        `/api/market/${marketUuid}/service`,
        {},
      );
      if (response && response.status === 200) {
        const marketResult = response.data;
        console.log('marketResult: ', marketResult.length);
        setItems(marketResult);
      } else {
        Alert.alert('오류가 발생했습니다.');
        console.log('response: ', response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      // TODO: 로딩 상태 추가하기
    }
  };

  // 컴포넌트가 처음 렌더링될 때 API 호출
  useEffect(() => {
    fetchData();
  }, [marketUuid]);

  return (
    <Tabs.ScrollView
      ref={scrollViewRef}
      style={{ marginBottom: service || product ? 60 : 0 }}
      bounces={false}
      overScrollMode="never">
      <View style={styles.container}>
        <Text style={TextStyles.title}>{reformerName}의 서비스</Text>
        {items.map((item, index) => (
          <ServiceCard
            key={index}
            name={reformerName || ''}
            basic_price={item.basic_price || 0}
            max_price={item.max_price || 0}
            service_styles={
              Array.isArray(item.service_style)
                ? item.service_style.map(style => style.style_name || '')
                : []
            }
            imageUri={''}
            service_title={item.service_title || ''}
            service_content={item.service_content || ''}
            market_uuid={marketUuid || ''}
            service_uuid={item.service_uuid || ''}
            service_period={item.service_period || undefined}
            navigation={navigation}
          />
        ))}
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
