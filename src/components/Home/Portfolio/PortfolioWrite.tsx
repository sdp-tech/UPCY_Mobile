import { SafeAreaView } from 'react-native';
import { AddPortfolioProps } from './AddPortfolio';
import { Body14B } from '../../../styles/GlobalText';
import DetailScreenHeader from '../components/DetailScreenHeader';

interface WriteScreenParams extends AddPortfolioProps {}

export default function PortfolioWrite({
  navigation,
  route,
}: WriteScreenParams) {
  return (
    <SafeAreaView>
      <DetailScreenHeader
        title="포트폴리오 작성"
        leftButton="LeftArrow"
        rightButton="Save"
        onPressLeft={() => {
          navigation.getParent()?.navigate('Home');
        }}
        onPressRight={() => {}}
      />
      <Body14B>포트폴리오 작성하기</Body14B>
    </SafeAreaView>
  );
}
