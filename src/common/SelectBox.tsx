import { View, TextInput, TextStyle } from 'react-native';
import styled from 'styled-components/native';
import { BLACK2 } from '../styles/GlobalColor';
import { Body14M } from '../styles/GlobalText';
import PlusIcon from '../assets/common/Plus.svg';
import RightArrowIcon from '../assets/common/RightArrow.svg';
import DownArrowIcon from '../assets/common/DownArrow.svg';

export interface SelectBoxProps {
  value: string | undefined;
  onPress: () => void;
  add?: boolean;
}

const SelectView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 44px;
  width: 100%;
  border-width: 2px;
  border-color: #929292;
  border-radius: 5px;
  margin-top: 8px;
  margin-bottom: 5px;
`;

const SelectTouchable = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 44px;
  padding-left: 16px;
  padding-right: 16px;
`;

const SelectBox = ({ value, onPress, add }: SelectBoxProps) => {
  return (
    <SelectView>
      <SelectTouchable onPress={onPress}>
        {value ? (
          <Body14M>{value}</Body14M>
        ) : (
          <Body14M style={{ color: BLACK2 }}>
            {add ? '추가해 주세요' : '선택해 주세요'}
          </Body14M>
        )}

        {add ? <PlusIcon color={BLACK2} /> : <RightArrowIcon color={BLACK2} />}
      </SelectTouchable>
    </SelectView>
  );
};

export default SelectBox;
