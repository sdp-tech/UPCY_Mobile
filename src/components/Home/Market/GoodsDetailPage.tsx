import { Dimensions, SafeAreaView, ScrollView, Text, TouchableOpacity, View, StyleSheet, useWindowDimensions, Image, ImageBackground } from 'react-native';
import { StackScreenProps, createStackNavigator } from '@react-navigation/stack';
import { HomeStackParams } from '../../../pages/Home';
import Arrow from '../../../assets/common/Arrow.svg';
import Search from '../../../assets/common/Search.svg';
import Review from "../../../assets/common/Review.svg";
import UnFilledLike from '../../../assets/common/UnFilledLike.svg';
import { useRef, useState } from 'react';
import DetailBox from './DetailBox';
import OptionBox from './OptionBox';
import CardView from '../../../common/CardView';
import Footer from '../../../common/Footer';
import { MaterialTabBar, Tabs } from 'react-native-collapsible-tab-view';
import { BLACK } from '../../../styles/GlobalColor';
import ReviewPage from './ReviewPage';
import styled from 'styled-components';


const { width, height } = Dimensions.get("window");

export type DetailPageStackParams = {
  DetailPage: undefined;
  ReviewPage: undefined;
}

const DetailPageStack = createStackNavigator<DetailPageStackParams>();

const GoodsDetailPageScreen = ({ navigation, route }: StackScreenProps<HomeStackParams, 'GoodsDetailPage', 'ReviewPage'>) => {
  return (
    <DetailPageStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <DetailPageStack.Screen name='DetailPage' component={GoodsDetailPageMainScreen} />
      <DetailPageStack.Screen name='ReviewPage' component={ReviewPage} />
    </DetailPageStack.Navigator>
  );
};

const ProfileSection = ({ navigation }: { navigation: any }) => {
  const [data, setData] = useState([]);
  return (
    <SafeAreaView>{/* 세이프에리어로 변경 */}
      <View style={{ flexDirection: "column", height: 30, alignItems: 'center', justifyContent: "space-between" }}>
        <View // Top bar part: back arrow, service name, search
          style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
          <TouchableOpacity onPress={() => {
            navigation.goBack();
          }}>
            <Arrow color='black' />
          </TouchableOpacity>
          <View // service name
            style={{ width: '80%' }}>
            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '700' }}>
              서비스 명 어쩌구
            </Text>
          </View>
          <TouchableOpacity onPress={() => {
            navigation.goBack();
          }}>
            <Search stroke={"black"} />
          </TouchableOpacity>
        </View >
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
      <View >
        <ImageBackground // 임시 이미지 
          style={{ width: '100%', height: height * 0.3 }}
          imageStyle={{ height: height * 0.3 }}
          source={{ uri: 'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp' }}>
          <View style={{ width: '100%', height: height * 0.3, backgroundColor: '#00000066', opacity: 0.7 }} />
        </ImageBackground>
      </View>
      <View style={TextStyles.borderBottom1}>
        <View style={{ flex: 5, flexDirection: 'column' }}>
          <Text style={TextStyles.Sub}>#키워드 #키워드 #키워드 #키워드</Text>
          <Text style={TextStyles.Title}>상품 이름</Text>
          <Text style={TextStyles.Price}>20,000 원</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
          <View style={{
            marginBottom: 15, marginRight: 15, flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center'
          }}>
            <TouchableOpacity onPress={() => {
              navigation.navigate('ReviewPage');
            }}>
              <Review color={BLACK} />
            </TouchableOpacity>
            <Text style={{ marginTop: 8 }}>후기(3)</Text>
          </View>
        </View>
      </View>
      {/* 컴포넌트로 변경 예정 */}
      <View style={{ ...TextStyles.borderBottom2, justifyContent: 'space-between' }}>
        <View style={{ padding: 15, flexDirection: 'row' }}>
          <View style={{ backgroundColor: "gray", width: 50, height: 50, borderRadius: 25 }}></View>
          <View style={{ marginLeft: 20, justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 14, padding: 3, fontWeight: '700', color: '#22222' }}>마켓명 </Text>
              <Arrow // Arrow at the right side of 'marketname'
                style={{ marginLeft: -7, transform: [{ scaleX: -1 }] }}
                color={BLACK}>
              </Arrow>
            </View>
            <Text style={{ fontSize: 14, padding: 3, fontWeight: '700', color: '#222222' }}>리폼러닉네임</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const GoodsDetailPageMainScreen = ({ navigation }: StackScreenProps<DetailPageStackParams, 'DetailPage'>) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState<number>(0);
  const [routes] = useState([
    { key: 'detail', title: '상세설명' },
    { key: 'option', title: '필독사항' },
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
              color: '#222222',
              fontWeight: '700',
              fontSize: 14
            }}
          />
        )}
      >
        {routes.map(route =>
        (<Tabs.Tab key={route.key} name={route.title}>
          {route.key === 'detail' && <DetailBox />}
          {route.key === 'option' && <OptionBox />}
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
    paddingBottom: 15,
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
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBlockColor: "#dcdcdc"
  },
  borderBottom2: {
    borderBottomWidth: 6,
    borderBlockColor: "#dcdcdc"
  }
});

export default GoodsDetailPageScreen;
