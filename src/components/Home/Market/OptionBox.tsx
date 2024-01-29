import { useState, useEffect } from 'react';
import { View, SafeAreaView, FlatList, Text } from 'react-native';
import styled from 'styled-components/native';
import { Body14R, Body16B } from '../../../styles/GlobalText';


const OptionPage = () => {
  const data = [
    { label: '옵션명1',price:'1000원', data: '상세설명, 사진첨부 가능'},
    { label: '옵션명2',price:'2000원', data: '상세설명, 사진첨부 가능'}
  ]

  return (
    <View>
      <Text style={{padding:16, fontWeight:'700', color: 'black'}}>옵션별 추가 금액</Text>
      <FlatList
        data={data}
        renderItem={({item}:any) => {
          return (
            <InfoSection>
              <Body16B>{item.label}</Body16B>
              <Body14R style={{textAlign: 'right'}}>{item.price}</Body14R>
              <Body14R style={{textAlign: 'center'}}>{item.data}</Body14R>
            </InfoSection>
          )
        } }
      />
      <Text>주문 시 유의사항</Text>
    </View>
  )
}

const InfoSection = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
`

export default OptionPage;