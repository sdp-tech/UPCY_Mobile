import { Dispatch, SetStateAction, useState } from 'react';
import {
  View,
  TouchableOpacity,
  ViewStyle,
  StyleSheet,
  DimensionValue,
  ScrollView,
} from 'react-native';
import { Body14M } from '../styles/GlobalText';
import { BLACK, BLACK2, GRAY } from '../styles/GlobalColor';
import ArrowIcon from '../assets/common/Arrow.svg';

interface DropdownProps {
  title: Text;
  value: string | undefined;
  setValue: (text: string) => void;
  items: string[];
  width: DimensionValue;
  style?: ViewStyle;
}
const ITEM_HEIGHT = 40;

export default function Dropdown({
  title,
  style,
  setValue,
  value,
  items,
  width,
}: DropdownProps) {
  const [open, setOpen] = useState(false);

  const handlePress = () => {
    setOpen(prev => !prev);
  };

  const handleSelect = (value: string) => {
    setValue(value);
    setOpen(false);
  };

  return (
    <View>
      <View
        style={{
          width: width,
          ...style,
          ...Styles.container,
        }}>
        <View style={{ ...Styles.item }}>
          <TouchableOpacity
            style={{
              ...Styles.pressArea,
            }}
            onPress={handlePress}>
            <Body14M>{value !== undefined ? value : title}</Body14M>
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
    marginVertical: 8,
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: BLACK2,
  },
  item: {
    height: ITEM_HEIGHT,
    paddingHorizontal: 16,
    borderColor: BLACK2,
  },
  pressArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
});
