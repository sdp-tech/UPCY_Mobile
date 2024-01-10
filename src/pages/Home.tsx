import { SafeAreaView, Text } from 'react-native';
import { StackScreenProps, createStackNavigator } from '@react-navigation/stack';
import { TabProps } from '../../App';

export type HomeStackParams = {
  Home: undefined;
}

const HomeStack = createStackNavigator<HomeStackParams>();

const HomeScreen = ({ navigation, route }: StackScreenProps<TabProps, '홈'>) => {
  return (
    <HomeStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <HomeStack.Screen name='Home' component={HomeMainScreen}/>
    </HomeStack.Navigator>
  );
};

const HomeMainScreen = () => {
  return (
    <SafeAreaView>
      <Text>홈</Text>
    </SafeAreaView>
  )
}

export default HomeScreen;
