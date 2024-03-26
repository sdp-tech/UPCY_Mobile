import { View, Text, FlatList } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import styled from 'styled-components/native';
import StarRating from '../../../common/StarRating';
import ReviewComment from '../components/ReviewComment';
import ReviewItem from '../components/ReviewItem';
import { Body14B, Caption11M } from '../../../styles/GlobalText';
import { BLACK, LIGHTGRAY } from '../../../styles/GlobalColor';
import ReviewSummary from '../components/ReviewSummary';
import Slider from '../../../common/Slider';

const SummarySection = () => {


  return (
    <View style={{ paddingVertical: 20, paddingHorizontal: 40, borderBottomColor: LIGHTGRAY, borderBottomWidth: 1 }}>
      <ItemContainer style={{ marginBottom: 20 }}>
        <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 15 }}>
          <Text style={{ color: BLACK, fontSize: 40, fontWeight: '700' }}>4.0</Text>
          <StarRating />
        </View>
        <View style={{ paddingHorizontal: 40, flex: 1 }}>
          {[1, 2, 3, 4, 5].map((idx) => {
            return (
              <ItemContainer style={{ alignItems: 'center' }}>
                <Caption11M style={{ marginRight: 5 }}>{idx}점</Caption11M>
                <Slider total={20} page={3} rating />
                <Caption11M style={{ marginLeft: 5 }}>3</Caption11M>
              </ItemContainer>
            );
          })}
        </View>
      </ItemContainer>
      <ItemContainer>
        <Body14B>거래</Body14B>
        <ReviewComment value='상담이 친절해요' />
        <ReviewComment value='약속을 잘 지켜요' />
      </ItemContainer>
      <ItemContainer>
        <Body14B>디자인</Body14B>
        <ReviewComment value='마무리가 꼼꼼해요' />
        <ReviewComment value='트렌디해요' />
      </ItemContainer>
    </View>
  )
}

const ItemContainer = styled.View`
  display: flex;
  flex-direction: row;
  padding: 5px;
`

const ReviewPage = () => {

  return (
    <FlatList
      data={[...new Array(3).keys()]}
      ListHeaderComponent={SummarySection}
      renderItem={({ item }: any) => {
        return (
          <ReviewItem onPress={() => { }} />
        )
      }}
      keyExtractor={(item, index) => index.toString()}
      style={{ marginBottom: 60 }}
    />
  )
}

export default ReviewPage;