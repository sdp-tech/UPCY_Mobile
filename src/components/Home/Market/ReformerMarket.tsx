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
import { Body16M, Subtitle16M } from '../../../styles/GlobalText';
import { BLACK, LIGHTGRAY } from '../../../styles/GlobalColor';
import { getStatusBarHeight } from 'react-native-safearea-height';
// import HeartButton from '../../../common/HeartButton';
import DetailModal from '../Market/GoodsDetailOptionsModal';

const statusBarHeight = getStatusBarHeight(true);
const { width } = Dimensions.get('window');

const ReformerMarket = (/*{ navigation }*/) => {
  const [form, setForm] = useState({
    mail: '',
    domain: '',
    password: '',
    region: '',
  });

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
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
    <ScrollView>
      <Subtitle16M style={{ marginTop: 15 }}> 내가 좋아한 리폼러</Subtitle16M>

      <FilterSection>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['리폼러1', '리폼러2', '리폼러3', '리폼러4'].map((item, index) => (
            <FilterButton key={index}>
              <Text>{item}</Text>
            </FilterButton>
          ))}
        </ScrollView>
      </FilterSection>

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
        <ReformerCard name="리폼러1" rating="★ 4.6 (80)" tag="빈티지" />
        <ReformerCard name="리폼러2" rating="★ 4.7 (90)" tag="캐주얼" />
        <ReformerCard name="리폼러3" rating="★ 4.5 (70)" tag="홈웨어" />
        <ReformerCard name="리폼러4" rating="★ 4.8 (100)" tag="스포티" />

        <View style={{ margin: 70 }} />
      </View>
    </ScrollView>
  );
};

const ReformerCard = ({
  name,
  rating,
  tag,
}: {
  name: string;
  rating: string;
  tag: string;
}) => {
  const [like, setLike] = useState<boolean>(false);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.reformerInfo}>
        <Image
          style={styles.avatar}
          source={{ uri: 'https://via.placeholder.com/50' }}
        />
        <View>
          <Subtitle16M>{name}</Subtitle16M>
          <Body16M>{rating}</Body16M>
        </View>
        <TouchableOpacity style={styles.badge}>
          <Text style={{ color: BLACK }}>{tag}</Text>
        </TouchableOpacity>
        {/* <HeartButton like={like} onPress={() => setLike(!like)} /> */}
      </View>
      <View style={{ marginBottom: 4 }}>
        <Text>리폼러의 룩북</Text>
      </View>
      <View style={styles.portfolio}>
        {[...Array(4)].map((_, idx) => (
          <Image
            key={idx}
            style={styles.portfolioImage}
            source={{ uri: 'https://via.placeholder.com/70' }}
          />
        ))}
      </View>
    </View>
  );
};

const FilterSection = styled.View`
  padding: 10px 0;
  background-color: white;
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
  background-color: ${(
    { props }: { props: any }, // TODO: 나중에 props의 type specify 필요
  ) => (props.pressed ? '#612FEF' : '#FFFFFF')};
`;

const CategoryButtonText = styled.Text`
  color: ${(
    { props }: { props: any }, // TODO: 나중에 props의 type specify 필요
  ) => (props.pressed ? '#FFFFFF' : '#222222')};
`;

const CategoryBox = styled.View`
  flex: 1;
  justify-content: center;
`;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
  },
  separator: {
    width: 180, // Adjust this if needed
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
  },
  reformerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
    marginLeft: 'auto',
    borderWidth: 1,
    borderColor: BLACK,
  },
  heart: {
    marginLeft: 10,
  },
  portfolio: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  portfolioImage: {
    width: 70,
    height: 70,
    borderRadius: 5,
  },
});

export default ReformerMarket;
