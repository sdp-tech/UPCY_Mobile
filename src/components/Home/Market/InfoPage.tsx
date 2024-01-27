import { useState, useEffect } from 'react';
import { View, SafeAreaView, FlatList, Text } from 'react-native';
import styled from 'styled-components/native';
import { Body14R, Body16B } from '../../../styles/GlobalText';


const InfoPage = () => {
  const data = [
    { label: '학교/학과', data: '업씨대학교 패션디자인학과'},
    { label: '실력/경력', data: '한국패션디자인공모전 동상\n업씨패션회사 인턴 6개월'}, 
    { label: '특수소재', data: '비즈, 퍼'},
    { label: '주요 활동지역', data: '서울 서대문구'},
    { label: '포트폴리오', data: ''}
  ]

  return (
    <FlatList
      data={data}
      renderItem={({item}:any) => {
        return (
          <InfoSection>
            <Body16B>{item.label}</Body16B>
            <Body14R style={{textAlign: 'right'}}>{item.data}</Body14R>
          </InfoSection>
        )
      } }
    />
  )
}

const InfoSection = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
  border-bottom-width: 1px;
  border-color: #DFDFDF;
`

export default InfoPage;