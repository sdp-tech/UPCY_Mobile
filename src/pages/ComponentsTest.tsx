import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import Dropdown from '../common/Dropdown';
import { useState } from 'react';
import { Body16M } from '../styles/GlobalText';

const TestDropdown = () => {
  const [value, setValue] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const items = ['a', 'b', 'c', 'd', 'e'];

  return (
    <View>
      <Dropdown
        title="서비스 선택하기"
        setValue={t => setValue(t)}
        value={value}
        items={items}
        width="90%"></Dropdown>
    </View>
  );
};

export default function ComponentsTest() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Body16M>테스트용 페이지</Body16M>
        <TestDropdown />
      </View>
    </SafeAreaView>
  );
}
