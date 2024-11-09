import Dot from '../../../assets/common/Dot.svg';
import { View } from 'react-native';

export const CustomReportButton: React.FC = () => {
  const dots = Array(3).fill(null);

  return (
    <View style={{ display: 'flex', flexDirection: 'row' }}>
      {dots.map((_, index) => (
        <Dot key={index} />
      ))}
    </View>
  );
};
