import { SafeAreaView, View, Dimensions, StyleSheet } from 'react-native';
import { Caption11M, Title20B } from '../../../styles/GlobalText';
import { ReformProps } from './Reformer';
import BottomButton from '../../../common/BottomButton';
import { useState } from 'react';
import FilterBox from '../../../common/FilterBox';
import { BLACK } from '../../../styles/GlobalColor';

export default function ReformFormStyle({
  setPage,
  form,
  setForm,
}: ReformProps) {
  const { width } = Dimensions.get('screen');
  const [list, setList] = useState<string[]>([]);

  const handleStylePress = (value: string) => {
    if (form.style.includes(value)) {
      setForm(prev => {
        return { ...prev, style: prev.style.filter(v => v !== value) };
      });
    } else {
      setForm(prev => {
        return { ...prev, style: [...prev.style, value] };
      });
    }
  };

  const handleMaterialPress = (value: string) => {
    if (form.material.includes(value)) {
      setForm(prev => {
        return { ...prev, material: prev.material.filter(v => v !== value) };
      });
    } else {
      setForm(prev => {
        return { ...prev, material: [...prev.material, value] };
      });
    }
  };

  const setPressable = (value: string) => {
    if (
      form.style.length + form.material.length < 3 ||
      form.style.includes(value) ||
      form.material.includes(value)
    )
      return true;
    else return false;
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
              list={form.style}
              onPress={handleStylePress}
              type="style"
              label="스타일"
              setPressable={setPressable}
            />
            <FilterBox
              list={form.material}
              onPress={handleMaterialPress}
              type="material"
              label="특수소재"
              setPressable={setPressable}
            />
          </View>
        </View>
        <View style={styles.bottomView}>
          <Caption11M style={{ color: 'white' }}>
            최대 선택 개수 {form.style.length + form.material.length}/3개
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
