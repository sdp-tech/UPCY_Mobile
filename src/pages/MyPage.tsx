import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useUser, LoginContext } from '../common/Context';
import LockIcon from "../assets/common/Lock.svg";
import ReformerMyPage from '../components/Auth/Reformer/ReformerMyPage.tsx';
import ConsumerMyPage from '../components/Auth/Upcyer/UpcyerMyPage.tsx';
import Login from '../components/Auth/Login';
import ReformerProfile from '../components/Auth/Reformer/Reformer.tsx';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const MyPageScreen = ({ navigation }) => {
  const { user } = useUser();
  const { isLogin } = useContext(LoginContext);

  if (!isLogin) {
    return <Login />;
  }

//   if (user.nickname === "") {
//     return (
//       <View style={styles.container}>
//         <View style={styles.centerContent}>
//           <LockIcon width={60} height={60} style={styles.icon} />
//           <Text style={styles.message}>
//             리폼러 프로필 등록을 완료해야{'\n'}나의 서비스를 제공할 수 있습니다.
//           </Text>
//         </View>
//
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => navigation.navigate('ReformerProfile')} // Navigate to profile registration page
//         >
//           <Text style={styles.buttonText}>리폼러 프로필 등록하기</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   } else {
    if (user.role === 'reformer') {
      return <ReformerMyPage userInfo={user} navigation={navigation} />;
    } else if (user.role === 'customer') {
      return <ConsumerMyPage userInfo={user} navigation={navigation} />;
    } else {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Role not assigned or data missing</Text>
        </View>
      );
    }
//   }
};

const MyPageStack = () => {
  return (
    <Stack.Navigator initialRouteName="MyPage">
      <Stack.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReformerProfile"
        component={ReformerProfile}
        options={{ headerShown: false }} // Title for ReformerProfile screen
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEF1FA',
    paddingHorizontal: 20,
    paddingBottom: 48,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginBottom: 16,
  },
  message: {
    color: '#612FEF',
    textAlign: 'center',
    fontFamily: "Pretendard Variable",
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  button: {
    position: 'absolute',
    bottom: 16,
    width: 358,
    height: 48,
    backgroundColor: '#612FEF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MyPageStack;
