import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { BLACK2 } from '../styles/GlobalColor';
import { Body14B, Body14M, Body16B } from '../styles/GlobalText';
import DownArrowIcon from '../assets/common/DownArrow.svg';

interface PeriodPickerProps {
  start: Date | undefined;
  end: Date | undefined;
  setStart: (v: Date) => void;
  setEnd: (v: Date) => void;
}

const PeriodPicker = ({ start, end, setStart, setEnd }: PeriodPickerProps) => {
  const today = new Date();
  const [startopen, setStartopen] = useState(false);
  const [endopen, setEndopen] = useState(false);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
        width: '100%',

        height: 44,
      }}>
      <View
        style={{
          height: '100%',
          width: '44%',
          borderWidth: 2,
          borderColor: BLACK2,
          borderRadius: 5,
          paddingHorizontal: 16,
        }}>
        <TouchableOpacity
          style={{
            height: '100%',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onPress={() => setStartopen(true)}>
          {start === undefined ? (
            <Body14M style={{ color: BLACK2 }}>시작일</Body14M>
          ) : (
            <Body14M>{start.getDay()}</Body14M>
          )}
          <DownArrowIcon color={BLACK2} />
        </TouchableOpacity>
      </View>
      <Body16B style={{ color: BLACK2 }}>-</Body16B>
      <View
        style={{
          height: '100%',
          width: '44%',
          borderWidth: 2,
          borderColor: BLACK2,
          borderRadius: 5,
          paddingHorizontal: 16,
        }}>
        <TouchableOpacity
          style={{
            height: '100%',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onPress={() => setEndopen(true)}>
          {end === undefined ? (
            <Body14M style={{ color: BLACK2 }}>종료일</Body14M>
          ) : (
            <Body14M>{end.getDay()}</Body14M>
          )}
          <DownArrowIcon color={BLACK2} />
        </TouchableOpacity>
      </View>
      <DatePicker
        modal
        locale="ko-KR"
        mode="date"
        title="시작일"
        confirmText="확인"
        cancelText="취소"
        open={startopen}
        date={start ? start : today}
        onConfirm={date => {
          setStartopen(false);
          setStart(date);
        }}
        onCancel={() => {
          setStartopen(false);
        }}
      />
      <DatePicker
        modal
        locale="ko-KR"
        mode="date"
        title="종료일"
        confirmText="확인"
        cancelText="취소"
        open={endopen}
        date={end ? end : today}
        onConfirm={date => {
          setEndopen(false);
          setEnd(date);
        }}
        onCancel={() => {
          setEndopen(false);
        }}
      />
    </View>
  );
};

export default PeriodPicker;
