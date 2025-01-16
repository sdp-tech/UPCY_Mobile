import { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import Request from '../../../common/requests';
import { ServiceCard } from './Service';
import { ServiceResponseType, defaultImageUri } from './Service';
// (MarketTabView)리폼러 마켓 페이지의 서비스 탭 

interface ServicePageProps {
  scrollViewRef: React.RefObject<ScrollView>;
  navigation: any;
  reformerName?: string;
  marketUuid?: string;
}

const ServicePage: React.FC<ServicePageProps> = ({
  scrollViewRef,
  navigation,
  reformerName,
  marketUuid,
}) => {
  const [items, setItems] = useState<ServiceResponseType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태 관리
  const [error, setError] = useState<string | null>(null); // 오류 메시지 관리
  const request = Request();

  const fetchData = async () => {
    try {
      // 로딩 시작
      setIsLoading(true);
      const response = await request.get(
        `/api/market/${marketUuid}/service?temporary=false`,
        {}, {}
      );
      if (response && response.status === 200) {
        const marketResult = response.data;
        setItems(marketResult);
      } else if (response.status === 404) {
        setError('아직 등록된 서비스가 없습니다.')
      }
      else {
        setError('서비스를 불러오는 데 실패했습니다.');
        console.log(response);
        Alert.alert('ServicePage.tsx에서 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error(error);
      setError('서버 오류가 발생했습니다.');
      Alert.alert('서버 오류가 발생했습니다.');
    } finally {
      // 로딩 끝
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (marketUuid) {
      fetchData();
      console.log('Reformer Name:', reformerName); // Debugging step
      console.log('Market UUID:', marketUuid); // Debugging step
    }
  }, [reformerName, marketUuid]);


  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>서비스를 불러오는 중...</Text>
      </View>
    );
  }

  return (
    <Tabs.ScrollView
      ref={scrollViewRef}
      style={{ marginBottom: 60 }}
      bounces={false}
      overScrollMode="never">
      <View style={styles.container}>
        <Text style={TextStyles.title}>
          {reformerName || '리포머 이름 없음'}의 서비스
        </Text>
        {error && <Text style={styles.errorText}>{error}</Text>}
        {items.map((item, index) => (
          <ServiceCard
            key={index}
            created={item.created || new Date('2023-12-12')}
            name={reformerName || ''}
            basic_price={item.basic_price || 0}
            max_price={item.max_price || 0}
            service_styles={
              Array.isArray(item.service_style)
                ? item.service_style.map(style => style.style_name || '')
                : []
            }
            imageUris={item.service_image || []}
            service_title={item.service_title || ''}
            service_content={item.service_content || ''}
            market_uuid={marketUuid || ''}
            service_uuid={item.service_uuid || ''}
            service_period={item.service_period || undefined}
            service_materials={Array.isArray(item.service_material)
              ? item.service_material.map(material => ({
                material_uuid: material.material_uuid || '',
                material_name: material.material_name || ''
              }))
              : []
            }
            service_options={
              Array.isArray(item.service_option)
                ? item.service_option.map(option => ({
                  option_content: option.option_content || '',
                  option_name: option.option_name || '',
                  option_price: option.option_price || '',
                  option_uuid: option.option_uuid || '',
                  service_option_image: option.service_option_image || [],
                }))
                : []
            }
            suspended={item.suspended}
            navigation={navigation}
          />
        ))}
        <View style={{ paddingBottom: 100 }} />
      </View>
    </Tabs.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
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
