import { useCallback, useRef, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import { Body14M, Body16B } from '../../../styles/GlobalText';
import Arrow from '../../../assets/common/Arrow.svg';
import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-safearea-height';

const statusBarHeight = getStatusBarHeight(true);

const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 0px;
  padding: 25px;
  top: ${statusBarHeight-10}px;
  z-index: 1;
`

const WriteDetailPage = ({navigation}:any) => {
  const [detail, setDetail] = useState("");
  const editor = useRef<RichEditor>(null);
  const scrollRef = useRef<ScrollView>(null);

  const handleCursorPosition = useCallback((scrollY: number) => {
    // Positioning scroll bar
    scrollRef.current!.scrollTo({y: scrollY - 30, animated: true});
  }, []);

  return (
    <>
      <View style={{flexDirection:"row", marginTop:20, borderBottomWidth:1, borderBlockColor:"#000", padding:15, justifyContent:"center"}}>
        <BackButton onPress={() => navigation.goBack()}>
          <Arrow color='black' />
        </BackButton>
        <View>
          <Body16B style={{fontSize:18,textAlign:"center"}}>서비스 상세</Body16B>
        </View>
      </View>
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
        <ScrollView>
          <RichEditor
            ref={editor} // from useRef()
            initialContentHTML={detail}
            onChange={(html_content) => { setDetail(html_content);
            }}
            placeholder="내용"
            initialHeight={450}
            useContainer={true}
            onCursorPosition={handleCursorPosition}
          />
        </ScrollView>
    </>
  )
}

export default WriteDetailPage