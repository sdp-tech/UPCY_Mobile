import { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { Filter14M } from '../../styles/GlobalText';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import CustomHeader from '../../common/CustomHeader';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParams } from '../../pages/Home';
import TabViewSpot from '../../assets/common/TabViewSpot.svg';
import CategoryDownButton from '../../assets/common/CategoryDownButton.svg';
import styled from 'styled-components/native';
import { PURPLE } from '../../styles/GlobalColor';
import DetailModal from './Market/GoodsDetailOptionsModal';
import CategoryDropDown from './Market/SortingOptionModal';
import DropDown from '../../assets/common/DropDown.svg';

const HomeTabViewBox = styled.View`
  display: flex;
  flex-direction: row;
  width: 712px;
  height: 36px;
  background: #612fef;
`;
const HomeTabViewButton = styled.TouchableOpacity<{ pressed: boolean }>`
  display: flex;
  flex-direction: row;
  width: 72px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
`;

const CategoryBox = styled.View`
  z-index: 1000;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  height: 52px;
  padding: 12px 16px;
  background: #fff;
`;

const CategoryButton = styled.TouchableOpacity<{ pressed: boolean }>`
  display: flex;
  flex-direction: row;
  height: 28px;
  padding: 0px 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 12px;
  border-width: 1px;
  border-color: #612fef;
  background-color: ${(props) => (props.pressed ? '#612FEF' : '#FFFFFF')};
`;

const CategoryButtonText = styled.Text<{ pressed: boolean }>`
  color: ${(props) => (props.pressed ? '#FFFFFF' : '#222222')};
`;

interface SignupProps {
  mail: string;
  domain: string;
  password: string;
  region: string;
}// 의미 없음

interface HomeTabViewProps {
  onSearch: () => void;
  onTabChange: (tab: 'Goods' | 'Market' | 'temp') => void;
  selectedTab: 'Goods' | 'Market' | 'temp';
}

interface HomeTabViewButtonParams {
  pressable?: boolean;
}

const HomeTabViewtag = ({ pressable }: HomeTabViewButtonParams) => {
  const [pressed, setPressed] = useState<boolean>(false);
  return (
    <HomeTabViewButton
      pressed={pressed}
      onPress={() => setPressed(!pressed)}
      disabled={!pressable}>
      <Filter14M style={{ color: pressed ? '#222222' : '#929292' }}></Filter14M>
    </HomeTabViewButton>
  );
};
const HomeTabView = ({
  onSearch,
  onTabChange,
  selectedTab,
}: HomeTabViewProps) => {
  const [form, setForm] = useState<SignupProps>({
    mail: '',
    domain: '',
    password: '',
    region: '',
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('추천순');

  const isStyleSelected = selectedStyles.length > 0;

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const selectOption = (option: string) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  return (
    <>
      <CategoryBox>
        <View>
          <CategoryButton pressed={isStyleSelected} onPress={() => setModalOpen(true)}>
            <CategoryButtonText pressed={isStyleSelected}>
              스타일
            </CategoryButtonText>
            <CategoryDownButton />
          </CategoryButton>
        </View>
        <View style={{ flex: 1 }}>
        </View>
        <View style={styles.dropdownContainer}>
          <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
            <Text style={styles.dropdownButtonText}>{selectedOption}</Text>
            <DropDown/>
          </TouchableOpacity>
          {dropdownOpen && (
            <View style={styles.dropdownMenu}>
              {['추천순', '인기순', '가격순', '최신순', '판매순'].map(option => (
                <TouchableOpacity key={option} onPress={() => selectOption(option)} style={styles.dropdownOption}>
                  <Text style={selectedOption === option ? styles.dropdownSelectedOptionText : styles.dropdownOptionText}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </CategoryBox>
      <DetailModal
        open={modalOpen}
        setOpen={setModalOpen}
        value={form.region}
        setValue={text =>
          setForm(prev => {
            return { ...prev, region: text };
          })
        }
        selectedStyles={selectedStyles}
        setSelectedStyles={setSelectedStyles}
      />
    </>
  );
};

export default HomeTabView;

const styles = StyleSheet.create({
  selectItem: {
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 15,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownContainer: {
    position: 'relative',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownButtonText: {
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 24,
    marginRight: 5,
    color: '#000',
  },
  dropdownMenu: {
    alignItems: 'center',
    position: 'absolute',
    top: 30,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    zIndex: 1000,
    width: 100,
    elevation: 5, 
  },
  dropdownOption: {
    padding: 10,
  },
  dropdownSelectedOptionText: {
    fontFamily: "Pretendard Variable",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 24,
    color: '#000',
  },
  dropdownOptionText: {
    fontFamily: "Pretendard Variable",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 16,
  },
});
