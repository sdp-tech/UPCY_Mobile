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
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
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
  width: 720px;
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
      <Filter14M style={{ color: pressed ? '#222' : '#929292' }}></Filter14M>
    </HomeTabViewButton>
  );
};

const HomeTabView = ({ onSearch, onTabChange ,selectedTab }: HomeTabViewProps) => {
  const [selectedTabView, setSelectedTabView] = useState<
    'all' | 'outer' | 'top' | 'bottom' | 'bag' | 'hat' | 'accessories'
  >('all');
  const [modalOpen, setModalOpen] = useState(false);
  //글자 간격 수정 필요!
  return (
    <>
      {selectedTab === 'Goods' && (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
          <HomeTabViewBox>
            <HomeTabViewButton
              pressed={selectedTabView === 'all'}
              onPress={() => setSelectedTabView('all')}>
              {selectedTabView === 'all' && <TabViewSpot />}
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: selectedTabView == 'all' ? '#DBFC72' : '#FFF',
                }}>
                전체
              </Text>
            </HomeTabViewButton>
            <HomeTabViewButton
              pressed={selectedTabView === 'outer'}
              onPress={() => setSelectedTabView('outer')}>
              {selectedTabView === 'outer' && <TabViewSpot />}
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: selectedTabView == 'outer' ? '#DBFC72' : '#FFF',
                }}>
                아우터
              </Text>
            </HomeTabViewButton>
            <HomeTabViewButton
              pressed={selectedTabView === 'top'}
              onPress={() => setSelectedTabView('top')}>
              {selectedTabView === 'top' && <TabViewSpot />}
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: selectedTabView == 'top' ? '#DBFC72' : '#FFF',
                }}>
                상의
              </Text>
            </HomeTabViewButton>
            <HomeTabViewButton
              pressed={selectedTabView === 'bottom'}
              onPress={() => setSelectedTabView('bottom')}>
              {selectedTabView === 'bottom' && <TabViewSpot />}
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: selectedTabView == 'bottom' ? '#DBFC72' : '#FFF',
                }}>
                하의
              </Text>
            </HomeTabViewButton>
            <HomeTabViewButton
              pressed={selectedTabView === 'bag'}
              onPress={() => setSelectedTabView('bag')}>
              {selectedTabView === 'bag' && <TabViewSpot />}
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: selectedTabView == 'bag' ? '#DBFC72' : '#FFF',
                }}>
                가방
              </Text>
            </HomeTabViewButton>
            <HomeTabViewButton
              pressed={selectedTabView === 'hat'}
              onPress={() => setSelectedTabView('hat')}>
              {selectedTabView === 'hat' && <TabViewSpot />}
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: selectedTabView == 'hat' ? '#DBFC72' : '#FFF',
                }}>
                모자
              </Text>
            </HomeTabViewButton>
            <HomeTabViewButton
              pressed={selectedTabView === 'accessories'}
              onPress={() => setSelectedTabView('accessories')}>
              {selectedTabView === 'accessories' && <TabViewSpot />}
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: selectedTabView == 'accessories' ? '#DBFC72' : '#FFF',
                }}>
                잡화
              </Text>
            </HomeTabViewButton>
          </HomeTabViewBox>
        </View>
      </ScrollView>
      )}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
          <CategoryBox>
            <CategoryButton onPress = {() => setModalOpen(true)}>
              <Text style={{ fontSize: 14, fontWeight: '500', color: '222' }} >
                스타일
              </Text>
              <CategoryDownButton />
            </CategoryButton>
            <CategoryButton>
              <Text style={{ fontSize: 14, fontWeight: '500', color: '222' }}>
                재질
              </Text>
              <CategoryDownButton />
            </CategoryButton>
            <CategoryButton>
              <Text style={{ fontSize: 14, fontWeight: '500', color: '222' }}>
                핏
              </Text>
              <CategoryDownButton />
            </CategoryButton>
            <CategoryButton>
              <Text style={{ fontSize: 14, fontWeight: '500', color: '222' }}>
                디테일
              </Text>
              <CategoryDownButton />
            </CategoryButton>
            <CategoryButton>
              <Text style={{ fontSize: 14, fontWeight: '500', color: '222' }}>
                금액별
              </Text>
              <CategoryDownButton />
            </CategoryButton>
            <CategoryButton>
              <Text style={{ fontSize: 14, fontWeight: '500', color: '222' }}>
                수선 요구 기간
              </Text>
              <CategoryDownButton />
            </CategoryButton>
          </CategoryBox>
        </View>
        {modalOpen && <DetailModal
          open = {modalOpen}
          setOpen={setModalOpen}/>}
      </ScrollView>
    
    </>
        
  );
};


export default HomeTabView;
