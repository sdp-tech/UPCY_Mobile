import { SetStateAction, useState, Dispatch, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, ImageBackground, StyleSheet, Alert, Image } from 'react-native';
import styled from 'styled-components/native';
import { Picker } from '@react-native-picker/picker';
import { BLACK, LIGHTGRAY, PURPLE } from '../../../styles/GlobalColor';
import { Body16M, Caption11M, Caption12M, Body14R, Subtitle16B, Subtitle16M, Subtitle18M, Title20B } from '../../../styles/GlobalText';
import { getStatusBarHeight } from 'react-native-safearea-height';
import CheckBox from '@react-native-community/checkbox';

import InputBox from '../../../common/InputBox';
import BottomButton from '../../../common/BottomButton';

import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParams } from '../../../pages/Home';

import Arrow from '../../../assets/common/Arrow.svg';
import Search from '../../../assets/common/Search.svg';
import PhotoOptions, { PhotoResultProps } from '../../../common/PhotoOptions';
import Carousel from '../../../common/Carousel';

const statusBarHeight = getStatusBarHeight(true);

interface FilterSectionProps {
  label: string;
  items: any[];
}

interface FilterProps {
  value: string;
  onPress: () => void;
  isSelected?: boolean; // 선택된 아이템을 표시하기 위한 prop
}

const Filter = ({ value, onPress, isSelected }: FilterProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.filterButton,
        isSelected ? styles.selectedFilterButton : null,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, isSelected ? styles.selectedText : null]}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  filterButton: {
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: PURPLE,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedFilterButton: {
    backgroundColor: PURPLE, // 선택된 경우의 배경색
  },
  selectedFilterButton2: {
    borderColor: PURPLE,
    backgroundColor: '#F0F0FF',
  },

  selectedText: {
    color: 'white', // 선택된 경우의 텍스트색
  },
  optionBox: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    borderColor: '#D9D9D9',
    borderWidth: 0.5,
  },

  optionText: {
    fontSize: 14,
    color: '#666',
  },
  grayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: LIGHTGRAY,
    borderRadius: 6,
    marginBottom: 20,
    paddingVertical: 6,
  },
  buttonText: {
    marginLeft: 10,
    color: BLACK,
  },
  optionCard: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: PURPLE,
    backgroundColor: '#fff',
    flex:1,
  },
  selectedOptionCard: {
    backgroundColor: '#EDE7F6',
  },
  optionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionText: {
    flex: 1,
    marginRight: 10,
  },
  optionImage: {
    width: 70,
    height: 70,
    borderRadius: 5,
    backgroundColor: '#f0f0f0', // 이미지가 없을 때 회색 배경
  },
  selectedOptionText: {
    color: PURPLE,
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionDescription: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
  },
});


const toggleSelection = <T,>(
  selectedItems: T[],
  setSelectedItems: Dispatch<SetStateAction<T[]>>,
  item: T
) => {
  setSelectedItems((prevSelectedItems) => {
    if (prevSelectedItems.includes(item)) {
      return prevSelectedItems.filter((selectedItem) => selectedItem !== item);
    } else {
      return [...prevSelectedItems, item];
    }
  });
};


const FilterSection = ({ label, items, showDuplicate = true, onMaterialSelect }: FilterSectionProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

 const handleSelectItem = (item: string) => {
    toggleSelection(selectedItems, setSelectedItems, item);
    setSelectedItems((updatedItems) => {
      onMaterialSelect(updatedItems);
      return updatedItems;
    });  };

  return (
    <FilterContainer>
      <FilterBox style={{ marginBottom: 5, justifyContent: 'space-between' }}>
        <Subtitle18M>{label}</Subtitle18M>
        {showDuplicate && <Caption11M style={{ color: PURPLE }}>• 중복 가능</Caption11M>}
      </FilterBox>
      <FilterBox>
        {items.map((item, index) => (
          <Filter
            key={index}
            value={item}
            isSelected={selectedItems.includes(item)}
            onPress={() => handleSelectItem(item)}
          />
        ))}
      </FilterBox>
    </FilterContainer>
  );
};






const QuotationForm = ({ navigation, route }: StackScreenProps<HomeStackParams, 'QuotationForm'>) => {
  const materials = ['폴리에스테르', '면', '스웨이드', '울', '캐시미어', '가죽', '데님', '추가 요청사항에 기재'];
  const meet = ['대면', '비대면'];

  const options = [
 {
      option: 'option 0',
      title: '유료 옵션',
      description: '옵션입니다.',
      price: '1,000 원',
       image: 'https://example.com/image1.jpg'

    },
{
      option: 'option 1',
      title: '단추',
      description: '가방 입구에 똑딱이 단추를 추가할 수 있어요.',
      price: '1,000 원',
      image: 'https://example.com/image1.jpg'
    },
    {
      option: 'option 2',
      title: '지퍼',
      description: '주머니에 귀여운 지퍼를 달아보세요.',
      price: '1,000 원',
      image: 'https://example.com/image2.jpg'
    },
    {
      option: 'option 3',
      title: '주머니',
      description: '주머니를 달아보세요.',
      price: '1,000 원',
      image: 'https://example.com/image2.jpg'
    },
  ];


  const [showDuplicate] = useState(true);
  const [text, setText] = useState<string>('');
  const [photos, setPhotos] = useState<PhotoResultProps[]>([]);
  const [refPhotos, setRefPhotos] = useState<PhotoResultProps[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [selectedMaterial, setSelectedMaterial] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]); //옵션 상세
  const [selectedFilter, setSelectedFilter] = useState<string>(''); // 거래 방식
  const [faceToFaceRegion, setFaceToFaceRegion] = useState<string>(''); // 대면 지역
  const [deliveryType, setDeliveryType] = useState<string>('');
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);





  const splitArrayIntoPairs = (arr: any[], pairSize: number) => {
    return arr.reduce((result, item, index) => {
      if (index % pairSize === 0) {
        result.push([]);
      }
      result[result.length - 1].push(item);
      return result;
    }, []);
  };

  const splitPhotos = splitArrayIntoPairs(photos, 2);
  const splitRefPhotos = splitArrayIntoPairs(refPhotos, 2);

  const handleOnePress = (value: string) => {
    if (selectedFilter && selectedFilter !== value) {
      Alert.alert('한 개만 선택해주세요');
      return;
    } else if (selectedFilter === value) {
      setSelectedFilter('');
    } else {
      setSelectedFilter(value);
    }
  };

  const handleOptionPress = (index: number) => {
     toggleSelection(selectedOptions, setSelectedOptions, index);
   };

  const handleFilterSelection = (filterType: string) => {
    setSelectedFilter(filterType);
  };

const handleNextPress = () => {
  if (!selectedFilter) {
    Alert.alert('거래 방식을 선택해주세요');
    return;
  }

  const selectedOptionDetails = selectedOptions.map(index => options[index]);

  navigation.navigate('InputInfo', {
     materials: selectedMaterial,
     transactionMethod: selectedFilter,
     options: selectedOptionDetails, // 선택한 옵션
     additionalRequest: text,
   });
 };


  return (
    <ScrollView>
      <BackButton onPress={() => navigation.goBack()}>
        <Arrow color={'white'} />
      </BackButton>
      <SearchButton>
        <Search />
      </SearchButton>
      <ImageBackground
        source={{ uri: 'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp' }}
        style={{ width: '100%', height: 210 }}
      >
        <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: BLACK, opacity: 0.7 }} />
        <View style={{ paddingTop: 100, paddingLeft: 50 }}>
          <Title20B style={{ color: 'white', marginBottom: 3 }}>마켓명 (SDP의 상점)</Title20B>
          <Caption12M style={{ color: 'white', marginBottom: 18 }}>리폼러 닉네임 (전성식탁)</Caption12M>
          <Body16M style={{ color: 'white' }}>마켓 소개글</Body16M>
        </View>
      </ImageBackground>
      <View style={{ justifyContent: 'center' }}>
        <Subtitle18M style={{ textAlign: 'center',fontWeight: 'bold', paddingVertical: 10 }}>주문서 작성</Subtitle18M>
        {photos.length > 0 &&
          <Carousel
            data={splitPhotos}
            renderItem={({ item }: any) => {
              return (
                <View style={{ flexDirection: 'row' }}>
                  {item.map((subItem: any) => (
                    <View style={{ width: '50%', paddingHorizontal: 20 }}>
                      <ImageBackground
                        key={subItem.id}
                        source={{ uri: subItem.uri }}
                        style={{ width: '100%', height: 170 }}
                        alt={subItem.fileName}
                      />
                    </View>
                  ))}
                </View>
              );
            }}
            slider
          />
        }
        <View style={{ marginTop: 10, marginLeft: 120, marginRight: 120 }}>
          <PhotoOptions
            style={Object.assign({}, styles.grayButton, { marginright: 5, marginBottom: 5 })}
            max={4}
            setPhoto={setPhotos}
            buttonLabel='의뢰할 의류 사진 첨부  '
          />
        </View>
      </View>
      <View style={{ height: 8, backgroundColor: 'white' }} />
      <FilterSection
              label='재질 선택'
              items={materials}
              showDuplicate ={true}
              onMaterialSelect ={setSelectedMaterial}/>
     <Subtitle16M style={{ paddingHorizontal: 15, marginBottom: 5 }}>기타 재질</Subtitle16M>
    <View style={{ paddingHorizontal: 10, flex: 1 }}>
        <InputBox
        value={text}
        setValue={setText}
        placeholder='의뢰하시는 소재가 상단에 없는 경우 작성해주세요'
        long
        style={{ height: 50, flex: 1 }}
        />
    </View>

      <View style={{ height: 32, backgroundColor: 'white' }} />
     <View style={{ borderBottomWidth: 5, borderColor: '#D9D9D9'}}/>





      <View style={styles.optionBox}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
          <Subtitle18M style={{ paddingHorizontal: 15 }}>옵션 상세</Subtitle18M>
          {showDuplicate && <Caption11M style={{ color: PURPLE }}>• 중복 가능</Caption11M>}
        </View>


            {options.map((option, optionIndex) => (
              <View key={optionIndex} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CheckBox
                  value={selectedOptions.includes(optionIndex)}
                  onValueChange={() => handleOptionPress(optionIndex)}
                  tintColors={{ true: PURPLE, false: '#D9D9D9' }}
                />
                <TouchableOpacity
                  key={optionIndex}
                  style={[styles.optionCard, selectedOptions.includes(optionIndex) && styles.selectedOptionCard]}
                  onPress={() => handleOptionPress(optionIndex)}
                >
                  <Subtitle16M style={selectedOptions.includes(optionIndex) ? styles.selectedOptionText : { color: PURPLE }}>
                    {option.title}
                  </Subtitle16M>

                  <View style={styles.optionHeader}>
                    <Subtitle16M style={selectedOptions.includes(optionIndex) ? styles.selectedOptionText : { color: BLACK }}>
                      {option.title}
                    </Subtitle16M>
                    <Body16M style={selectedOptions.includes(optionIndex) ? styles.selectedOptionText : { color: BLACK, textAlign: 'right' }}>
                      {option.price}
                    </Body16M>
                  </View>

                  <View style={styles.optionContent}>
                    <View style={styles.optionDescription}>
                      <Body14R style={{ color: BLACK }}>{option.description}</Body14R>
                    </View>
                    <View style={styles.optionImage}>
                      <Image source={{ uri: option.image }} style={styles.optionImage} />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>


      <View style={{ paddingVertical: 20, borderBottomWidth: 5, borderColor: '#D9D9D9', backgroundColor: '#FFFFFF', marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
          <Subtitle18M style={{ paddingHorizontal: 15 }}>추가 요청사항</Subtitle18M>
          { <Caption11M style={{ color: PURPLE }}>* 최대 2장 (PNG,JPG) </Caption11M>}
        </View>

        {refPhotos.length > 0 &&
          <Carousel
            data={splitRefPhotos}
            renderItem={({ item }: any) => {
              return (
                <View style={{ flexDirection: 'row' }}>
                  {item.map((subItem: any) => (
                    <View style={{ width: '50%', paddingHorizontal: 20 }}>
                      <ImageBackground
                        key={subItem.id}
                        source={{ uri: subItem.uri }}
                        style={{ width: '100%', height: 170 }}
                        alt={subItem.fileName}
                      />
                    </View>
                  ))}
                </View>
              );
            }}
            slider
          />
        }
        <View style={{ paddingHorizontal: 13, marginTop: 15 }}>
          <PhotoOptions
            style={Object.assign({}, styles.grayButton, { margin: 5, marginBottom: 5 })}
            max={4}
            setPhoto={setRefPhotos}
            buttonLabel='참고 이미지 첨부'
          />
          <InputBox value={text} setValue={setText} placeholder='예) 16인치 파우치로 만들고 싶어요, 평소 상의 55 사이즈를 입어요' long />
        </View>
      </View>




      <View style={{ paddingHorizontal: 15, paddingVertical: 20, backgroundColor: '#FFFFFF' }}>
         <Subtitle18M style={{ marginBottom: 10 }}>거래 방식 선택</Subtitle18M>


                {/* 비대면 버튼 */}
                <TouchableOpacity
                  style={[
                    styles.filterButton,
                    selectedFilter === '비대면' && styles.selectedFilterButton2,
                  ]}
                  onPress={() => handleFilterSelection('비대면')}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.filterText}>📦</Text>
                    <Text style={styles.filterText}>비대면</Text>
                  </View>
                  <Text style={styles.filterDescription}>오픈채팅에서 리폼접수 주소를 주고 받으세요!</Text>
                </TouchableOpacity>

                {/* 대면 버튼 */}
                <TouchableOpacity
                  style={[
                    styles.filterButton,
                    selectedFilter === '대면' && styles.selectedFilterButton2,
                  ]}
                  onPress={() => handleFilterSelection('대면')}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.filterText}>📍</Text>
                    <Text style={styles.filterText}>대면</Text>
                  </View>
                  <Text style={styles.filterDescription}>오픈채팅에서 리폼과 약속을 잡아보세요!</Text>
                </TouchableOpacity>
              </View>

      <View style={{ paddingHorizontal: 45, paddingVertical: 20 }}>
        <BottomButton value='다음' pressed={false} onPress={handleNextPress} />
      </View>
    </ScrollView>
  );
};

const BackButton = styled.TouchableOpacity`
  padding: 10px;
  position: absolute;
  left: 0px;
  top: ${statusBarHeight - 10}px;
  z-index: 1;
`;

const SearchButton = styled.TouchableOpacity`
  padding: 10px;
  position: absolute;
  right: 7px;
  top: ${statusBarHeight - 10}px;
  z-index: 1;
`;

const FilterContainer = styled.View`
  padding: 20px 15px;
  border-bottom-width: 0px;
  border-color: #D9D9D9;
  background-color: #FFFFFF;
  margin-bottom: 20px;
`;

const FilterBox = styled.View`
  display: flex;
  flex-direction: row;
  border-color: ${PURPLE};
  flex-wrap: wrap;
  align-items: center;
  backgroundColor:'white';
`;

export default QuotationForm;
