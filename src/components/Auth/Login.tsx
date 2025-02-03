import {
  SafeAreaView,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import { GREEN, PURPLE } from '../../styles/GlobalColor';
import { useState, Fragment, useContext } from 'react';
import Request from '../../common/requests';
import Logo from '../../assets/common/Logo.svg';
import LeftArrow from '../../assets/common/Arrow.svg';
import { Body16B, Caption11M } from '../../styles/GlobalText';
import {
  setAccessToken,
  setNickname,
  setRefreshToken,
  setUserRole,
  getUserRole,
  setMarketUUID,
  removeAccessToken
} from '../../common/storage';
import { LoginContext, useUser } from '../../common/Context';

interface LoginProps {
  navigation: any;
  route: any;
}

interface LoginInputProps {
  placeholder: string;
  secure?: boolean;
  onChangeText: (text: string) => void;
}

export type UserType = {
  email: string;
  phone: string;
  nickname: string;
  agreement_terms: boolean;
  adress: string;
  profile_image_url: string;
  introduce: string;
  is_active: boolean;
  role: string;
};

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

export const processLoginResponse2 = async ( // 회원가입시에 사용하는 토큰 발급 및 role 설정용 코드
  response_: any, // 구분
) => {
  // const navigation = useNavigation<StackNavigationProp<MyPageProps>>();
  const request = Request();
  if (response_?.status == 200) {
    const accessToken = response_.data.access;
    const refreshToken = response_.data.refresh;
    const headers = {
      Authorization: `Bearer ${accessToken}`
    }
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    console.log({ accessToken }, ',', { refreshToken });
    try { // 유저 롤 설정 // 근데 이걸 꼭 여기서 할 필요가 있나? 혹시 모르니 만들어두긴 함 
      const response = await request.get(`/api/user`, {}, headers)
      if (response?.status === 200) {
        const user_role = response.data.role;
        setUserRole(user_role);
        const role = await getUserRole();
        console.log('processLogin2에서 유저롤 설정 완료', role);
      }
    } catch (err) {
      console.log(err);
      console.log('유저롤 설정 오류');
    }
  } else if (response_.status == 400) {
    Alert.alert(
      response_.data.extra.fields !== undefined
        ? response_.data.extra.fields.detail
        : response_.data.message,
    );
  } else {
    Alert.alert('예상치 못한 오류가 발생하였습니다.');
  }
};

export async function processLoginResponse( // 통상 로그인시 호출 함수
  response: any,
  navigate: () => void,
  setLogin: (value: boolean) => void,
  setUser: (user: UserType) => void // setUser 전달
) {
  const request = Request();
  // const navigation = useNavigation<StackNavigationProp<MyPageProps>>();
  if (response?.status === 200) {
    const accessToken = await response.data.access;
    const refreshToken = await response.data.refresh;
    const headers = {
      Authorization: `Bearer ${accessToken}`
    }
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    console.log({ accessToken }, ',', { refreshToken });
    try { // 유저롤 설정 
      const response = await request.get(`/api/user`, {}, headers)
      if (response?.status === 200) {
        const user_role = response.data.role;
        setUserRole(user_role);
        const role = await getUserRole();
        console.log('processLogin에서 유저롤 설정 완료', role);
        setLogin(true);
        if (role === 'reformer') { // 리폼러인 경우, marketUUID 저장 
          try {
            const response = await request.get(`/api/market`, {}, headers)
            if (response.status && response.status === 200) {
              setMarketUUID(response.data.market_uuid);
              console.log('processLogin에서:', response.data.market_uuid)
            } else {
              console.log('processLogin에서 MarketUUID 저장 실패:', response);
            }
          } catch (error) {
            console.error(error);
          }
        }
      } else {
        console.log('processLogin에서 유저롤 설정 오류')
      }
    } catch (err) {
      console.log(err);
      console.log('유저롤 설정 오류');
    }
    navigate(); // 인자로 전달받은 네비게이팅 수행
    console.log('로그인 성공');
  } else if (response.status === 400) {
    Alert.alert('비밀번호가 틀렸습니다.');
  } else if (response.status === 404) {
    Alert.alert('이메일을 찾을 수 없습니다.');
  }
};

export default function Login({ navigation, route }: LoginProps) {
  const { isLogin, setLogin } = useContext(LoginContext);
  const { user, setUser } = useUser(); // useUser 훅 사용
  const { width, height } = Dimensions.get('window');
  const [form, setForm] = useState({ email: '', password: '' });
  const request = Request();

  const handleLogin = async () => { // 로그인 함수 
    if (form.email === '' || form.password === '') {
      Alert.alert('이메일과 비밀번호를 모두 입력해주세요.')
    } else {
      const response = await request.post(`/api/user/login`, form);
      processLoginResponse(
        response,
        () => {
          const parentNav = navigation.getParent();
          if (parentNav != undefined) parentNav.goBack();
          else navigation.navigate('Home');
        },
        setLogin,
        setUser // setUser 전달,
      );
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
            placeholder="이메일"
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
            <Button title='test' onPress={() => { removeAccessToken }} />
            {/* <Caption11M style={{ color: '#ffffff' }}> | </Caption11M>
            <Caption11M style={{ color: '#ffffff' }}>비밀번호 찾기</Caption11M> */}
          </View>
        </View>
        {/* <View // 아래에 소셜로그인 구현 필요 
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
        </View> */}
      </SafeAreaView>
    </Fragment>
  );
}
