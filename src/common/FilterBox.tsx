import { View } from 'react-native';
import Filter from './Filter';
import { Subtitle18B } from '../styles/GlobalText';
import { PURPLE, BLACK } from '../styles/GlobalColor';

type filterType = 'style' | 'material' | 'fit' | 'detail';

type filterListType = {
  [key in filterType]: string[];
};

interface filterBoxProps {
  list: string[];
  onPress: (value: string) => void;
  type: filterType;
}

const FilterBox = ({ list, onPress, type }: filterBoxProps) => {
  const filterList: filterListType = {
    style: [
      '빈티지',
      '미니멀',
      '캐주얼',
      '페미닌',
      '글램',
      '스트릿',
      '키치',
      '스포티',
      '홈웨어',
      '걸리시',
      '페미닌',
    ],
    material: [
      '폴리에스테르',
      '면',
      '가죽',
      '스웨이드',
      '울',
      '캐시미어',
      '데님',
      '플라스틱',
    ],
    fit: ['노멀', '타이트', '오버사이즈', '와이드'],
    detail: [
      '지퍼',
      '단추',
      '셔링',
      '포켓',
      '워싱',
      '집업',
      '프릴',
      '보(리본)',
      '크롭',
      '칼라',
      '금속',
      '비즈',
    ],
  };
  return (
    <View>
      {filterList[type].map((value, index) => {
        return (
          <Filter
            value={value}
            pressed={list.includes(value)}
            onPress={() => {
              onPress(value);
            }}
            key={index}
          />
        );
      })}
    </View>
  );
};

export default FilterBox;
