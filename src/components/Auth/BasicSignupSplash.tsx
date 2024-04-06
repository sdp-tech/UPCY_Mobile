import { SafeAreaView, View } from 'react-native';
import { GREEN, PURPLE } from '../../styles/GlobalColor';
import CheckIcon from '../../assets/common/CheckIcon.svg';
import { Body14B, Title20B } from '../../styles/GlobalText';

export default function BasicSignupSplash() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: PURPLE, justifyContent: 'center' }}>
      <View style={{ alignItems: 'center', gap: 10 }}>
        <CheckIcon color={GREEN} />
        <Title20B style={{ color: GREEN, marginTop: 10 }}>
          가입이 완료되었습니다.
        </Title20B>
        <Body14B style={{ color: GREEN }}>
          UPCY와 함께 지속가능한 옷장을 만들어봐요!
        </Body14B>
      </View>
    </SafeAreaView>
  );
}
