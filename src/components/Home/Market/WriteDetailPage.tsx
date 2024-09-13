import { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import { Body14M, Body16B } from '../../../styles/GlobalText';
import Arrow from '../../../assets/common/Arrow.svg';
import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-safearea-height';
import { HomeStackParams } from '../../../pages/Home';
import { StackScreenProps } from '@react-navigation/stack';
import DetailScreenHeader from '../components/DetailScreenHeader';
import { useBottomBar } from '../../../../contexts/BottomBarContext';
import ImageCarousel from '../../../common/ImageCarousel';
import { PhotoType } from '../../../hooks/useImagePicker';


const { width, height } = Dimensions.get('window');


type WriteDetailPageProps = StackScreenProps<HomeStackParams, 'WriteDetailPage'>;

const WriteDetailPage: React.FC<WriteDetailPageProps> = ({ navigation, route }) => {
  const { inputText } = route.params; // route 파라미터 전달받아옴 
  const { detailphoto } = route.params;
  const [localInput, setLocalInput] = useState(inputText); // 로컬변수 지정 
  const [d_photoadded, setD_Photoadded] = useState<boolean>(true);
  const [d_detailphoto, setDetailPhoto] = useState<PhotoType[]>(detailphoto ? detailphoto : []);
  // 사진 삽입한 상태면 그거 그대로 보여줌 
  const { hideBottomBar, showBottomBar } = useBottomBar();

  useEffect(() => {
    showBottomBar();
    return () => hideBottomBar();
  }, []);

  const pickImage = () => {
    if (d_photoadded) {
      setD_Photoadded(false);
    } else {
      setD_Photoadded(true);
    }
  }

  const handleGoBack = () => { // 파라미터 지정
    navigation.navigate({ name: 'ServiceRegistrationPage', params: { inputText: localInput, detailphoto: d_detailphoto }, merge: true });
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
        {d_photoadded ?
          (
            <View style={{ marginBottom: 200 }}>
              <ImageCarousel images={d_detailphoto} setFormImages={setDetailPhoto} max={5}
                originalSize originalHeight={width - 32} originalWidth={width - 32} />
            </View>)
          : (<></>)}

      </ScrollView>
    </SafeAreaView>
  )
}

export default WriteDetailPage