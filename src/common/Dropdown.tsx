import { Dispatch, SetStateAction } from 'react';
import { View, TouchableOpacity, ViewStyle } from 'react-native';
import { Body14M } from '../styles/GlobalText';

type DropdownProps = {
  items: string[];
  value: string | null;
  setValue: (text: string) => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  style?: ViewStyle;
};

export default function Dropdown({
  items,
  value,
  setValue,
  setOpen,
  open,
  style,
}: DropdownProps) {
  const handleSelect = (text: string) => {
    setValue(text);
    setOpen(false);
  };
  return (
    <View
      style={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        borderBottomWidth: 0,
        zIndex: 1,
        ...style,
      }}>
      {open &&
        items.map((item, index) => {
          return (
            <View key={index}>
              <TouchableOpacity
                onPress={() => {
                  handleSelect(item);
                }}
                style={{
                  backgroundColor: 'white',
                  paddingLeft: 16,
                  height: 30,
                  borderWidth: 1,
                }}>
                <Body14M>{item}</Body14M>
              </TouchableOpacity>
            </View>
          );
        })}
    </View>
  );
}
