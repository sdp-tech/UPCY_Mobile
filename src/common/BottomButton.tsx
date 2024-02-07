import { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Body16B, Body16M } from '../styles/GlobalText';
import { PURPLE, GREEN, PURPLE2 } from '../styles/GlobalColor';

interface BottomButtonProps {
  value: string;
  pressed: boolean;
  onPress: () => void;
}

const BottomButton = ({ value, pressed, onPress }: BottomButtonProps) => {
  return (
    <ButtonContainer pressed={pressed} onPress={onPress}>
      <Body16B style={{color: pressed ? PURPLE2 : PURPLE }}>{value}</Body16B>
    </ButtonContainer>
  )
}

const ButtonContainer = styled.TouchableOpacity<{ pressed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 10px 90px;
  background-color: ${(props: { pressed: boolean; }) => props.pressed ? PURPLE : GREEN};
`

export default BottomButton;