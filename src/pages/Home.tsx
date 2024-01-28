import { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { Filter14M } from '../styles/GlobalText';
import { StackScreenProps, createStackNavigator } from '@react-navigation/stack';
import { TabProps } from '../../App';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DetailPageScreen from '../components/Home/Market/DetailPage';
import CustomHeader from '../common/CustomHeader';
export type HomeStackParams = {
  Home: undefined;
  DetailPage: {
    id?: number;
  };
}

const HomeStack = createStackNavigator<HomeStackParams>();

const HomeScreen = ({ navigation, route }: StackScreenProps<TabProps, '홈'>) => {
  return (
    <HomeStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <HomeStack.Screen name='Home' component={HomeMainScreen}/>
      <HomeStack.Screen name='DetailPage' component={DetailPageScreen}/>
    </HomeStack.Navigator>
  );
};

const HomeMainScreen = ({ navigation }: StackScreenProps<HomeStackParams, 'Home'>) => {
  
  return (
    <SafeAreaView>
      <CustomHeader
        onSearch={() => {}}
      />
      <Text>홈</Text>
    </SafeAreaView>
  )
}

export default HomeScreen;
