import { useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import StarIcon from '../assets/common/Star.svg';
import { LIGHTGRAY, PURPLE } from '../styles/GlobalColor';

interface StarProps {
  index: number;
  pressed: boolean;
  onPress: (index: number) => void;
}

const Star = ({ index, pressed, onPress }: StarProps) => {
  return (
    <TouchableOpacity onPress={() => onPress(index)}>
      <StarIcon color={pressed ? PURPLE : LIGHTGRAY} />
    </TouchableOpacity>
  );
};

const StarRating = () => {
  const [rating, setRating] = useState<number>(0);

  return (
    <FlatList
      horizontal
      scrollEnabled={false}
      data={[...new Array(5).keys()]}
      renderItem={({ item, index }) => (
        <Star index={index} pressed={index < rating} onPress={() => setRating(index+1)} />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default StarRating;