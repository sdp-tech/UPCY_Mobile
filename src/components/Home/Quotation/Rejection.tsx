import { FlatList, SafeAreaView, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-safearea-height';
import { Body14M, Body14R, Subtitle16B, Subtitle18B, Subtitle18M, Title20B } from '../../../styles/GlobalText';
import { BLACK, LIGHTGRAY, PURPLE } from '../../../styles/GlobalColor';
import Arrow from '../../../assets/common/Arrow.svg';
import InputBox from '../../../common/InputBox';
import BottomButton from '../../../common/BottomButton';

interface RejectionProps {
  onClose: () => void;
}

const statusBarHeight = getStatusBarHeight(true);

const Rejection = ({ onClose }: RejectionProps) => {
  return (
    <SafeAreaView>
      <BackButton onPress={onClose}>
        <Arrow color={BLACK} />
      </BackButton>
      <Title20B style={{textAlign: 'center'}}>견적서 거절 사유</Title20B>
      <View style={{padding: 20, marginVertical: 30, alignItems: 'center'}}>
        <Subtitle18B>견적서를 거절한 이유가 무엇인가요?</Subtitle18B>
        <Body14R>다음 견적서를 작성할 때 많은 도움이 돼요.</Body14R>
        <FlatList
          data={[...new Array(6).keys()]}
          style={{height: 400}}
          renderItem={({item}: any) => {
            return (
              <TouchableOpacity style={{borderRadius: 8, borderColor: PURPLE, borderWidth: 1, backgroundColor: 'white', paddingHorizontal: 55, paddingVertical: 25, marginVertical: 5}}>
                <Subtitle18M style={{color: PURPLE}}>요청하신 리폼을 할 수 없는 의류</Subtitle18M>
              </TouchableOpacity>
            )
          }}
         />
      </View>
      <View style={{position: 'absolute', width: '100%', bottom: -200, borderTopWidth: 8, borderColor: '#EAEAEA', zIndex: 1, backgroundColor: 'white', paddingHorizontal: 20}}>
        <Body14R style={{textAlign: 'center', marginVertical: 10}}>추가적인 의견이나 거절 사유가 있다면 말씀해주세요.</Body14R>
        <InputBox placeholder='입력해 주세요' long />
        <View style={{paddingHorizontal: 30, paddingVertical: 20}}>
          <BottomButton value='거절 사유 보내기' pressed={false} onPress={() => {}} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const BackButton = styled.TouchableOpacity`
  padding: 10px;
  position: absolute;
  left: 0px;
  top: ${statusBarHeight-10}px;
  z-index: 1;
`

export default Rejection;