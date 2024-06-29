import { SetStateAction, useState, Dispatch, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, ImageBackground, StyleSheet, Alert, Image } from 'react-native';
import styled from 'styled-components/native';
import { Picker } from '@react-native-picker/picker';
import { BLACK, LIGHTGRAY, PURPLE } from '../../../styles/GlobalColor';
import { Body16M, Caption11M, Caption12M, Body14R, Subtitle16B, Subtitle16M, Subtitle18M, Title20B } from '../../../styles/GlobalText';
import { getStatusBarHeight } from 'react-native-safearea-height';

import InputBox from '../../../common/InputBox';
import BottomButton from '../../../common/BottomButton';
import CheckBox from '../../../common/CheckBox';

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
    borderRadius: 20,
    borderWidth: 1,
    borderColor: PURPLE,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedFilterButton: {
    backgroundColor: PURPLE, // 선택된 경우의 배경색
  },
  text: {
    color: '#333',
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
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
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
    borderRadius: 10,
    borderWidth: 1,
    borderColor: PURPLE,
    backgroundColor: '#fff',
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
  }
});

const FilterSection = ({ label, items, showDuplicate = true }: FilterSectionProps) => {
     const [selectedItems, setSelectedItems] = useState<string[]>([]);

     const handleSelectItem = (item: string) => {
       // 항목의 선택 상태를 토글합니다.
       if (showDuplicate) {
         // 중복 선택 허용 시
         if (selectedItems.includes(item)) {
           setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== item));
         } else {
           setSelectedItems([...selectedItems, item]);
         }
       } else {
         // 단일 선택 시
         if (selectedItems.includes(item)) {
           setSelectedItems([]);
         } else {
           setSelectedItems([item]);
         }
       }
     };

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
  const sizes = ['XS(85)', 'S(90)', 'M(95)', 'L(100)', 'XL(105)', 'XXL(110)'];
  const meet = ['대면', '비대면'];

  const options = [
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

  const [text, setText] = useState<string>('');
  const [photos, setPhotos] = useState<PhotoResultProps[]>([]);
  const [refPhotos, setRefPhotos] = useState<PhotoResultProps[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [faceToFaceRegion, setFaceToFaceRegion] = useState<string>('');
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
      setSelectedOptions(prevSelectedOptions => {
        if (prevSelectedOptions.includes(index)) {
          return prevSelectedOptions.filter(optionIndex => optionIndex !== index);
        } else {
          return [...prevSelectedOptions, index];
        }
      });
    };

  const handleNextPress = () => {
    if (selectedFilter === '대면') {
      navigation.navigate('QuotationPage'); // '대면' 선택시 QuotationPage로 네비게이트
    } else if (selectedFilter === '비대면') {
      navigation.navigate('InputInfo'); // '비대면' 선택시 InputInfo 페이지로 네비게이트
    } else {
      Alert.alert('거래 방식을 선택해주세요');
    }
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
        <Subtitle16B style={{ textAlign: 'center', paddingVertical: 20 }}>견적서 작성</Subtitle16B>
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
            style={Object.assign({}, styles.grayButton, { margin: 5, marginBottom: 5 })} // Object.assign을 사용하여 스타일 병합
            max={4}
            setPhoto={setPhotos}
            buttonLabel='작업할 이미지 첨부'
          />
        </View>
      </View>
      <View style={{ height: 8, backgroundColor: 'white' }} />
      <FilterSection label='재질 선택' items={materials} />
      <FilterSection label='희망 사이즈 선택' items={sizes} showDuplicate={false} />
      <View style={{ height: 8, backgroundColor: 'white' }} />

      {/* 옵션 섹션 추가 */}
      <View style={{ paddingVertical: 20, borderBottomWidth: 0.5, borderColor: '#D9D9D9', backgroundColor: '#FFFFFF', marginBottom: 20 }}>
        <FilterBox style={{ justifyContent: 'space-between' }}>
          <Subtitle18M style={{ paddingHorizontal: 15, marginBottom: 5 }}>옵션 상세</Subtitle18M>
          <Caption11M style={{ color: PURPLE }}>• 중복 가능</Caption11M>
        </FilterBox>


        {options.map((option, optionIndex) => (
          <TouchableOpacity
            key={optionIndex}
            style={[styles.optionCard, selectedOptions.includes(optionIndex) && styles.selectedOptionCard]}
            onPress={() => handleOptionPress(optionIndex)}
          >
              <Subtitle16M style={selectedOptions.includes(optionIndex) ? styles.selectedOptionText : { color: PURPLE }}>
                {option.option}
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
        ))}
      </View>

      <View style={{ paddingVertical: 20, borderBottomWidth: 0.5, borderColor: '#D9D9D9', backgroundColor: '#FFFFFF', marginBottom: 20 }}>
        <Subtitle18M style={{ paddingHorizontal: 15, marginBottom: 5 }}>추가 요청사항</Subtitle18M>
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
        <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
          <PhotoOptions
            style={Object.assign({}, styles.grayButton, { margin: 5, marginBottom: 5 })} // Object.assign을 사용하여 스타일 병합
            max={4}
            setPhoto={setRefPhotos}
            buttonLabel='참고 이미지 첨부'
          />
          <InputBox value={text} setValue={setText} placeholder='입력해주세요' long />
        </View>
      </View>


      <View style={{ paddingVertical: 20, borderBottomWidth: 0.5, borderColor: '#D9D9D9', backgroundColor: '#FFFFFF', marginBottom: 20 }}>
        <Subtitle18M style={{ marginBottom: 10 }}>포트폴리오 사용 가능 여부</Subtitle18M>
        <CheckBox
          style={{ paddingHorizontal: 30, alignSelf: 'center' }}
          pressed={isChecked}
          onPress={() => setIsChecked(!isChecked)}
          text='리폼 제품이 서비스 내의 포트폴리오에 사용되는 것에 동의합니다.'
        />
      </View>

      <View style={{ paddingHorizontal: 15, paddingVertical: 20, backgroundColor: '#FFFFFF' }}>
        <Subtitle18M style={{ marginBottom: 10 }}>거래 방식 선택</Subtitle18M>
        <FilterBox style={{ alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 80 }}>
          {['비대면', '대면'].map((item, index) => (
            <Filter
              key={index}
              value={item}
              isSelected={selectedFilter === item}
              onPress={() => handleOnePress(item)}
            />
          ))}
        </FilterBox>

        {selectedFilter === '대면' && (
          <View style={styles.optionBox}>
            <Text style={styles.optionTitle}>대면 지역 선택</Text>
            <Picker
              selectedValue={faceToFaceRegion}
              onValueChange={(itemValue) => setFaceToFaceRegion(itemValue)}
            >
              <Picker.Item label="신촌" value="신촌" />
              <Picker.Item label="홍대" value="홍대" />
              <Picker.Item label="강남" value="강남" />
              <Picker.Item label="성수" value="성수" />
            </Picker>
          </View>
        )}

        {selectedFilter === '비대면' && (
          <View style={styles.optionBox}>
            <Text style={styles.optionTitle}>택배 유형 선택</Text>
            <Picker
              selectedValue={deliveryType}
              onValueChange={(itemValue) => setDeliveryType(itemValue)}
            >
              <Picker.Item label="우체국 택배" value="우체국 택배" />
              <Picker.Item label="편의점 택배" value="편의점 택배" />
            </Picker>
          </View>
        )}
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
  border-bottom-width: 0.5px;
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
