import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { getAccessToken, setNickname, setUserRole } from './storage';
import Request from './requests';
import { Alert } from 'react-native';
import { UserType } from '../components/Auth/Login';


export const UserContext = createContext<{
  user: UserType | null;
  role: string;
  setUser: (user: UserType) => void;
  setRole: (role: string) => void;
}>({
  user: null,
  role: '',
  setUser: () => { },
  setRole: () => { },
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  function sanitizeUserData(data: any) { // null 오류 안 나도록 기본값 설정
    return {
      email: data.email || "",
      phone: data.phone || "",
      nickname: data.nickname || "",
      agreement_terms: data.agreement_terms !== undefined ? data.agreement_terms : false,
      adress: data.address || "",
      profile_image_url: data.profile_image_url || "https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp",
      introduce: data.introduce || "",
      is_active: data.is_active !== undefined ? data.is_active : false,
      role: data.role || "customer"
    };
  }

  const [user, setUser] = useState<UserType | null>(null);
  const [role, setRole] = useState<string>(''); // 빈 문자열로 초기화
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const request = Request();

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = await getAccessToken();
      const headers = {
        Authorization: `Bearer ${accessToken}`
      }
      try {
        const response = await request.get(`/api/user`, {}, headers);
        if (response && response.status === 200) {
          console.log('유저 데이터를 저장합니다.');
          const sanitizedUserData = sanitizeUserData(response.data);
          setUser(sanitizedUserData); // 전역 상태에 유저 데이터를 저장
          setUserRole(sanitizedUserData.role);
          console.log('Saving credentials:', sanitizedUserData);
        } else {
          setError('유저 정보를 불러오는 중 문제가 발생했습니다.');
        }
      } catch (err) {
        console.error(err);
        setError('유저 정보를 가져오는 중 에러가 발생했습니다.');
        Alert.alert('Error', '유저 정보를 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);  // 로딩 상태 종료
      }
    };

    fetchUserData();  // Provider가 마운트될 때 유저 데이터 가져옴
  }, []);
  return (
    <UserContext.Provider value={{ user, role, setUser, setRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export const LoginContext = createContext({
  isLogin: false,
  setLogin: (value: boolean) => { },
});

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const { setUser, setRole } = useUser();

  const logout = () => {
    setRole('customer');
    setIsLogin(false);
  };

  const setLogin = (value: boolean) => {
    setIsLogin(value);
    if (!value) logout();
  };

  const checkLogin = async () => {
    // const token = await getAccessToken();
    // if (token) {
    //   setIsLogin(true);
    // } else {
    //   setIsLogin(false)
    // }
    setIsLogin(false) // 위의 코드가 실제 코드입니다. 지금 이건 디버깅용입니다.
    // (위의 코드는 앱을 리빌드 해도 액세스토큰이 남아있어서 회원가입 플로우 수정이 불가함)
  };
  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <LoginContext.Provider value={{ isLogin, setLogin }}>
      {children}
    </LoginContext.Provider>
  );
};