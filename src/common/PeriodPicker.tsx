import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { BLACK2, PURPLE } from '../styles/GlobalColor';
import {
  Body14B,
  Body14M,
  Body16B,
  Caption11M,
  Subtitle16M,
} from '../styles/GlobalText';
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
  const [curStart, setCurStart] = useState(start);
  const [endopen, setEndopen] = useState(false);
  const [curEnd, setCurEnd] = useState(end);

  useEffect(() => {
    if (curStart !== undefined) setStart(curStart);
  }, [curStart]);

  useEffect(() => {
    if (curEnd !== undefined) setEnd(curEnd);
  });

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
            {curStart === undefined ? (
              <Body14M style={{ color: BLACK2 }}>시작일</Body14M>
            ) : (
              <Body14M>
                {curStart.getFullYear()}/{curStart.getMonth() + 1}/
                {curStart.getDate()}
              </Body14M>
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
            {curEnd === undefined ? (
              <Body14M style={{ color: BLACK2 }}>종료일</Body14M>
            ) : (
              <Body14M>
                {curEnd.getFullYear()}/{curEnd.getMonth() + 1}/
                {curEnd.getDate()}
              </Body14M>
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
          date={curStart !== undefined ? curStart : today}
          onConfirm={date => {
            setStartopen(false);
            setCurStart(date);
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
          date={curEnd ? curEnd : today}
          onConfirm={date => {
            setEndopen(false);
            setCurEnd(date);
          }}
          onCancel={() => {
            setEndopen(false);
          }}
        />
      </View>
      {curEnd !== undefined && curStart !== undefined && curEnd < curStart && (
        <Caption11M style={{ color: PURPLE, marginTop: 8 }}>
          종료일은 시작일 이후여야 합니다.
        </Caption11M>
      )}
    </View>
  );
};

export default PeriodPicker;
