import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { BLACK2, PURPLE } from '../styles/GlobalColor';
import { Body14M, Body16B, Caption11M } from '../styles/GlobalText';
import DownArrowIcon from '../assets/common/DownArrow.svg';

interface DatePickerProps {
  date: Date | undefined;
  setDate: (v: Date) => void;
  title: string;
}

const DatePickerBox = ({ date, setDate, title }: DatePickerProps) => {
  const today = new Date();
  const [dateOpen, setDateOpen] = useState(false);
  const [curDate, setCurDate] = useState(date);

  useEffect(() => {
    if (curDate !== undefined) setDate(curDate);
  }, [curDate]);

  return (
    <View>
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
            width: '100%',
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
            onPress={() => setDateOpen(true)}>
            {curDate === undefined ? (
              <Body14M style={{ color: BLACK2 }}>선택해 주세요.</Body14M>
            ) : (
              <Body14M>
                {curDate.getFullYear()}/{curDate.getMonth() + 1}/
                {curDate.getDate()}
              </Body14M>
            )}
            <DownArrowIcon color={BLACK2} />
          </TouchableOpacity>
        </View>
      </View>

      <DatePicker
        modal
        locale="ko-KR"
        mode="date"
        title={title}
        confirmText="확인"
        cancelText="취소"
        open={dateOpen}
        date={curDate ? curDate : today}
        maximumDate={today}
        onConfirm={date => {
          setDateOpen(false);
          setCurDate(date);
        }}
        onCancel={() => {
          setDateOpen(false);
        }}
      />
    </View>
  );
};

export default DatePickerBox;
