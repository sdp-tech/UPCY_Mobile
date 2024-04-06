import { Dimensions, SafeAreaView, View } from 'react-native';
import { Title20B } from '../../../styles/GlobalText';
import BottomButton from '../../../common/BottomButton';
import { FormProps } from '../SignIn';

export default function ReformFormSubmit({ navigation, route }: FormProps) {
  const { height } = Dimensions.get('screen');
  const mainNavigation = navigation.getParent();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Title20B style={{ marginTop: height * 0.2 }}>
          리폼러 프로필 등록이 완료되었어요!
        </Title20B>
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
