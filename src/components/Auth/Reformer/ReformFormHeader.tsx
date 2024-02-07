import { View, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { Title20B } from '../../../styles/GlobalText';
import { PURPLE } from '../../../styles/GlobalColor';
import LeftArrow from '../../../assets/common/LeftArrow.svg';

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
        <TouchableOpacity
          style={{
            flex: 1,
          }}
          onPress={() => navigation.pop()}>
          <LeftArrow stroke="#000000" />
        </TouchableOpacity>

        <Title20B>프로필 등록/수정</Title20B>
        <View style={{ flex: 1 }} />
      </View>
      <View
        style={{
          alignSelf: 'flex-start',
          height: 8,
          width: (width / total) * step,
          backgroundColor: PURPLE,
        }}
      />
    </View>
  );
}
