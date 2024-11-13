import {
  SafeAreaView,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import { ReformProps } from './Reformer';
import BottomButton from '../../../common/BottomButton';
import PencilIcon from '../../../assets/common/Pencil.svg';
import InputView from '../../../common/InputView';
import PhotoOptions from '../../../common/PhotoOptions';
import CustomScrollView from '../../../common/CustomScrollView';
import { useEffect, useState } from 'react';
import { useImagePicker } from '../../../hooks/useImagePicker';
import ReformFormSubmit from './ReformFormSubmit';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SignInParams } from '../SignIn';
import ReformCareer from './ReformFormCareer';
import RegionModal from '../RegionModal';
import { RegionType } from '../../../types/UserTypes';
import { Body16B } from '../../../styles/GlobalText';
import SelectBox from '../../../common/SelectBox';
import { PURPLE, PURPLE2 } from '../../../styles/GlobalColor';

export default function ReformFormProfile({ fix, form, setForm }: ReformProps) {

  function ReformProfilePic({ form, setForm }: ReformProps) {
    const [photo, setPhoto] = useState(form.picture);
    const [handleAddButtonPress, handleImagePress] = useImagePicker(setPhoto);

    useEffect(() => {
      if (photo && photo.uri !== form.picture?.uri) {
        setForm(prev => {
          return { ...prev, picture: photo };
        });
      }
    }, [photo]);

    return (
      <View style={{ marginTop: 30, alignSelf: 'center', position: 'relative' }}>
        <TouchableOpacity
          onPress={photo === undefined ? handleAddButtonPress : handleImagePress}>
          <View
            style={{
              position: 'relative',
              width: 82,
              height: 82,
              borderRadius: 100,
              backgroundColor: '#D9D9D9',
              paddingVertical: 0,
              paddingHorizontal: 0,
              marginBottom: 0,
            }}>
            {photo !== undefined && (
              <Image
                source={{ uri: photo.uri }}
                style={{ width: 'auto', height: '100%', borderRadius: 100 }}
                alt={photo.fileName}
              />
            )}
          </View>
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
          <TouchableOpacity onPress={photo === undefined ? handleAddButtonPress : handleImagePress}>
            <PencilIcon strokeWidth={1} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const { width } = Dimensions.get('screen');
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomScrollView
        additionalStyles={{
          marginHorizontal: width * 0.04,
        }}>
        <View style={{ flexGrow: 1 }}>
          <ReformProfilePic form={form} setForm={setForm} />
          <InputView
            title={
              <View style={{ flexDirection: "row" }}>
                <Body16B>닉네임</Body16B><Body16B style={{ color: PURPLE }}>{' *'}</Body16B>
              </View>}
            value={form.nickname}
            setValue={v => {
              setForm(prev => {
                return { ...prev, nickname: v };
              });
            }}
          />
          {/* <InputView
            title="마켓명"
            value={form.market}
            setValue={v => {
              setForm(prev => {
                return { ...prev, market: v };
              });
            }}
            info="마켓 이름입니다"
          /> */}
          <InputView
            title="소개글"
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
            title={
              <View style={{ flexDirection: "row" }}>
                <Body16B>오픈채팅 링크</Body16B><Body16B style={{ color: PURPLE }}>{' *'}</Body16B>
              </View>}
            placeholder="http://"
            value={form.link}
            setValue={v => {
              setForm(prev => {
                return { ...prev, link: v };
              });
            }}
          />
          <View style={{ marginVertical: 8 }}>
            <View style={{ flexDirection: "row" }}>
              <Body16B>주요 활동 지역</Body16B><Body16B style={{ color: PURPLE }}>{' *'}</Body16B>
            </View>
            <SelectBox
              value={form.region}
              onPress={() => setModalOpen(true)}
            />
          </View>
          <RegionModal
            open={modalOpen}
            setOpen={setModalOpen}
            value={form.region}
            setValue={text =>
              setForm(prev => {
                return { ...prev, region: text as RegionType }; // 그냥 text는 string으로 인식하더라구요...
              })
            }
          />
          <ReformCareer
            fix={fix}
            form={form}
            setForm={setForm} />
        </View>
      </CustomScrollView>
    </SafeAreaView>
  );
}
