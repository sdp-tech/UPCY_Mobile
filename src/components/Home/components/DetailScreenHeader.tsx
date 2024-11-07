import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { Body14M, Subtitle18B, Body16B } from '../../../styles/GlobalText';
import React from 'react';
import { BLACK, LIGHTGRAY } from '../../../styles/GlobalColor';
import LeftArrowIcon from '../../../assets/common/Arrow.svg';
import CloseIcon from '../../../assets/header/Close.svg';
import SearchIcon from '../../../assets/header/Search.svg';
import { CustomBackButton } from './CustomBackButton';

interface HeaderProps {
  title: string;
  leftButton: 'CustomBack' | 'LeftArrow' | 'Exit' | 'None';
  onPressLeft: () => void;
  rightButton: 'Save' | 'Search' | 'Edit' | 'Exit' | 'None' | 'Fix';
  onPressRight: () => void;
  saved?: number;
  border?: boolean;
}

const DetailScreenHeader = ({
  title,
  leftButton,
  onPressLeft,
  rightButton,
  onPressRight,
  saved = 0,
  border = true,
}: HeaderProps) => {
  const Buttons = {
    Save: <Body14M style={{ color: '#929292' }}>임시저장 | {saved}</Body14M>,
    Search: <SearchIcon color={BLACK} style={{ marginRight: 5 }} />,
    Edit: <Body14M style={{ color: '#929292', marginRight: 10 }}>편집</Body14M>,
    Exit: <CloseIcon color={BLACK} style={{ marginHorizontal: 5 }} />,
    LeftArrow: <View style={{ marginLeft: 14 }}><LeftArrowIcon color={BLACK} /></View>,
    CustomBack: <CustomBackButton />,
    None: <></>,
    Fix: <Body16B style={{ color: '#929292', marginRight: 10 }}>...</Body16B>,
  };
  return (
    <SafeAreaView
      style={{
        position: 'relative',
        flexDirection: 'row',
        height: 41,
        borderBottomWidth: border ? 1 : 0,
        borderColor: LIGHTGRAY,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
      }}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={onPressLeft}
          style={{ alignSelf: 'flex-start' }}>
          {Buttons[leftButton]}
        </TouchableOpacity>
      </View>
      <View style={{ alignSelf: 'center', flex: 1 }}>
        <Subtitle18B style={{ textAlign: 'center' }}>{title}</Subtitle18B>
      </View>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={onPressRight}
          style={{ alignSelf: 'flex-end' }}>
          {Buttons[rightButton]}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DetailScreenHeader;
