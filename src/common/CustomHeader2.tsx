// New custom header design
import React from 'react';
import Logo from '../assets/common/Logo.svg';
import styled from 'styled-components/native';
import { Text, TextInput, TouchableOpacity } from 'react-native';
import Search from '../assets/common/Search.svg';

const FrameBox = styled.View`
  display: flex;
  flex-direction: row;
  height: 70px;
  padding-vertical: 15px;
  padding-horizontal: 26px;
  align-items: center;
  justify-content: space-between;
`;

const SearchContainer = styled.View`
  flex: 1;
  flex-direction: row;
  background-color: #f1f1f1;
  border-radius: 8px;
  padding-horizontal: 10px;
  align-items: center;
  justify-content: space-between;
  margin-left: 30px;
`;

const SearchInput = styled.View`
  flex: 1;
  padding: 10px;
  color: #a1a1a1;
  align-content: center;
  justify-content: center;
`;

interface CustomHeader2Props {
  navigation: any;
}

const CustomHeader2 = ({ navigation }: CustomHeader2Props) => {
  const handleOnPress = () => {
    navigation.navigate('SearchPage');
  };
  return (
    <FrameBox>
      <Logo color="#612FEF" width={41.572} height={18} />
      <SearchContainer>
        <TouchableOpacity onPress={handleOnPress}>
          <SearchInput>
            <Text style={{ color: "#929292" }}>검색어를 입력해보세요</Text>
          </SearchInput>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOnPress}>
          <Search stroke={'#000'} />
        </TouchableOpacity>
      </SearchContainer>
    </FrameBox>
  );
};

export default CustomHeader2;
