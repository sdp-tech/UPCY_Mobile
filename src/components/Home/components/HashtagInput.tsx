import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import Hashtag from '../../../common/Hashtag';
import InputBox from '../../../common/InputBox';
import { Body16B } from '../../../styles/GlobalText';

interface HashtagInputProps {
  hashtags: string[];
  addHashtag: (v: string) => void;
  removeHashtag: (idx: number) => void;
  max: number;
}

const HashtagInput = ({
  hashtags,
  addHashtag,
  removeHashtag,
  max,
}: HashtagInputProps) => {
  const [inputText, setInputText] = useState('');

  const handleExtractHashtags = () => {
    // 공백을 기준으로 입력된 텍스트 슬라이싱
    const words = inputText.split(/\s+/);
    console.log(words);
    // '#'으로 시작하는 단어만 필터링
    const extractedHashtags = words.filter(word => word.startsWith('#'));
    // 기존 해시태그에 새롭게 인풋된 해시태그 추가하여 상태 업데이트
    try {
      extractedHashtags.map(value => {
        if (hashtags.length < max) addHashtag(value);
        else throw value;
      });
    } catch (e) {
      Alert.alert('해시태그는 5개 이하로 입력해 주세요');
    }

    setInputText('');
  };

  return (
    <View style={{ marginVertical: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
        <Body16B>키워드 해시태그</Body16B>
        <Text style={{ fontSize: 11, fontWeight: '700', color: '#929292' }}>
          ({hashtags.length}/{max})
        </Text>
      </View>
      {/* usestate 변경해야함 */}
      <InputBox
        style={{ marginTop: 8 }}
        value={inputText}
        onChangeText={setInputText}
        placeholder="#공백없이작성, #해시태그들은공백으로구분, 엔터로 추가"
        onSubmitEditing={handleExtractHashtags} // Enter를 눌렀을 때 해시태그 추출
        returnKeyType="done"
      />
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginVertical: 8,
          gap: 8,
        }}>
        {hashtags.map((item, index) => {
          return (
            <Hashtag
              key={index}
              pressable
              value={item}
              pressed={false}
              onPress={() => removeHashtag(index)}
            />
          );
        })}
      </View>
    </View>
  );
};

export default HashtagInput;
