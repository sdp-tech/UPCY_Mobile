import {
  SafeAreaView,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Caption11M, Title20B } from '../../../styles/GlobalText';
import { ReformProps } from './Reformer';
import BottomButton from '../../../common/BottomButton';
import PencilIcon from '../../../assets/common/Pencil.svg';
import InputView from '../../../common/InputView';
import { useEffect, useState } from 'react';
import Hashtag from '../../../common/Hashtag';
import Filter from '../../../common/Filter';
import FilterBox from '../../../common/FilterBox';
import { BLACK } from '../../../styles/GlobalColor';

function ProfilePic({}) {
  return (
    <View
      style={{
        marginTop: 15,

        alignSelf: 'center',
        position: 'relative',
      }}>
      <TouchableOpacity>
        <View
          style={{
            width: 82,
            height: 82,
            borderRadius: 100,
            backgroundColor: '#D9D9D9',
          }}></View>
      </TouchableOpacity>
      <View
        style={{
          position: 'absolute',
          backgroundColor: '#303441',
          width: 32,
          height: 32,
          borderRadius: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bottom: 0,
          right: 0,
        }}>
        <PencilIcon strokeWidth={1} />
      </View>
    </View>
  );
}

export default function ReformFormStyle({
  page,
  setPage,
  form,
  setForm,
}: ReformProps) {
  const { width } = Dimensions.get('screen');
  const [list, setList] = useState<string[]>([]);

  const handlePress = (value: string) => {
    if (list.includes(value)) {
      setList(list.filter(v => v !== value));
    } else {
      setList(prev => [...prev, value]);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
        }}>
        <View style={{ marginHorizontal: width * 0.04 }}>
          <View style={{ marginVertical: 24 }}>
            <Title20B>작업 스타일 및 특수 소재를</Title20B>
            <Title20B>선택해 주세요</Title20B>
          </View>
          <View>
            <FilterBox
              list={list}
              onPress={handlePress}
              type="style"
              label="스타일"
            />
            <FilterBox
              list={list}
              onPress={handlePress}
              type="material"
              label="특수소재"
            />
          </View>
        </View>
        <View style={styles.bottomView}>
          <Caption11M style={{ color: 'white' }}>
            최대 선택 개수 {list.length}/3개
          </Caption11M>
        </View>
        <View style={{ marginHorizontal: width * 0.04 }}>
          <BottomButton
            value="다음"
            pressed={false}
            onPress={() => {
              setPage('career');
            }}
            style={{ width: '75%', alignSelf: 'center' }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottomView: {
    marginTop: 'auto',
    marginBottom: 10,
    width: '100%',
    height: 32,
    backgroundColor: BLACK,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
