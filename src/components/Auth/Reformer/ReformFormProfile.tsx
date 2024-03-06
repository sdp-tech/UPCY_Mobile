import { SafeAreaView, View, Dimensions, TouchableOpacity } from 'react-native';
import { Title20B } from '../../../styles/GlobalText';
import {
  ReformProps,
  ReformStackParams,
  ReformProfileContext,
  RpContextType,
} from './Reformer';
import { useContext } from 'react';
import useCustomContext from '../../../hooks/useCustomContext';

export default function ReformFormProfile({ navigation, route }: ReformProps) {
  const { value, setValue } = useCustomContext<RpContextType>({
    givenContext: ReformProfileContext,
  });

  return (
    <SafeAreaView>
      <Title20B>리포머 프로필</Title20B>
      <Title20B>{value.nickname}</Title20B>
    </SafeAreaView>
  );
}
