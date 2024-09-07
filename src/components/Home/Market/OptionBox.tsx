import { useState, useEffect, useRef, forwardRef } from 'react';
import { View, SafeAreaView, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { Body14R, Body16B } from '../../../styles/GlobalText';
import { Tabs } from 'react-native-collapsible-tab-view';
import ScrollToTopButton from '../../../common/ScrollToTopButtonFlat';

interface OptionBoxProps {
  flatListRef: React.RefObject<FlatList<any>>;
}

const OptionPage: React.FC<OptionBoxProps> = ({ flatListRef }) => {
  const data = [
    {
      label: '옵션 별 추가 금액', data: {
        title: '똑딱이 단추',
        price: '1000원',
        explain: '주머니에 귀여운 지퍼를 달아보세요',
        img: ''
      }
    },
    {
      label: '옵션 별 추가 금액', data: {
        title: '똑딱이 단추',
        price: '1000원',
        explain: '주머니에 귀여운 지퍼를 달아보세요',
        img: ''
      }
    },
    {
      label: '옵션 별 추가 금액', data: {
        title: '똑딱이 단추',
        price: '1000원',
        explain: '주머니에 귀여운 지퍼를 달아보세요',
        img: ''
      }
    },
    {
      label: '주문 시 유의사항', data: [
        '주문서가 수락된 후 바로 작업에 들어갑니다. 신중하게 선택해주세요',
        '소중한 옷을 어쩌구',
        '주문서 작성을 위해 화면 캡처를 권장합니다'
      ]
    }
  ]

  return (
    <View style={{ flex: 1 }}>
      <Tabs.FlatList
        ref={flatListRef}
        bounces={false} overScrollMode="never"
        data={data}
        ListHeaderComponent={() => <Body16B style={{ padding: 16 }}>옵션 별 추가 금액</Body16B>}
        renderItem={({ item, index }: any) => {
          return item.label == '옵션 별 추가 금액' ? (
            <OptionInfo key={index}>
              <View style={{ flexDirection: "row" }}>
                <Body16B>{item.data.title}</Body16B>
                <Body14R>{item.data.price}</Body14R>
              </View>
              <Body14R>{item.data.explain}</Body14R>
            </OptionInfo>
          ) : (
            <NoticeBox key={index}>
              <Body16B>{item.label}</Body16B>
              {item.data.map((item: any, idx: number) => (
                <Body14R key={idx} style={{ padding: 8 }}>
                  {idx + 1}: {item}
                </Body14R>
              )
              )}
            </NoticeBox>

          )
        }}
        keyExtractor={(item, index) => index.toString()}
      />
      <ScrollToTopButton flatListRef={flatListRef} />
    </View>
  )
}

const OptionInfo = styled.TouchableOpacity`
  display: flex;
  padding: 16px;
  flex-direction: column;
  gap: 8px;
  border-radius: 8px;
  border: 1px solid #612FEF;
  background: #FFF;
  margin: 8px;
`
const NoticeBox = styled.View`
  display: flex;
  padding: 16px;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; 
`

export default OptionPage;