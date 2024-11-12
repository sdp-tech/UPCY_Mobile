import { useState } from 'react';
import Dot from '../../../assets/common/Dot.svg';
import { TouchableOpacity } from 'react-native';

export const CustomReportButton: React.FC = () => {
  const [buttonPressed, setButtomPressed] = useState<boolean>(false);

  const dots = Array(3).fill(null);

  const handleOnPress = () => {
    setButtomPressed(!buttonPressed);
  };

  return (
    <TouchableOpacity
      style={{ display: 'flex', flexDirection: 'row', gap: 2 }}
      onPress={handleOnPress}>
      {dots.map((_, index) => (
        <Dot key={index} width={5} />
      ))}
    </TouchableOpacity>
  );
};
