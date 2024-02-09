import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Arrow from '../../../assets/common/Arrow.svg';
import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-safearea-height";
import { Body14B, Body14M, Body16B } from "../../../styles/GlobalText";
import { StackScreenProps } from "@react-navigation/stack";
import { useState } from "react";
import BottomButton from "../../../common/BottomButton";

const statusBarHeight = getStatusBarHeight(true);

const BackButton = styled.TouchableOpacity`
  padding: 10px;
  top: ${statusBarHeight-10}px;
  z-index: 1;
`
const TempView = styled.TouchableOpacity`
  padding: 10px;
`

const TempStorage = ({navigation}: StackScreenProps<any>) => {
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
        <TouchableOpacity onPress={() => navigation.navigate("TempStorageEdit")}>
          <Body14M style={{color:"#929292"}}>편집</Body14M>
        </TouchableOpacity>
      </View>
      <View>
        <Body14B style={{padding:10}}>총 {storage.length}개</Body14B>
        {storage.map((item, idx) => (
          <TempView style={{borderBottomWidth:1, borderColor:"#dcdcdc"}}key={idx}>
            <Body16B>{item.name}</Body16B>
            <Body14M style={{color:"#929292"}}>{item.date}</Body14M>
          </TempView>
        ))}
      </View>
      <View style={{padding: 50}}>
        <BottomButton 
        value={'불러오기'}
        pressed={pressed}
        onPress={()=>{}}
        >
      </BottomButton>
      </View>
    </ScrollView>
  )
}

export default TempStorage;