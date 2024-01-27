import { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Body16M } from '../styles/GlobalText';
import { PURPLE, GREEN } from '../styles/GlobalColor';

interface BottomButtonParams {
  value: string;
  pressed: boolean;
  onPress: () => void;
}

const BottomButton = ({ value, pressed, onPress }: BottomButtonParams) => {
  return (
    <ButtonContainer pressed={pressed} onPress={onPress}>
      <Body16M style={{color: pressed ? PURPLE : 'white'}}>{value}</Body16M>
    </ButtonContainer>
  )
}

const ButtonContainer = styled.TouchableOpacity<{ pressed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 10px 90px;
  background-color: ${(props: { pressed: boolean; }) => props.pressed ? GREEN : PURPLE};
`

export default BottomButton;