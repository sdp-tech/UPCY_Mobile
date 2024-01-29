import { Dimensions, SafeAreaView, ScrollView, Text, TouchableOpacity, View, StyleSheet, useWindowDimensions } from 'react-native';
import { StackScreenProps, createStackNavigator } from '@react-navigation/stack';
import { HomeStackParams } from '../../../pages/Home';
import Arrow from '../../../assets/common/Arrow.svg';
import UnFilledLike from '../../../assets/common/UnFilledLike.svg';
import Search from '../../../assets/common/Search.svg';
import styled from "styled-components/native";
import { useRef, useState } from 'react';
import CustomHeader from '../../../common/CustomHeader';
import DetailBox from './DetailBox';
import OptionBox from './OptionBox';
import CardView from '../../../common/CardView';
import Footer from '../../../common/Footer';
import { TabBar, TabView } from 'react-native-tab-view';

const { width, height } = Dimensions.get("window");

export type DetailPageStackParams = {
  DetailPage: undefined;
}

const DetailPageStack = createStackNavigator<DetailPageStackParams>();

const DetailPageScreen = ({ navigation, route }: StackScreenProps<HomeStackParams, 'DetailPage'>) => {
  return (
    <DetailPageStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <DetailPageStack.Screen name='DetailPage' component={DetailPageMainScreen}/>
    </DetailPageStack.Navigator>
  );
};

const DetailPageMainScreen = ({ navigation }: StackScreenProps<DetailPageStackParams, 'DetailPage'>) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState<number>(0);
  const [data, setData] = useState([]);
  const [routes] = useState([
    { key: 'detail', title: '상세설명'},
    { key: 'option', title: '옵션 및 유의사항' }
  ]);

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 'detail':
        return <DetailBox/>;
      case 'option':
        return <OptionBox />;
    }
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{flexDirection: "row", height: 50, alignItems: 'center'}}>
        <TouchableOpacity onPress={() => {
          navigation.goBack();
        }}>
          <Arrow/>
        </TouchableOpacity>
      </View>
      <CardView // 데이터 들어오면 렌더링
        gap={0}
        offset={0}
        data={data}
        pageWidth={width}
        dot={true}
        renderItem={({ item }: any) => (
          <View style={{width: width, height: height * 0.4}}><UnFilledLike color={'black'}/></View>
          // <CurationItemCard
          //   rep={true}
          //   data={item}
          //   style={{ width: width, height: height * 0.4 }}
          // />
        )}
      />
        <View style={TextStyles.borderBottom}>
          <Text style={TextStyles.Title}>서비스 이름</Text>
          <Text style={TextStyles.Sub}>#키워드 #키워드 # 키워드</Text>
          <Text style={TextStyles.PriceInfo}>기본: <Text style={TextStyles.Price}>가격</Text></Text>
          <Text style={TextStyles.PriceInfo}>최대: <Text style={TextStyles.Price}>가격</Text></Text>
        </View>
        <View style={{...TextStyles.borderBottom, justifyContent: 'space-between'}}>
          <View style={{ padding:15, flexDirection:'row'}}>
            <View style={{backgroundColor:"gray", width:50, height:50, borderRadius:25}}></View>
            <View style={{marginLeft: 20, justifyContent:'center'}}>
              <Text style={{fontSize:16, padding: 3, fontWeight:'700', color:'#000'}}>마켓명 &gt;</Text>
              <Text style={{fontSize:16, padding: 3, color:'#000'}}>리폼러닉네임</Text>
            </View>
          </View>
        </View>
        <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width, height: layout.height}}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorContainerStyle={{
              borderBottomColor: '#DFDFDF',
              borderBottomWidth: 1
            }}
            indicatorStyle={{
              backgroundColor: '#BDBDBD',
              height: 2
            }}
            style={{
              backgroundColor: 'white',
            }}
            labelStyle={{
              color: 'black'
            }}
            pressColor='black'
          />
        )}
      />
        <View style={{...TextStyles.borderBottom,borderBottomWidth:1, alignItems: 'center'}}>
          <Text style={{...TextStyles.Price}}>후기(3)</Text>
        </View>
      <Footer/>
    </SafeAreaView>
  )
}

const TextStyles = StyleSheet.create({
  Title: {
    // fontFamily:"Inter",
    padding: 10,
    color: '#000',
    fontWeight: "600",
    fontSize: 24,
    lineHeight: 28,
    width: "100%",
  },
  Sub: {
    width: "70%",
    fontWeight: "400",
    padding: 10,
    fontSize: 16,
    color: "#595959",
  },
  PriceInfo:{
    fontWeight: "600",
    fontSize: 16,
    padding:10,
  },
  Price: {
    fontWeight: "600",
    fontSize: 16,
    padding:10,
    color: '#000',
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
  borderBottom: {
    borderBottomWidth:5,
    borderBlockColor:"#dcdcdc"
  }
});

export default DetailPageScreen;
