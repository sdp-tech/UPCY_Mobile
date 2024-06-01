import {
  SafeAreaView,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { GREEN, PURPLE } from '../../styles/GlobalColor';
import { useState, Fragment } from 'react';
import Request from '../../common/requests';
import Logo from '../../assets/common/Logo.svg';
import LeftArrow from '../../assets/common/Arrow.svg';
import { Body16B, Caption11M } from '../../styles/GlobalText';

interface LoginProps {
  navigation: any;
  route: any;
}

interface LoginInputProps {
  placeholder: string;
  secure?: boolean;
  onChangeText: (text: string) => void;
}

function LoginInput({
  placeholder,
  secure = false,
  onChangeText,
}: LoginInputProps) {
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
        color: '#ffffff',
      }}
      placeholder={placeholder}
      placeholderTextColor="#ffffff"
      onChangeText={onChangeText}
      secureTextEntry={secure}
      autoCapitalize="none"
      autoComplete="off"
      autoCorrect={false}></TextInput>
  );
}

export default function Login({ navigation, route }: LoginProps) {
  const { width, height } = Dimensions.get('window');
  const [form, setForm] = useState({ email: '', password: '' });
  const request = Request();
  const handleLogin = async () => {
    const response = await request.post(`users/login/`, form, {});
    if (response?.status === 200) {
      const parentNav = navigation.getParent();
      if (parentNav != undefined) parentNav.goBack();
      else navigation.navigate('Home');
    } else {
      console.log(response);
      Alert.alert('로그인에 실패했습니다.');
    }
  };

  return (
    <Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: PURPLE }} />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: PURPLE,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            alignSelf: 'flex-start',
            marginTop: height * 0.02,
            marginLeft: width * 0.03,
          }}>
          <LeftArrow color="#fff" />
        </TouchableOpacity>
        <Logo
          color="#fff"
          width="90px"
          height="40px"
          style={{ marginTop: height * 0.17, marginBottom: 20 }}
        />
        <View style={{ marginTop: height * 0.02 }}>
          <LoginInput
            placeholder="아이디"
            onChangeText={value => {
              setForm(prev => {
                return { ...prev, email: value };
              });
            }}></LoginInput>
          <LoginInput
            placeholder="비밀번호"
            onChangeText={value => {
              setForm(prev => {
                return { ...prev, password: value };
              });
            }}
            secure={true}></LoginInput>
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
    </Fragment>
  );
}
