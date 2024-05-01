import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Body14B } from '../styles/GlobalText';
import DeleteButton from '../assets/common/Delete.svg';
import { BLACK, BLACK2, GRAY, PURPLE } from '../styles/GlobalColor';

interface HashtagProps {
  value: string;
  pressable?: boolean;
  pressed?: boolean;
  onPress?: () => void;
}

const Hashtag = ({ value, pressable, pressed, onPress }: HashtagProps) => {
  return (
    <HashtagContainer pressed={pressed} onPress={onPress} disabled={!pressable}>
      <Body14B style={{ color: pressed ? 'white' : BLACK }}>{value}</Body14B>
      <DeleteButton />
    </HashtagContainer>
  );
};

const HashtagContainer = styled.TouchableOpacity<{ pressed: boolean }>`
  display: flex;
  border-radius: 12px;
  flex-direction: row;
  gap: 8px;
  justify-content: center;
  align-items: center;
  padding: 4px 12px;
  background: ${(props: { pressed: boolean }) =>
    props.pressed ? 'white' : '#DBFC72'};
`;

export default Hashtag;
