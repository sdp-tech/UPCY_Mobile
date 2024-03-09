import { SafeAreaView, View, Dimensions, TouchableOpacity } from 'react-native';
import { Title20B } from '../../../styles/GlobalText';
import { ReformProps } from './Reformer';
import useCustomContext from '../../../hooks/useCustomContext';
import InputBox from '../../../common/InputBox';
import BottomButton from '../../../common/BottomButton';

export default function ReformFormProfile({ navigation, route }: ReformProps) {
  const { value, setValue } = useCustomContext({ context: 'ReformerProfile' });

  return (
    <SafeAreaView>
      <Title20B>리포머 프로필</Title20B>
      <InputBox
        value={value.nickname}
        setValue={v => {
          setValue(prev => {
            return { ...prev, nickname: v };
          });
        }}
      />
      <BottomButton
        value="다음"
        pressed={false}
        onPress={() => {}}
        style={{ width: '75%', alignSelf: 'center' }}
      />
    </SafeAreaView>
  );
}
