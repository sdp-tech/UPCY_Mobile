import { Dispatch, SetStateAction } from 'react';
import { TextInput } from 'react-native';
import { BLACK2 } from '../styles/GlobalColor';

interface InputBoxProps {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  long?: boolean;
  style?: any;
  secure?: boolean;
}

const InputBox = ({
  value,
  setValue,
  placeholder,
  long,
  style,
  secure,
}: InputBoxProps) => {
  return (
    <TextInput
      secureTextEntry={secure}
      value={value}
      onChangeText={setValue}
      placeholder={placeholder}
      placeholderTextColor={BLACK2}
      multiline={long}
      autoCapitalize="none"
      autoCorrect={false}
      style={{
        marginVertical: 5,
        width: '100%',
        height: 100,
        borderWidth: 2,
        borderColor: BLACK2,
        borderRadius: 5,
        paddingHorizontal: 16,
        ...style,
      }}
    />
  );
};

export default InputBox;
