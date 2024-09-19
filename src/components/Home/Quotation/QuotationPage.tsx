import { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, ImageBackground, Dimensions, Modal, Image, Alert , StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-safearea-height';

import { HomeStackParams } from '../../../pages/Home';
import { StackScreenProps } from '@react-navigation/stack';

import Arrow from '../../../assets/common/Arrow.svg';

import { BLACK, GREEN, PURPLE } from '../../../styles/GlobalColor';
import { Body14R, Body16M, Caption11M, Caption12M, Caption14M, Filter14M, Subtitle16M, Subtitle18M, Title20B } from '../../../styles/GlobalText';
import Carousel from '../../../common/Carousel';
import CheckBox from '../../../common/CheckBox';
import BottomButton from '../../../common/BottomButton';
import Rejection from './Rejection';

const statusBarHeight = getStatusBarHeight(true);
const { width, height } = Dimensions.get('window');

const QuotationPage = ({ navigation, route }: StackScreenProps<HomeStackParams, 'QuotationPage'>) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [finishModal, setFinishModal] = useState<boolean>(false);
  const [checkBoxPressed, setCheckBoxPressed] = useState<boolean>(false); // CheckBox 상태 관리

  const showModal = () => {
    setFinishModal(true);
    setTimeout(() => {
      setFinishModal(false);
    }, 3000);
  };

  const handleSendQuotation = () => {
    if (!checkBoxPressed) {
      Alert.alert(' 확인 버튼을 체크해주세요');
      return;
    }
    navigation.navigate('SentQuotation');
  };

  const quotation = [
    { key: '재질', data: '니트' },
    { key: '추가 요청사항', data: '' },
    { key: '옵션 상세', data: '' },
    { key: '거래 방식', data: '비대면' },
    { key: '이름', data: '이소윤' },
    { key: '연락처', data: '010-1234-1234' },
    { key: '주소', data: '서울특별시 서대문구 연희동 124' },
  ];

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

  // 한 줄에 2개씩 아이템 배치
  const refPhotos = [...new Array(6).keys()];
  const splitArrayIntoPairs = (arr: any[], pairSize: number) => {
    return arr.reduce((result, item, index) => {
      if (index % pairSize === 0) {
        result.push([]);
      }
      result[result.length - 1].push(item);
      return result;
    }, []);
  };
  const splitRefPhotos = splitArrayIntoPairs(refPhotos, 2);

  return (
    <ScrollView>
      <BackButton onPress={() => navigation.goBack()}>
        <Arrow color={BLACK} />
      </BackButton>
      <ImageBackground
        source={{ uri: 'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp' }}
        style={{ width: '100%', height: '100%' }}
      >
        <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: BLACK, opacity: 0.9 }} />
        <Title20B style={{ marginTop: statusBarHeight, color: 'white', textAlign: 'center' }}>주문서 확인</Title20B>
        <View style={{ paddingVertical: 35, paddingHorizontal: 20 }}>
          <Title20B style={{ color: 'white', marginBottom: 3 }}>마켓명 (SDP의 상점)</Title20B>
          <Caption12M style={{ color: 'white', marginBottom: 18 }}>리폼러 닉네임 (전성식탁)</Caption12M>
          <Body16M style={{ color: 'white' }}>마켓 소개글</Body16M>
        </View>
        <View style={{ backgroundColor: 'white', marginHorizontal: 10 }}>
          <View style={{ backgroundColor: GREEN, marginHorizontal: 20, paddingVertical: 5, alignItems: 'center' }}>
            <Filter14M style={{ color: PURPLE }}>주문서 영수증</Filter14M>
          </View>
          {quotation.map((item, index) => {
            return (
              <View key={index}>
                <TextBox>
                  <Subtitle16M style={{ flex: 1 }}>{item.key}</Subtitle16M>
                  <Body14R style={{ flex: 1.5, textAlign: 'right' }}>{item.data}</Body14R>
                </TextBox>
                {item.key === '추가 요청사항' && (
                  <>
                    <Carousel
                      data={splitRefPhotos}
                      renderItem={({ item }: any) => {
                        return (
                          <View style={{ flexDirection: 'row' }}>
                            {item.map((subItem: any) => (
                              <View key={subItem.id} style={{ width: '50%', paddingHorizontal: 20 }}>
                                <ImageBackground
                                  source={{ uri: 'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp' }}
                                  style={{ width: '90%', height: 150, marginLeft: 13 }}
                                  alt={subItem.fileName}
                                />
                              </View>
                            ))}
                          </View>
                        );
                      }}
                      slider
                    />
                    <Body14R style={{ textAlign: 'center' }}>이렇게 저렇게 해주세요</Body14R>
                  </>
                )}
                {item.key === '옵션 상세' && (
                  <View style={{ backgroundColor: 'white', marginHorizontal: 10, paddingVertical: 20 }}>
                    {options.map((option, optionIndex) => (
                      <View key={optionIndex} style={styles.optionCard}>

                        <Subtitle16M style={{ color: PURPLE }}>{option.option}</Subtitle16M>

                        <View style={styles.optionHeader}>
                          <Subtitle16M style={{ color: BLACK }}>{option.title}</Subtitle16M>
                          <Body16M style={{ color: BLACK, textAlign: 'right' }}>{option.price}</Body16M>
                        </View>

                        <View style={styles.optionContent}>
                          <View style={styles.optionDescription}>
                            <Body14R style={{ color: BLACK }}>{option.description}</Body14R>
                          </View>
                          <View style={styles.optionImage}>
                            <Image source={{ uri: option.image }} style={styles.optionImage} />
                          </View>
                        </View>

                      </View>
                    ))}
                  </View>
                )}
              </View>
            );
          })}
        </View>
        <View style={{backgroundColor: "#F4F4F4", marginHorizontal: 10, alignItems: 'center', paddingVertical: 15}}>
          <Subtitle16M style={{color: PURPLE}}>안내문</Subtitle16M>
          <Caption11M style={{color: BLACK, marginVertical: 5}}>
                     증빙자료를 첨부하시면 담당자 검토 후, 확인 마크를 달아드립니다.{'\n'}
                     첨부 가능 자료 :  재학증명서, 졸업증명서, 성적 증명서{'\n'}
                      (용량입력) 이하 (파일형식 입력) 파일만 등록 가능합니다{'\n'}
                      제출한 자료는 의뢰인에게 노출되지 않습니다{'\n'}
          </Caption11M>
            <CheckBox
            style={{ paddingHorizontal: 30, alignSelf: 'center', marginVertical: 5 }}
            pressed={checkBoxPressed}
            onPress={() => setCheckBoxPressed(!checkBoxPressed)} // 상태 변경
            text='리폼 제품이 서비스 내의 포트폴리오에 사용되는 것에 동의합니다.'
          />
         </View>
        <View style={{padding: 10, marginVertical: 30}}>
          <BottomButton value={'주문서 보내기'} pressed={false}
            // onPress={showModal}
            onPress={() => navigation.navigate('SentQuotation')}
            />
          <View style={{marginVertical: 5}} />
          <BottomButton value={'취소하기'} pressed={true} onPress={() => setModalVisible(true)} />
        </View>
      </ImageBackground>
      <Modal visible={finishModal} transparent={true}>
        {/* 리폼러일 경우 */}
        <View style={{backgroundColor: 'black', opacity: 0.8, height: '100%', alignItems: 'center', justifyContent: 'center'}}>
          <Title20B style={{color: 'white'}}>카톡 링크를 전송했어요!</Title20B>
          <Image source={require('../../../assets/rocket.png')} style={{width: 230, height: 230}} />
          <Subtitle16M style={{color: 'white', textAlign: 'center'}}>의뢰인이 카톡 링크를 통해{'\n'}상담을 신청할 거예요</Subtitle16M>
        </View>
      </Modal>
      <Modal visible={modalVisible}>
        {/* 리폼러일 경우 */}
        <Rejection onClose={() => setModalVisible(false)} />
      </Modal>
    </ScrollView>
  )
}

const BackButton = styled.TouchableOpacity`
  padding: 10px;
  position: absolute;
  left: 0px;
  top: ${statusBarHeight-10}px;
  z-index: 1;
`

const TextBox = styled.View`
  flex-direction: row;
  padding: 8px 25px;
  justify-content: space-between;
`


const styles = StyleSheet.create({
  optionCard: {
    borderColor: PURPLE,
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  optionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10
    },
  optionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10
  },
  optionDescription: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
  },
  optionText: {
    flex: 1,
    marginRight: 10
  },
  optionImage: {
    width: 70,
    height: 70,
    borderRadius: 5,
    backgroundColor: '#f0f0f0', // 이미지가 없을 때 회색 배경

  }
});

export default QuotationPage;