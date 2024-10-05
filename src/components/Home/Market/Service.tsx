import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {
  Title20B,
  Filter11R,
  Subtitle18B,
  Body14R,
} from '../../../styles/GlobalText';
import { LIGHTGRAY } from '../../../styles/GlobalColor';
import HeartButton from '../../../common/HeartButton';
import DetailModal from '../Market/GoodsDetailOptionsModal';
import { Styles } from '../../../types/UserTypes.ts';
import { SelectedOptionProps } from '../HomeMain.tsx';

interface ServiceCardProps {
  name: string;
  price: number;
  tags: string[];
  imageUri: string;
  title: string;
  description: string;
}

interface ServiceCardComponentProps extends ServiceCardProps {
  navigation?: any;
}

// TODO: replace the below dummy data
// API 연결 시 이 부분만 바꾸면 됩니다!
const serviceCardDummyData: ServiceCardProps[] = [
  {
    name: '하느리퐁퐁',
    price: 100000,
    tags: ['빈티지', '미니멀', '캐주얼'] as Styles[],
    imageUri:
      'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp',
    title: '청바지 에코백 만들어 드립니다',
    description:
      '안입는 청바지를 활용한 나만의 에코백! 아주 좋은 에코백 환경에도 좋고 나에게도 좋고 어찌구저찌구한 에코백입니다 최고임 짱짱',
  },
  {
    name: '똥구르리리',
    price: 20000,
    tags: ['미니멀'] as Styles[],
    imageUri:
      'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp',
    title: '커스텀 짐색',
    description:
      '안입는 청바지를 활용한 나만의 에코백! 아주 좋은 에코백 환경에도 좋고 나에게도 좋고 어찌구저찌구한 에코백입니다 최고임 짱짱',
  },
  {
    name: '훌라훌라맨',
    price: 50000,
    tags: ['빈티지'] as Styles[],
    imageUri:
      'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp',
    title: '청바지 에코백 만들어 드립니다',
    description:
      '안입는 청바지를 활용한 나만의 에코백! 아주 좋은 에코백 환경에도 좋고 나에게도 좋고 어찌구저찌구한 에코백입니다 최고임 짱짱',
  },
];

type ServiceMarketProps = {
  selectedFilterOption?: SelectedOptionProps;
  navigation: any;
};

const ServiceMarket = ({
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
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [serviceCardData, setServiceCardData] =
    useState<ServiceCardProps[]>(serviceCardDummyData);

  const serviceTitle: string = '지금 주목해야 할 업사이클링 서비스';
  const serviceDescription: string = '안 입는 옷을 장마 기간에 필요한 물품으로';

  useEffect(() => {
    if (selectedFilterOption == '가격순') {
      // filter by price
      const sortedByPriceData = [...serviceCardDummyData].sort(
        (a, b) => a.price - b.price,
      );
      setServiceCardData(sortedByPriceData);
    }
    // TODO: add more filtering logic here
  }, [selectedFilterOption]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title20B
        style={{ marginTop: 15, marginHorizontal: 15, marginBottom: 4 }}>
        {serviceTitle}
      </Title20B>
      <Filter11R style={{ marginBottom: 15, marginHorizontal: 15 }}>
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
        {serviceCardData.map(card => {
          return (
            <ServiceCard
              name={card.name}
              price={card.price}
              tags={card.tags}
              imageUri={card.imageUri}
              title={card.title}
              description={card.description}
              navigation={navigation}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

export const ServiceCard = ({
  name,
  price,
  tags,
  imageUri,
  title,
  description,
  navigation,
}: ServiceCardComponentProps) => {
  const [like, setLike] = useState(false);

  return (
    <TouchableOpacity
      key={title}
      style={styles.cardContainer}
      onPress={() => {
        navigation.navigate('ServiceDetailPage', { navigation: navigation });
      }}>
      <ImageBackground
        style={{ width: '100%', height: 180, position: 'relative' }}
        imageStyle={{ height: 180 }}
        source={{
          uri: 'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp',
          // FIXME: fix here with imageUri variable
        }}>
        <Text style={TextStyles.serviceCardName}>{name}</Text>
        <Text style={TextStyles.serviceCardPrice}>{price} 원 ~</Text>
        <View style={styles.tag}>
          {tags.map((tag, index) => {
            return (
              <Text style={TextStyles.serviceCardTag} key={index}>
                {tag}
              </Text>
            );
          })}
        </View>
      </ImageBackground>
      <View style={styles.titleContainer}>
        <Subtitle18B>{title}</Subtitle18B>
        <HeartButton like={like} onPress={() => setLike(!like)} />
      </View>
      <Body14R>{description}</Body14R>
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
  tag: {
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

export default ServiceMarket;
