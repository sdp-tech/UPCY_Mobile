import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { Subtitle16B, Title20B } from '../styles/GlobalText';

interface InputBoxProps {
  title?: string;
  large?: boolean;
  secure?: boolean;
  placeholder: string;
  text: string;
  onChangeText: (text: string) => void;
}

export default function InputBox({
  title,
  placeholder,
  secure,
  text,
  large,
  onChangeText,
}: InputBoxProps) {
  return (
    <View style={{ width: '100%' }}>
      {title !== '' && (
        <Subtitle16B style={{ marginBottom: 8 }}>{title}</Subtitle16B>
      )}
      <TextInput
        style={{
          height: large ? 63 : 43,
          marginBottom: 8,
          borderWidth: 1,
          borderColor: '#929292',
          borderRadius: 8,
          paddingHorizontal: 13,
          paddingTop: large ? 12 : 0,
        }}
        value={text}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#BDBDBD"
        secureTextEntry={secure}
        multiline={large ? true : false}
        textAlignVertical="top"
      />
    </View>
  );
}
