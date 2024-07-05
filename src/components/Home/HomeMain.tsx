import { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { Filter14M } from '../../styles/GlobalText';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
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
  /* padding: 6px; */
  justify-content: center;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
`;

const CategoryBox = styled.View`
  display: flex;
  flex-direction: row;
  height: 52px;
  padding: 12px 16px;
  align-items: flex-start;
  gap: 12px;
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
`;

interface SignupProps {
  mail: string;
  domain: string;
  password: string;
  region: string;
} // 의미 없음

interface HomeTabViewProps {
  onSearch: () => void;
  onTabChange: (tab: 'Goods' | 'Market') => void;
  selectedTab: 'Goods' | 'Market';
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
  const [selectedTabView, setSelectedTabView] = useState<
    'all' | 'outer' | 'top' | 'bottom' | 'bag' | 'hat' | 'accessories'
  >('all');
  const [form, setForm] = useState<SignupProps>({
    mail: '',
    domain: '',
    password: '',
    region: '',
  });
  const [modalOpen, setModalOpen] = useState(false);
  //글자 간격 수정 필요!
  return (
    <>
      {selectedTab === 'Goods' && (
        <CategoryBox>
          <View>
            <CategoryButton onPress={() => setModalOpen(true)}>
              <Text style={{ fontSize: 14, fontWeight: '500', color: '222' }}>
                스타일
              </Text>
              <CategoryDownButton />
            </CategoryButton>
          </View>
        </CategoryBox>
      )}
      {selectedTab === 'Market' && (
        <CategoryBox>
          <View>
            <CategoryButton onPress={() => setModalOpen(true)}>
              <Text style={{ fontSize: 14, fontWeight: '500', color: '222' }}>
                스타일
              </Text>
              <CategoryDownButton />
            </CategoryButton>
          </View>
        </CategoryBox>
      )}
      <DetailModal
        open={modalOpen}
        setOpen={setModalOpen}
        value={form.region}
        setValue={text =>
          setForm(prev => {
            return { ...prev, region: text };
          })
        }
      />
    </>
  );
};

export default HomeTabView;
