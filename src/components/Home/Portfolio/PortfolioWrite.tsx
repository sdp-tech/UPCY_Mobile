import { Dimensions, Image, SafeAreaView, View } from 'react-native';
import { AddPortfolioProps } from './AddPortfolio';
import { Body14M, Body16B, Caption12M } from '../../../styles/GlobalText';
import DetailScreenHeader from '../components/DetailScreenHeader';
import { useEffect, useState } from 'react';
import { BLACK2, GRAY } from '../../../styles/GlobalColor';
import InputView from '../../../common/InputView';
import CustomScrollView from '../../../common/CustomScrollView';
import useObjectUpdater from '../../../hooks/useObjectUpdater';
import PeriodPicker from '../../../common/PeriodPicker';
import BottomButton from '../../../common/BottomButton';
import AgreeButton from '../../../common/AgreeButton';
import HashtagInput from '../components/HashtagInput';
import PhotoIcon from '../../../assets/common/Photo.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PhotoType, useImagePicker } from '../../../hooks/useImagePicker';

type PortfolioFormType = {
  photo: undefined | PhotoType;
  title: string;
  hashtags: string[];
  domain: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  information: string;
};

interface WriteScreenParams extends AddPortfolioProps {}

export default function PortfolioWrite({
  navigation,
  route,
}: WriteScreenParams) {
  const { width } = Dimensions.get('screen');
  const initForm: PortfolioFormType = {
    photo: undefined,
    title: '',
    hashtags: [],
    domain: '',
    startDate: undefined,
    endDate: undefined,
    information: '',
  };
  const [form, setForm] = useState<PortfolioFormType>(initForm);
  const [image, setImage] = useState<PhotoType | undefined>(undefined);
  const [agreement, setAgreement] = useState(false);

  const formUpdater = useObjectUpdater(setForm);
  const [handleAddButtonPress, handleImagePress] = useImagePicker(setImage);

  useEffect(() => formUpdater(image, 'photo'), [image]);

  const addHashtag = (v: string) => {
    const newHashtags = form.hashtags;
    newHashtags.push(v);
    console.log(newHashtags);
    formUpdater(newHashtags, 'hashtags');
  };

  const removeHashtag = (idx: number) => {
    const newHashtags = form.hashtags.filter((v, index) => index !== idx);
    formUpdater(newHashtags, 'hashtags');
  };

  return (
    <SafeAreaView>
      <DetailScreenHeader
        title="포트폴리오 작성"
        leftButton="LeftArrow"
        rightButton="Save"
        onPressLeft={() => {
          navigation.getParent()?.navigate('Home');
        }}
        onPressRight={() => {
          navigation.navigate('TempStorage');
        }}
      />
      <CustomScrollView minHeight={1400}>
        <TouchableOpacity
          style={{
            width: '100%',
            aspectRatio: 1,
            backgroundColor: GRAY,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={
            image === undefined ? handleAddButtonPress : handleImagePress
          }>
          {image === undefined ? (
            <View
              style={{
                flexDirection: 'row',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <PhotoIcon />
              <Body14M style={{ marginLeft: 10 }}>이미지 등록</Body14M>
            </View>
          ) : (
            <Image src={image.uri} style={{ width: '100%', aspectRatio: 1 }} />
          )}
        </TouchableOpacity>
        <View
          style={{
            marginHorizontal: width * 0.04,
            paddingTop: 15,
            flex: 1,
            paddingBottom: 40,
          }}>
          <InputView
            title="포트폴리오 제목"
            value={form.title}
            setValue={v => formUpdater(v, 'title')}
          />
          <HashtagInput
            hashtags={form.hashtags}
            addHashtag={addHashtag}
            removeHashtag={removeHashtag}
            max={5}
          />
          <InputView
            title="작업 분야"
            value={form.domain}
            setValue={v => formUpdater(v, 'domain')}
          />
          <View style={{ marginVertical: 10 }}>
            <Body16B>작업 기간</Body16B>

            <PeriodPicker
              start={form.startDate}
              end={form.endDate}
              setStart={v => formUpdater(v, 'startDate')}
              setEnd={v => formUpdater(v, 'endDate')}
            />
          </View>
          <InputView
            title="포트폴리오 설명"
            info="프로젝트 스타일 / 소재 / 디테일 / 작업 과정에 대해 작성해 보세요."
            value={form.information}
            setValue={v => formUpdater(v, 'information')}
            long={true}
            style={{ height: 230, marginTop: 8 }}
          />
          <Caption12M style={{ color: BLACK2 }}>
            포트폴리오를 모두 작성했다면 [등록 완료]를 눌러 주세요. 심사
            담당자가 포트폴리오를 확인한 뒤 프로필 공개 여부를 확정할 거예요.
          </Caption12M>

          <Caption12M style={{ color: BLACK2, marginTop: 10 }}>
            순수 본인의 창작물임을 확인합니다. 신고 접수 시 해당 포트폴리오가
            UPCY 팀에 의해 임의 삭제 처리 될 수 있음에 동의합니다.
          </Caption12M>
          <AgreeButton
            pressed={agreement}
            onPress={() => setAgreement(prev => !prev)}
            value="동의합니다."
          />
          <View style={{ marginTop: 'auto', marginBottom: 20 }}>
            <BottomButton
              value="등록 완료"
              pressed={false}
              style={{ width: '75%', alignSelf: 'center' }}
              onPress={() => {
                navigation.navigate('Submit');
              }}
            />
          </View>
        </View>
      </CustomScrollView>
    </SafeAreaView>
  );
}
