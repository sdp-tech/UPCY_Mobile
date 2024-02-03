import { StackScreenProps } from "@react-navigation/stack"
import { HomeStackParams } from "../../../pages/Home"
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import Arrow from '../../../assets/common/Arrow.svg';
import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-safearea-height";
import { Body14B, Body14M, Body16B, Subtitle16B, Subtitle16M, Subtitle18M } from "../../../styles/GlobalText";
import { BLACK2, LIGHTGRAY } from "../../../styles/GlobalColor";
import InputBox from "../../../common/InputBox";
import { useState } from "react";
import Filter from "../../../common/Filter";
import Hashtag from "../../../common/Hashtag";

const statusBarHeight = getStatusBarHeight(true);

const BackButton = styled.TouchableOpacity`
  padding: 10px;
  position: absolute;
  left: 0px;
  top: ${statusBarHeight-10}px;
  z-index: 1;
`
const StyledButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding:12px;
  padding-horizontal: 16px;
  background: ${LIGHTGRAY};
  border-radius: 6px;
  margin-bottom: 20px;
  margin-top: 10px;
  border: 1px solid #000;
`

const ButtonSection = styled.View`
  display: flex;
  flex-direction: row;
  justify-content:space-around;
`

const UploadSection = styled.View`
  display: flex;
  flex-direction: row;
  flex:1;
  justify-content:center;
  align-items:center;
  width: 100%;
  height: 350px;
  background-color: gray;
`

const UploadButton = styled.TouchableOpacity`
  background-color: white;
  padding: 8px;
  flex: 0.35;
  align-items: center;
  border-radius: 20px;
`

const FooterButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding:12px;
  margin-bottom: 20px;
  margin-top: 10px;
  border: 1px solid #000;
  justify-content: center;
`

const FillerSection = styled.View`
  display: flex;
  flex-direction: row;
  flex:1;
  justify-content:center;
  align-items:center;
  height: 250px;
  background-color: #dcdcdc;
  margin:10px;
  border-radius: 20px;
`

const TagContainer = styled.View`
  padding: 20px 15px;
`

const TagBox = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`

interface HashtagSectionProps {
  items: any[];
}

const FilterSection = ({ items }: HashtagSectionProps) => {
  return (
    <TagContainer>
      <TagBox style={{marginBottom: 5, justifyContent: 'space-between'}}>
      </TagBox>
      <TagBox>
        {items.map((item, index) => (
          <Hashtag key={index} value={item} pressed={false} onPress={() => {}} />
        ))}
      </TagBox>
    </TagContainer>
  )
}


const RegistrationPage = ({ navigation, route }: StackScreenProps<HomeStackParams, 'RegistrationPage'>) => {
  const [makingTime, setMakingTime] = useState<string>("")
  const [name, setName] = useState<string>('');
  const [hashTag, setHashTag] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [detail, setDetail] = useState<string>('');
  const [addPrice, setAddprice] = useState<string>("");
  const [optionExplain, setOptionExplain] = useState<string>("");
  const [notice, setNotice] = useState<string>('');
  const tag = ["#가방", "#어쩌구저쩌구", "#가방", "#가방", "#가방"]
  const registList = [{
    option: "디테일 어쩌구",
    price: `${parseInt(price)}`+`${parseInt(addPrice)}`,
    detail: "상세설명"
  }, {
    option: "디테일 어쩌구",
    price: `${price}`+`${addPrice}`,
    detail: "상세설명"
  } ]
  return (
    <ScrollView>
      <View style={{marginTop:30, borderBottomWidth:1, borderBlockColor:"#000", padding:5}}>
        <BackButton onPress={() => navigation.goBack()}>
          <Arrow color='black' />
        </BackButton>
        <Body16B style={{fontSize:18,textAlign:"center"}}>서비스 등록</Body16B>
      </View>
      <ButtonSection>
        <StyledButton>
          <Subtitle16B>정보 불러오기</Subtitle16B>
        </StyledButton>
        <StyledButton>
          <Subtitle16B>임시저장</Subtitle16B>
        </StyledButton>
      </ButtonSection>
      {/* 사진 업로드하는 컴포넌트 만들 것 */}
      <UploadSection style={{borderBottomWidth:5, borderBottomColor: "#dcdcdc"}}>
        <UploadButton>
          <Subtitle16B>이미지 등록</Subtitle16B>
        </UploadButton>
      </UploadSection>
      <View style={{padding:10,borderBottomWidth:3, borderBottomColor: "#dcdcdc"}}>
        <Body16B style={{margin: 10}}>⚫ 상품 이름</Body16B>
        <View style={{margin: 10}}>
          <InputBox style={{height:50}} value={name} setValue={setName} placeholder='상품 이름을 입력해주세요' long/>
        </View>
      </View>
      <View style={{padding:10,borderBottomWidth:3, borderBottomColor: "#dcdcdc"}}>
        <Body16B style={{margin: 10}}>⚫ 해시태그 입력</Body16B>
        {/* usestate 변경해야함 */}
        <View style={{margin: 10}}>
          <InputBox style={{height:50}} value={hashTag} setValue={setHashTag} placeholder='상품 이름을 입력해주세요' long/>
        </View>
        <FilterSection items={tag} />
      </View>
      <View style={{padding:10,borderBottomWidth:3, borderBottomColor: "#dcdcdc"}}>
        <Body16B style={{margin: 10}}>⚫ 가격</Body16B>
        <View style={{ margin: 10}}>
          <TextInput
           style={{
            width: '100%',
            borderWidth: 1,
            borderColor: BLACK2,
            borderRadius: 5,
            paddingHorizontal: 16,
            paddingTop: 10
          }}
           value={price} onChangeText={setPrice} placeholder='가격을 입력해주세요' />
        </View>
      </View>
      <View style={{padding:10,borderBottomWidth:3, borderBottomColor: "#dcdcdc"}}>
        <Body16B style={{margin: 10}}>⚫ 상세 설명</Body16B>
        <Body16B style={{margin: 10}}>필터 설정</Body16B>
        <FillerSection style={{backgroundColor:"#f5f4f0"}}>
          <UploadButton style={{backgroundColor:"#dcdcdc"}}>
            <Subtitle16B>설정하기</Subtitle16B>
          </UploadButton>
        </FillerSection>
        <View style={{flexDirection:"row", alignItems:"center"}}>
          <Body16B style={{margin: 10}}>제작기간</Body16B>
          <View style={{margin: 10, flex:1}}>
            <TextInput
            style={{
              flex:1,
              borderWidth: 1,
              borderColor: BLACK2,
              borderRadius: 5,
              paddingHorizontal: 16,
              paddingTop: 10
            }}
            value={makingTime} onChangeText={setMakingTime} placeholder='제작 기간을 선택하세요'/>
          </View>
        </View>
        <Body16B style={{margin: 10}}>상품 상세</Body16B>
        <FillerSection style={{borderWidth:2,borderColor:"#dcdcdc", backgroundColor:"#FFF"}}>
          <UploadButton style={{backgroundColor:"#dcdcdc"}}>
            <Subtitle16B>작성하기</Subtitle16B>
          </UploadButton>
        </FillerSection>
      </View>
      <View style={{padding:10,borderBottomWidth:3, borderBottomColor: "#dcdcdc"}}>
        <Body16B style={{margin: 10}}>⚫ 가격 책정 기준</Body16B>
        <Body14M style={{margin: 10}}>설명글 (특별한 기술이나 소재가 사용된 부분을 설명해주세요</Body14M>
        <View style={{margin: 10}}>
          <FillerSection style={{flexDirection:"column", height:350}}>
            <View style={{flexDirection:"row", justifyContent: "space-between", alignItems:"center", width:"90%", marginBottom:10}}>
              <Body16B>디테일</Body16B>
              <TextInput 
              value={detail}
              onChangeText={setDetail}
              style={{borderWidth:2, borderColor:"#828282", borderRadius:20, flex:.84}} placeholder="옵션 명을 입력해주세요"/>
            </View>
            <View style={{flexDirection:"row", justifyContent: "space-between", alignItems:"center", width:"90%", marginBottom:10}}>
              <Body16B>금액</Body16B>
              <TextInput 
              value = {addPrice}
              onChangeText={setAddprice}
              style={{borderWidth:2, borderColor:"#828282", borderRadius:20, flex:.8}} placeholder="추가 금액을 입력해주세요"/>
            </View>
            <View style={{  width:"90%", marginBottom:10}}>
              <View style={{flexDirection: 'row'}}>
                <Body16B>상세 설명</Body16B>
                <Body14M>    이미지 1장 첨부 가능합니다.</Body14M>
              </View>
              <InputBox value={optionExplain} setValue={setOptionExplain} placeholder="옵션 명을 입력해주세요"/>
            </View>
            <ButtonSection style={{width:"90%", justifyContent: "space-between"}}>
              <UploadButton style={{backgroundColor: "#bebebe"}}><Subtitle16B>📷</Subtitle16B></UploadButton>
              <UploadButton style={{backgroundColor: "#bebebe"}}><Subtitle16M>등록하기</Subtitle16M></UploadButton>
            </ButtonSection>
          </FillerSection>
        </View>
      </View>
      <View style={{padding:10,borderBottomWidth:3, borderBottomColor: "#dcdcdc"}}>
        <Body16B style={{margin: 10}}>⚫ 등록된 목록</Body16B>
        <View>
          {registList.map((item, idx) => (
            <FillerSection key = {idx} style={{flexDirection:"column"}}>
              <View style={{flexDirection:"row", justifyContent:"space-between", width:"90%", marginBottom:5}}>
                <Body16B>{idx+1}. {item.option}</Body16B>
                <Body16B>{item.price}원</Body16B>
              </View>
              <View style={{backgroundColor: "#bebebe", flex:0.8, width:"90%", marginBottom:5, alignItems:"center", justifyContent:"center"}}>
                <Body14M>{item.detail}</Body14M>
              </View>
              <ButtonSection style={{width:"90%", justifyContent: "space-between"}}>
                <UploadButton style={{backgroundColor: "#bebebe"}}><Subtitle16B>🗑️</Subtitle16B></UploadButton>
                <UploadButton style={{backgroundColor: "#bebebe"}}><Subtitle16M>수정하기</Subtitle16M></UploadButton>
              </ButtonSection>
            </FillerSection>
          ))}
        </View>
      </View>
      <View style={{padding:10,borderBottomWidth:3, borderBottomColor: "#dcdcdc"}}>
        <Body16B style={{margin: 10}}>⚫ 주문 시 유의사항</Body16B>
        <View style={{margin: 10}}>
          <InputBox value={notice} setValue={setNotice} placeholder='입력해주세요' long/>
        </View>
      </View>
      <ButtonSection style={{flex:1}}>
        <FooterButton style={{flex:0.3}}>
          <Subtitle16B>임시저장</Subtitle16B>
        </FooterButton>
        <FooterButton style={{flex:0.6, backgroundColor:"black"}}>
          <Subtitle16B style={{color:"white"}}>등록하기</Subtitle16B>
        </FooterButton>
      </ButtonSection>
    </ScrollView>
  )
}

export default RegistrationPage