import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  Title20B,
  Filter11R,
  Subtitle18B,
  Body14R,
} from '../../../styles/GlobalText';
import { LIGHTGRAY } from '../../../styles/GlobalColor';
// import HeartButton from '../../../common/HeartButton';
import DetailModal from '../Market/GoodsDetailOptionsModal';
import { SelectedOptionProps } from '../HomeMain.tsx';
import { getAccessToken } from '../../../common/storage.js';
import Request from '../../../common/requests.js';
import RenderHTML from 'react-native-render-html';

// 홈화면에 있는, 서비스 전체 리스트!
interface ServiceCardProps {
  name: string; // 리폼러 이름
  basic_price: number;
  service_styles?: string[];
  imageUri?: string;
  service_title: string;
  service_content: string;
  market_uuid: string;
  service_uuid: string;
}

export type ServiceResponseType = {
  // TODO: any type 나중에 알아보고 수정
  basic_price: number;
  market_uuid: string;
  max_price: number;
  service_category: string;
  service_content: string;
  service_image: any[];
  service_material: any[];
  service_option: any[];
  service_period: number;
  service_style: any[];
  service_title: string;
  service_uuid: string;
  temporary: boolean;
};

interface ServiceCardComponentProps extends ServiceCardProps {
  navigation?: any;
}

// API 연결 시 이 부분만 바꾸면 됩니다!
const MAX_PRICE: number = 24000;

type ServiceMarketProps = {
  selectedStylesList: string[];
  selectedFilterOption?: SelectedOptionProps;
  navigation: any;
};

const EntireServiceMarket = ({
  selectedStylesList,
  selectedFilterOption,
  navigation,
}: ServiceMarketProps) => {
  const [form, setForm] = useState({
    mail: '',
    domain: '',
    password: '',
    region: '',
  });

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(true); // 로딩용
  const request = Request();
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [serviceCardData, setServiceCardData] = useState<ServiceCardProps[]>(
    [] as ServiceCardProps[],
  );

  const serviceTitle: string = '지금 주목해야 할 업사이클링 서비스';
  const serviceDescription: string = '옷장 속 옷들의 트렌디한 재탄생';

  const fetchData = async () => {
    const accessToken = await getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    if (accessToken === undefined) {
      console.log('이 경우에는 어떻게 할까요..?');
    } else {
      try {
        // API 호출
        const response = await request.get(`/api/market/service`, headers);
        if (response && response.status === 200) {
          const serviceListResults: ServiceResponseType[] =
            response.data.results;
          const extractedServiceCardData = extractData(serviceListResults);
          setServiceCardData(extractedServiceCardData);
        } else {
          Alert.alert('오류가 발생했습니다.');
          console.log(response);
        }
      } catch (error) {
        console.error(error);
      } finally {
        // 로딩 상태 false로 변경
        setLoading(false);
      }
    }
  };

  const extractData = (rawData: ServiceResponseType[]) => {
    return rawData.map(service => ({
      name: service.service_title,
      basic_price: service.basic_price,
      service_styles: service.service_style.map(
        style => style.style_name,
      ) as string[],
      imageUri: service.service_image?.[0] ?? '',
      service_title: service.service_title,
      service_content: service.service_content,
      market_uuid: service.market_uuid,
      service_uuid: service.service_uuid,
    })) as ServiceCardProps[];
  };

  // 컴포넌트가 처음 렌더링될 때 API 호출
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (serviceCardData) {
      // filter by selected styles
      // const styleFilteredData = serviceCardData.filter(card => {
      //   card.service_styles?.some(style => selectedStylesList.includes(style));
      // });
      if (selectedFilterOption == '가격순') {
        // filter by basic_price
        // const sortedByPriceData = [...styleFilteredData].sort(
        const sortedByPriceData = [...serviceCardData].sort(
          (a, b) => a.basic_price - b.basic_price,
        );
        setServiceCardData(sortedByPriceData);
      }
      // TODO: add more filtering logic here
    }
  }, [selectedFilterOption, selectedStylesList]);

  // 로딩 중일 때 로딩 스피너 표시
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title20B
        style={{ marginTop: 15, marginHorizontal: 15, marginBottom: 8 }}>
        {serviceTitle}
      </Title20B>
      <Filter11R style={{ marginHorizontal: 15 }}>
        {serviceDescription}
      </Filter11R>
      <View style={{ marginTop: 10 }} />
      <DetailModal
        open={modalOpen}
        setOpen={setModalOpen}
        value={form.region}
        setValue={text => setForm(prev => ({ ...prev, region: text }))}
        selectedStyles={selectedStyles}
        setSelectedStyles={setSelectedStyles}
      />
      <View style={{ backgroundColor: LIGHTGRAY }}>
        {serviceCardData.length > 0 ? (
          serviceCardData.map(card => (
            <ServiceCard
              key={card.service_uuid}
              name={card.name}
              basic_price={card.basic_price}
              service_styles={card.service_styles}
              imageUri={card.imageUri}
              service_title={card.service_title}
              service_content={card.service_content}
              market_uuid={card.market_uuid}
              service_uuid={card.service_uuid}
              navigation={navigation}
            />
          ))
        ) : (
          <Text>선택된 스타일의 서비스가 없습니다.</Text>
        )}
      </View>
    </ScrollView>
  );
};

export const ServiceCard = ({
  name,
  basic_price,
  service_styles,
  imageUri,
  service_title,
  service_content,
  navigation,
  market_uuid,
  service_uuid,
}: ServiceCardComponentProps) => {
  const [like, setLike] = useState(false);

  //TODO: get review num using API
  const REVIEW_NUM = 5;

  return (
    <TouchableOpacity
      key={service_uuid}
      style={styles.cardContainer}
      onPress={() => {
        navigation.navigate('ServiceDetailPage', {
          reformerName: name,
          serviceName: service_title,
          basicPrice: basic_price,
          maxPrice: MAX_PRICE,
          reviewNum: REVIEW_NUM,
          service_styles: service_styles,
          backgroundImageUri: imageUri,
          profileImageUri: imageUri,
        });
      }}>
      <ImageBackground
        style={{ width: '100%', height: 180, position: 'relative' }}
        imageStyle={{ height: 180 }}
        source={{
          uri: 'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp',
          // FIXME: fix here with imageUri variable
        }}>
        <Text style={TextStyles.serviceCardName}>{name}</Text>
        <Text style={TextStyles.serviceCardPrice}>{basic_price} 원 ~</Text>
        <View style={styles.service_style}>
          {service_styles?.map((service_style, index) => {
            return (
              <Text style={TextStyles.serviceCardTag} key={index}>
                {service_style}
              </Text>
            );
          })}
        </View>
      </ImageBackground>
      <View style={styles.titleContainer}>
        <Subtitle18B>{service_title}</Subtitle18B>
        {/* <HeartButton like={like} onPress={() => setLike(!like)} /> */}
      </View>
      <Body14R>
        <RenderHTML contentWidth={300} source={{ html: service_content }} />
      </Body14R>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  cardContainer: {
    backgroundColor: 'white',
    padding: 20,
    flex: 1,
    marginHorizontal: 0,
  },
  service_style: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    top: 12,
    right: 13,
    alignItems: 'flex-start',
    gap: 12,
    flexWrap: 'wrap',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 8,
    borderRadius: 4,
  },
});

const TextStyles = StyleSheet.create({
  serviceCardName: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#222',
    opacity: 0.8,
    height: 40,
    position: 'absolute',
    left: 0,
    bottom: 0,
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 24,
  },
  serviceCardPrice: {
    position: 'absolute',
    right: 11,
    bottom: 13,
    color: '#fff',
    fontFamily: 'Pretendard Variable',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
  },
  serviceCardTag: {
    backgroundColor: '#612FEF',
    paddingHorizontal: 16,
    paddingVertical: 4,
    color: '#fff',
    fontFamily: 'Pretendard Variable',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
  },
});

export default EntireServiceMarket;
