import styled from 'styled-components/native';
import { BLACK, PURPLE } from '../styles/GlobalColor';
import { Filter14M } from '../styles/GlobalText';

interface FilterProps {
  value: string;
  pressed: boolean;
  onPress: () => void;
  pressable?: boolean;
}

const Filter = ({ value, pressed, onPress, pressable }: FilterProps) => {
  return (
    <FilterContainer pressed={pressed} onPress={onPress} disabled={!pressable}>
      <Filter14M style={{ color: pressed ? 'white' : BLACK }}>
        {value}
      </Filter14M>
    </FilterContainer>
  );
};

const FilterContainer = styled.TouchableOpacity<{ pressed: boolean }>`
  display: flex;
  padding: 6px 16px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  margin-right: 10px;
  border-radius: 12px;
  border: 1px solid ${PURPLE};
  background: ${(props: { pressed: boolean }) =>
    props.pressed ? PURPLE : 'white'};
`;

export default Filter;
