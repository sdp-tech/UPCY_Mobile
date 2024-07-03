import { StackScreenProps } from "@react-navigation/stack"
import { HomeStackParams } from "../../../pages/Home"
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView, Button, ImageBackground, Alert, Dimensions, FlatList } from "react-native"
import styled from "styled-components/native";
import { Body14B, Body14M, Body16B, Caption11M, Subtitle16B, Subtitle16M, Subtitle18B, Subtitle18M } from "../../../styles/GlobalText";
import { BLACK2, LIGHTGRAY, PURPLE } from "../../../styles/GlobalColor";
import InputBox from "../../../common/InputBox";
import { useCallback, useEffect, useRef, useState } from "react";
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
import DetailScreenHeader from "../components/DetailScreenHeader";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import SelectBox from "../../../common/SelectBox";
import ServiceCategoryModal from "../components/ServiceCategoryModal";
import ImageCarousel from "../../../common/ImageCarousel";
import { PhotoType } from "../../../hooks/useImagePicker";
import { useNavigation } from "@react-navigation/native";
import { RichEditor } from "react-native-pell-rich-editor";

const { width, height } = Dimensions.get('window');

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
  height: 250px;
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


interface CategoryProps {
  category: string;
}

interface Option {
  // 옵션 개별 요소들 prop
  option: string;
  price: number;
  optionExplain: string;
  isFixing: boolean;
  addPrice: string;
  photoAdded: boolean;
  optionPhotos: PhotoType[];
}

const ServiceRegistrationPage = ({ navigation, route }: StackScreenProps<HomeStackParams, 'ServiceRegistrationPage'>) => {
  const { hideBottomBar, showBottomBar } = useBottomBar();

  useEffect(() => {
    hideBottomBar();
    return () => showBottomBar();
  }, []);

  // const [materials, setMaterials] = useState<string[]>([]);
  // const [fits, setFits] = useState<string[]>([]);
  // const [details, setDetails] = useState<string[]>([]);
  // const [category, setCategory] = useState<string[]>([]);

  // 중복 선택 로직 
  const handleSeveralPress = (type: string, value: string): void => {
    if (type == "style" && styles.includes(value)) {
      // 이미 클릭하려는 value가 선택된 적이 있으면, 
      const extractedStyles = styles.filter(v => v !== value);
      // 그 value 제외하고 리스트 생성 
      setStyles([...new Set([...extractedStyles])]
        // 상태관리 
      );
    }
    else if (type == "style") {
      // value가 선택된 적이 없으면, 즉 처음 선택하면 
      setStyles(prevStyles => [...new Set([...prevStyles, value])])
      // 바로 추가해주고 상태관리 
    }
  }

  const handleNavigate = () => {
    navigation.navigate('WriteDetailPage', {
      inputText,
    });
  };

  const handleNextPage = () => {
    if (!(form.category == '') && !(name == '') && !(styles.length == 0) && !(inputText == '')
      && !(price == '') && !(maxPrice == '') && !(notice == '') && !(photos.length == 0)) {
      navigation.navigate('TempStorage')
    } else {
      Alert.alert('필수 사항들을 모두 입력해주세요');
    }
  }

  const [modalOpen, setModalOpen] = useState(false);
  // 이 밑으로는 서비스 자체의 prop
  const [form, setForm] = useState<CategoryProps>({
    category: '',// 백에 넘겨줄 prop: form.category?
  });
  const [styles, setStyles] = useState<string[]>([]);
  const [makingTime, setMakingTime] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [notice, setNotice] = useState<string>('');
  const [photos, setPhotos] = useState<PhotoResultProps[]>([]);
  const [inputText, setInputText] = useState(route.params?.inputText || ''); // 서비스 상세 
  // 이 밑으론 옵션 개별 요소들 prop 
  const [option, setOption] = useState<string>('');
  const [addPrice, setAddprice] = useState<string>("");
  const [optionExplain, setOptionExplain] = useState<string>("");
  const [optionPhotos, setOptionPhotos] = useState<PhotoType[]>([]);
  const [optionList, setOptionList] = useState<Option[]>([]);
  const [isFixing, setIsFixing] = useState(false);
  const [photoAdded, setPhotoAdded] = useState(false);

  useEffect(() => {
    if (route.params?.inputText) {
      setInputText(route.params.inputText);
    }
  }, [route.params?.inputText]);

  const editorRef = useRef<RichEditor>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setContentHTML(inputText);
    }
  }, [inputText]);

  const addOption1 = () => {
    const isString = (value: any) => typeof value === 'string' && value.trim() !== '';
    const isNumericString = (value: any) => typeof value === 'string' && !isNaN(parseFloat(value)) && isFinite(parseFloat(value));

    if (!isString(option) || !isNumericString(addPrice) || !isString(optionExplain)) {
      Alert.alert("옵션 사항을 모두 입력해주세요");
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
    else if (parseInt(price) > parseInt(maxPrice)) {
      Alert.alert("기본 가격이 최대 가격보다 높습니다")
    } else if (optionExplain.length > 50) {
      Alert.alert("설명은 50자 이내로 입력해주세요");
    }
    else {
      const newOption = {
        option: option, price: parseInt(addPrice), optionExplain: optionExplain,
        isFixing: isFixing, addPrice: addPrice, photoAdded: photoAdded, optionPhotos: optionPhotos
      };
      setOptionList([...optionList, newOption]);
      // 입력 필드 초기화
      setOption('');
      setAddprice('');
      setOptionExplain('');
      setIsFixing(false);
      setOptionPhotos([]);
      setPhotoAdded(false);
    }
  }
  const addOption2 = (item: Option, idx: number) => {
    const isString = (value: any) => typeof value === 'string' && value.trim() !== '';
    const isNumericString = (value: any) => typeof value === 'string' && !isNaN(parseFloat(value)) && isFinite(parseFloat(value));

    if (!isString(item.option) || !isNumericString(item.addPrice) || !isString(item.optionExplain)) {
      Alert.alert("옵션 사항을 모두 입력해주세요");
    } else if (item.optionExplain.length > 50) {
      Alert.alert("설명은 50자 이내로 입력해주세요");
    } else {
      const updatedOptionList = [...optionList];
      const updatedOption = {
        ...updatedOptionList[idx], // 기존 옵션 유지
        option: item.option,
        price: parseInt(item.addPrice),
        optionExplain: item.optionExplain,
        isFixing: false, // 수정 완료 후 isFixing을 false로 변경
        addPrice: item.addPrice,
        optionPhotos: item.optionPhotos
      };
      updatedOptionList[idx] = updatedOption;
      setOptionList(updatedOptionList);
      setIsFixing(false);
    }
  }

  const removeOption = (idx: number): void => {
    const newList = [...optionList];
    newList.splice(idx, 1); // index 위치에서 1개의 항목을 제거
    setOptionList(newList);
  }

  const fixOption = (idx: number): void => {
    // '수정하기'버튼 눌렀을 시 호출. 
    if (idx >= 0 && idx < optionList.length) {  // idx 범위를 체크
      const fixingList = [...optionList];
      fixingList[idx].isFixing = true;  // 특정 항목의 isFixing 값을 true로 설정
      setOptionList(fixingList);
    } else {
      console.error("Invalid index", idx);
    }
  }

  const photoAdd1 = () => {
    if (photoAdded) {
      setPhotoAdded(false);
    } else {
      setPhotoAdded(true);
    }
  }

  const photoAdd2 = (item: Option, idx: number) => {
    if (idx >= 0 && idx < optionList.length) {  // idx 범위를 체크
      if (item.photoAdded) {
        // 이미지 수정 안하고 싶을 때 
        const fixingList = [...optionList];
        fixingList[idx].photoAdded = false;
        setOptionList(fixingList);
      } else {
        // 이미지 수정 버튼 눌렀을 때 
        const fixingList = [...optionList];
        fixingList[idx].photoAdded = true;
        setOptionList(fixingList);
      }
    }
  }

  // 개별 옵션 내의 이미지 변경 함수 
  const handleOptionImageChange = (index: number, images: PhotoType[]) => {
    const updatedOptionList = [...optionList];
    updatedOptionList[index].optionPhotos = images;
    setOptionList(updatedOptionList);
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

  const scrollRef = useRef<ScrollView>(null);
  const handleCursorPosition = useCallback((scrollY: number) => {
    // Positioning scroll bar
    scrollRef.current!.scrollTo({ y: scrollY - 30, animated: true });
  }, []);

  const ServiceRegiBottomBar =
    <SafeAreaView>
      <View style={{ alignContent: "center", position: 'absolute', bottom: -30, left: 0, right: 0, backgroundColor: "#ffffff" }}>
        <ButtonSection style={{ flex: 1, marginHorizontal: 10 }}>
          <FooterButton style={{ flex: 0.3, backgroundColor: "#612FEF" }}
            onPress={() => handleNextPage()}>
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
        title="서비스 등록"
        leftButton="CustomBack"
        onPressLeft={() => { }}
        rightButton="Save"
        onPressRight={() => {
          navigation.navigate('TempStorage');
        }}
        saved={0} />
      {/* 헤더부분 */}
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView bounces={false}>
          {/* 사진 업로드하는 컴포넌트 만들 것 */}
          {photos.length == 0 &&
            <UploadSection style={{ borderBottomWidth: 5, borderBottomColor: "#dcdcdc", flex: 1, height: width * 0.5 }}>
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
            <View style={{ flex: 1, width: width, height: width * 0.5 }}>
              <Carousel
                data={splitPhotos}
                renderItem={({ item, index }: any) => {
                  return (
                    <View key={index}>
                      {item.map((subItem: any, subIndex: number) => (
                        <View key={subIndex} style={{ height: 350, paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>
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
            <TouchableOpacity style={{ padding: 5, marginBottom: -40, flex: 1 }}>
              <PhotoOptions
                max={4}
                setPhoto={setPhotos}
                buttonLabel='등록한 이미지 수정'
              />
            </TouchableOpacity>
          }
          <View style={{ padding: 10, borderBottomWidth: 3, borderBottomColor: "#dcdcdc", flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Body16B style={{ margin: 10 }}>서비스 이름</Body16B>
              <Subtitle18B style={{ color: PURPLE, marginLeft: "-1%" }}>*</Subtitle18B>
            </View>
            <View style={{ margin: 10 }}>
              <InputBox style={{ height: 50 }} value={name} setValue={setName} placeholder='서비스 이름을 입력해주세요' />
            </View>
          </View>
          <View style={{ padding: 20, flex: 1 }}>
            <View style={{ flexDirection: "row" }}>
              <Body16B>카테고리</Body16B>
              <Body16B style={{ color: '#612FEF' }}> *</Body16B>
            </View>
            <SelectBox
              value={form.category}
              onPress={() => setModalOpen(true)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ padding: 10 }}>
              <Body16B style={{ margin: 10, marginBottom: -10 }}>필터 설정</Body16B>
              <FilterElement
                list={styles}
                onPress={handleSeveralPress}
                type="style"
                label="스타일"
              />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ padding: 10, flex: 1, borderBottomWidth: 1, borderBottomColor: "#dcdcdc" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Body16B style={{ margin: 10, }}>제작기간</Body16B>
                <Subtitle18B style={{ color: PURPLE, marginLeft: "-1%", }}>*</Subtitle18B>
              </View>
              <View style={{ margin: 10, flex: 1, flexDirection: "column" }}>
                <Slider
                  style={{ flex: 1, height: 40 }}
                  value={makingTime}
                  onValueChange={setMakingTime}
                  minimumValue={0}
                  step={1}
                  maximumValue={5}
                  // makingTime이 0: 3일, 1: 5일, 2: 7일, 3: 3주, 4: 5주, 5: 8주 
                  minimumTrackTintColor="#612FEF"
                  maximumTrackTintColor="#E7E0FD"
                  thumbTintColor="#612FEF"
                />
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 5 }}>
                  <Text style={{ fontSize: 14, fontWeight: "700", color: "#929292" }}>3일</Text>
                  <Text style={{ fontSize: 14, fontWeight: "700", color: "#929292" }}>5일</Text>
                  <Text style={{ fontSize: 14, fontWeight: "700", color: "#929292" }}>7일</Text>
                  <Text style={{ fontSize: 14, fontWeight: "700", color: "#929292" }}>3주</Text>
                  <Text style={{ fontSize: 14, fontWeight: "700", color: "#929292" }}>5주</Text>
                  <Text style={{ fontSize: 14, fontWeight: "700", color: "#929292" }}>8주</Text>
                </View>
              </View>
            </View>
            {!(inputText == '') ? ( // 서비스 상세 있으면 노출 
              <View style={{ padding: 10, borderBottomWidth: 3, borderBottomColor: "#dcdcdc", flex: 1 }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Body16B style={{ margin: 10 }}>서비스 상세</Body16B>
                    <Subtitle18B style={{ color: PURPLE, marginLeft: "-1%" }}>*</Subtitle18B>
                  </View>
                  <View>
                    <TouchableOpacity onPress={handleNavigate}>
                      <Body16B style={{ color: "#612FEF", margin: 10 }}>수정하기</Body16B>
                    </TouchableOpacity>
                  </View>
                </View>
                <FillerSection style={{ borderWidth: 2, borderColor: BLACK2, backgroundColor: "#FFF" }}>
                  <ScrollView bounces={false} overScrollMode="never" style={{ margin: 5 }}>
                    <RichEditor
                      ref={editorRef}
                      initialContentHTML={inputText}
                      onChange={setInputText}
                      placeholder="내용"
                      initialHeight={450}
                      useContainer={true}
                      onCursorPosition={handleCursorPosition}
                      disabled={true}
                    />
                  </ScrollView>
                </FillerSection>
              </View>
            ) : ( // 아직 안 썼으면 아래 노출 
              <View style={{ padding: 10, borderBottomWidth: 3, borderBottomColor: "#dcdcdc", flex: 1 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Body16B style={{ margin: 10 }}>서비스 상세</Body16B>
                  <Subtitle18B style={{ color: PURPLE, marginLeft: "-1%" }}>*</Subtitle18B>
                </View>
                <FillerSection style={{ borderWidth: 2, borderColor: BLACK2, backgroundColor: "#FFF" }}>
                  <UploadButton onPress={handleNavigate} style={{ backgroundColor: "#dcdcdc" }}>
                    <Subtitle16B>작성하기</Subtitle16B>
                  </UploadButton>
                </FillerSection>
              </View>
            )}
          </View>
          {addOptionSection()}
          {/* 옵션 추가 섹션 */}
          <View style={{ flex: 1, padding: 10, borderBottomWidth: 3, borderBottomColor: "#dcdcdc" }}>
            <Body16B style={{ margin: 10 }}>등록된 옵션 목록</Body16B>
            {OptionListSection()}
            {/* 등록된 옵션 목록 섹션 */}
          </View>
          <View style={{ flex: 1, padding: 10, borderBottomWidth: 3, borderBottomColor: "#dcdcdc" }}>
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
                value={maxPrice} onChangeText={setMaxPrice} placeholder=' 입력해주세요' />
            </View>
          </View>
          <View style={{ flex: 1, padding: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Body16B style={{ margin: 10 }}>주문 시 유의사항</Body16B>
              <Subtitle18B style={{ color: PURPLE, marginLeft: "-1%" }}>*</Subtitle18B>
            </View>
            <View style={{ margin: 10, marginBottom: "15%" }}>
              <InputBox value={notice} setValue={setNotice} placeholder='입력해주세요' long />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <ServiceCategoryModal
        open={modalOpen}
        setOpen={setModalOpen}
        value={form.category}
        setValue={text =>
          setForm(prev => {
            return { ...prev, category: text };
          })
        }
      />
      {ServiceRegiBottomBar}
      {/* 바텀바 */}
    </SafeAreaView>
  )

  function OptionListSection() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {optionList.map((item, idx) => (
          <View key={idx} style={{ flexDirection: "column", flex: 1 }}>
            {item.isFixing ? ( // 수정하기 버튼 눌렀을 때 
              <View style={{ flex: 1 }}>
                <FillerSection style={{ flexDirection: "column", height: 350 }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "90%", marginBottom: 10 }}>
                    <Body16B>옵션 명</Body16B>
                    <InputBox
                      value={item.option}
                      onChangeText={text => {
                        const updatedOptionList = [...optionList];
                        updatedOptionList[idx].option = text;
                        setOptionList(updatedOptionList);
                      }}
                      style={{ borderWidth: 2, borderColor: "#828282", borderRadius: 5, flex: 0.84 }} placeholder="입력해주세요" />
                  </View>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "90%", marginBottom: 10 }}>
                    <Body16B>추가금액</Body16B>
                    <InputBox
                      value={item.addPrice}
                      onChangeText={text => {
                        const updatedOptionList = [...optionList];
                        updatedOptionList[idx].addPrice = text;
                        setOptionList(updatedOptionList);
                      }}
                      style={{ borderWidth: 2, borderColor: "#828282", borderRadius: 5, flex: 0.88 }} placeholder="추가 금액을 입력해주세요" />
                  </View>
                  {!item.photoAdded ? (
                    <View style={{ width: "90%", marginBottom: 10 }}>
                      <View style={{ flexDirection: 'row' }}>
                        <Body16B>상세 설명</Body16B>
                        <Body14M>    이미지 1장 첨부 가능합니다.</Body14M>
                      </View>
                      <InputBox value={item.optionExplain} setValue={text => {
                        const updatedOptionList = [...optionList];
                        updatedOptionList[idx].optionExplain = text;
                        setOptionList(updatedOptionList);
                      }} placeholder="50자 이내로 입력해주세요" long />
                    </View>
                  ) : (
                    <View style={{ width: "90%", marginBottom: 10 }}>
                      <View style={{ flexDirection: 'row' }}>
                        <Body16B>상세 설명</Body16B>
                        <Body14M>    이미지 1장 첨부 가능합니다.</Body14M>
                      </View>
                      <View style={{ flexDirection: "row", gap: width * 0.06, width: "90%" }}>
                        <InputBox value={item.optionExplain} setValue={text => {
                          const updatedOptionList = [...optionList];
                          updatedOptionList[idx].optionExplain = text;
                          setOptionList(updatedOptionList);
                        }} placeholder="50자 이내로 입력해주세요"
                          style={{
                            maxHeight: width * 0.25, flex: 2
                          }} long />
                        <View style={{ flex: 1, marginVertical: 5 }}>
                          <ImageCarousel images={item.optionPhotos} setFormImages={(images) => handleOptionImageChange(idx, images)}
                            max={1} originalSize originalHeight={width * 0.25} originalWidth={width * 0.25} />
                        </View>
                      </View>
                    </View>
                  )}
                  <ButtonSection style={{ width: "90%", justifyContent: "space-between" }}>
                    <UploadButton style={{ backgroundColor: "#612FEF", height: "100%" }}
                      onPress={() => photoAdd2(item, idx)}>
                      <Subtitle16B>📷</Subtitle16B></UploadButton>
                    <UploadButton style={{ backgroundColor: "#612FEF", height: "100%" }}
                      onPress={() => addOption2(item, idx)}><Subtitle16M style={{ color: "white" }}>확인</Subtitle16M>
                    </UploadButton>
                  </ButtonSection>
                </FillerSection>
              </View>
            ) : ( // 수정하기 아닐 때 
              <FillerSection key={idx} style={{ flexDirection: "column" }}>
                <View style={{ flexDirection: "row", alignContent: "flex-start", marginLeft: 16 }}>
                  <Text style={{ flex: 1, color: "#612FEF", textAlign: "left" }}>option {idx + 1}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "90%", marginBottom: 5 }}>
                  <Body16B>{item.option}</Body16B>
                  <Body16B>{item.price}원</Body16B>
                </View>
                {item.photoAdded ? ( // 옵션 개별 사진 있을 때 
                  <View style={{ flexDirection: "row", flex: 0.8, gap: width * 0.04, width: "90%" }}>
                    <View style={{
                      backgroundColor: "#F9F9F9", marginBottom: 5, maxHeight: width * 0.25,
                      alignItems: "center", justifyContent: "center", borderRadius: 8, flex: 2, padding: 5, overflow: "hidden"
                    }}>
                      <Body14M>{item.optionExplain}</Body14M>
                    </View>
                    <View style={{ flex: 1, marginVertical: 5 }}>
                      <ImageCarousel images={item.optionPhotos} setFormImages={setOptionPhotos} max={1}
                        originalSize originalHeight={width * 0.25} originalWidth={width * 0.25} unTouchable />
                    </View>
                  </View>
                ) : ( // 옵션별 개별 사진 없을 때 
                  <View style={{ flexDirection: "row", flex: 0.8 }}>
                    <View style={{
                      backgroundColor: "#F9F9F9", width: "90%", marginBottom: 5,
                      alignItems: "center", justifyContent: "center", borderRadius: 8,
                    }}>
                      <Body14M>{item.optionExplain}</Body14M>
                    </View>
                  </View>
                )}
                <ButtonSection style={{ width: "90%", justifyContent: "space-between" }}>
                  <UploadButton style={{ backgroundColor: "#612FEF", height: "100%" }}
                    onPress={() => removeOption(idx)}><Subtitle16B>🗑️</Subtitle16B>
                  </UploadButton>
                  <UploadButton style={{ backgroundColor: "#612FEF", height: "100%" }}
                    onPress={() => fixOption(idx)}><Subtitle16M style={{ color: "#dcdcdc" }}>수정하기</Subtitle16M>
                  </UploadButton>
                </ButtonSection>
              </FillerSection>
            )}
          </View>
        ))}
      </SafeAreaView>
    );
  }

  function addOptionSection() {
    return (
      <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#dcdcdc", flex: 1 }}>
        <Body16B style={{ margin: 10 }}>옵션 별 추가 금액</Body16B>
        <Body14M style={{ margin: 10 }}>설명글 (특별한 기술이나 소재가 사용된 부분을 설명해주세요)</Body14M>
        <View style={{ flex: 1 }}>
          <FillerSection style={{ flexDirection: "column", height: 350, flex: 1 }}>
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
            {!photoAdded ? (
              // 이미지 추가버튼 안 눌렀을 때 
              <View style={{ width: "90%", marginBottom: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Body16B>상세 설명</Body16B>
                  <Body14M>    이미지 1장 첨부 가능합니다.</Body14M>
                </View>
                <InputBox value={optionExplain} setValue={setOptionExplain} placeholder="50자 이내로 입력해주세요" long />
              </View>
            ) : ( // 이미지 추가 버튼 눌렀을 때 
              <View style={{ width: "90%", marginBottom: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Body16B>상세 설명</Body16B>
                  <Body14M>    이미지 1장 첨부 가능합니다.</Body14M>
                </View>
                <View style={{ flexDirection: "row", gap: width * 0.06, width: "90%" }}>
                  <InputBox value={optionExplain} setValue={setOptionExplain} placeholder="50자 이내로 입력해주세요"
                    style={{
                      maxHeight: width * 0.25, flex: 2
                    }} long />
                  <View style={{ flex: 1, marginVertical: 5 }}>
                    <ImageCarousel images={optionPhotos} setFormImages={setOptionPhotos} max={1}
                      originalSize originalHeight={width * 0.25} originalWidth={width * 0.25} />
                  </View>
                </View>
              </View>)}
            <ButtonSection style={{ width: "90%", justifyContent: "space-between" }}>
              <UploadButton style={{ backgroundColor: "#612FEF", height: "100%" }}
                onPress={photoAdd1}><Subtitle16B>📷</Subtitle16B></UploadButton>
              <UploadButton style={{ backgroundColor: "#612FEF", height: "100%" }}
                onPress={addOption1}><Subtitle16M style={{ color: "white" }}>등록하기</Subtitle16M>
              </UploadButton>
            </ButtonSection>
          </FillerSection>
        </View>
      </View>
    );
  }
}

export default ServiceRegistrationPage
