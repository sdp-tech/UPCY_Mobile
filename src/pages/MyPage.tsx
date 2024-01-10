import { SafeAreaView, Text } from 'react-native';
import { StackScreenProps, createStackNavigator } from '@react-navigation/stack';
import { TabProps } from '../../App';

export type MyPageStackParams = {
  MyPage: undefined;
}

const MyPageStack = createStackNavigator<MyPageStackParams>();

const MyPageScreen = ({ navigation, route }: StackScreenProps<TabProps, '마이페이지'>) => {
  return (
    <MyPageStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <MyPageStack.Screen name='MyPage' component={MyPageMainScreen}/>
    </MyPageStack.Navigator>
  );
};

const MyPageMainScreen = () => {
  return (
    <SafeAreaView>
      <Text>마이페이지</Text>
    </SafeAreaView>
  )
}

export default MyPageScreen;
