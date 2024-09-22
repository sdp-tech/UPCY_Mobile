import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import styled from 'styled-components/native';
import {
  Body16M,
  Subtitle16M,
  Title20B,
  Filter11R,
  Subtitle18B,
  Body14R,
} from '../../../styles/GlobalText';
import { BLACK, LIGHTGRAY, PURPLE } from '../../../styles/GlobalColor';
import Arrow from '../../../assets/common/Arrow.svg';
import { getStatusBarHeight } from 'react-native-safearea-height';
import HeartButton from '../../../common/HeartButton';
import CategoryDownButton from '../../../assets/common/CategoryDownButton.svg';
import DetailModal from '../Market/GoodsDetailOptionsModal';
import ServiceImage1 from '../../../assets/common/ServiceImage1.svg';
import ServiceImage2 from '../../../assets/common/ServiceImage2.svg';
import ServiceImage3 from '../../../assets/common/ServiceImage3.svg';
import { useNavigation } from '@react-navigation/native'; // FIXME: 나중에 함수 props로 받아오도록 수정
import { StackNavigationProp } from '@react-navigation/stack';

const statusBarHeight = getStatusBarHeight(true);
const { width } = Dimensions.get('window');

const ServiceMarket = (/*{ navigation }*/) => {
  const [form, setForm] = useState({
    mail: '',
    domain: '',
    password: '',
    region: '',
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('추천순');

  const isStyleSelected = selectedStyles.length > 0;

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const selectOption = ({ option }: { option: string }) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title20B style={{ marginTop: 15, marginHorizontal: 15 }}>
        지금 주목해야 할 업사이클링 서비스
      </Title20B>
      <Filter11R style={{ marginBottom: 15, marginHorizontal: 15 }}>
        안 입는 옷을 장마 기간에 필요한 물품으로
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

const ServiceCard = ({
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
          marginTop: 10,
        }}>
        <Subtitle18B>{title}</Subtitle18B>
        <HeartButton like={like} onPress={() => setLike(!like)} />
      </View>
      <Body14R>{text}</Body14R>
    </TouchableOpacity>
  );
};

const FilterSection = styled.View`
  padding: 10px 0;
  background-color: white;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
`;

const FilterButton = styled.TouchableOpacity`
  padding: 5px 12px;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${LIGHTGRAY};
  margin-left: 10px;
`;

const CategoryButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  height: 28px;
  padding: 0px 8px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 12px;
  border-width: 1px;
  border-color: #612fef;
  background-color: ${({ props }: { props: any }) =>
    props.pressed ? '#612FEF' : '#FFFFFF'};
`;

const CategoryButtonText = styled.Text`
  color: ${({ props }: { props: any }) =>
    props.pressed ? '#FFFFFF' : '#222222'};
`;

const CategoryBox = styled.View`
  flex: 1;
  justify-content: center;
`;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  banner: {
    width: '100%',
    height: 200,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
  },
  separator: {
    width: 180,
  },
  dropdownContainer: {
    flex: 1,
    position: 'relative',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  dropdownButtonText: {
    fontSize: 16,
    marginRight: 5,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 50,
    left: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    zIndex: 1000,
    width: 100,
  },
  dropdownOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dropdownOptionText: {
    fontSize: 16,
  },
  cardContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: LIGHTGRAY,
    flex: 1,
    borderRadius: 10,
    marginHorizontal: 0,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  badge: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: BLACK,
  },
  heart: {
    marginLeft: 10,
  },
  mainImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  descriptionContainer: {
    paddingVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default ServiceMarket;
