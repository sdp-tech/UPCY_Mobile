import { useState } from 'react';
import { View, TouchableOpacity, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { Body16M } from '../styles/GlobalText';
import {
  PURPLE,
  GREEN,
  PURPLE2,
  LIGHTGRAY,
  GRAY,
  BLACK2,
  PURPLE3,
} from '../styles/GlobalColor';
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

interface AgreeButtonProps {
  value: string;
  pressed: boolean;
  onPress: () => void;
  style?: ViewStyle;
  disable?: boolean;
}

const AgreeButton = ({
  value,
  pressed,
  onPress,
  style,
  disable,
}: AgreeButtonProps) => {
  return (
    <ButtonContainer
      pressed={pressed}
      onPress={onPress}
      style={{ ...style }}
      disabled={disable}>
      <Body16M
        style={{
          color: pressed ? PURPLE : BLACK2,
        }}>
        {value}
      </Body16M>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.TouchableOpacity<{
  pressed: boolean;
  disabled: boolean;
}>`
  display: flex;
  align-items: flex-start;
  border-radius: 8px;
  padding: 10px 20px;
  margin-top: 20px;
  background-color: ${(props: { pressed: boolean }) =>
    props.pressed ? PURPLE3 : LIGHTGRAY};
  border: 2px;
  border-color: ${(props: { pressed: boolean }) =>
    props.pressed ? PURPLE2 : GRAY};
  ${(props: { disabled: boolean }) => props.disabled && 'opacity: 0.4;'};
`;

export default AgreeButton;
