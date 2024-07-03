import { useEffect, useState } from 'react';
import { Filter14M } from '../styles/GlobalText';
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Search from '../assets/common/Search.svg';
import Logo from '../assets/common/Logo.svg';
import Bell from '../assets/common/Bell.svg';
import styled from 'styled-components/native';
import Advertisment from '../assets/common/Advertisement.svg';
import { GREEN } from '../styles/GlobalColor';

const screenWidth = Dimensions.get('window').width;

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
  flex: 1;
  height: 28px;
  padding: 0px 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-bottom-width: ${(props : {pressed: boolean}) => (props.pressed ? '2px' : '0px')};
  border-color: ${(props : {pressed: boolean})  => (props.pressed ? '#FFFFFF' : 'transparent')};
`;

const AdvertisementBox = styled.View`
  width: ${screenWidth}px;
  height: 128px;
  align-items: center;
  justify-content: center;
  padding:10px;
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
      {selectedTab === 'Goods' && (
        <Advertisment width = {screenWidth+10} height={128} preserveAspectRatio="none"/>
      )}
    </>
  );
};

export default CustomHeader;
