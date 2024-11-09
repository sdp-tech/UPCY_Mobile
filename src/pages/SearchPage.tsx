import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import Search from '../assets/common/Search.svg';
import ArrowIcon from '../assets/common/Arrow.svg';
import { BLACK2 } from '../styles/GlobalColor';

const Container = styled.View`
  padding: 16px;
  background-color: #fff;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const BackButton = styled(TouchableOpacity)`
  margin-right: 10px;
`;

const SearchContainer = styled.View`
  margin-left: 21px;
  flex-direction: row;
  background-color: #f1f1f1;
  border-radius: 8px;
  padding-horizontal: 8px;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  height: 50px;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  padding-horizontal: 10px;
  font-size: 14px;
  color: #a1a1a1;
`;

const SearchPage = () => {
  const navigation = useNavigation();

  const recommendedKeywords = [
    '하얀',
    '파우치',
    '데님',
    '워머',
    '스포티',
    '캐주얼',
    '떡볶이코트',
    '리본 옵션',
  ];

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <ArrowIcon color={BLACK2} />
        </BackButton>
        <SearchContainer>
          <SearchInput
            placeholder="검색어를 입력해보세요"
            placeholderTextColor="#929292"
            editable={true}
          />
          <Search stroke={'#000'} />
        </SearchContainer>
      </Header>
      <View style={styles.container}>
        <Text style={styles.title}>추천 검색어</Text>
        <View style={styles.keywordContainer}>
          {recommendedKeywords.map((keyword, index) => (
            <TouchableOpacity key={index} style={styles.keywordButton}>
              <Text style={styles.keywordText}>{keyword}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  keywordContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  keywordButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    marginRight: 8,
    marginBottom: 8,
  },
  keywordText: {
    fontSize: 14,
    color: '#333',
  },
});

export default SearchPage;
