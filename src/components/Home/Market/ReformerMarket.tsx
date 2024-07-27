import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Body14R, Body16M, Subtitle16M, Title20B } from '../../../styles/GlobalText';
import { BLACK, PURPLE, LIGHTGRAY, GREEN } from '../../../styles/GlobalColor';
import Arrow from '../../../assets/common/Arrow.svg';
import { getStatusBarHeight } from 'react-native-safearea-height';
import HeartButton from '../../../common/HeartButton';

const statusBarHeight = getStatusBarHeight(true);
const { width } = Dimensions.get('window');

const ReformerMarket = ({ navigation }) => {
  return (
    <ScrollView>
      <Subtitle16M style={{ marginTop: 15 }}>내가 좋아한 리폼러</Subtitle16M>

      <FilterSection>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['리폼러1', '리폼러2', '리폼러3', '리폼러4'].map((item, index) => (
            <FilterButton key={index}>
              <Text>{item}</Text>
            </FilterButton>
          ))}
        </ScrollView>
      </FilterSection>

     <View style={{margin:10}} />

      <View style={styles.reformerList,{flex:1}}>

        <ReformerCard name="리폼러1" rating="★ 4.6 (80)" tag="빈티지" />
        <ReformerCard name="리폼러2" rating="★ 4.7 (90)" tag="모던" />
        <ReformerCard name="리폼러3" rating="★ 4.5 (70)" tag="클래식" />
        <ReformerCard name="리폼러4" rating="★ 4.8 (100)" tag="컨템포러리" />
      </View>
    </ScrollView>
  );
};

const ReformerCard = ({ name, rating, tag }) => {
  const [like, setLike] = useState(false);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.reformerInfo}>
        <Image style={styles.avatar} source={{ uri: 'https://via.placeholder.com/50' }} />
        <View>
          <Subtitle16M>{name}</Subtitle16M>
          <Body16M>{rating}</Body16M>
        </View>
        <TouchableOpacity style={styles.badge}>
          <Text style={{ color: BLACK }}>{tag}</Text>
        </TouchableOpacity>
        <HeartButton like={like} onPress={() => setLike(!like)} />
      </View>
      <View style={{marginBottom:4}}>
          <Text> 리폼러의 룩북 </Text>
      </View>
      <View style={styles.portfolio}>
        {[...Array(4)].map((_, idx) => (
          <Image key={idx} style={styles.portfolioImage} source={{ uri: 'https://via.placeholder.com/70' }} />
        ))}
      </View>
    </View>
  );
};

const FilterSection = styled.View`
  padding: 10px 0;
  background-color: white;
`;

const FilterButton = styled.TouchableOpacity`
  padding: 5px 12px;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${LIGHTGRAY};
  margin-left: 10px;
`;

const styles = StyleSheet.create({
  reformerList: {
    paddingHorizontal: 20,
    backgroundColor: LIGHTGRAY,
  },
  cardContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: LIGHTGRAY,
    flex:1,
  },
  reformerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  badge: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
    marginLeft: 'auto',
    borderWidth: 1,
    borderColor: BLACK,
  },
  heart: {
    marginLeft: 10,
  },
  portfolio: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  portfolioImage: {
    width: 70,
    height: 70,
    borderRadius: 5,
  },
});

export default ReformerMarket;
