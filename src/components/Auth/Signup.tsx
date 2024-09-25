import {
  SafeAreaView,
  View,
  Dimensions,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { Body14M, Body16B, Title20B } from '../../styles/GlobalText';
import { BLACK, GREEN, PURPLE } from '../../styles/GlobalColor';

import RightArrow from '../../assets/common/RightArrow.svg';
import LeftArrow from '../../assets/common/Arrow.svg';
import Request from '../../common/requests';
import { getAccessToken, getRefreshToken, removeAccessToken } from '../../common/storage';

export interface SignupProps {
  navigation: any;
  route: any;
}

export interface SignupModalProps {
  visible: boolean;
  onClose: () => void;
}

interface StartBtnProps {
  containerStyle?: ViewStyle;
  onPress: () => void;
  subtext: string;
  text: string;
  colorBack: string;
  color: string;
}

function StartBtn({
  containerStyle,
  onPress,
  subtext,
  text,
  colorBack,
  color,
}: StartBtnProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 10,
        backgroundColor: colorBack,
        ...containerStyle,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <Body14M style={{ color: color }}>{subtext}</Body14M>
          <Body16B style={{ color: color }}>{text}</Body16B>
        </View>
        <RightArrow color={color} />
      </View>
    </TouchableOpacity>
  );
}

export default function Signup({ navigation, route }: SignupProps) {
  const { width, height } = Dimensions.get('window');
  const request = Request();
  return (
    <SafeAreaView>
      <View
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          marginHorizontal: width * 0.03,
        }}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={{ marginVertical: height * 0.02 }}>
          <LeftArrow color={BLACK} />
        </TouchableOpacity>
        <View style={{ marginTop: height * 0.06, marginLeft: width * 0.02 }}>
          <View>
            <Title20B>나만의 맵시</Title20B>
            <Title20B>낭비 없이, UPCY!</Title20B>
          </View>
          <View style={{ marginTop: height * 0.02 }}>
            <Body14M style={{ color: '#8D8D8D' }}>
              원하는 회원가입 유형을 선택하세요.
            </Body14M>
            <Body14M style={{ color: '#8D8D8D' }}>
              의뢰인으로 가입 후에도 리폼러 등록이 가능합니다.
            </Body14M>
          </View>
        </View>
        <View style={{ marginTop: 'auto', marginBottom: height * 0.04 }}>
          <StartBtn
            containerStyle={{ marginBottom: 10 }}
            onPress={() => {
              navigation.navigate('Basic', {
                is_reformer: false
              });
            }}
            subtext="폐의류를 맡기고 싶다면"
            text="의뢰인으로 가입"
            colorBack={GREEN}
            color={BLACK}
          />
          <StartBtn
            onPress={() => {
              navigation.navigate('Basic', {
                is_reformer: true
              });
            }}
            subtext="전문성으로 수익을 창출하고 싶다면"
            text="리폼러로 가입"
            colorBack={PURPLE}
            color="#FFFFFF"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
