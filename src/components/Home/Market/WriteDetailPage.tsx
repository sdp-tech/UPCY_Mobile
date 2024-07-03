import { useCallback, useEffect, useRef, useState } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import { Body14M, Body16B } from '../../../styles/GlobalText';
import Arrow from '../../../assets/common/Arrow.svg';
import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-safearea-height';
import { HomeStackParams } from '../../../pages/Home';
import { StackScreenProps } from '@react-navigation/stack';
import DetailScreenHeader from '../components/DetailScreenHeader';
import { useBottomBar } from '../../../../contexts/BottomBarContext';

const statusBarHeight = getStatusBarHeight(true);

const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 0px;
  padding: 25px;
  //top: ${statusBarHeight - 10}px;
  z-index: 1;
`

type WriteDetailPageProps = StackScreenProps<HomeStackParams, 'WriteDetailPage'>;

const WriteDetailPage: React.FC<WriteDetailPageProps> = ({ navigation, route }) => {
  const { inputText } = route.params; // route 파라미터 전달받아옴 
  const [localInput, setLocalInput] = useState(inputText); // 로컬변수 지정 

  const { hideBottomBar, showBottomBar } = useBottomBar();

  useEffect(() => {
    showBottomBar();
    return () => hideBottomBar();
  }, []);

  const handleGoBack = () => { // 파라미터 지정
    navigation.navigate({ name: 'ServiceRegistrationPage', params: { inputText: localInput }, merge: true });
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
      // onPressAddImage={pickImage}
      />
      <ScrollView bounces={false} overScrollMode="never">
        <RichEditor
          ref={editor} // from useRef()
          initialContentHTML={localInput}
          onChange={(html_content) => {
            setLocalInput(html_content);
          }}
          placeholder="내용"
          initialHeight={450}
          useContainer={true}
          onCursorPosition={handleCursorPosition}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default WriteDetailPage