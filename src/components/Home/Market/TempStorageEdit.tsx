import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Arrow from '../../../assets/common/Arrow.svg';
import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-safearea-height";
import { Body14B, Body14M, Body16B, Subtitle16B } from "../../../styles/GlobalText";
import { StackScreenProps } from "@react-navigation/stack";
import { useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { BLACK } from "../../../styles/GlobalColor";

const statusBarHeight = getStatusBarHeight(true);

const BackButton = styled.TouchableOpacity`
  padding: 10px;
  top: ${statusBarHeight-10}px;
  z-index: 1;
`
const TempView = styled.View`
  padding: 10px;
`
const ButtonSection = styled.View`
  display: flex;
  flex-direction: row;
  justify-content:space-around;
`
const FooterButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding:12px;
  margin-bottom: 20px;
  margin-top: 10px;
  justify-content: center;
  border-radius: 12px;
`


const TextComponent = ({ name, date }:any) => {
  return (
    <View style={{padding:5, marginLeft:20}}>
      <Body16B>{name}</Body16B>
      <Body14M style={{color:"#929292"}}>{date}</Body14M>
    </View>
  )
}

const TempStorageEdit = ({navigation}:StackScreenProps<any>) => {
  const [pressed, setPressed] = useState<boolean>(false);
  const storage = [
    {
      name: "서비스 이름 어쩌구1",
      date: "2024.02.06.00:00"
    },
    {
      name: "서비스 이름 어쩌구2",
      date: "2024.02.06.00:00"
    },
    {
      name: "서비스 이름 어쩌구3",
      date: "2024.02.06.00:00"
    },
    {
      name: "서비스 이름 어쩌구4",
      date: "2024.02.06.00:00"
    },
    {
      name: "서비스 이름 어쩌구5",
      date: "2024.02.06.00:00"
    }
  ];
  return (
    <ScrollView>
      <View style={{flexDirection:"row", marginTop:20, borderBottomWidth:1, borderBlockColor:"#dcdcdc", padding:5, justifyContent:"space-between"}}>
        <BackButton onPress={() => navigation.goBack()}>
          <Arrow color='black' />
        </BackButton>
        <View>
          <Body16B style={{fontSize:18,textAlign:"center"}}>임시저장</Body16B>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Body14M style={{color:"#929292"}}>완료</Body14M>
        </TouchableOpacity>
      </View>
      <View>
        <Body14B style={{padding:10}}>총 {storage.length}개</Body14B>
        {storage.map((item, idx) => (
          <TempView style={{borderBottomWidth:1, borderColor:"#dcdcdc"}}key={idx}>
            <BouncyCheckbox
              size={25}
              fillColor="#612FEF"
              unfillColor="#FFF"
              textComponent=<TextComponent name={item.name} date={item.date}/>
              iconStyle={{ borderColor: "#612FEF" }}
              innerIconStyle={{ borderWidth: 2 }}
              onPress={(isChecked: boolean) => {}}
            />
          </TempView>
        ))}
      </View>
      <ButtonSection style={{flex:1}}>
        <FooterButton style={{flex:0.3, backgroundColor:"#612FEF"}}>
          <Subtitle16B style={{color:"#DBFC72"}}>전체 선택</Subtitle16B>
        </FooterButton>
        <FooterButton style={{flex:0.6, backgroundColor:"#DBFC72"}}>
          <Subtitle16B style={{color:"#612FEF"}}>삭제하기</Subtitle16B>
        </FooterButton>
      </ButtonSection>
    </ScrollView>
  )
}

export default TempStorageEdit