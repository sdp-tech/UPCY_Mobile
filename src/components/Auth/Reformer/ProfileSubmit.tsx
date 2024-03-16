import { SafeAreaView, View, Dimensions, TouchableOpacity } from 'react-native';
import { Title20B } from '../../../styles/GlobalText';
import { ReformProps } from './Reformer';
import useCustomContext from '../../../hooks/useCustomContext';
import InputBox from '../../../common/InputBox';
import BottomButton from '../../../common/BottomButton';
import { useEffect } from 'react';

export default function ProfileSubmit({ page, setPage }: ReformProps) {
  // const { value, setValue, setSteps } = useCustomContext({
  //   context: 'ReformerProfile',
  // });

  // useEffect(() => setSteps(2), []);

  return (
    <SafeAreaView>
      <Title20B>확인용</Title20B>
      {/* <Title20B>{value.nickname}</Title20B> */}
    </SafeAreaView>
  );
}
