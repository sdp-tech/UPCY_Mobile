import { useState, useEffect } from 'react';
import { View, SafeAreaView, FlatList, Text } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import styled from 'styled-components/native';
import { Body14R, Body16B, Caption11M } from '../../../styles/GlobalText';
import ReviewComment from '../components/ReviewComment.tsx';

const InfoPage = () => {
  const data = [
    { label: '주요 활동지역', data: '서울 서대문구' },
    { label: '실력/경력', data: '업씨대학교 패션디자인학과\n한국패션디자인공모전 동상\n업씨패션회사 인턴 6개월' },
    { label: '주소', data: '서초 중앙로 56길 11 00프라자 3층' },
    { label: '포트폴리오', data: '' }
  ];

  const renderHeader = () => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 16 }}>
        <ReviewComment value='스포티' backgroundColor='#612FEF' />
        <ReviewComment value='영캐주얼' backgroundColor='#612FEF' />
        <ReviewComment value='깔끔' backgroundColor='#612FEF' />
      </View>
    );
  };

  return (
    <Tabs.FlatList
      data={data}
      ListHeaderComponent={renderHeader}
      renderItem={({ item }: any) => {
        return (
          <InfoSection>
            <Body16B>{item.label}</Body16B>
            <Body14R style={{ textAlign: 'right' }}>{item.data}</Body14R>
          </InfoSection>
        );
      }}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const InfoSection = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
  border-bottom-width: 1px;
  border-color: #DFDFDF;
`;

export default InfoPage;
