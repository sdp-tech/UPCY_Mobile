import { Dimensions, SafeAreaView, View } from 'react-native';
import { Body16B, Title20B } from '../../../styles/GlobalText';
import BottomButton from '../../../common/BottomButton';
import { AddPortfolioProps } from './AddPortfolio';

export default function PortfolioSubmit({
  navigation,
  route,
}: AddPortfolioProps) {
  const { height } = Dimensions.get('screen');
  const mainNavigation = navigation.getParent();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Title20B style={{ marginVertical: height * 0.2 }}>
          포트폴리오 등록이 완료되었어요!
        </Title20B>
        <Body16B>심사 담당자가 확인 후</Body16B>
        <Body16B>프로필 공개 여부를 확정할 거예요!</Body16B>
      </View>
      <BottomButton
        value="홈으로 가기"
        onPress={() => {
          mainNavigation?.navigate('Home');
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
