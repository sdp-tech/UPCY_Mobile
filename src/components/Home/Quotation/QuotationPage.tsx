import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, ImageBackground, Dimensions, Modal, Image, Alert, StyleSheet } from 'react-native';
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

export interface QuotationProps {
  materials?: {};
  transactionMethod?: {};
  options?: [title: string];
  additionalRequest?: {};
  name?: {};
  tel?: {};
  zonecode?: {};
  address?: {};
  detailedAddress?: {};
}

const QuotationPage = ({ navigation, route }: StackScreenProps<HomeStackParams, 'QuotationPage'>) => {

  const { materials, transactionMethod, options, additionalRequest, name, tel, zonecode, address, detailedAddress }: QuotationProps = route.params || {};  //quotationform, inputinfo 에서 전달 받은 데이터


  const fullAddress = `${address} ${detailedAddress}`.trim();  //전체주소(fullAddress) 생성

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
    { key: '소재', data: materials }, // QuotationForm에서 선택한 재질
    { key: '추가 요청사항', data: additionalRequest || '없음' }, // 추가 요청사항, 없으면 '없음'
    { key: '추가한 옵션', data: options?.map(option => option).join(', ') || '없음' }, // 선택한 옵션들, 없으면 '없음'
    { key: '거래 방식', data: transactionMethod }, //선택한 거래 방식 (대면/비대면)
    { key: '이름', data: name },
    { key: '연락처', data: tel },
    { key: '우편번호', data: zonecode },
    { key: '주소', data: fullAddress },
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

      <Title20B style={{ marginTop: 5, marginBottom: 15, color: 'black', textAlign: 'center' }}>주문서 확인</Title20B>


      <View style={{ backgroundColor: 'white', marginHorizontal: 10 }}>
        <View style={{ marginHorizontal: 20, paddingVertical: 10, alignItems: 'center' }}>
          <Filter14M style={{ color: 'black' }}>주문서</Filter14M>
          <View style={{ height: 1, backgroundColor: PURPLE, width: '100%', marginTop: 5, marginBottom: 20 }} />
          <Subtitle16M style={{ color: 'black', marginBottom: 5 }}>청바지로 에코백 만들어드립니다</Subtitle16M>
          <Body14R style={{ color: 'black' }}>주문번호: 08WH9A</Body14R>
          <Caption12M style={{ color: 'black' }}>2024-10-31 17:05</Caption12M>


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
                                source={{ uri: ' line-height: 24px;' }}
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
                  <Body14R style={{ textAlign: 'center', marginBottom: 20 }}>이렇게 저렇게 해주세요</Body14R>
                </>
              )}
              {item.key === '추가한 옵션' && (
                <View style={{ backgroundColor: 'white', marginHorizontal: 10, paddingVertical: 20 }}>
                  {options?.map((option: any, optionIndex: any) => (
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
                  <View style={{ marginTop: 20 }}>
                    <TextBox>
                      <Subtitle16M style={{ flex: 1 }}>서비스 금액</Subtitle16M>
                      <Body14R style={{ flex: 1.5, textAlign: 'right' }}>19900원</Body14R>
                    </TextBox>
                    <TextBox>
                      <Subtitle16M style={{ flex: 1 }}>옵션 추가 금액</Subtitle16M>
                      <Body14R style={{ flex: 1.5, textAlign: 'right' }}>2000원</Body14R>
                    </TextBox>
                    <View style={{ height: 1, backgroundColor: BLACK, width: '100%', paddingHorizontal: 20, marginBottom: 20 }} />

                    <TextBox>
                      <Subtitle16M style={{ flex: 1 }}>예상 결제 금액</Subtitle16M>
                      <Body14R style={{ flex: 1.5, textAlign: 'right' }}>21900원</Body14R>
                    </TextBox>
                  </View>

                </View>
              )}

            </View>

          );
        })}
      </View>
      <View style={{ backgroundColor: "#F4F4F4", marginHorizontal: 10, alignItems: 'center', paddingVertical: 15 }}>

        <CheckBox
          style={{ paddingHorizontal: 30, alignSelf: 'center', marginVertical: 5 }}
          pressed={checkBoxPressed}
          onPress={() => setCheckBoxPressed(!checkBoxPressed)} // 상태 변경
          text='리폼 제품이 서비스 내의 포트폴리오에 사용되는 것에 동의합니다.'
        />
      </View>
      <View style={{ padding: 10, marginVertical: 30 }}>
        <BottomButton value={'주문서 보내기'} onPress={handleSendQuotation} pressed={true}
        />
        <View style={{ marginVertical: 5 }} />
        <BottomButton value={'취소하기'} pressed={true} onPress={() => setModalVisible(true)} />
      </View>

      <Modal visible={finishModal} transparent={true}>
        {/* 리폼러일 경우 */}
        <View style={{ backgroundColor: 'black', opacity: 0.8, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Title20B style={{ color: 'white' }}>카톡 링크를 전송했어요!</Title20B>
          <Image source={require('../../../assets/rocket.png')} style={{ width: 230, height: 230 }} />
          <Subtitle16M style={{ color: 'white', textAlign: 'center' }}>의뢰인이 카톡 링크를 통해{'\n'}상담을 신청할 거예요</Subtitle16M>
        </View>
      </Modal>

    </ScrollView>
  )
}

const BackButton = styled.TouchableOpacity`
  padding: 10px;
  position: absolute;
  left: 0px;
  top: ${statusBarHeight - 10}px;
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