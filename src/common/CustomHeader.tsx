import { useEffect, useState } from 'react';
import { Filter14M } from '../styles/GlobalText';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
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
  background: #612fef;
`;

const ToggleButton = styled.TouchableOpacity<{ pressed: boolean }>`
  display: flex;
  flex: 1;
  height: 28px;
  padding: 0px 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-bottom-width: ${(props: { pressed: boolean }) =>
    props.pressed ? '2px' : '0px'};
  border-color: ${(props: { pressed: boolean }) =>
    props.pressed ? '#FFFFFF' : 'transparent'};
`;

const BannerText = styled.View`
  position: absolute;
  bottom: 10px;
  left: 10px;
  padding: 5px;
`;

const BannerTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
`;

const BannerSubtitle = styled.Text`
  color: white;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
`;

const BannerPageNumber = styled.Text`
  position: absolute;
  bottom: 10px;
  right: 20px;
  color: white;
  font-size: 14px;
`;

interface CustomHeaderProps {
  onSearch: () => void;
  onAlarm?: () => void;
  onTabChange: (tab: 'Goods' | 'Market' | 'temp') => void;
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
      disabled={!pressable}></ToggleButton>
  );
};

const CustomHeader = ({
  onSearch,
  onAlarm,
  onTabChange,
}: CustomHeaderProps) => {
  const [selectedTab, setSelectedTab] = useState<'Goods' | 'Market' | 'temp'>(
    'Goods',
  );

  useEffect(() => {
    setSelectedTab(selectedTab);
  }, [selectedTab]);

  //눌렀을 때 색 변경 및 font weight,size 변경 안 됨?
  return (
    <>
      <FrameBox>
        <Logo color="#DBFC72" width={41.572} height={18} />
        <View style={{ flex: 1 }}></View>
        <Search />
        <Bell />
      </FrameBox>
      <ToggleBox>
        <ToggleButton
          pressed={selectedTab === 'Goods'}
          onPress={() => {
            setSelectedTab('Goods');
            onTabChange('Goods');
          }}>
          <Text style={TextStyles.tabTitle}>서비스</Text>
        </ToggleButton>
        <ToggleButton
          pressed={selectedTab === 'Market'}
          onPress={() => {
            setSelectedTab('Market');
            onTabChange('Market');
          }}>
          <Text style={TextStyles.tabTitle}>리폼러</Text>
        </ToggleButton>
        <ToggleButton
          pressed={selectedTab === 'temp'}
          onPress={() => {
            setSelectedTab('temp');
            onTabChange('temp');
          }}>
          <Text style={TextStyles.tabTitle}>임시 버튼</Text>
        </ToggleButton>
      </ToggleBox>
      {/* {selectedTab === 'Goods' && (
        <View style={{  }}>
        <Advertisment width={screenWidth + 10} height={128} preserveAspectRatio="none" />
        <BannerText>
          <BannerTitle>여행 필수템, 업사이클링 보스턴백</BannerTitle>
          <BannerSubtitle>매거진에 있는 글 홍보되는 배너 ~</BannerSubtitle>

        </BannerText>
          <BannerPageNumber>1/10</BannerPageNumber>  
      </View>
      )} */}
    </>
  );
};

const TextStyles = StyleSheet.create({
  tabTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 5,
  },
});

export default CustomHeader;
