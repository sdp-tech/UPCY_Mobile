import { useState } from 'react';
import DotBlack from '../../../assets/common/DotBlack.svg';
import { TouchableOpacity } from 'react-native';

export const CustomReportButton: React.FC = () => {
  const [buttonPressed, setButtomPressed] = useState<boolean>(false);

  const dots = Array(3).fill(null);

  const handleOnPress = () => {
    setButtomPressed(!buttonPressed);
  };

  return (
    <TouchableOpacity
      style={{ display: 'flex', flexDirection: 'row', gap: 3 }}
      onPress={handleOnPress}>
      {dots.map((_, index) => (
        <DotBlack key={index} />
      ))}
    </TouchableOpacity>
  );
};
