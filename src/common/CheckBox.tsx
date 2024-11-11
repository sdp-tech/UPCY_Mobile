import { View, TouchableOpacity, ViewStyle } from 'react-native';
import Check from '../assets/common/Check.svg';
import { PURPLE } from '../styles/GlobalColor';
import { Body14M } from '../styles/GlobalText';

interface CheckBoxProps {
  pressed: boolean;
  onPress: () => void;
  text: string;
  style?: ViewStyle
}

const CheckBox = ({ pressed, onPress, text, style }: CheckBoxProps) => {
  return (
    <View style={{flexDirection: 'row', ...style}}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: 20,
          height: 20,
          borderWidth: 1,
          borderColor: PURPLE,
          backgroundColor: pressed ? PURPLE : 'white',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Check />
      </TouchableOpacity>
      <Body14M style={{marginLeft: 10}}>{text}</Body14M>
    </View>
  )
}

export default CheckBox;