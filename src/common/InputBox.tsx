import { Dispatch, SetStateAction } from 'react';
import { TextInput } from 'react-native';
import { BLACK2 } from '../styles/GlobalColor';

interface InputBoxProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder: string;
  long?: boolean;
}

const InputBox = ({ value, setValue, placeholder, long }: InputBoxProps) => {
  return (
    <TextInput
      value={value}
      onChangeText={setValue}
      placeholder={placeholder}
      placeholderTextColor={BLACK2}
      multiline={long}
      style={{
        width: '100%',
        height: 100,
        borderWidth: 1,
        borderColor: BLACK2,
        borderRadius: 5,
        paddingHorizontal: 16,
        paddingTop: 10
      }}
    />
  )
}

export default InputBox;