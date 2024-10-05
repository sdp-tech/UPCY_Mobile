import { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { StyleFilterButton } from './components/StyleFilterButton';
import styled from 'styled-components/native';
import DetailModal from './Market/GoodsDetailOptionsModal';
import DropDown from '../../assets/common/DropDown.svg';
import FilterElement from './Market/FilterElement';
import { Styles } from '../../types/UserTypes';

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

interface SignupProps {
  mail: string;
  domain: string;
  password: string;
  region: string;
} // 의미 없음

export type SelectedOptionProps =
  | '추천순'
  | '인기순'
  | '가격순'
  | '최신순'
  | '판매순';

const selectOptionDropdown: SelectedOptionProps[] = [
  '추천순',
  '인기순',
  '가격순',
  '최신순',
  '판매순',
] as SelectedOptionProps[];

const stylesList: Styles[] = [
  '빈티지',
  '미니멀',
  '캐주얼',
  '페미닌',
  '글램',
  '스트릿',
  '키치',
  '스포티',
  '걸리시',
] as Styles[];

interface HomeTabViewProps {
  onSearch: () => void;
  onTabChange: (tab: 'Goods' | 'Market' | 'temp') => void;
  selectedTab: 'Goods' | 'Market' | 'temp';
  setSelectedFilterOption?: (
    selectedFilterOption: SelectedOptionProps | undefined,
  ) => void;
}

const HomeTabView = ({
  onSearch,
  onTabChange,
  selectedTab,
  setSelectedFilterOption, // selected filter option
}: HomeTabViewProps) => {
  const [form, setForm] = useState<SignupProps>({
    mail: '',
    domain: '',
    password: '',
    region: '',
  });
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [styleFilterOpen, setStyleFilterOpen] = useState<boolean>(false);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<SelectedOptionProps>(
    selectOptionDropdown[0],
  );

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const selectOption = (option: SelectedOptionProps) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  const onPressStyleFilterList = (/*selectedStyles: Styles[]*/) => {
    // TODO: set selectedStyles here
  };

  return (
    <>
      <CategoryBox>
        {selectedTab === 'Goods' && (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <StyleFilterButton onPressStyleFilterButton={setStyleFilterOpen} />
            {/* FIXME */}
            {/* {styleFilterOpen && (
            <FilterElement
              list={stylesList}
              onPress={onPressStyleFilterList}
              type="style"
            />
          )} */}
            <View style={styles.dropdownContainer}>
              <TouchableOpacity
                onPress={toggleDropdown}
                style={styles.dropdownButton}>
                <Text style={styles.dropdownButtonText}>{selectedOption}</Text>
                <DropDown />
              </TouchableOpacity>
              {dropdownOpen && (
                <View style={styles.dropdownMenu}>
                  {selectOptionDropdown.map(option => (
                    <TouchableOpacity
                      key={option}
                      onPress={() => {
                        selectOption(option);
                        setSelectedFilterOption?.(option);
                      }}
                      style={styles.dropdownOption}>
                      <Text
                        style={
                          selectedOption === option
                            ? styles.dropdownSelectedOptionText
                            : styles.dropdownOptionText
                        }>
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
        )}
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
    fontStyle: 'normal',
    fontWeight: '400',
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
    fontFamily: 'Pretendard Variable',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24,
    color: '#000',
  },
  dropdownOptionText: {
    fontFamily: 'Pretendard Variable',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 16,
  },
});
