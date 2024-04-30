import { SafeAreaView, View, Dimensions, ScrollView } from 'react-native';
import { PageProps, ReformProps } from './Reformer';
import BottomButton from '../../../common/BottomButton';
import PencilIcon from '../../../assets/common/Pencil.svg';
import InputView from '../../../common/InputView';
import PhotoOptions from '../../../common/PhotoOptions';
import CustomScrollView from '../../../common/CustomScrollView';

function ProfilePic({ form, setForm }: ReformProps) {
  return (
    <View
      style={{
        marginTop: 30,

        alignSelf: 'center',
        position: 'relative',
      }}>
      <PhotoOptions
        buttonLabel=""
        photo={form.picture}
        setPhoto={p => {
          setForm(prev => {
            return { ...prev, picture: p[0] };
          });
        }}
        max={1}
        style={{
          position: 'relative',
          width: 82,
          height: 82,
          borderRadius: 100,
          backgroundColor: '#D9D9D9',
          paddingVertical: 0,
          paddingHorizontal: 0,
          marginBottom: 0,
        }}
        imageStyle={{ borderRadius: 100 }}
      />

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
  setNext,
  form,
  setForm,
}: PageProps) {
  const { width } = Dimensions.get('screen');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomScrollView
        additionalStyles={{
          minHeight: 650,
          marginHorizontal: width * 0.04,
        }}>
        <View style={{ flexGrow: 1 }}>
          <ProfilePic form={form} setForm={setForm} />
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
            onPress={setNext}
            style={{
              width: '75%',
              alignSelf: 'center',
              marginTop: 'auto',
              marginBottom: 10,
            }}
          />
        </View>
      </CustomScrollView>
    </SafeAreaView>
  );
}
