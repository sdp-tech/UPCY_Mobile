import DotBlack from '../../../assets/common/DotBlack.svg';
import { TouchableOpacity } from 'react-native';

export const CustomEditDeleteButton = ({
  editDeleteButtonPressed,
  setEditDeleteButtonPressed,
}: {
  editDeleteButtonPressed: boolean;
  setEditDeleteButtonPressed: (editDeleteButtonPressed: boolean) => void;
}) => {
  const dots = Array(3).fill(null);

  const handleOnPress = () => {
    if (setEditDeleteButtonPressed) {
      setEditDeleteButtonPressed(!editDeleteButtonPressed);
    }
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
