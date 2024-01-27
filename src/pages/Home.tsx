import { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { Filter14M } from '../styles/GlobalText';
import { StackScreenProps, createStackNavigator } from '@react-navigation/stack';
import { TabProps } from '../../App';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Logo from '../assets/common/Logo.svg';
import Search from '../assets/common/Search.svg';
import Bell from '../assets/common/Bell.svg';
export type HomeStackParams = {
  Home: undefined;
}

const HomeStack = createStackNavigator<HomeStackParams>();

interface ToggleButtonParams {
  pressable?: boolean;
}

const Toggletag = ({pressable} : ToggleButtonParams) => {
  const [pressed, setPressed] = useState<boolean>(false);
  return (
    <ToggleButton pressed={pressed} onPress={() => setPressed(!pressed)} disabled={!pressable}>
      <Filter14M style={{color: pressed ?'white' : '#CEBFFA'}}></Filter14M>
    </ToggleButton>
  )
}


const FrameBox = styled. View`
  display: flex;
  flex-direction: row;
  height: 51px;
  padding: 0px 16px;
  align-items: center;
  justify-content: center;
  background: #E7E0FD;
`
const ToggleBox = styled. View `
  display: flex;
  flex-direction: row;
  padding: 2px;
  width: 140px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: #FFF;
  align-self: center;
`

const ToggleButton = styled. TouchableOpacity<{pressed: boolean}>`
  display: flex;
  height: 28px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background:  ${(props: { pressed: boolean }) => props.pressed ? '#DBFC72' : '#FFF' };
`


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
      <TouchableOpacity>
        <FrameBox>
          <Logo />
          <View style={{flex: 1}}>
          <ToggleBox>
            <ToggleButton>
              <Text style={{ fontSize: 16, fontWeight: '500', marginRight: 5 }}>상품</Text>
            </ToggleButton>
            <ToggleButton>
              <Text style={{ fontSize: 16, fontWeight: '500', marginRight: 5 }}>마켓</Text>
            </ToggleButton>
          </ToggleBox>
          </View>
          <Search />
          <Bell />
        </FrameBox>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default HomeScreen;
