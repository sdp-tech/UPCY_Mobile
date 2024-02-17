import { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-safearea-height';

import { HomeStackParams } from '../../../pages/Home';
import { StackScreenProps } from '@react-navigation/stack';

import Arrow from '../../../assets/common/Arrow.svg';

import { BLACK, GREEN, PURPLE, PURPLE2, PURPLE3 } from '../../../styles/GlobalColor';
import { Body14R, Body16M, Caption11M, Caption12M, Filter14M, Subtitle16M, Title20B } from '../../../styles/GlobalText';
import Carousel from '../../../common/Carousel';
import CheckBox from '../../../common/CheckBox';
import BottomButton from '../../../common/BottomButton';

const statusBarHeight = getStatusBarHeight(true);
const { width, height } = Dimensions.get('window');

const QuotationPage = ({ navigation, route }: StackScreenProps<HomeStackParams, 'QuotationPage'>) => {
  const quotation = [
    {key: '재질', data: '니트'},
    {key: '희망 사이즈', data: '여성 55'},
    {key: '추가 요청사항', data: ''},
    {key: '포폴 사용 가능 여부', data: '가능'},
    {key: '거래 방식', data: '비대면'},
    {key: '이름', data: '이소윤'},
    {key: '연락처', data: '010 1234 1234'},
    {key: '주소', data: '서울특별시 서대문구 어쩌구저쩌구동 124'},
  ]
  // 한 줄에 2개씩 아이템 배치
  const refPhotos = [...new Array(6).keys()]
  const splitArrayIntoPairs = (arr: any[], pairSize: number) => {
    return arr.reduce((result, item, index) => {
      if (index % pairSize === 0) {
        result.push([]);
      }
      result[result.length - 1].push(item);
      return result;
    }, []);
  };
  const splitRefPhotos = splitArrayIntoPairs(refPhotos, 2);
  return (
    <ScrollView>
      <BackButton onPress={() => navigation.goBack()}>
        <Arrow color={'white'} />
      </BackButton>
      <ImageBackground
        source={{uri: 'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp'}}
        style={{width: '100%', height: '100%'}}
      >
        <View style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: BLACK, opacity: 0.9}} />
        <Title20B style={{marginTop: statusBarHeight, color: 'white', textAlign: 'center'}}>견적서 확인</Title20B>
        <View style={{paddingVertical: 35, paddingHorizontal: 20}}>
          <Title20B style={{color: 'white', marginBottom: 3}}>마켓명 (SDP의 상점)</Title20B>
          <Caption12M style={{color: 'white', marginBottom: 18}}>리폼러 닉네임 (전성식탁)</Caption12M>
          <Body16M style={{color: 'white'}}>마켓 소개글</Body16M>
        </View>
        <View style={{backgroundColor: 'white', marginHorizontal: 10}}>
          <View style={{backgroundColor: GREEN, marginHorizontal: 20, paddingVertical: 5, alignItems: 'center'}}>
            <Filter14M style={{color: PURPLE}}>견적서 영수증</Filter14M>
          </View>
          {quotation.map((item, index) => {
            return (
              <>
                <TextBox key={index}>
                  <Subtitle16M style={{flex: 1}}>{item.key}</Subtitle16M>
                  <Body14R style={{flex: 1.5, textAlign: 'right'}}>{item.data}</Body14R>
                </TextBox>
                {item.key === '추가 요청사항' &&
                (
                  <>
                    <Carousel
                      data={splitRefPhotos}
                      renderItem={({item}: any) => {
                        return (
                          <View style={{ flexDirection: 'row' }}>
                            {item.map((subItem: any) => (
                              <View key={subItem.id} style={{width: '50%', paddingHorizontal: 20}}>
                                <ImageBackground
                                  source={{uri:'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp'}}
                                  style={{width: '100%', height: 170 }}
                                  alt={subItem.fileName}
                                />
                              </View>
                            ))}
                          </View>
                        )
                      }}
                      slider
                    />
                    <Body14R style={{textAlign: 'center'}}>이렇게 저렇게 해주세요</Body14R>
                  </>
                )}
              </>
            )
          })}
        </View>
        <View style={{backgroundColor: PURPLE3, marginHorizontal: 10, alignItems: 'center', paddingVertical: 15}}>
          <Subtitle16M style={{color: PURPLE}}>안내문</Subtitle16M>
          <Caption11M style={{color: PURPLE, marginVertical: 5}}>
            증빙자료를 첨부하시면 담당자 검토 후, 확인 마크를 달아드립니다.{'\n'}
            첨부 가능 자료 : 재학증명서, 졸업증명서, 성적증명서{'\n'}
            (용량 입력) 이하 (파일형식 입력) 파일만 등록 가능합니다.{'\n'}
            제출한 자료는 의뢰인에게 노출되지 않습니다. 
          </Caption11M>
          <CheckBox style={{paddingHorizontal: 30, alignSelf: 'center', marginVertical: 5}} pressed={false} onPress={() => {}} text='리폼 제품이 서비스 내의 포트폴리오에 사용되는 것에 동의합니다.' />
        </View>
        <View style={{padding: 10, marginVertical: 30}}>
          <BottomButton value={'견적서 보내기'} pressed={false} onPress={() => {}} />
          <View style={{marginVertical: 5}} />
          <BottomButton value={'취소하기'} pressed={true} onPress={() => {}} />
        </View>
      </ImageBackground>
    </ScrollView>
  )
}

const BackButton = styled.TouchableOpacity`
  padding: 10px;
  position: absolute;
  left: 0px;
  top: ${statusBarHeight-10}px;
  z-index: 1;
`

const TextBox = styled.View`
  flex-direction: row;
  padding: 8px 25px;
  justify-content: space-between;
`

export default QuotationPage;