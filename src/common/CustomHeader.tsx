import { useEffect, useState } from 'react';
import { Filter14M } from '../styles/GlobalText';
import { Text, View, TouchableOpacity } from 'react-native';
import Search from '../assets/common/Search.svg';
import Logo from '../assets/common/Logo.svg';
import Bell from '../assets/common/Bell.svg';
import styled from 'styled-components/native';
import { GREEN } from '../styles/GlobalColor';

const FrameBox = styled.View`
  display: flex;
  flex-direction: row;
  height: 70px;
  padding: 20px 16px;
  align-items: flex-start;
  justify-content: space-between;
  background: #612fef;
`;
const ToggleBox = styled.View`
  display: flex;
  flex-direction: row;
  height: 52px;
  padding: 12px 16px;
  align-items: center;
  background: #612FEF;
`;

const ToggleButton = styled.TouchableOpacity<{ pressed: boolean }>`
  display: flex;
  flex-direction: row;
  height: 28px;
  padding: 0px 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-bottom-width:2px;
  border-color: #D9D9D9;
`;

interface CustomHeaderProps {
  onSearch: () => void;
  onAlarm?: () => void;
  onTabChange: (tab: 'Goods'| 'Market') => void;
}

interface ToggleButtonParams {
  pressable?: boolean;
}

const Toggletag = ({ pressable }: ToggleButtonParams) => {
  const [pressed, setPressed] = useState<boolean>(false);
  return (
    <ToggleButton
      pressed={pressed}
      onPress={() => setPressed(!pressed)}
      disabled={!pressable}>
      <Filter14M style={{ color: pressed ? '#222' : '#929292' }}></Filter14M>
    </ToggleButton>
  );
};

const CustomHeader = ({ onSearch, onAlarm, onTabChange }: CustomHeaderProps) => {
  const [selectedTab, setSelectedTab] = useState<'Goods' | 'Market'>('Goods');
 
  useEffect(() =>{
    setSelectedTab(selectedTab);
  }, [selectedTab])
  
  //눌렀을 때 색 변경 및 font weight,size 변경 안 됨?
  return (
    <>
      <FrameBox>
        <Logo color="#DBFC72" width={41.572} height={18} />
        <View style={{ flex: 1 }}>
        </View>
            
        <Search />
        <Bell />
      </FrameBox>
      <ToggleBox>
        <ToggleButton
          pressed={selectedTab === 'Goods'}
          onPress={() => {setSelectedTab('Goods'); onTabChange('Goods');}}>
          <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700', marginRight: 5 }}>
            업씨몰
          </Text>
        </ToggleButton>
        <ToggleButton
          pressed={selectedTab === 'Market'}
          onPress={() => {setSelectedTab('Market'); onTabChange('Market');}}>
          <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700', marginRight: 5 }}>
            리폼러
          </Text>
        </ToggleButton>
      </ToggleBox>
    </>
  );
};

export default CustomHeader;
