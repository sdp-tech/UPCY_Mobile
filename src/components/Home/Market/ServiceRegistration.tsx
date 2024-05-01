import { StackScreenProps } from "@react-navigation/stack"
import { HomeStackParams } from "../../../pages/Home"
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView, Button, ImageBackground, Alert } from "react-native"
import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-safearea-height";
import { Body14B, Body14M, Body16B, Caption11M, Subtitle16B, Subtitle16M, Subtitle18B, Subtitle18M } from "../../../styles/GlobalText";
import { BLACK2, LIGHTGRAY, PURPLE } from "../../../styles/GlobalColor";
import InputBox from "../../../common/InputBox";
import { useEffect, useState } from "react";
import Filter from "../../../common/Filter";
import Hashtag from "../../../common/Hashtag";
import Photo from "../../../assets/common/Photo.svg"
import TempStorage from "./TempStorage";
import Slider from "@react-native-community/slider";
import PhotoOptions, { PhotoResultProps } from '../../../common/PhotoOptions';
import Carousel from '../../../common/Carousel';
import FilterElement from "./FilterElement";
import { CustomBackButton } from "../components/CustomBackButton";
import { useBottomBar } from "../../../../contexts/BottomBarContext";

const statusBarHeight = getStatusBarHeight(true);

const BackButton = styled.TouchableOpacity`
  padding: 10px;
  z-index: 1;
`
const StyledButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding:12px;
  padding: 0px 16px 0px 16px;
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
  border:1px solid #612FEF;
  border-radius: 8px;
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

const FilterContainer = styled.View`
  padding: 20px 15px;
  border-bottom-width: 1px;
  border-color: #D9D9D9;
`

const FilterBox = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`

interface FilterSectionProps {
  label?: string;
  items: any[];
  style?: any;
}

const FilterSection = ({ label, items }: FilterSectionProps) => {
  return (
    <>
      {label ?
        <FilterContainer>
          <FilterBox style={{ marginBottom: 5, justifyContent: 'space-between' }}>
            <Subtitle18M>{label}</Subtitle18M>
          </FilterBox>
          <FilterBox>
            {items.map((item, index) => (
              <Filter key={index} value={item} pressed={false} onPress={() => { }} />
            ))}
          </FilterBox>
        </FilterContainer>
        :
        <TagContainer>
          <TagBox>
            {items.map((item, index) => (
              <Hashtag key={index} value={item} pressed={false} onPress={() => { }} />
            ))}
          </TagBox>
        </TagContainer>}
    </>
  )
}

interface Option {
  option: string;
  price: number;
  optionExplain: string;
}

const ServiceRegistrationPage = ({ navigation, route }: StackScreenProps<HomeStackParams, 'ServiceRegistrationPage'>) => {
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
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [option, setOption] = useState<string>('');
  const [addPrice, setAddprice] = useState<string>("");
  const [optionExplain, setOptionExplain] = useState<string>("");
  const [notice, setNotice] = useState<string>('');
  const [photos, setPhotos] = useState<PhotoResultProps[]>([]);
  const [optionList, setOptionList] = useState<Option[]>([]);
  const addOption = () => {
    if (option == '' || addPrice == '' || optionExplain == '') {
      Alert.alert("옵션 사항을 모두 입력해주세요")
    }
    else if (price == '') {
      Alert.alert("아래의 기본 가격을 입력해주세요")
    }
    else if (maxPrice == '') {
      Alert.alert("아래의 최대 가격(추가 금액의 상한선)을 입력해주세요")
    }
    else if (parseInt(maxPrice) < parseInt(addPrice)) {
      Alert.alert("추가 금액이 최대 가격의 상한선보다 높습니다")
    }
    else {
      const newOption = { option: option, price: parseInt(price) + parseInt(addPrice), optionExplain: optionExplain };
      setOptionList([...optionList, newOption]);
      // 입력 필드 초기화
      setOption('');
      setAddprice('');
      setOptionExplain('');
      setPrice('');
    }
  }
  const removeOption = (idx: number): void => {
    const newList = [...optionList];
    newList.splice(idx, 1); // index 위치에서 1개의 항목을 제거합니다.
    setOptionList(newList);
  }

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
  const ServiceRegiHeader =
    <SafeAreaView style={{
      position: "relative", top: 0,
      flexDirection: "row", borderBottomWidth: 1, borderBlockColor: "#000", alignItems: "center", justifyContent: "space-between"
    }}>
      <View style={{ flex: 1 }}>
        <CustomBackButton />
      </View>
      <View style={{ flex: 1 }}>
        <Body16B style={{ fontSize: 18, textAlign: "center" }}>서비스 등록</Body16B>
      </View>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <TouchableOpacity style={{ paddingRight: 10 }} onPress={() => { navigation.navigate("TempStorage"); }}>
          <Body14M style={{ color: "#929292" }}>임시저장 | 5</Body14M>
        </TouchableOpacity>
      </View>
    </SafeAreaView>;

  const ServiceRegiBottomBar =
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
      {ServiceRegiHeader}
      {/* 헤더부분 */}
      <SafeAreaView>
        <ScrollView bounces={false}>
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
            <TouchableOpacity style={{ padding: 5, marginBottom: -40 }}>
              <PhotoOptions
                max={4}
                setPhoto={setPhotos}
                buttonLabel='등록한 이미지 수정'
              />
            </TouchableOpacity>
          }
          <View style={{ padding: 10, borderBottomWidth: 3, borderBottomColor: "#dcdcdc" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Body16B style={{ margin: 10 }}>서비스 이름</Body16B>
              <Subtitle18B style={{ color: PURPLE, marginLeft: "-1%" }}>*</Subtitle18B>
            </View>
            <View style={{ margin: 10 }}>
              <InputBox style={{ height: 50 }} value={name} setValue={setName} placeholder='상품 이름을 입력해주세요' long />
            </View>
          </View>
          <View>
            <View style={{ padding: 10, flex: 1, borderBottomWidth: 1, borderBottomColor: "#dcdcdc" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Body16B style={{ margin: 10, }}>제작기간</Body16B>
                <Subtitle18B style={{ color: PURPLE, marginLeft: "-1%", }}>*</Subtitle18B>
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
            <View style={{ padding: 10, borderBottomWidth: 3, borderBottomColor: "#dcdcdc", flex: 1 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Body16B style={{ margin: 10 }}>서비스 상세</Body16B>
                <Subtitle18B style={{ color: PURPLE, marginLeft: "-1%" }}>*</Subtitle18B>
              </View>
              <FillerSection style={{ borderWidth: 2, borderColor: BLACK2, backgroundColor: "#FFF" }}>
                <UploadButton onPress={() => navigation.navigate("WriteDetailPage")} style={{ backgroundColor: "#dcdcdc" }}>
                  <Subtitle16B>작성하기</Subtitle16B>
                </UploadButton>
              </FillerSection>
            </View>
          </View>
          {addOptionSection()}
          {/* 옵션 추가 섹션 */}
          <View style={{ padding: 10, borderBottomWidth: 3, borderBottomColor: "#dcdcdc" }}>
            <Body16B style={{ margin: 10 }}>등록된 옵션 목록</Body16B>
            {OptionListSection()}
            {/* 등록된 옵션 목록 섹션 */}
          </View>
          <View style={{ padding: 10, borderBottomWidth: 3, borderBottomColor: "#dcdcdc" }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", marginRight: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Body16B style={{ margin: 10 }}>가격</Body16B>
                <Subtitle18B style={{ color: PURPLE, marginLeft: "-1%", marginRight: "2%" }}>*</Subtitle18B>
              </View>
              <Body14B style={{ color: "#929292" }}>최대 가격은 옵션 추가 시에 가능한 상한선입니다.</Body14B>
            </View>
            <View style={{ alignItems: "center", flexDirection: "row", margin: 10 }}>
              <Body16B style={{ marginRight: 20 }}>기본 가격</Body16B>
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
            <View style={{ alignItems: "center", flexDirection: "row", margin: 10 }}>
              <Body16B style={{ marginRight: 20 }}>최대 가격</Body16B>
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
          <View style={{ padding: 10, }}>
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
      {ServiceRegiBottomBar}
      {/* 바텀바 */}
    </SafeAreaView>
  )

  function OptionListSection() {
    return <View>
      {optionList.map((item, idx) => (
        <FillerSection key={idx} style={{ flexDirection: "column" }}>
          <View style={{ flexDirection: "row", alignContent: "flex-start", marginLeft: 16 }}>
            <Text style={{ flex: 1, color: "#612FEF", textAlign: "left" }}>option {idx + 1}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", width: "90%", marginBottom: 5 }}>
            <Body16B>{item.option}</Body16B>
            <Body16B>{item.price}원</Body16B>
          </View>
          <View style={{ backgroundColor: "#F9F9F9", flex: 0.8, width: "90%", marginBottom: 5, alignItems: "center", justifyContent: "center", borderRadius: 8 }}>
            <Body14M>{item.optionExplain}</Body14M>
          </View>
          <ButtonSection style={{ width: "90%", justifyContent: "space-between" }}>
            {optionList.length > 0 &&
              <UploadButton style={{ backgroundColor: "#612FEF", height: "100%" }}
                onPress={removeOption}><Subtitle16B>🗑️</Subtitle16B>
              </UploadButton>}
            <UploadButton style={{ backgroundColor: "#612FEF", height: "100%" }}>
              <Subtitle16M style={{ color: "#dcdcdc" }}>수정하기</Subtitle16M>
            </UploadButton>
          </ButtonSection>
        </FillerSection>
      ))}
    </View>;
  }

  function addOptionSection() {
    return <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#dcdcdc" }}>
      <Body16B style={{ margin: 10 }}>옵션 별 추가 금액</Body16B>
      <Body14M style={{ margin: 10 }}>설명글 (특별한 기술이나 소재가 사용된 부분을 설명해주세요</Body14M>
      <View>
        <View style={{ flex: 1 }}>
          <FillerSection style={{ flexDirection: "column", height: 350 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "90%", marginBottom: 10 }}>
              <Body16B>옵션 명</Body16B>
              <InputBox
                value={option}
                onChangeText={setOption}
                style={{ borderWidth: 2, borderColor: "#828282", borderRadius: 5, flex: .84 }} placeholder="입력해주세요" />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "90%", marginBottom: 10 }}>
              <Body16B>추가금액</Body16B>
              <InputBox
                value={addPrice}
                onChangeText={setAddprice}
                style={{ borderWidth: 2, borderColor: "#828282", borderRadius: 5, flex: .88 }} placeholder="추가 금액을 입력해주세요" />
            </View>
            <View style={{ width: "90%", marginBottom: 10 }}>
              <View style={{ flexDirection: 'row' }}>
                <Body16B>상세 설명</Body16B>
                <Body14M>    이미지 1장 첨부 가능합니다.</Body14M>
              </View>
              <InputBox value={optionExplain} setValue={setOptionExplain} placeholder="50자 이내로 입력해주세요" long />
            </View>
            <ButtonSection style={{ width: "90%", justifyContent: "space-between" }}>
              <UploadButton style={{ backgroundColor: "#612FEF", height: "100%" }}><Subtitle16B>📷</Subtitle16B></UploadButton>
              <UploadButton style={{ backgroundColor: "#612FEF", height: "100%" }}
                onPress={addOption}><Subtitle16M style={{ color: "white" }}>등록하기</Subtitle16M>
              </UploadButton>
            </ButtonSection>
          </FillerSection>
        </View>
      </View>
    </View>;
  }
}

export default ServiceRegistrationPage
