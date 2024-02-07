import {
  SafeAreaView,
  View,
  Dimensions,
  TextInput,
  Platform,
} from 'react-native';
import { GREEN, PURPLE } from '../../styles/GlobalColor';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Request from '../../common/requests';
import { Body16B, Caption11M } from '../../styles/GlobalText';

interface LoginProps {
  navigation: any;
  route: any;
}

interface LoginInputProps {
  placeholder: string;
  onChangeText: (text: string) => void;
}

function LoginInput({ placeholder, onChangeText }: LoginInputProps) {
  const { width, height } = Dimensions.get('window');

  return (
    <TextInput
      style={{
        width: width * 0.8,
        height: 45,
        backgroundColor: '#FFFFFF80',
        borderWidth: 2,
        borderColor: GREEN,
        borderRadius: 5,
        padding: 15,
        marginVertical: 6,
      }}
      placeholder={placeholder}
      placeholderTextColor="#ffffff"
      onChangeText={onChangeText}></TextInput>
  );
}

export default function Login({ navigation, route }: LoginProps) {
  const { width, height } = Dimensions.get('window');
  const [form, setForm] = useState({ id: '', pw: '' });
  const request = Request();
  const handleLogin = async () => {
    const response = await request.get(`login`, form);
  };

  return (
    <View
      style={{
        width: width,
        height: height,
        backgroundColor: PURPLE,
      }}>
      <SafeAreaView
        style={{
          // safe area view 작동 안됨
          marginTop: Platform.OS === 'ios' ? height * 0.09 : 0,
          alignItems: 'center',
        }}>
        <View style={{ marginTop: height * 0.2 }}>
          <LoginInput
            placeholder="아이디"
            onChangeText={value => {
              setForm(prev => {
                return { ...prev, id: value };
              });
            }}></LoginInput>
          <LoginInput
            placeholder="비밀번호"
            onChangeText={value => {
              setForm(prev => {
                return { ...prev, pw: value };
              });
            }}></LoginInput>
          <TouchableOpacity
            style={{
              width: width * 0.8,
              height: 45,
              backgroundColor: GREEN,
              borderRadius: 5,
              marginVertical: 6,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={handleLogin}>
            <Body16B>로그인</Body16B>
          </TouchableOpacity>
          <View
            style={{
              marginVertical: 6,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Caption11M style={{ color: '#ffffff' }}>회원가입</Caption11M>
            </TouchableOpacity>
            <Caption11M style={{ color: '#ffffff' }}> | </Caption11M>
            <Caption11M style={{ color: '#ffffff' }}>비밀번호 찾기</Caption11M>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 35,
            width: 48 * 3 + 24,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#ffffff',
              width: 48,
              height: 48,
              borderRadius: 100,
            }}></TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#ffffff',
              width: 48,
              height: 48,
              borderRadius: 100,
            }}></TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#ffffff',
              width: 48,
              height: 48,
              borderRadius: 100,
            }}></TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
