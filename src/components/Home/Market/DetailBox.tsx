import { useState, useEffect, forwardRef, useRef, useImperativeHandle, Ref } from 'react';
import { View, SafeAreaView, FlatList, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Body14R, Body16B, Caption11M, Body14B } from '../../../styles/GlobalText';
import { Tabs } from 'react-native-collapsible-tab-view';
import { BLACK, LIGHTGRAY } from '../../../styles/GlobalColor';
import ReviewSummary from '../components/ReviewSummary';
import Slider from '../../../common/Slider';
import StarRating from '../../../common/StarRating';
import ReviewComment from '../components/ReviewComment';
import ReviewItem from '../components/ReviewItem';
import Reviews from './Reviews'
import ScrollToTopButton from '../../../common/ScrollToTopButtonFlat';
import { Image } from 'react-native-reanimated/lib/typescript/Animated';
import { Option } from './ServiceRegistration';

// 서비스 id 받아와서, 거기에 해당하는: 
// 1. 제작 기간, 2. 서비스 설명, 3. 하단 사진, 4. 작업 가능한 소재, 5. 옵션 리스트(안에 이거저거 있음)
// get 해줘야 함. 그거 할당하는 거.


const DetailBox = () => {
  const { width, height } = Dimensions.get("window");
  const [makingTime, setMakingTime] = useState<number>(1) // 제작기간 
  // inputText가 설명글임
  const [inputText, setInputText] = useState<string>(`1958년에는 원예시험장을 설립하여 연구를 본격화하기 시작하였고, 1991년 말, 원예시험장에서 과수연구소를 분리하고 대구사과연구소를 신설하여 사과연구를 전담하도록 하였다.사과는 수확시기에 따라 조생종, 중생종, 만생종으로 나뉜다. 8월 하순 이전이 최성수확기인 조생종에는 미광, 조홍, 서홍, 쓰가루(아오리) 등이 있고, 최성수확기가 9월 상순에서 10월 중순까지인 중생종에는 홍로, 홍월, 양광, 추광, 골든딜리셔스, 세계일, 조나골드, 시나노스위트 등이 있다. 10월 하순 이후가 최성수확기인 만생종에는 후지(부사), 홍옥, 감홍, 화홍 등이 있다.

    알칼리성 식품으로, 칼로리가 적고 몸에 좋은 성분이 많이 들어있다. 식이섬유는 혈관에 쌓이는 유해 콜레스테롤을 몸밖으로 내보내고 유익한 콜레스테롤을 증가시켜 동맥경화를 예방해준다. 또한 칼륨은 몸속의 염분을 배출시켜 고혈압 예방과 치료에 도움을 준다. 
    
    수용성 식이섬유인 펙틴 또한 위액의 점도를 높히고 악성 콜레스테롤을 내보내어 급격한 혈압상승을 억제해주며, 페놀산은 체내의 불안정한 유해산소를 무력화시켜 뇌졸중을 예방한다. 사과에 함유된 케세틴은 폐기능을 강하게 하여 담배연기나 오염물질로부터 폐를 보호해준다. 또한 피로물질을 제거해주는 유기산과 피부미용에 좋은 비타민 C도 다량 함유되어 있다`)
  // const []
  const serviceDetail: { label: string, data: string, list: string[], optionList: Option[] }[] = [
    { label: 'period', data: '3주', list: [], optionList: [] },
    {
      label: 'service', data: `1958년에는 원예시험장을 설립하여 연구를 본격화하기 시작하였고, 1991년 말, 원예시험장에서 과수연구소를 분리하고 대구사과연구소를 신설하여 사과연구를 전담하도록 하였다.사과는 수확시기에 따라 조생종, 중생종, 만생종으로 나뉜다. 8월 하순 이전이 최성수확기인 조생종에는 미광, 조홍, 서홍, 쓰가루(아오리) 등이 있고, 최성수확기가 9월 상순에서 10월 중순까지인 중생종에는 홍로, 홍월, 양광, 추광, 골든딜리셔스, 세계일, 조나골드, 시나노스위트 등이 있다. 10월 하순 이후가 최성수확기인 만생종에는 후지(부사), 홍옥, 감홍, 화홍 등이 있다.

    알칼리성 식품으로, 칼로리가 적고 몸에 좋은 성분이 많이 들어있다. 식이섬유는 혈관에 쌓이는 유해 콜레스테롤을 몸밖으로 내보내고 유익한 콜레스테롤을 증가시켜 동맥경화를 예방해준다. 또한 칼륨은 몸속의 염분을 배출시켜 고혈압 예방과 치료에 도움을 준다. 
    
    수용성 식이섬유인 펙틴 또한 위액의 점도를 높히고 악성 콜레스테롤을 내보내어 급격한 혈압상승을 억제해주며, 페놀산은 체내의 불안정한 유해산소를 무력화시켜 뇌졸중을 예방한다. 사과에 함유된 케세틴은 폐기능을 강하게 하여 담배연기나 오염물질로부터 폐를 보호해준다. 또한 피로물질을 제거해주는 유기산과 피부미용에 좋은 비타민 C도 다량 함유되어 있다`, list: []
      , optionList: []
    },
    { label: 'image', data: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20220209_239%2F1644400118557CudbV_JPEG%2F45535946365331675_377614541.jpg&type=sc960_832', list: [], optionList: [] },
    { label: 'material', list: ['면', '폴리에스테르', '나일론', '데님', '울', '모달', '아크릴', '코듀로이'], data: '', optionList: [] }
  ]

  return (
    <View>
      <Tabs.FlatList
        bounces={false} overScrollMode="never"
        data={serviceDetail}
        renderItem={({ item, index }) => {
          if (item.label === 'period') return (
            <View key={index}>
              <View style={styles.period}>
                <Text style={TextStyles.infolabel}>예상 제작 기간</Text>
                <Text>{item.data}</Text>
              </View>
            </View>
          );
          if (item.label === 'service') return (
            <View key={index}>
              <View style={styles.service}>
                <Text style={TextStyles.infolabel}>서비스 상세</Text>
                <Text style={TextStyles.service}>{item.data}</Text>
              </View>

            </View>
          );
          if (item.label === 'image') return (
            <View style={styles.image} key={index}>
              <ImageBackground
                style={{ height: width - 32, width: '100 %' }}
                imageStyle={{ height: width - 32 }}
                source={{ uri: item.data }} />
            </View>
          )
          if (item.label === 'material' && serviceDetail[3].list.length > 0) return (
            <View style={styles.material}>
              <View style={{ flexDirection: 'column', flex: 0.3 }}>
                <Text style={{ fontSize: 16, lineHeight: 24, fontWeight: "600" }}>작업 가능한 소재</Text>
              </View>
              <View style={{ flexDirection: 'row', flex: 0.7, flexWrap: 'wrap' }}>
                {materialList({ data: serviceDetail[3].list })}
              </View>
            </View>
          )
          else return (<></>)
        }}
      />
      <View style={{ marginBottom: 400 }}>
        <Text>dd</Text>
      </View>
    </View>
  );
  function materialList({ data }: { data: string[] }) {
    return data.map((item, index) => (
      <View key={index}>
        <Text style={{
          fontSize: 14, lineHeight: 24, fontFamily: "Pretendard Variable", fontWeight: '400'
        }}>{item} | </Text>
      </View>
    ));
  }

};

const styles = StyleSheet.create({
  service: {
    display: 'flex',
    borderTopWidth: 1,
    borderTopColor: '#dcdcdc',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBlockColor: "#dcdcdc"
  },
  period: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBlockColor: "#dcdcdc"
  },
  image: {
    padding: 16,
    display: 'flex',
    borderBottomWidth: 1,
    borderBlockColor: "#dcdcdc"
  },
  material: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 400,
    padding: 16,
    borderBottomWidth: 1,
    borderBlockColor: "#dcdcdc"
  }
})

const TextStyles = StyleSheet.create({
  infolabel: {
    // 예상 제작 기간
    color: '#222222',
    fontSize: 16,
    fontFamily: 'Pretendard Variable',
    fontWeight: '600',
    lineHeight: 24,
  },
  service: {
    paddingTop: 32,
    color: '#222222',
    fontSize: 14,
    fontFamily: 'Pretendard Variable',
    fontWeight: '400',
    lineHeight: 24,
  }
})

export default DetailBox;