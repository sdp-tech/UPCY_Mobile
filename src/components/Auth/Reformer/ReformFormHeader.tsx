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

interface ReformFormHeaderProps {
  step: number;
  navigation: any;
}

export default function ReformFormHeader({
  step,
  navigation,
}: ReformFormHeaderProps) {
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
          <TouchableOpacity
            onPress={() => navigation.pop()}
            style={{ width: 24 }}>
            <LeftArrow color={BLACK} />
          </TouchableOpacity>
        </View>

        <Title20B>프로필 등록/수정</Title20B>
        <View style={{ flex: 1 }} />
      </View>
      <Slider total={3} page={1} rating={true} />
    </View>
  );
}
