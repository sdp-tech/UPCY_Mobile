import { View, ViewStyle } from 'react-native';
import InputBox, { InputBoxProps } from './InputBox';
import { Body16B } from '../styles/GlobalText';
import InfoIcon from '../assets/common/Info.svg';

interface InputViewProps extends InputBoxProps {
  containerStyle?: ViewStyle;
  title?: string;
  info?: string;
}

const InputView = ({
  containerStyle,
  title,
  info,
  value,
  setValue,
  long,
  ...props
}: InputViewProps) => {
  return (
    <View style={{ marginVertical: 10, ...containerStyle }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        {title && <Body16B>{title}</Body16B>}
        {info && <InfoIcon />}
      </View>
      <InputBox
        value={value}
        setValue={setValue}
        style={{ marginTop: 8 }}
        long={long}
        {...props}
      />
    </View>
  );
};

export default InputView;
