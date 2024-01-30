import { View, Image, ImageBackground } from 'react-native';
import Carousel from '../../../common/Carousel';
import StarRating from '../../../common/StarRating';
import ReviewComment from './ReviewComment';
import { BLACK2, GRAY, LIGHTGRAY } from '../../../styles/GlobalColor';
import styled from 'styled-components/native';
import { Body14B, Body14R, Body16M, Caption11M } from '../../../styles/GlobalText';

interface ReviewItemProps {
  onPress: () => void;
}

const ReviewItem = ({ onPress }: ReviewItemProps) => {
  // 한 줄에 2개씩 아이템 배치
  const product = [...new Array(6).keys()]
  const splitArrayIntoPairs = (arr: any[], pairSize: number) => {
    return arr.reduce((result, item, index) => {
      if (index % pairSize === 0) {
        result.push([]);
      }
      result[result.length - 1].push(item);
      return result;
    }, []);
  };
  const splitProduct = splitArrayIntoPairs(product, 2);
  return (
    <View style={{ borderBottomWidth: 1, borderBottomColor: LIGHTGRAY }}>
      <ItemContainer style={{marginVertical: 10}}>
        <View style={{width: 40, height: 40, backgroundColor: GRAY, borderRadius: 180, marginRight: 10}} />
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Body16M>닉네임</Body16M>
            <Caption11M style={{color: BLACK2, marginLeft: 5}}>2024-01-01</Caption11M>
          </View>
          <StarRating />
        </View>
      </ItemContainer>
      <Carousel
        data={splitProduct}
        renderItem={({item}: any) => {
          return (
            <View style={{ flexDirection: 'row' }}>
              {item.map((subItem: any) => (
                <View style={{width: '50%', paddingHorizontal: 20}}>
                  <ImageBackground
                    key={subItem.id} 
                    source={{uri:'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp'}}
                    style={{width: '100%', height: 170 }}
                  />
                </View>
              ))}
            </View>
          )
        }}
        slider
      />
      <ItemContainer style={{marginTop: 10}}>
        <Body14B>거래</Body14B>
        <ReviewComment value='약속을 잘 지켜요' />
      </ItemContainer>
      <ItemContainer style={{marginTop: 5}}>
        <Body14B>디자인</Body14B>
        <ReviewComment value='마무리가 꼼꼼해요' />
      </ItemContainer>
      <Body14R style={{paddingHorizontal: 20, paddingVertical: 10}}>후기 내용이 들어가는 칸입니다 옷이 친절하고 사장님이 멋있어요 어쩌고저쩌고</Body14R>
    </View>
  )
}

const ItemContainer = styled.View`
  display: flex;
  flex-direction: row;
  padding: 5px 20px;
`

export default ReviewItem;