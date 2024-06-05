import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import Dropdown from '../common/Dropdown';
import { useState } from 'react';

const TestDropdown = () => {
  const [value, setValue] = useState<string>();
  const [open, setOpen] = useState(false);
  const items = ['a', 'b', 'c'];

  return (
    <TouchableOpacity onPress={() => {}}>
      <Dropdown
        items={items}
        value={value}
        setValue={t => setValue(t)}
        open={open}
        setOpen={setOpen}
        style={{
          height: 40,
          width: 500,
          // backgroundColor: 'red',
        }}
      />
    </TouchableOpacity>
  );
};

export default function ComponentsTest() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <TestDropdown />
      </View>
    </SafeAreaView>
  );
}
