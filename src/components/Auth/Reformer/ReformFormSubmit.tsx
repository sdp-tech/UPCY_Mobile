import { Dimensions, SafeAreaView, Text, View } from 'react-native';
import { Title20B } from '../../../styles/GlobalText';
import BottomButton from '../../../common/BottomButton';
import SignupProp from '../Signup';
import Hand from '../../../assets/common/hand.svg'
import { CommonActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SignInParams } from '../SignIn';

// 2차버전에서 수정해야 할 사항들
// - 리폼러 프로필 등록 신청이 완료되었어요!
// - <View style={{ flex: 0.5, alignItems: 'center' }}>
// <Text>리폼러 등록 승인까지 평균 24시간 정도 소요됩니다</Text>
// </View>

export default function ReformFormSubmit() {
  const navigation = useNavigation<StackNavigationProp<SignInParams>>();
  const { height } = Dimensions.get('screen');
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Title20B style={{ marginTop: height * 0.2 }}>
          리폼러 프로필 등록이 완료되었어요!
        </Title20B>
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Hand />
      </View>
      {/* <View style={{ flex: 0.5, alignItems: 'center' }}>
        <Text>리폼러 등록 승인까지 평균 24시간 정도 소요됩니다</Text>
      </View> */}
      <BottomButton
        value="홈으로 가기"
        onPress={() => {
          navigation.dispatch(
            CommonActions.navigate({
              name: "Main",
              params: {
                screen: "홈", // MainTabNavigator의 홈 화면으로 이동
              },
            })
          );
          console.log('홈으로 이동합니다.');
        }}
        pressed={false}
        style={{
          width: '75%',
          alignSelf: 'center',
          marginTop: 'auto',
          marginBottom: 10,
        }}
      />
    </SafeAreaView>
  );
}
