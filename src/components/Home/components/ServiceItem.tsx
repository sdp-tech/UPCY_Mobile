import { View } from 'react-native';
import { ServiceCard } from '../Market/Service';

interface ServiceItemProps {
  navigation: any;
}

const ServiceItem = ({ navigation }: ServiceItemProps) => {
  return (
    <>
      <ServiceCard
        name="똥구르리리"
        price={20000}
        tags={['미니멀']}
        imageUri="" //Change
        title="커스텀 짐색"
        description="안입는 청바지를 활용한 나만의 에코백! 아주 좋은 에코백 환경에도 좋고 나에게도 좋고 어찌구저찌구한 에코백입니다 최고임 짱짱"
        navigation={navigation}
      />
      <View style={{ paddingBottom: 100 }} />
    </>
  );
};

export default ServiceItem;
