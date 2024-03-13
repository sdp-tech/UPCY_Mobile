import { SafeAreaView, View, Dimensions, TouchableOpacity } from 'react-native';
import { Title20B } from '../../../styles/GlobalText';
import { ReformProps } from './Reformer';
import useCustomContext from '../../../hooks/useCustomContext';
import InputBox from '../../../common/InputBox';
import BottomButton from '../../../common/BottomButton';

export default function ProfileSubmit({ navigation, route }: ReformProps) {
  const { value, setValue } = useCustomContext({ context: 'ReformerProfile' });

  return (
    <SafeAreaView>
      <Title20B>확인용</Title20B>
      <Title20B>{value.nickname}</Title20B>
    </SafeAreaView>
  );
}
