import {
  View,
  TextInput,
  TextStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import { BLACK, BLACK2 } from '../styles/GlobalColor';
import { Body14M } from '../styles/GlobalText';
import PlusIcon from '../assets/common/Plus.svg';
import DeleteIcon from '../assets/header/Close.svg';

import FilePicker from './FilePicker';
import { Files } from '../types/UserTypes';

export interface FileBoxProps {
  data: Files;
  setData?: (r: Files) => void;
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

const FileBox = ({ data = [], setData, max }: FileBoxProps) => {
  const handleFileDelete = (index: number) => {
    const newData = data.filter((v, i) => i !== index);
    setData?.(newData);
  };

  return (
    <View>
      <SelectView>
        <FilePicker
          callback={r => {
            console.log(r);
            setData?.([{ name: r.name ? r.name : 'document.pdf', uri: r.uri }]);
          }}
          disabled={data.length >= max}
          style={styles.BoxView}>
          {data.length >= max ? (
            <Body14M style={{ color: BLACK2 }}>
              더 이상 추가할 수 없습니다
            </Body14M>
          ) : (
            <View style={styles.ItemView}>
              <Body14M style={{ color: BLACK2 }}>추가해 주세요</Body14M>
              <PlusIcon color={BLACK2} />
            </View>
          )}
        </FilePicker>
      </SelectView>
      <View style={styles.ListView}>
        {data.map((v, index) => {
          return (
            <View key={index} style={styles.ItemView}>
              <Body14M style={{ color: BLACK }}>{v.name}</Body14M>
              <TouchableOpacity onPress={() => handleFileDelete(index)}>
                <DeleteIcon color={BLACK2} />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  BoxView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 44,
    paddingLeft: 16,
    paddingRight: 16,
    gap: 10,
  },
  ListView: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: 44,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 10,
    gap: 15,
  },
  ItemView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});

export default FileBox;
