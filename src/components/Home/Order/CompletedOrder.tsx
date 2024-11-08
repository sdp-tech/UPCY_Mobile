import { SafeAreaView, Image, View, TouchableOpacity } from "react-native"
import { Body14M, Body16B, Subtitle16B, Title20B } from "../../../styles/GlobalText"
import Arrow from '../../../assets/common/Arrow.svg';
import { GREEN } from "../../../styles/GlobalColor";
import { useNavigation } from '@react-navigation/native';
import BottomButton from '../../../common/BottomButton';
import { OrderProps } from "./OrderManagement";

const CompletedOrder = ({ navigation, route }: OrderProps) => {


  // const handlePress = () => {
  //   navigation.navigate('Home'); // 'Home'을 실제 네비게이션 스택에 맞게 수정
  // };


  return (
    <SafeAreaView style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <View style={{ marginTop: 120 }} />
      <Title20B style={{ marginBottom: 10, textAlign: 'center' }}></Title20B>
      <Image source={require('../../../assets/completed.png')} style={{ width: 200, height: 200 }} />
      <Title20B style={{ textAlign: 'center', marginTop: 10 }}>거래가 완료 되었습니다</Title20B>
      <TouchableOpacity style={{ flexDirection: 'row', borderRadius: 5, backgroundColor: GREEN, marginTop: 160, marginBottom: 15, width: '90%', alignItems: 'center', justifyContent: 'space-between', paddingRight: 20 }} onPress={() => navigation.navigate('WriteReviewPage')}>
        <View style={{ padding: 16 }}>
          <Body14M>구매한 상품이 마음에 드시나요?</Body14M>
          <Body16B>후기 작성하러 가기</Body16B>
        </View>
        <Arrow color={'black'} transform={[{ rotate: '180deg' }]} />
      </TouchableOpacity>

      <TouchableOpacity style={{ flexDirection: 'row', borderRadius: 5, backgroundColor: GREEN, width: '90%', alignItems: 'center', justifyContent: 'space-between', paddingRight: 20 }} onPress={() => navigation.navigate('Home')}>
        <View style={{ padding: 16 }}>
          <Body14M>이 마켓이 마음에 들었나요?</Body14M>
          <Body16B>SDP 마켓의 다른 서비스 보러가기</Body16B>
        </View>
        <Arrow color={'black'} transform={[{ rotate: '180deg' }]} />
      </TouchableOpacity>



    </SafeAreaView>
  )
}

export default CompletedOrder;