import React from 'react';
import { TouchableOpacity } from 'react-native';
import Heart from '../assets/common/Heart.svg';
import { PURPLE } from '../styles/GlobalColor';

interface HeartProps {
  like: boolean;
  onPress: () => void;
}

const HeartButton = ({ like, onPress }: HeartProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={{display:'flex', alignItems:'center'}}>
      <Heart color={like ? '#FF0000' : PURPLE} fill={like ? '#FF0000' : 'none'} />
    </TouchableOpacity>
  )
}

export default HeartButton;