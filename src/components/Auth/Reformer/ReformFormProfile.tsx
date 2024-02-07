import { SafeAreaView, View, Dimensions, TouchableOpacity } from 'react-native';
import { Title20B } from '../../../styles/GlobalText';
import { ReformProps, ReformStackParams } from './Reformer';

export default function ReformFormProfile({ navigation, route }: ReformProps) {
  return (
    <SafeAreaView>
      <Title20B>리포머 프로필</Title20B>
      <TouchableOpacity onPress={route.params.goNext}>
        <Title20B>{route.params.title}</Title20B>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
