import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getAccessToken, setUserRole } from './storage';
import Request from './requests';
import { Alert } from 'react-native';
import { UserType } from '../components/Auth/Login';

export const UserContext = createContext<{
  user: UserType | null;
  role: string;
  setUser: (user: UserType | null) => void;
  setRole: (role: string) => void;
}>({
  user: null,
  role: '',
  setUser: () => { },
  setRole: () => { },
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  function sanitizeUserData(data: any) {
    return {
      email: data.email || '',
      phone: data.phone || '',
      nickname: data.nickname || '',
      agreement_terms:
        data.agreement_terms !== undefined ? data.agreement_terms : false,
      adress: data.address || '',
      profile_image_url:
        data.profile_image_url ||
        'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp',
      introduce: data.introduce || '',
      is_active: data.is_active !== undefined ? data.is_active : false,
      role: data.role || 'customer',
    };
  }

  const [user, setUser] = useState<UserType | null>(null);
  const [role, setRole] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isLogin } = useContext(LoginContext); // 로그인 상태 가져오기
  const request = Request();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!isLogin) {
        setUser(null); // 로그인하지 않은 상태라면 유저 데이터를 초기화
        return;
      }

      const accessToken = await getAccessToken();
      try {
        if (accessToken) {
          const headers = {
            Authorization: `Bearer ${accessToken}`,
          };
          const response = await request.get(`/api/user`, {}, headers);
          if (response && response.status === 200) {
            const sanitizedUserData = sanitizeUserData(response.data);
            setUser(sanitizedUserData);
            setRole(sanitizedUserData.role);
            setUserRole(sanitizedUserData.role);
            console.log('Saving credentials:', sanitizedUserData);
          } else if (response && response.status === 404) {
            setUser(null);
          } else if (response && response.status === 401) {
            console.log('Unauthorized access. Please log in again.');
          } else {
            setError('Error fetching user data.');
          }
        } else {
          console.log('No access token found. User remains logged out.');
          setUser(null);
        }
      } catch (err) {
        console.error(err);
        setError('Error occurred while fetching user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isLogin]); // 로그인 상태가 변경될 때만 유저 데이터를 다시 가져옴

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
  const { setUser, role, setRole } = useUser();

  const logout = () => {
    setRole('customer');
    console.log(role);
    console.log('Context의 로그아웃 실행');

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
    setIsLogin(false); // 위의 코드가 실제 코드입니다. 지금 이건 디버깅용입니다.
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
