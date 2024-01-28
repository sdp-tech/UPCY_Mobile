import { Dimensions, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { StackScreenProps, createStackNavigator } from '@react-navigation/stack';
import { HomeStackParams } from '../../../pages/Home';
import LeftArrow from '../../../assets/common/LeftArrow.svg';
import UnFilledLike from '../../../assets/common/UnFilledLike.svg';
import Search from '../../../assets/common/Search.svg';
import styled from "styled-components/native";
import { useRef, useState } from 'react';
import CustomHeader from '../../../common/CustomHeader';
import CardView from '../../../common/CardView';

const { width, height } = Dimensions.get("window");

const SearchWrapper = styled.View`
  display: flex;
  width: 80%;
  margin: 0 auto;
  height: 36px;
  flex-direction: row;
  border-radius: 12px;
`;
const StyledInput = styled.TextInput`
  width: 100%;
  padding: 0 5%;
  font-family: Pretendard Variable;
`;
const ResetButton = styled.TouchableOpacity`
  position: absolute;
  height: 100%;
  right: 0px;
  top: 0px;
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
  const [search, setSearch] = useState<string>("");
  const [isInfo, setIsInfo] = useState<boolean>(true);
  const inputRef = useRef<TextInput>(null);
  const [data, setData] = useState([]);

  const isDetail = () => setIsInfo(true);
  const isOption = () => setIsInfo(false);

  return (
    <SafeAreaView>
      <CustomHeader
            onSearch={() => {
              // navigation.navigate("Search");
            }}
            onAlarm={() => {}}
          />
      <View style={{flexDirection: "row", height: 50, alignItems: 'center'}}>
        <TouchableOpacity onPress={() => {
          navigation.goBack();
        }}>
          <LeftArrow/>
        </TouchableOpacity>
      </View>
      <ScrollView>
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
        <View style={{flexDirection:'row', justifyContent:"space-around", borderBottomWidth:1, borderBottomColor:"black"}}>
          <TouchableOpacity onPress={isDetail}><Text style={{...TextStyles.Price, color: isInfo ? "black":"#dcdcdc", borderBottomWidth: isInfo ? 3:0}}>상세설명</Text></TouchableOpacity>
          <TouchableOpacity onPress={isOption}><Text style={{...TextStyles.Price, color: isInfo ? "#dcdcdc" : "black", borderBottomWidth: isInfo ? 0:3}}>옵션 및 유의사항</Text></TouchableOpacity>
        </View>
        <View style={TextStyles.borderBottom}>
            <View style={{flexDirection:'row'}}>
              <Text style={TextStyles.Price}>제작 기간</Text>
              <Text style={TextStyles.PriceInfo}>3주</Text>
            </View>
            <Text style={TextStyles.Price}>서비스 상세</Text>
            <View style={{backgroundColor:"gray", height:150, width:150}}></View>
        </View>
        <View style={{...TextStyles.borderBottom,borderBottomWidth:1, alignItems: 'center'}}>
          <Text style={{...TextStyles.Price}}>후기(3)</Text>
        </View>
        <View style={{ height:50, display: 'flex', flexDirection:"row", justifyContent:"space-around", alignItems:'center'}}>
        <UnFilledLike color={'black'}/>
        <TouchableOpacity style={{backgroundColor:"#000", flex:0.5, height:30, justifyContent:"center"}}>
          <Text style={{color: '#FFF', fontWeight:"bold", textAlign:'center' }}>
            견적서 보내기
          </Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
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
