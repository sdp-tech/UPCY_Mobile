import { View, ViewStyle } from 'react-native';
import InputBox, { InputBoxProps } from './InputBox';
import { Body16B } from '../styles/GlobalText';

interface InputViewProps extends InputBoxProps {
  containerStyle?: ViewStyle;
  title?: String;
}

const InputView = ({
  containerStyle,
  title,
  value,
  setValue,
  ...props
}: InputViewProps) => {
  return (
    <View style={{ marginVertical: 10, ...containerStyle }}>
      {title && <Body16B>{title}</Body16B>}
      <InputBox value={value} setValue={setValue} {...props} />
    </View>
  );
};

export default InputView;
