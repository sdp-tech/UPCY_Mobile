import { SafeAreaView, View, Dimensions, TouchableOpacity } from 'react-native';
import { Title20B } from '../../../styles/GlobalText';
import { ReformProps } from './Reformer';
import BottomButton from '../../../common/BottomButton';
import PencilIcon from '../../../assets/common/Pencil.svg';
import InputView from '../../../common/InputView';
import { useEffect } from 'react';

function ProfilePic({}) {
  return (
    <View
      style={{
        marginTop: 15,

        alignSelf: 'center',
        position: 'relative',
      }}>
      <TouchableOpacity>
        <View
          style={{
            width: 82,
            height: 82,
            borderRadius: 100,
            backgroundColor: '#D9D9D9',
          }}></View>
      </TouchableOpacity>
      <View
        style={{
          position: 'absolute',
          backgroundColor: '#303441',
          width: 32,
          height: 32,
          borderRadius: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bottom: 0,
          right: 0,
        }}>
        <PencilIcon strokeWidth={1} />
      </View>
    </View>
  );
}

export default function ReformFormProfile({
  page,
  setPage,
  form,
  setForm,
}: ReformProps) {
  const { width } = Dimensions.get('screen');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          marginHorizontal: width * 0.04,
          flex: 1,
        }}>
        <ProfilePic />
        <InputView
          title="닉네임"
          value={form.nickname}
          setValue={v => {
            setForm(prev => {
              return { ...prev, nickname: v };
            });
          }}
        />
        <InputView
          title="마켓명"
          value={form.market}
          setValue={v => {
            setForm(prev => {
              return { ...prev, market: v };
            });
          }}
          info="마켓 이름입니다"
        />
        <InputView
          title="마켓 소개글"
          value={form.introduce}
          setValue={v => {
            setForm(prev => {
              return { ...prev, introduce: v };
            });
          }}
          info="마켓을 소개해 주세요"
          long={true}
        />
        <InputView
          title="상담 링크"
          placeholder="http://"
          value={form.link}
          setValue={v => {
            setForm(prev => {
              return { ...prev, link: v };
            });
          }}
        />

        <BottomButton
          value="다음"
          pressed={false}
          onPress={() => {
            setPage('style');
          }}
          style={{ width: '75%', alignSelf: 'center', marginTop: 'auto' }}
        />
      </View>
    </SafeAreaView>
  );
}
