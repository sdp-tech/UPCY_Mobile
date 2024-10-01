import { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import {
  Title20B,
  Filter11R,
  Subtitle18B,
  Body14R,
} from '../../../styles/GlobalText';
import { LIGHTGRAY } from '../../../styles/GlobalColor';
import HeartButton from '../../../common/HeartButton';
import DetailModal from '../Market/GoodsDetailOptionsModal';
import ServiceImage1 from '../../../assets/common/ServiceImage1.svg';
import ServiceImage2 from '../../../assets/common/ServiceImage2.svg';
import ServiceImage3 from '../../../assets/common/ServiceImage3.svg';
import { Styles } from '../../../types/UserTypes.ts';

type ServiceCardProps = {
  name: string;
  price: number; // price variable should be a number to apply filters
  tag: Styles;
  image: ImageComponent | any | undefined; // FIXME: fix image type
  title: string;
  description?: string;
};

// TODO: replace the below dummy data
// API 연결 시 이 부분만 바꾸면 됩니다!
const serviceCardDummyData: ServiceCardProps[] = [
  {
    name: '하느리퐁퐁',
    price: 20000,
    tag: '빈티지',
    image: ServiceImage1,
    title: '청바지 에코백 만들어 드립니다',
    description:
      '안입는 청바지를 활용한 나만의 에코백! 아주 좋은 에코백 환경에도 좋고 나에게도 좋고 어찌구저찌구한 에코백입니다 최고임 짱짱',
  },
  {
    name: '똥구르리리',
    price: 20000,
    tag: '미니멀',
    image: ServiceImage2,
    title: '커스텀 짐색',
    description:
      '안입는 청바지를 활용한 나만의 에코백! 아주 좋은 에코백 환경에도 좋고 나에게도 좋고 어찌구저찌구한 에코백입니다 최고임 짱짱',
  },
  {
    name: '훌라훌라맨',
    price: 20000,
    tag: '빈티지',
    image: ServiceImage3,
    title: '청바지 에코백 만들어 드립니다',
    description:
      '안입는 청바지를 활용한 나만의 에코백! 아주 좋은 에코백 환경에도 좋고 나에게도 좋고 어찌구저찌구한 에코백입니다 최고임 짱짱',
  },
];

const ServiceMarket = () => {
  const [form, setForm] = useState({
    mail: '',
    domain: '',
    password: '',
    region: '',
  });

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  const serviceTitle: string = '지금 주목해야 할 업사이클링 서비스';
  const serviceDescription: string = '안 입는 옷을 장마 기간에 필요한 물품으로';

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
        {serviceCardDummyData.map(card => {
          return (
            <ServiceCard
              name={card.name}
              price={card.price}
              tag={card.tag}
              image={card.image}
              title={card.title}
              description={card.description}
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
  tag,
  image: ImageComponent,
  title,
  description,
}: ServiceCardProps) => {
  const [like, setLike] = useState(false);

  return (
    <TouchableOpacity
      key={title}
      style={styles.cardContainer}
      onPress={() => {
        // 각 리폼러 프로필 페이지로 이동하는 event 걸기
      }}>
      <ImageComponent />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 12,
          marginBottom: 8,
        }}>
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
    borderTopWidth: 1,
    borderColor: LIGHTGRAY,
    flex: 1,
    marginHorizontal: 0,
  },
});

export default ServiceMarket;
