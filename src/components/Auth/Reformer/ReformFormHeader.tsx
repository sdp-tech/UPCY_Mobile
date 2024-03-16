import {
  View,
  Dimensions,
  Platform,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Title20B } from '../../../styles/GlobalText';
import { BLACK, BLACK2, PURPLE } from '../../../styles/GlobalColor';
import LeftArrow from '../../../assets/common/Arrow.svg';
import Slider from '../../../common/Slider';
import useCustomContext from '../../../hooks/useCustomContext';
import { useNavigation, NavigationContext } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ReformStackParams } from './Reformer';
import { useContext } from 'react';

interface ReformFormHeaderProps {
  step: number;
  onPressLeft: () => void;
}

export default function ReformFormHeader({
  step,
  onPressLeft,
}: ReformFormHeaderProps) {
  const navigation = useContext(NavigationContext);
  const { width, height } = Dimensions.get('window');
  const total = 3;
  return (
    <View
      style={{
        height: Platform.OS === 'ios' ? height * 0.11 : height * 0.08,
        justifyContent: 'flex-end',
      }}>
      <View
        style={{
          padding: Platform.OS === 'ios' ? 12 : 0,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={onPressLeft} style={{ width: 24 }}>
            <LeftArrow color={BLACK} />
          </TouchableOpacity>
        </View>

        <Title20B>프로필 등록/수정</Title20B>
        <View style={{ flex: 1 }} />
      </View>
      <Slider total={4} page={step} rating={true} />
    </View>
  );
}
