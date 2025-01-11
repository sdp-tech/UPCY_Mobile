import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
// FIXME: 이거 사용
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
import { Title20B, Filter11R, Subtitle18B } from '../../../styles/GlobalText';
import { LIGHTGRAY } from '../../../styles/GlobalColor';
// import HeartButton from '../../../common/HeartButton';
import DetailModal from '../Market/GoodsDetailOptionsModal';
import { SelectedOptionProps } from '../HomeMain.tsx';
import Request from '../../../common/requests.js';
import RenderHTML from 'react-native-render-html';
import { numberToPrice } from './functions.ts';

// 홈화면에 있는, 서비스 전체 리스트!

export type ServiceDetailOption = {
  option_content: string;
  option_name: string;
  option_price: number;
  option_uuid: string;
  option_photoUri?: string; // 옵션 사진 uri
};

export type MaterialDetail = {
  material_uuid: string;
  material_name: string;
};

interface ServiceCardProps {
  name: string; // 리폼러 이름
  basic_price: number;
  max_price?: number;
  service_styles?: string[];
  imageUri?: string;
  service_title: string;
  service_content: string;
  market_uuid: string;
  service_uuid: string;
  service_period?: number;
  service_materials?: MaterialDetail[];
  service_options?: ServiceDetailOption[];
  temporary?: boolean; //TODO: 수정 필요
  suspended?: boolean;
}

export type ServiceResponseType = {
  // TODO: any type 나중에 알아보고 수정
  basic_price: number;
  created?: Date;
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
  suspended: boolean;
  updated?: Date;
};

interface ServiceCardComponentProps extends ServiceCardProps {
  navigation?: any;
}

type ServiceMarketProps = {
  selectedStylesList: string[];
  selectedFilterOption?: SelectedOptionProps;
  searchTerm?: string;
  navigation: any;
};

export const defaultImageUri =
  'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp';

const EntireServiceMarket = ({
  selectedStylesList,
  selectedFilterOption,
  searchTerm = '',
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
  const [serviceCardRawData, setServiceCardRawData] = useState<any[]>([]);

  const serviceTitle: string = '지금 주목해야 할 업사이클링 서비스';
  const serviceDescription: string = '옷장 속 옷들의 트렌디한 재탄생';

  const fetchData = async () => {
    try {
      // API 호출: 전체 서비스 
      const response = await request.get(`/api/market/services`, {}, {});
      if (response && response.status === 200) {
        const serviceListResults: ServiceResponseType[] = response.data.results;
        setServiceCardRawData(serviceListResults);
        const extractedServiceCardData = extractData(serviceListResults);
        setServiceCardData(extractedServiceCardData);
        console.log('서비스 목록 로드 완료');
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
  };

  const extractData = (rawData: ServiceResponseType[]) => {
    return rawData.map(service => ({
      //TODO: 밑에 수정
      name: service.service_title, // 여기가 문제네.... 리폼러 이름 받아와야 하는데 서비스 이름이 나옴 @!!!
      basic_price: service.basic_price,
      max_price: service.max_price,
      service_styles: service.service_style.map(
        style => style.style_name,
      ) as string[],
      imageUri: service.service_image?.[0]?.image ?? defaultImageUri, // 썸네일
      service_title: service.service_title,
      service_content: service.service_content,
      market_uuid: service.market_uuid || '',
      service_uuid: service.service_uuid,
      service_period: service.service_period,
      service_materials: service.service_material.map(material => ({
        material_uuid: material.material_uuid,
        material_name: material.material_name,
      })) as MaterialDetail[],
      service_options: Array.isArray(service.service_option)
        ? (service.service_option.map(option => ({
          option_content: option.option_content,
          option_name: option.option_name,
          option_price: option.option_price,
          option_uuid: option.option_uuid,
          option_photoUri: option.option_photoUri || '',
          //option_
        })) as ServiceDetailOption[])
        : [],
      temporary: service.temporary,
      suspended: service.suspended,
    })) as ServiceCardProps[];
  };

  // 컴포넌트가 처음 렌더링될 때 API 호출
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (serviceCardData) {
      // filter by search term
      let searchFilteredData = serviceCardData;
      if (searchTerm && searchTerm.length > 0) {
        searchFilteredData = serviceCardData.filter(card => {
          const {
            name,
            basic_price,
            max_price,
            service_styles,
            service_title,
            service_content,
          } = card;

          const searchLower = searchTerm.toLowerCase();

          // Check if any field matches the search term
          return (
            (name && name.toLowerCase().includes(searchLower)) ||
            (basic_price && basic_price.toString().includes(searchLower)) ||
            (max_price && max_price.toString().includes(searchLower)) ||
            (service_styles &&
              service_styles.some(style =>
                style.toLowerCase().includes(searchLower),
              )) ||
            (service_title &&
              service_title.toLowerCase().includes(searchLower)) ||
            (service_content &&
              service_content.toLowerCase().includes(searchLower))
          );
        });
      }

      // reorder by price
      let priceFilteredData = searchFilteredData;
      if (selectedFilterOption == '가격순') {
        // filter by basic_price
        priceFilteredData = [...searchFilteredData].sort(
          (a, b) => a.basic_price - b.basic_price,
        );
      }

      // filter by selected styles
      const styleFilteredData =
        selectedStylesList.length > 0
          ? priceFilteredData.filter(card =>
            card.service_styles?.some(style =>
              selectedStylesList.includes(style),
            ),
          )
          : [];

      // TODO: add more filtering logic here
      setServiceCardData(styleFilteredData);
    }
  }, [selectedFilterOption, selectedStylesList, searchTerm]);

  // 로딩 중일 때 로딩 스피너 표시
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container} overScrollMode='never' bounces={false}>
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
          serviceCardData.map(
            (card, index) =>
              !card.temporary && (
                <ServiceCard
                  key={card.service_uuid}
                  name={card.name}
                  basic_price={card.basic_price}
                  max_price={card.max_price}
                  service_styles={card.service_styles}
                  imageUri={card.imageUri}
                  service_title={card.service_title}
                  service_content={card.service_content}
                  market_uuid={card.market_uuid}
                  service_uuid={card.service_uuid}
                  service_period={card.service_period}
                  navigation={navigation}
                  service_options={serviceCardRawData[index].service_option}
                  service_materials={serviceCardRawData[index].service_material}
                  suspended={serviceCardRawData[index].suspended}
                />
              ),
          )
        ) : (
          <View style={styles.centeredContainer}>
            <Text style={TextStyles.noServiceText}>
              해당하는 서비스가 없습니다.
            </Text>
          </View>
        )}
      </View>
      <View style={{ marginBottom: 200 }} />
    </ScrollView>
  );
};

export const ServiceCard = ({
  name,
  basic_price,
  max_price,
  service_styles,
  imageUri,
  service_title,
  service_content,
  navigation,
  market_uuid,
  service_uuid,
  service_period,
  service_materials,
  service_options,
  suspended,
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
                  maxPrice: max_price,
                  reviewNum: REVIEW_NUM,
                  tags: service_styles,
                  backgroundImageUri: imageUri,
                  profileImageUri: defaultImageUri,
                  servicePeriod: service_period,
                  serviceMaterials: service_materials,
                  serviceContent: service_content,
                  serviceOptions: service_options,
                  marketUuid: market_uuid,
                  serviceUuid: service_uuid,
              });
      }}>

      <View style={styles.topContainer}>
        <ImageBackground
            style={{ width: '100%', height: 180, position: 'relative' }}
            imageStyle={{ height: 180 }}
            source={{
                uri: imageUri ?? defaultImageUri,
            }}>

            {suspended && (
                <View style={styles.suspendedOverlay}>
                    <Text style={styles.suspendedOverlayText}>중단된 서비스</Text>
                </View>
            )}
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
      </View>
        
      <View style={styles.titleContainer}>
        <Subtitle18B
            style={{
                color: suspended ? "#929292" : "#222222",
                fontSize: 18,
                fontWeight: '700',
            }}>{service_title}</Subtitle18B>
        {/* <HeartButton like={like} onPress={() => setLike(!like)} /> */}
      </View>
      <RenderHTML
        contentWidth={350}
        source={{ html: service_content }}
        tagsStyles={{
          img: { maxWidth: '100%' },
          p: { color: suspended ? '#A0A0A0' : '#222222', overflow: 'hidden' },
        }}
        baseStyle={{
          maxWidth: 370,
          color: suspended ? '#A0A0A0' : '#222222',
        }}
      />
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
  topContainer: {
      position: 'relative',
      width: '100%',
      height: 180,
      overflow: 'hidden',
  },
  suspendedCardContainer: {
    opacity: 0.6, // 중단된 서비스는 반투명 처리
    backgroundColor: '#F5F5F5',
  },
  suspendedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // 반투명 배경
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  suspendedOverlayText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
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
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: 'rgba(97, 47, 239, 0.80)',
    paddingHorizontal: 16,
    paddingVertical: 4,
    color: '#fff',
    fontFamily: 'Pretendard Variable',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
    borderRadius: 8,
  },
  noServiceText: {
    fontSize: 16,
    color: '#000',
    padding: 10,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  suspendedDescription: {
    color: '#B0B0B0', // 설명 글을 회색으로
  },
});

export default EntireServiceMarket;
