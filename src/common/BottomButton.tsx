import { useState } from 'react';
import { View, TouchableOpacity, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { Body16M } from '../styles/GlobalText';
import { PURPLE, GREEN, PURPLE2 } from '../styles/GlobalColor';
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

interface BottomButtonProps {
  value: string;
  pressed: boolean;
  onPress: () => void;
  style?: ViewStyle;
  disable?: boolean;
}

const BottomButton = ({
  value,
  pressed,
  onPress,
  style,
  disable,
}: BottomButtonProps) => {
  return (
    <ButtonContainer
      pressed={pressed}
      onPress={onPress}
      style={{ ...style }}
      disabled={disable}>
      <Body16M style={{ color: pressed ? PURPLE2 : PURPLE }}>{value}</Body16M>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.TouchableOpacity<{
  pressed: boolean;
  disabled: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 10px 90px;
  background-color: ${(props: { pressed: boolean }) =>
    props.pressed ? PURPLE : GREEN};
  ${(props: { disabled: boolean }) => props.disabled && 'opacity: 0.4;'};
`;

export default BottomButton;
