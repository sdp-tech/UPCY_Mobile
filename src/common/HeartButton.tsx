import React from 'react';
import { TouchableOpacity } from 'react-native';
import Heart from '../assets/common/Heart.svg';
import { PURPLE, PURPLE2, PURPLE3 } from '../styles/GlobalColor';

interface HeartProps {
  like: boolean;
  onPress: () => void;
  blank?: boolean;
}

const HeartButton = ({ like, onPress, blank }: HeartProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: 5,
        justifyContent: 'center',
        width: 24,
        height: 24,
      }}>
      <Heart
        color={blank || like ? PURPLE : PURPLE2}
        fill={like ? PURPLE : blank ? 'none' : PURPLE3}
      />
    </TouchableOpacity>
  );
};

export default HeartButton;
