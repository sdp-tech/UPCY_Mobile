import DotBlack from '../../../assets/common/DotBlack.svg';
import { TouchableOpacity } from 'react-native';

export const CustomReportButton = ({
  reportButtonPressed,
  setReportButtonPressed,
}: {
  reportButtonPressed: boolean;
  setReportButtonPressed: (reportButtonPressed: boolean) => void;
}) => {
  const dots = Array(3).fill(null);

  const handleOnPress = () => {
    if (setReportButtonPressed) {
      setReportButtonPressed(!reportButtonPressed);
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
