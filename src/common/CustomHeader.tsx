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
  height: 51px;
  padding: 0px 16px;
  align-items: center;
  justify-content: center;
  background: #612fef;
`;
const ToggleBox = styled.View`
  display: flex;
  flex-direction: row;
  padding: 2px;
  width: 210px;
  width: 210px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: #fff;
  align-self: center;
`;

const ToggleButton = styled.TouchableOpacity<{ pressed: boolean }>`
  display: flex;
  width: 100px;
  width: 100px;
  height: 28px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: ${(props: { pressed: boolean }) =>
    props.pressed ? '#DBFC72' : '#FFF'};
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
        <Logo color="#DBFC72" width={40} height={20} />
        <View style={{ flex: 1 }}>
          <ToggleBox>
            <ToggleButton
              pressed={selectedTab === 'Goods'}
              onPress={() => {setSelectedTab('Goods'); onTabChange('Goods');}}>
              <Text style={{ fontSize: 16, fontWeight: '900', marginRight: 5 }}>
                상품
              </Text>
            </ToggleButton>
            <ToggleButton
              pressed={selectedTab === 'Market'}
              onPress={() => {setSelectedTab('Market'); onTabChange('Market');}}>
              <Text style={{ fontSize: 16, fontWeight: '900', marginRight: 5 }}>
                마켓
              </Text>
            </ToggleButton>
          </ToggleBox>
        </View>
        <Search />
        <Bell />
      </FrameBox>
    </>
  );
};

export default CustomHeader;
