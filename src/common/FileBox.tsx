import { View, TextInput, TextStyle, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { BLACK2 } from '../styles/GlobalColor';
import { Body14M } from '../styles/GlobalText';
import PlusIcon from '../assets/common/Plus.svg';
import RightArrowIcon from '../assets/common/RightArrow.svg';
import DownArrowIcon from '../assets/common/DownArrow.svg';
import FilePicker from './FilePicker';

export interface FileBoxProps {
  data: any[];
  max: number;
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

const FileBox = ({ data, max }: FileBoxProps) => {
  return (
    <SelectView>
      <FilePicker
        callback={r => {}}
        disabled={data.length >= max}
        style={styles.BoxView}>
        {data.length >= max ? (
          <Body14M>더 이상 추가할 수 없습니다.</Body14M>
        ) : (
          <>
            <Body14M style={{ color: BLACK2 }}>추가해 주세요</Body14M>
            <PlusIcon color={BLACK2} />
          </>
        )}
      </FilePicker>
    </SelectView>
  );
};

const styles = StyleSheet.create({
  BoxView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 44,
    paddingLeft: 16,
    paddingRight: 16,
  },
});

export default FileBox;
