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
import { useNavigation } from '@react-navigation/native'; // FIXME: 나중에 함수 props로 받아오도록 수정

const ServiceMarket = (/*{ navigation }*/) => {
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
        <ServiceCard
          name="하느리퐁퐁"
          price="20,000원 ~ "
          tag="빈티지"
          image={ServiceImage1}
          title="청바지 에코백 만들어 드립니다"
          text="안입는 청바지를 활용한 나만의 에코백! 아주 좋은 에코백 환경에도 좋고 나에게도 좋고 어찌구저찌구한 에코백입니다 최고임 짱짱"
        />
        <ServiceCard
          name="똥구르리리"
          price="20,000원 ~ "
          tag="미니멀"
          image={ServiceImage2}
          title="커스텀 짐색"
          text="안입는 청바지를 활용한 나만의 에코백! 아주 좋은 에코백 환경에도 좋고 나에게도 좋고 어찌구저찌구한 에코백입니다 최고임 짱짱"
        />
        <ServiceCard
          name="훌라훌라맨"
          price="20,000원 ~ "
          tag="빈티지"
          image={ServiceImage3}
          title="청바지 에코백 만들어 드립니다"
          text="안입는 청바지를 활용한 나만의 에코백! 아주 좋은 에코백 환경에도 좋고 나에게도 좋고 어찌구저찌구한 에코백입니다 최고임 짱짱"
        />
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
  text,
}) => {
  const [like, setLike] = useState(false);
  const navigation = useNavigation(); // FIXME: 나중에 함수 props로 받아오도록 수정

  return (
    <TouchableOpacity
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
      <Body14R>{text}</Body14R>
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
