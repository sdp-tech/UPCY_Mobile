import { Dimensions, SafeAreaView, ScrollView, Text, TouchableOpacity, View, StyleSheet, useWindowDimensions } from 'react-native';
import { StackScreenProps, createStackNavigator } from '@react-navigation/stack';
import { HomeStackParams } from '../../../pages/Home';
import Arrow from '../../../assets/common/Arrow.svg';
import Search from '../../../assets/common/Search.svg';
import UnFilledLike from '../../../assets/common/UnFilledLike.svg';
import { useRef, useState } from 'react';
import DetailBox from './DetailBox';
import OptionBox from './OptionBox';
import CardView from '../../../common/CardView';
import Footer from '../../../common/Footer';
import { MaterialTabBar, Tabs } from 'react-native-collapsible-tab-view';
import { BLACK } from '../../../styles/GlobalColor';
import ReviewPage from './ReviewPage';

const { width, height } = Dimensions.get("window");

export type DetailPageStackParams = {
  DetailPage: undefined;
}

const DetailPageStack = createStackNavigator<DetailPageStackParams>();

const ServiceDetailPageScreen = ({ navigation, route }: StackScreenProps<HomeStackParams, 'ServiceDetailPage'>) => {
  return (
    <DetailPageStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <DetailPageStack.Screen name='DetailPage' component={ServiceDetailPageMainScreen} />
    </DetailPageStack.Navigator>
  );
};

const ProfileSection = ({ navigation }: { navigation: any }) => {
  const [data, setData] = useState([]);
  return (
    <View>
      <View style={{ justifyContent: "space-between", flexDirection: "row", height: 50, alignItems: 'center' }}>
        <TouchableOpacity onPress={() => {
          navigation.goBack();
        }}>
          <Arrow color='black' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          navigation.goBack();
        }}>
          <Search stroke={'black'} />
        </TouchableOpacity>
      </View>
      <CardView // 데이터 들어오면 렌더링
        gap={0}
        offset={0}
        data={data}
        pageWidth={width}
        dot={true}
        renderItem={({ item }: any) => (
          <View style={{ width: width, height: height * 0.4 }}><UnFilledLike color={'black'} /></View>
          // <CurationItemCard
          //   rep={true}
          //   data={item}
          //   style={{ width: width, height: height * 0.4 }}
          // />
        )}
      />
      {/* 컴포넌트로 변경 예정 */}
      <View style={TextStyles.borderBottom1}>
        <Text style={TextStyles.Title}>서비스 이름</Text>
        <Text style={TextStyles.PriceInfo}>기본: <Text style={TextStyles.Price}>20,000 원</Text></Text>
        <Text style={TextStyles.PriceInfo}>최대: <Text style={TextStyles.Price}>20,000 원</Text></Text>
      </View>
      {/* 컴포넌트로 변경 예정 */}
      <View style={{ ...TextStyles.borderBottom2, justifyContent: 'space-between' }}>
        <View style={{ padding: 15, flexDirection: 'row' }}>
          <View style={{ backgroundColor: "gray", width: 50, height: 50, borderRadius: 25 }}></View>
          <View style={{ marginLeft: 20, justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, padding: 3, fontWeight: '700', color: '#000' }}>마켓명 &gt;</Text>
            <Text style={{ fontSize: 16, padding: 3, color: '#000' }}>리폼러닉네임</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const ServiceDetailPageMainScreen = ({ navigation }: StackScreenProps<DetailPageStackParams, 'DetailPage'>) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState<number>(0);
  const [routes] = useState([
    { key: 'detail', title: '상세설명' },
    { key: 'option', title: '필독사항' },
    { key: 'review', title: '리뷰' }
  ]);

  return (
    <View style={{ flex: 1 }}>
      <Tabs.Container
        renderHeader={props => <ProfileSection navigation={navigation} />}
        headerContainerStyle={{
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderColor: '#D9D9D9'
        }}
        renderTabBar={props => (
          <MaterialTabBar
            {...props}
            indicatorStyle={{
              backgroundColor: '#BDBDBD',
              height: 2
            }}
            style={{
              backgroundColor: 'white',
            }}
            labelStyle={{
              color: BLACK,
              fontWeight: '700',
              fontSize: 16
            }}
          />
        )}
      >
        {routes.map(route =>
        (<Tabs.Tab key={route.key} name={route.title}>
          {route.key === 'detail' && <DetailBox />}
          {route.key === 'option' && <OptionBox />}
          {route.key === 'review' && <ReviewPage />}
        </Tabs.Tab>)
        )}
      </Tabs.Container>
      <Footer />
    </View>
  )
}

const TextStyles = StyleSheet.create({
  Title: {
    // fontFamily:"Inter",
    padding: 10,
    color: '#222222',
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 24,
    width: "100%",
  },
  Sub: {
    width: "70%",
    fontWeight: "700",
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 10,
    fontSize: 14,
    lineHeight: 24,
    color: "#612EFE",
  },
  PriceInfo: {
    fontWeight: "600",
    fontSize: 14,
    paddingLeft: 10,
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5,
    color: 'rgba(34, 34, 34, 0.50)',
  },
  Price: {
    fontWeight: "700",
    fontSize: 16,
    paddingLeft: 10,
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5,
    color: '#222222',
  },
  recommend: {
    color: "#FFFFFF",
    backgroundColor: "#67D393",
    fontSize: 14,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 5,
  },
  borderBottom1: {
    borderBottomWidth: 1,
    borderBlockColor: "#dcdcdc"
  },
  borderBottom2: {
    borderBottomWidth: 6,
    borderBlockColor: "#dcdcdc"
  }
});

export default ServiceDetailPageScreen;
