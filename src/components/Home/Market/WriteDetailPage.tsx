import { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import { StackScreenProps } from '@react-navigation/stack';
import DetailScreenHeader from '../components/DetailScreenHeader';
import { useBottomBar } from '../../../../contexts/BottomBarContext';
import ImageCarousel from '../../../common/ImageCarousel';
import { PhotoType } from '../../../hooks/useImagePicker';
import { MyPageStackParams } from '../../../pages/MyPage';
import React from 'react';


const { width, height } = Dimensions.get('window');


const WriteDetailPage = ({ navigation, route }: StackScreenProps<MyPageStackParams, 'WriteDetailPage'>) => {
  const { inputText } = route.params; // route 파라미터 전달받아옴
  const { detailPhoto } = route.params;
  const [localInput, setLocalInput] = useState(inputText); // 로컬변수 지정
  const [d_photoAdded, setD_photoAdded] = useState<boolean>(false);
  const [d_detailPhoto, setDetailPhoto] = useState<PhotoType[]>(detailPhoto ? detailPhoto : []);
  // 사진 삽입한 상태면 그거 그대로 보여줌
  const { hideBottomBar, showBottomBar } = useBottomBar();

  useEffect(() => {
    showBottomBar();
    return () => hideBottomBar();
  }, []);

  const pickImage = () => {
    if (d_photoAdded) {
      setD_photoAdded(false);
    } else {
      setD_photoAdded(true);
    }
  };

  const handleGoBack = () => {
    const serviceData = route.params?.serviceData || {};
    const existingPhotos = serviceData.detail_photos || [];

    const updatedDetailPhotos = existingPhotos.length > 0
      ? [existingPhotos[0], ...d_detailPhoto]
      : [...d_detailPhoto];

    navigation.navigate('ServiceRegistrationPage', {
      inputText: localInput,
      detailPhoto: updatedDetailPhotos,
      serviceData: { ...serviceData, detail_photos: updatedDetailPhotos },
    });
  };

  const editor = useRef<RichEditor>(null);
  const scrollRef = useRef<ScrollView>(null);

  const handleCursorPosition = useCallback((scrollY: number) => {
    // Positioning scroll bar
    scrollRef.current!.scrollTo({ y: scrollY - 30, animated: true });
  }, []);

  return (
    <SafeAreaView>
      <DetailScreenHeader
        leftButton='LeftArrow'
        title='서비스 상세'
        rightButton='None'
        onPressLeft={handleGoBack}
        onPressRight={() => { }} />

      <RichToolbar
        editor={editor}
        actions={[
          actions.insertImage,
          actions.setBold,
          actions.setItalic,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.insertLink,
          actions.setStrikethrough,
          actions.setUnderline,
        ]}
        onPressAddImage={pickImage}
      />
      <ScrollView bounces={false} overScrollMode="never" style={{ paddingHorizontal: 16 }}>
        <RichEditor
          style={{ flexGrow: 1 }}
          ref={editor} // from useRef()
          initialContentHTML={localInput}
          onChange={(html_content) => {
            setLocalInput(html_content);
          }}
          placeholder="내용"
          initialHeight={150}
          useContainer={true}
          onCursorPosition={handleCursorPosition}
        />
        {d_photoAdded && (
          <View style={{ marginBottom: 200 }}>
            <ImageCarousel
              images={d_detailPhoto}
              setFormImages={setDetailPhoto}
              max={5}
              originalSize
              originalHeight={width - 32}
              originalWidth={width - 32}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default WriteDetailPage