import { SafeAreaView, View, Dimensions, TouchableOpacity } from 'react-native';
import { Title20B } from '../../../styles/GlobalText';
import { ReformProps } from './Reformer';
import useCustomContext from '../../../hooks/useCustomContext';
import InputBox from '../../../common/InputBox';
import BottomButton from '../../../common/BottomButton';
import PencilIcon from '../../../assets/common/Pencil.svg';
import InputView from '../../../common/InputView';

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

export default function ReformFormProfile({ navigation, route }: ReformProps) {
  const { value, setValue } = useCustomContext({ context: 'ReformerProfile' });
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
          value={value.nickname}
          setValue={v => {
            setValue(prev => {
              return { ...prev, nickname: v };
            });
          }}
        />
        <InputView
          title="마켓명"
          value={value.market}
          setValue={v => {
            setValue(prev => {
              return { ...prev, market: v };
            });
          }}
          info="마켓 이름입니다"
        />
        <InputView
          title="마켓 소개글"
          value={value.introduce}
          setValue={v => {
            setValue(prev => {
              return { ...prev, introduce: v };
            });
          }}
          info="마켓을 소개해 주세요"
        />
        <InputView
          title="상담 링크"
          placeholder="http://"
          value={value.link}
          setValue={v => {
            setValue(prev => {
              return { ...prev, link: v };
            });
          }}
        />

        <BottomButton
          value="다음"
          pressed={false}
          onPress={() => {
            navigation.navigate('tmp');
          }}
          style={{ width: '75%', alignSelf: 'center', marginTop: 'auto' }}
        />
      </View>
    </SafeAreaView>
  );
}
