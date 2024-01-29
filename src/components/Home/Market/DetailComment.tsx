import { useState, useEffect } from 'react';
import { View, SafeAreaView, FlatList, Text, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { Body14R, Body16B } from '../../../styles/GlobalText';


const DetailComment = () => {
  const data = [
    { nickname: '닉네임', date: '2024-01-06', score:'⭐⭐⭐⭐⭐', description: "후기글 어쩌고 저쩌고"},
    { nickname: '닉네임2', date: '2024-01-06', score:'⭐⭐⭐⭐⭐', description: "후기글 어쩌고 저쩌고"},
    { nickname: '닉네임3', date: '2024-01-06', score:'⭐⭐⭐⭐⭐', description: "후기글 어쩌고 저쩌고"},
  ]

  return (
    <SafeAreaView>
      <View style={{alignItems:'center', borderBottomWidth: 5, borderColor: '#DFDFDF'}}>
        <Body16B>후기 ({data.length})</Body16B>
      </View>
      <FlatList
        data={data}
        renderItem={({item}:any) => {
          return (
            <InfoSection>
              <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                <Body16B>{item.nickname} | {item.date}</Body16B>
                <Body16B>{item.score}</Body16B>
              </View>
              <Body14R>{item.description}</Body14R>
            </InfoSection>
          )
        } }
      />
    </SafeAreaView>
  )
}

const InfoSection = styled.View`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-bottom-width: 1px;
  border-color: #DFDFDF;
`

export default DetailComment;