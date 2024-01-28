import { useState, useEffect } from 'react';
import { View, SafeAreaView, FlatList, Text } from 'react-native';
import styled from 'styled-components/native';
import { Body14R, Body16B } from '../../../styles/GlobalText';


const DetailBoxPage = () => {
  const data = [
    { label: '카테고리', data: '아우터'},
    { label: '재질', data: '데님'}, 
    { label: '스타일', data: '빈티지'},
    { label: '핏', data: '노멀'},
    { label: '제작 기간', data: '3주'},
    { label: '서비스 상세', data: '자유 양식'},
  ]

  return (
    <FlatList
      data={data}
      renderItem={({item}:any) => {
        return (
          <InfoSection>
            <Body16B>{item.label}</Body16B>
            <Body14R style={{marginLeft:10}}>{item.data}</Body14R>
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

export default DetailBoxPage;