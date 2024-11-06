import React, { useContext }from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useUser, LoginContext } from '../common/Context';
import ReformerMyPage from '../components/Auth/Reformer/ReformerMyPage.tsx';
import ConsumerMyPage from '../components/Auth/Upcyer/UpcyerMyPage.tsx';
import Login from '../components/Auth/Login';

const MyPageScreen = ({ navigation, route }) => {
  const { user } = useUser();
  const { isLogin } = useContext(LoginContext);

  console.log("User data in MyPage:", user);
  console.log(isLogin);

  if(!isLogin){
      return <Login />;
  }

  if (user.role === 'reformer') {
    return <ReformerMyPage userInfo={user} navigation={navigation} />;
  } else if (user.role === 'customer') {
    return <ConsumerMyPage userInfo={user} />;
  } else {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Role not assigned or data missing</Text>
      </View>
    );
  }
};

export default MyPageScreen;
