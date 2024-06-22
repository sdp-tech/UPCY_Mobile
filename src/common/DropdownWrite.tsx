import { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import { Body14M } from '../styles/GlobalText';
import { BLACK2 } from '../styles/GlobalColor';
import Dropdown from './Dropdown';
import ArrowIcon from '../assets/common/Arrow.svg';

const ITEM_HEIGHT = 40;

export default function DropdownWrite({
  title,
  style,
  setValue,
  value,
  items,
  index = undefined,
  width = '90%',
}: Parameters<typeof Dropdown>[0]) {
  const [open, setOpen] = useState(false);

  const handlePress = () => {
    setOpen(prev => !prev);
  };

  const handleSelect = (value: string) => {
    setValue(value);
    setOpen(false);
  };

  return (
    <View
      style={{
        width: width,
        position: 'relative',
        height: ITEM_HEIGHT + 4,
        marginVertical: 8,
        zIndex: index,
      }}>
      <View
        style={{
          ...style,
          ...Styles.container,
        }}>
        <View style={{ ...Styles.pressArea, ...Styles.item }}>
          <TextInput
            defaultValue={value}
            onChangeText={setValue}
            placeholderTextColor={BLACK2}
            placeholder={title}
            autoCapitalize="none"
            autoCorrect={false}
            style={{ flex: 1 }}
          />
          <TouchableOpacity onPress={handlePress}>
            <ArrowIcon
              color={BLACK2}
              style={{ transform: [{ rotate: open ? '270deg' : '180deg' }] }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{
            maxHeight: open ? ITEM_HEIGHT * 3 : ITEM_HEIGHT + 4,
            borderTopWidth: open ? 2 : 0,
            borderColor: BLACK2,
          }}>
          {open &&
            items.map((value, index) => {
              return (
                <View style={Styles.item} key={index}>
                  <TouchableOpacity
                    style={Styles.pressArea}
                    onPress={() => handleSelect(value)}>
                    <Body14M>{value}</Body14M>
                  </TouchableOpacity>
                </View>
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: BLACK2,
    backgroundColor: 'white',
  },
  item: {
    height: ITEM_HEIGHT,
    paddingHorizontal: 16,
  },
  pressArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
});
