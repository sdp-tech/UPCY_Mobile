import { SetStateAction, useState, Dispatch } from 'react';
import { ScrollView, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import { BLACK, LIGHTGRAY, PURPLE } from '../../../styles/GlobalColor';
import { Body14M, Body16M, Caption11M, Caption12M, Subtitle16B, Subtitle18B, Subtitle18M, Title20B } from '../../../styles/GlobalText';
import { getStatusBarHeight } from 'react-native-safearea-height';

import Filter from '../../../common/Filter';
import InputBox from '../../../common/InputBox';
import BottomButton from '../../../common/BottomButton';
import CheckBox from '../../../common/CheckBox';

import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParams } from '../../../pages/Home';

import Arrow from '../../../assets/common/Arrow.svg';
import Search from '../../../assets/common/Search.svg';
import Photo from '../../../assets/common/Photo.svg';

const statusBarHeight = getStatusBarHeight(true);

interface FilterSectionProps {
  label: string;
  items: any[];
}

const FilterSection = ({ label, items }: FilterSectionProps) => {
  return (
    <FilterContainer>
      <FilterBox style={{marginBottom: 5, justifyContent: 'space-between'}}>
        <Subtitle18M>{label}</Subtitle18M>
        <Caption11M style={{color: PURPLE}}>• 중복 가능</Caption11M>
      </FilterBox>
      <FilterBox>
        {items.map((item, index) => (
          <Filter key={index} value={item} pressed={false} onPress={() => {}} />
        ))}
      </FilterBox>
    </FilterContainer>
  )
}

const QuotationForm = ({ navigation, route }: StackScreenProps<HomeStackParams, 'Quotation'>) => {
  const materials = ['폴리에스테르', '면', '스웨이드', '울', '캐시미어', '가죽', '데님', '추가 요청사항에 기재']
  const sizes = ['XS(85)', 'S(90)', 'M(95)', 'L(100)', 'XL(105)', 'XXL(110)']
  const options = ['프릴 추가', '단추 추가', '지퍼 추가', '주머니 추가']
  const [text, setText] = useState<string>('');

  return (
    <ScrollView>
      <BackButton onPress={() => navigation.goBack()}>
        <Arrow color={'white'} />
      </BackButton>
      <SearchButton>
        <Search />
      </SearchButton>
      <ImageBackground
        source={{uri: 'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp'}}
        style={{width: '100%', height: 210}}
      >
        <View style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: BLACK, opacity: 0.7}} />
        <View style={{paddingTop: 100, paddingLeft: 50}}>
         <Title20B style={{color: 'white', marginBottom: 3}}>마켓명 (SDP의 상점)</Title20B>
         <Caption12M style={{color: 'white', marginBottom: 18}}>리폼러 닉네임 (전성식탁)</Caption12M>
         <Body16M style={{color: 'white'}}>마켓 소개글</Body16M>
        </View>
      </ImageBackground>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Subtitle16B style={{paddingVertical: 20}}>견적서 작성</Subtitle16B>
        <PhotoButton style={{paddingVertical: 12}}>
          <Photo />
          <Body14M style={{marginLeft: 10}}>작업할 사진 첨부</Body14M>
        </PhotoButton>
      </View>
      <View style={{height: 8, backgroundColor: '#F4F4F4'}} />
      <FilterSection label='재질 선택' items={materials} />
      <FilterSection label='희망 사이즈 선택' items={sizes} />
      <FilterSection label='옵션 선택' items={options} />
      <View style={{height: 8, backgroundColor: '#F4F4F4'}} />
      <View style={{paddingHorizontal: 15, paddingVertical: 20, alignItems: 'flex-start', borderBottomWidth: 0.5, borderColor: '#D9D9D9'}}>
        <Subtitle18M style={{marginBottom: 10}}>추가 요청사항</Subtitle18M>
        <PhotoButton style={{paddingVertical: 6}}>
          <Photo />
          <Body14M style={{marginLeft: 10}}>참고 사진 첨부</Body14M>
        </PhotoButton>
        <InputBox value={text} setValue={setText} placeholder='입력해주세요' long />
      </View>
      <View style={{paddingHorizontal: 15, paddingVertical: 20, borderBottomWidth: 8, borderColor: '#F4F4F4'}}>
        <Subtitle18M style={{marginBottom: 10}}>포트폴리오 사용 가능 여부</Subtitle18M>
        <CheckBox style={{paddingHorizontal: 30, alignSelf: 'center'}} pressed={false} onPress={() => {}} text='리폼 제품이 서비스 내의 포트폴리오에 사용되는 것에 동의합니다.' />
      </View>
      <View style={{paddingHorizontal: 15, paddingVertical: 20}}>
        <Subtitle18M style={{marginBottom: 10}}>거래 방식 선택</Subtitle18M>
        <FilterBox style={{alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 80}}>
          {['비대면', '대면'].map((item, index) => (
            <Filter key={index} value={item} pressed={false} onPress={() => {}} />
          ))}
        </FilterBox>
      </View>
      <View style={{paddingHorizontal: 45, paddingVertical: 20}}>
        <BottomButton value='다음' pressed={false} onPress={() => {}} />
      </View>
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

const SearchButton = styled.TouchableOpacity`
  padding: 10px;
  position: absolute;
  right: 7px;
  top: ${statusBarHeight-10}px;
  z-index: 1;
`

const PhotoButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 16px;
  background: ${LIGHTGRAY};
  border-radius: 6px;
  margin-bottom: 20px;
`

const FilterContainer = styled.View`
  padding: 20px 15px;
  border-bottom-width: 0.5px;
  border-color: #D9D9D9;
`

const FilterBox = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`

export default QuotationForm;