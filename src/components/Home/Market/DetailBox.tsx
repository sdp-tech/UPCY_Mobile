import { useState, useEffect } from 'react';
import { View, SafeAreaView, FlatList, Text, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Body14R, Body16B } from '../../../styles/GlobalText';
import { Tabs } from 'react-native-collapsible-tab-view';


const DetailBoxPage = () => {
  const data = [
    { label: '카테고리', data: '아우터'},
    { label: '재질', data: '데님'}, 
    { label: '스타일', data: '빈티지'},
    { label: '핏', data: '노멀'},
    { label: '제작 기간', data: '3주'},
    { label: '서비스 상세', data: `1958년에는 원예시험장을 설립하여 연구를 본격화하기 시작하였고, 1991년 말, 원예시험장에서 과수연구소를 분리하고 대구사과연구소를 신설하여 사과연구를 전담하도록 하였다.사과는 수확시기에 따라 조생종, 중생종, 만생종으로 나뉜다. 8월 하순 이전이 최성수확기인 조생종에는 미광, 조홍, 서홍, 쓰가루(아오리) 등이 있고, 최성수확기가 9월 상순에서 10월 중순까지인 중생종에는 홍로, 홍월, 양광, 추광, 골든딜리셔스, 세계일, 조나골드, 시나노스위트 등이 있다. 10월 하순 이후가 최성수확기인 만생종에는 후지(부사), 홍옥, 감홍, 화홍 등이 있다.

    알칼리성 식품으로, 칼로리가 적고 몸에 좋은 성분이 많이 들어있다. 식이섬유는 혈관에 쌓이는 유해 콜레스테롤을 몸밖으로 내보내고 유익한 콜레스테롤을 증가시켜 동맥경화를 예방해준다. 또한 칼륨은 몸속의 염분을 배출시켜 고혈압 예방과 치료에 도움을 준다. 
    
    수용성 식이섬유인 펙틴 또한 위액의 점도를 높히고 악성 콜레스테롤을 내보내어 급격한 혈압상승을 억제해주며, 페놀산은 체내의 불안정한 유해산소를 무력화시켜 뇌졸중을 예방한다. 사과에 함유된 케세틴은 폐기능을 강하게 하여 담배연기나 오염물질로부터 폐를 보호해준다. 또한 피로물질을 제거해주는 유기산과 피부미용에 좋은 비타민 C도 다량 함유되어 있다`},
  ]

  return (
    <Tabs.FlatList
      data={data}
      renderItem={({item}:any) => {
        return (
          <View style={item.label === '서비스 상세'?styles.service : styles.information}>
            <Body16B>{item.label}</Body16B>
            <Body14R>{item.data}</Body14R>
          </View>
        )
      } }
      />
  )
}

const styles = StyleSheet.create({
  service: {
    display: 'flex',
    borderTopWidth:5,
    borderTopColor: '#dcdcdc',
    justifyContent: 'space-between',
    padding: 16
  },
  information: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  }
})

export default DetailBoxPage;