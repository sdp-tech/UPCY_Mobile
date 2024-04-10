import { SafeAreaView } from 'react-native';
import { AddPortfolioProps } from './AddPortfolio';
import { Body14B } from '../../../styles/GlobalText';

interface WriteScreenParams extends AddPortfolioProps {}

export default function PortfolioWrite({
  navigation,
  route,
}: WriteScreenParams) {
  return (
    <SafeAreaView>
      <Body14B>포트폴리오 작성하기</Body14B>
    </SafeAreaView>
  );
}
