import { StackScreenProps } from "@react-navigation/stack"
import { HomeStackParams } from "../../../pages/Home"
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView, Dimensions, ImageBackground, Alert } from "react-native"
import Arrow from '../../../assets/common/Arrow.svg';
import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-safearea-height";
import { Body14B, Body14M, Body16B, Caption11M, Subtitle16B, Subtitle16M, Subtitle18B, Subtitle18M } from "../../../styles/GlobalText";
import { BLACK2, GRAY, LIGHTGRAY, PURPLE } from "../../../styles/GlobalColor";
import InputBox from "../../../common/InputBox";
import { useEffect, useState } from "react";
import React from "react";
import Filter from "../../../common/Filter";
import FilterBox from '../../../common/FilterBox';
import Hashtag from "../../../common/Hashtag";
import Photo from "../../../assets/common/Photo.svg"
import TempStorage from "./TempStorage";
import Slider from "@react-native-community/slider";
import PhotoOptions, { PhotoResultProps } from '../../../common/PhotoOptions';
import Carousel from '../../../common/Carousel';
import FilterElement from "./FilterElement";
import CustomScrollView from "../../../common/CustomScrollView";
import { useBottomBar } from "../../../../contexts/BottomBarContext";
import { CustomBackButton } from "../components/CustomBackButton";
import DetailScreenHeader from "../components/DetailScreenHeader";

const statusBarHeight = getStatusBarHeight(true);

const BackButton = styled.TouchableOpacity`
  padding: 10px;
  z-index: 1;
`

const ButtonSection = styled.View`
  display: flex;
  flex-direction: row;
  justify-content:space-around;
`

const UploadSection = styled.View`
  display: flex;
  flex-direction: row;
  justify-content:center;
  align-items:center;
  width: 100%;
  height: 350px;
  background-color: gray;
`

const UploadButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 20px 0px 20px;
  background: ${LIGHTGRAY};
  border-radius: 6px;
  margin-bottom: 20px;
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

const FillerSection = styled.View`
  display: flex;
  flex-direction: row;
  flex:1;
  justify-content:center;
  align-items:center;
  height: 250px;
  background-color: white;
  margin:10px;
  border:1px solid #222;
  border-radius: 8px;
`

const TagBox = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`

interface Detail {
  detail: string;
  price: number;
  detailExplain: string;
}

const GoodsRegistrationPage = ({ navigation, route }: StackScreenProps<HomeStackParams, 'GoodsRegistrationPage'>) => {
  const { hideBottomBar, showBottomBar } = useBottomBar();

  useEffect(() => {
    hideBottomBar();
    return () => showBottomBar();
  }, []);

  const [materials, setMaterials] = useState<string[]>([]);
  const [styles, setStyles] = useState<string[]>([]);
  const [fits, setFits] = useState<string[]>([]);
  const [details, setDetails] = useState<string[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const ifUnpressable = (value: string) => {
    if (
      category.length == 1 || fits.length == 1 || materials.length == 1)
      return true;
    else return false;
  };
  const handleSeveralPress = (type: string, value: string): void => {
    if (type == "style" && styles.includes(value)) {
      const extractedStyles = styles.filter(v => v !== value);
      setStyles([...new Set([...extractedStyles])]
      );
    }
    else if (type == "style") {
      setStyles(prevStyles => [...new Set([...prevStyles, value])])
    }
    else if (type == "detail" && details.includes(value)) {
      const extractedDetails = details.filter(v => v !== value);
      setDetails([...new Set([...extractedDetails])]
      );
    }
    else if (type == "detail") {
      setDetails(prevDetails => [...new Set([...prevDetails, value])])
    };
  }
  const handleOnePress = (type: string, value: string) => {
    if (ifUnpressable(value)) {
      if (type == "fit") {
        Alert.alert('한 개만 선택해주세요');
        const extractedFits = fits.filter(v => v !== value);
        setFits([...new Set([...extractedFits])]
        );
      }
      else if (type == "category") {
        Alert.alert('한 개만 선택해주세요');
        const extractedCategory = category.filter(v => v !== value);
        setCategory([...new Set([...extractedCategory])]
        );
      }
      else if (type == "material") {
        Alert.alert('한 개만 선택해주세요');
        const extractedMaterials = materials.filter(v => v !== value);
        setMaterials([...new Set([...extractedMaterials])]
        );
      }
    }
    else if (type == "fit" && fits.includes(value)) {
      const extractedFits = fits.filter(v => v !== value);
      setFits([...new Set([...extractedFits])]
      );
    }
    else if (type == "fit") {
      setFits(prevFits => [...new Set([...prevFits, value])])
    }
    else if (type == "category" && category.includes(value)) {
      const extractedCategory = category.filter(v => v !== value);
      setCategory([...new Set([...extractedCategory])]
      );
    }
    else if (type == "category") {
      setCategory(prevCategory => [...new Set([...prevCategory, value])])
    }
    else if (type == "material" && materials.includes(value)) {
      const extractedMaterials = materials.filter(v => v !== value);
      setMaterials([...new Set([...extractedMaterials])]
      );
    }
    else if (type == "material") {
      setMaterials(prevMaterials => [...new Set([...prevMaterials, value])])
    };
  }
  const [makingTime, setMakingTime] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [detail, setDetail] = useState<string>('');
  const [addPrice, setAddprice] = useState<string>("");
  const [detailExplain, setDetalExplain] = useState<string>("");
  const [notice, setNotice] = useState<string>('');
  const [inputText, setInputText] = useState<string>('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [photos, setPhotos] = useState<PhotoResultProps[]>([]);
  const [detailList, setDetailList] = useState<Detail[]>([]);
  const addDetail = () => {
    if (detail == '' || addPrice == '' || detailExplain == '') {
      Alert.alert("기준 사항을 모두 입력해주세요")
    }
    else if (price == '') {
      Alert.alert("아래의 가격을 입력해주세요")
    }
    else {
      const newDetail = { detail: detail, price: parseInt(price) + parseInt(addPrice), detailExplain: detailExplain };
      setDetailList([...detailList, newDetail]);
      // 입력 필드 초기화
      setDetail('');
      setAddprice('');
      setDetalExplain('');
      setPrice('');
    }
  }
  const removeDetail = (idx: number): void => {
    const newList = [...detailList];
    newList.splice(idx, 1); // index 위치에서 1개의 항목을 제거합니다.
    setDetailList(newList);
  }
  const handleExtractHashtags = () => {
    // 공백을 기준으로 입력된 텍스트 슬라이싱
    const words = inputText.split(/\s+/);
    // '#'으로 시작하는 단어만 필터링
    const extractedHashtags = words.filter(word => word.startsWith('#'));
    // 기존 해시태그에 새롭게 인풋된 해시태그 추가하여 상태 업데이트 
    if (extractedHashtags.length + hashtags.length <= 5) {
      setHashtags(prevHashtags => [...new Set([...prevHashtags, ...extractedHashtags])]);
      // 입력 필드 초기화
      setInputText('');
    }
    else {
      Alert.alert("해시태그는 5개 이하로 입력해주세요")
    }
  };
  const removeHashtag = (index: number) => {
    setHashtags(prevHashtags => prevHashtags.filter((_, i) => i !== index));
  };// 자기 자신을 리스트에서 삭제하는 로직 

  const splitArrayIntoPairs = (arr: any[], pairSize: number) => {
    return arr.reduce((result, item, index) => {
      if (index % pairSize === 0) {
        result.push([]);
      }
      result[result.length - 1].push(item);
      return result;
    }, []);
  };
  const splitPhotos = splitArrayIntoPairs(photos, 1);

  const GoodsRegiBottomBar =
    <SafeAreaView>
      <View style={{ alignContent: "center", position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: "#ffffff" }}>
        <ButtonSection style={{ flex: 1, marginHorizontal: 10, marginBottom: 20 }}>
          <FooterButton style={{ flex: 0.3, backgroundColor: "#612FEF" }}>
            <Subtitle16B style={{ color: "#DBFC72" }}>임시저장</Subtitle16B>
          </FooterButton>
          <FooterButton style={{ flex: 0.6, backgroundColor: "#DBFC72" }}>
            <Subtitle16B style={{ color: "#612FEF" }}>저장하기</Subtitle16B>
          </FooterButton>
        </ButtonSection>
      </View>
    </SafeAreaView>;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DetailScreenHeader
        title="상품 등록"
        leftButton="CustomBack"
        onPressLeft={() => { }}
        rightButton="Save"
        onPressRight={() => {
          navigation.navigate('TempStorage');
        }}
        saved={0} />
      {/* 헤더부분 */}
      <SafeAreaView >
        <ScrollView bounces={false} overScrollMode="never">
          {/* 사진 업로드하는 컴포넌트 만들 것 */}
          {photos.length == 0 &&
            <UploadSection style={{ borderBottomWidth: 5, borderBottomColor: "#dcdcdc" }}>
              <View style={{
                backgroundColor: LIGHTGRAY,
                borderRadius: 6,
              }}>
                <PhotoOptions
                  style={{ alignContent: "center", margin: 5, marginBottom: 5 }}
                  max={4}
                  setPhoto={setPhotos}
                  buttonLabel='이미지 첨부'
                />
              </View>
            </UploadSection>
          }
          {photos.length > 0 &&
            <View style={{ flex: 1 }}>
              <Carousel
                data={splitPhotos}
                renderItem={({ item }: any) => {
                  return (
                    <View >
                      {item.map((subItem: any) => (
                        <View style={{ height: 350, paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>
                          <ImageBackground
                            key={subItem.id}
                            source={{ uri: subItem.uri }}
                            style={{ width: "auto", height: "100%" }}
                            alt={subItem.fileName}
                          />
                        </View>
                      ))}
                    </View>
                  )
                }}
                slider
              />
            </View>
          }
          {photos.length > 0 &&
            <TouchableOpacity style={{ padding: 10, marginBottom: -10 }}>
              <PhotoOptions
                max={4}
                setPhoto={setPhotos}
                buttonLabel='등록한 이미지 수정'
              />
            </TouchableOpacity>
          }
          <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#dcdcdc" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Body16B style={{ margin: 10 }}>상품 이름</Body16B>
              <Subtitle18B style={{ color: PURPLE, marginLeft: "-1%" }}>*</Subtitle18B>
            </View>
            <View style={{ margin: 10 }}>
              <InputBox style={{ height: 40 }} value={name} setValue={setName} placeholder='상품 이름을 입력해주세요' />
            </View>
          </View>
          <View style={{ padding: 10, borderBottomWidth: 8, borderBottomColor: "#dcdcdc" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Body16B style={{ margin: 10 }}>키워드 해시태그</Body16B>
              <Subtitle18B style={{ color: PURPLE, marginLeft: "-1%", marginRight: "2%" }}>*</Subtitle18B>
              <Text style={{ fontSize: 11, fontWeight: "700", color: "#929292" }}>({hashtags.length}/5)</Text>
            </View>
            {/* usestate 변경해야함 */}
            <View style={{ margin: 10 }}>
              <InputBox style={{ height: 50 }} value={inputText}
                onChangeText={setInputText} placeholder='#공백없이작성, #해시태그들은공백으로구분, 엔터로 추가'
                onSubmitEditing={handleExtractHashtags} // Enter를 눌렀을 때 해시태그 추출 
                returnKeyType="done" // Enter가 줄바꿈이 아니라 제출 이벤트 일으키도록.
              />
            </View>
            <View style={{ marginBottom: 5, marginHorizontal: 5 }}>
              <TagBox>
                {hashtags.map((item, index) => (
                  <Hashtag key={index} pressable value={item} pressed={false} onPress={() => removeHashtag(index)} />
                ))}
              </TagBox>
            </View>
          </View>
          <View style={{ padding: 10 }}>
            <Body16B style={{ margin: 10, marginBottom: -10 }}>필터 설정</Body16B>
            <FilterElement
              list={styles}
              onPress={handleSeveralPress}
              type="style"
              label="스타일"
            />
            <FilterElement
              list={category}
              onPress={handleOnePress}
              type="category"
              label="카테고리"
            />
            <FilterElement
              list={materials}
              onPress={handleOnePress}
              type="material"
              label="재질"
            />
            <FilterElement
              list={fits}
              onPress={handleOnePress}
              type="fit"
              label="핏"
            />
            <FilterElement
              list={details}
              onPress={handleSeveralPress}
              type="detail"
              label="디테일"
            />
          </View>
          <View>
            <View style={{ padding: 10, flex: 1, borderBottomWidth: 1, borderBottomColor: "#dcdcdc" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Body16B style={{ margin: 10, marginTop: 0 }}>제작기간</Body16B>
                <Subtitle18B style={{ color: PURPLE, marginLeft: "-1%", marginTop: -10 }}>*</Subtitle18B>
              </View>
              <View style={{ margin: 10, flex: 1 }}>
                <Slider
                  style={{ flex: 1, height: 40 }}
                  value={makingTime}
                  onValueChange={setMakingTime}
                  minimumValue={0}
                  step={1}
                  maximumValue={5}
                  minimumTrackTintColor="#612FEF"
                  maximumTrackTintColor="#E7E0FD"
                  thumbTintColor="#612FEF"
                />
                <Text>{makingTime}</Text>
              </View>
            </View>
            <View style={{ padding: 10, borderBottomWidth: 8, borderBottomColor: "#dcdcdc", flex: 1 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Body16B style={{ margin: 10 }}>상품 상세</Body16B>
                <Subtitle18B style={{ color: PURPLE, marginLeft: "-1%" }}>*</Subtitle18B>
              </View>
              <FillerSection style={{ borderWidth: 2, borderColor: BLACK2, backgroundColor: "#FFF" }}>
                <UploadButton onPress={() => navigation.navigate("WriteDetailPage")} style={{ backgroundColor: "#dcdcdc" }}>
                  <Subtitle16B>작성하기</Subtitle16B>
                </UploadButton>
              </FillerSection>
            </View>
          </View>
          <View style={{ padding: 10, borderBottomWidth: 8, borderBottomColor: "#dcdcdc" }}>
            <Body16B style={{ margin: 10 }}>가격 책정 기준</Body16B>
            {addDetailSection()}
            {/* 디테일 추가 섹션 */}
            <Body16B style={{ margin: 10 }}>등록된 기준 목록</Body16B>
            {DetailListSection()}
            {/* 등록된 기준 목록 섹션 */}
          </View>
          <View style={{ padding: 10, borderBottomWidth: 8, borderBottomColor: "#dcdcdc" }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Body16B style={{ margin: 10 }}>가격</Body16B>
              <Subtitle18B style={{ color: PURPLE, marginLeft: "-1%" }}>*</Subtitle18B>
            </View>
            <View style={{ alignItems: "center", flexDirection: "row", margin: 10 }}>
              <TextInput
                style={{
                  flex: 1,
                  borderWidth: 2,
                  borderColor: BLACK2,
                  borderRadius: 5,
                  padding: 10
                }}
                value={price} onChangeText={setPrice} placeholder=' 입력해주세요' />
            </View>
          </View>
          <View style={{ padding: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Body16B style={{ margin: 10 }}>주문 시 유의사항</Body16B>
              <Subtitle18B style={{ color: PURPLE, marginLeft: "-1%" }}>*</Subtitle18B>
            </View>
            <View style={{ margin: 10, marginBottom: "30%" }}>
              <InputBox value={notice} setValue={setNotice} placeholder='입력해주세요' long />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      {GoodsRegiBottomBar}
      {/* 바텀바 */}
    </SafeAreaView>
  )

  function DetailListSection() {
    return <View>
      {detailList.map((item, idx) => (
        <FillerSection key={idx} style={{ flexDirection: "column" }}>
          <Text style={{ color: "#222", alignContent: "flex-start" }}>detail {idx + 1}</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between", width: "90%", marginBottom: 5 }}>
            <Body16B>{item.detail}</Body16B>
            <Body16B>{item.price}원</Body16B>
          </View>
          <View style={{ backgroundColor: "#F9F9F9", flex: 0.8, width: "90%", marginBottom: 5, alignItems: "center", justifyContent: "center", borderRadius: 8 }}>
            <Body14M>{item.detailExplain}</Body14M>
          </View>
          <ButtonSection style={{ width: "90%", justifyContent: "space-between" }}>
            {detailList.length > 0 &&
              <UploadButton style={{ backgroundColor: "#DBFC72", height: "100%" }}
                onPress={removeDetail}><Subtitle16B>🗑️</Subtitle16B>
              </UploadButton>}
            <UploadButton style={{ backgroundColor: "#DBFC72", height: "100%" }}>
              <Subtitle16M style={{ color: "#222" }}>수정하기</Subtitle16M>
            </UploadButton>
          </ButtonSection>
        </FillerSection>
      ))}
    </View>;
  }

  function addDetailSection() {
    return <View style={{ borderBottomColor: "#dcdcdc", borderBottomWidth: 1 }}>
      <View style={{ flex: 1 }}>
        <FillerSection style={{ height: 350, flexDirection: "column", marginBottom: 20 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "90%", marginBottom: 10 }}>
            <Body16B>디테일</Body16B>
            <InputBox
              value={detail}
              onChangeText={setDetail}
              style={{ borderWidth: 2, borderColor: "#828282", borderRadius: 5, flex: .84 }} placeholder="입력해주세요" />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "90%", marginBottom: 10 }}>
            <Body16B>금액</Body16B>
            <InputBox
              value={addPrice}
              onChangeText={setAddprice}
              style={{ borderWidth: 2, borderColor: "#828282", borderRadius: 5, flex: .8 }} placeholder="추가 금액을 입력해주세요" />
          </View>
          <View style={{ width: "90%", marginBottom: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <Body16B>상세 설명</Body16B>
              <Body14M>    이미지 1장 첨부 가능합니다.</Body14M>
            </View>
            <InputBox value={detailExplain} setValue={setDetalExplain} placeholder="50자 이내로 입력해주세요" long />
          </View>
          <ButtonSection style={{ width: "90%", justifyContent: "space-between" }}>
            <UploadButton style={{ backgroundColor: "#DBFC72", height: "100%" }}><Subtitle16B>📷</Subtitle16B></UploadButton>
            <UploadButton style={{ backgroundColor: "#DBFC72", height: "100%" }}
              onPress={addDetail}>
              <Subtitle16M style={{ color: "#222" }}>등록하기</Subtitle16M>
            </UploadButton>
          </ButtonSection>
        </FillerSection>
      </View>
    </View>;
  }
}
export default GoodsRegistrationPage;
