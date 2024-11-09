import { View } from 'react-native';
import { ServiceCard } from '../Market/Service';
import { Styles } from '../../../types/UserTypes';
// 마켓 페이지(업씨러가 보는 마켓 페이지) -> 서비스 탭에 들어가는 컴포넌트임

interface ServiceItemProps {
  navigation: any;
}

const ServiceItem = ({ navigation }: ServiceItemProps) => {
  return (
    <>
      <ServiceCard
        name="똥구르리리"
        basic_price={20000}
        service_styles={['미니멀'] as Styles[]}
        imageUri="" //Change
        service_title="커스텀 짐색"
        service_content="안입는 청바지를 활용한 나만의 에코백! 아주 좋은 에코백 환경에도 좋고 나에게도 좋고 어찌구저찌구한 에코백입니다 최고임 짱짱"
        navigation={navigation}
        service_uuid="d"
        market_uuid="d"
      />
      <View style={{ paddingBottom: 100 }} />
    </>
  );
};

export default ServiceItem;
