import { View, ViewStyle } from 'react-native';
import InputBox, { InputBoxProps } from './InputBox';
import { Body16B, Caption11M } from '../styles/GlobalText';
import InfoIcon from '../assets/common/Info.svg';
import { GRAY, PURPLE } from '../styles/GlobalColor';

interface InputViewProps extends InputBoxProps {
  containerStyle?: ViewStyle;
  title?: string;
  info?: string;
  valid?: boolean;
  caption?: {
    none?: string;
    invalid?: string;
  };
}

const InputView = ({
  containerStyle,
  title,
  info,
  value,
  setValue,
  valid,
  caption,
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
        {...props}
      />
      {value === '' && caption?.none && (
        <Caption11M style={{ color: GRAY }}>{caption.none}</Caption11M>
      )}
      {valid && caption?.invalid && (
        <Caption11M style={{ color: PURPLE }}>{caption.invalid}</Caption11M>
      )}
    </View>
  );
};

export default InputView;
