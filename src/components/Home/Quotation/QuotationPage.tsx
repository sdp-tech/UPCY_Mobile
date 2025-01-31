import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, ImageBackground, Dimensions, Modal, Image, Alert, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-safearea-height';

import { StackScreenProps } from '@react-navigation/stack';

import Arrow from '../../../assets/common/Arrow.svg';

import { BLACK, GREEN, PURPLE } from '../../../styles/GlobalColor';
import { Body14R, Body14B, Body16M, Caption11M, Caption12M, Caption14M, Filter14M, Subtitle18B, Subtitle16B, Subtitle16M, Subtitle18M, Title20B } from '../../../styles/GlobalText';
import Carousel from '../../../common/Carousel';
import CheckBox from '../../../common/CheckBox';
import BottomButton from '../../../common/BottomButton';
import Rejection from './Rejection';
import Request from '../../../common/requests.js';
import { OrderStackParams } from '../Order/OrderManagement';

const statusBarHeight = getStatusBarHeight(true);
const { width, height } = Dimensions.get('window');

export interface QuotationProps {
  photos?: { uri: string }[];
  materials?: string[];
  transactionMethod?: string;
  options?: { title: string; price: string; description: string; image: string }[];
  additionalRequest?: { text?: string; photos?: { uri: string }[] };
  name?: string;
  tel?: string;
  zonecode?: string;
  address?: string;
  detailedAddress?: string;
}


const QuotationPage = ({ navigation, route }: StackScreenProps<OrderStackParams, 'QuotationPage'>) => {
  const {
    photos = [],
    materials = [],
    transactionMethod = '',
    options = [],
    additionalRequest = { text: '', photos: [] },
    name = '',
    tel = '',
    zonecode = '',
    address = '',
    detailedAddress = '',
  }: QuotationProps = route.params || {};


  const fullAddress = `${address} ${detailedAddress}`.trim();  //전체주소(fullAddress) 생성

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [finishModal, setFinishModal] = useState<boolean>(false);
  const [checkBoxPressed, setCheckBoxPressed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [additionalModalVisible, setAdditionalModalVisible] = useState<boolean>(false);

  const showModal = () => {
    setFinishModal(true);
    setTimeout(() => {
      setFinishModal(false);
    }, 3000);
  };

  const handleSendQuotation = async () => {
    if (!checkBoxPressed) {
      Alert.alert(' 확인 버튼을 체크해주세요');
      return;
    }


    // 서버에 보낼 데이터 준비
    const orderData = {
      materials,
      transactionMethod,
      options,
      additionalRequest: {
        text: additionalRequest.text,
        photos: additionalRequest.photos?.map(photo => photo.uri) || [],
      },
      photos: photos.map(photo => photo.uri) || [],
      name,
      tel,
      zonecode,
      address,
      detailedAddress,
    };


    const request = Request();

    try {
      setLoading(true); // 로딩 상태 시작

      // API 요청: 주문 생성
      const response = await request.post('/api/orders', orderData, {
        headers: {
          'Content-Type': 'application/json', //json 데이터 형식
          Authorization: 'Bearer your_access_token', // 인증 토큰(필요시 교체)
        },
      });

      if (response && response.status === 201) { // 주문 생성 성공
        const result = response.data; // 서버 응답 데이터
        Alert.alert('주문 성공!', `주문번호: ${result.order_uuid}`);
        navigation.navigate('SentQuotation'); // 성공 시 sentquotation으로 이동
      } else {
        Alert.alert('주문 실패', '주문서를 생성할 수 없습니다.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('에러', '주문서를 생성하는 중 문제가 발생했습니다.');
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };


  const quotation = [
    { key: '의뢰한 의류 정보', data: photos, ref: true, },
    { key: '소재', data: materials }, // QuotationForm에서 선택한 재질
    { key: '추가한 옵션', data: options?.map(option => option.title).join(', ') || '없음' }, // 선택한 옵션들, 없으면 '없음'
    { key: '추가 요청사항', data: additionalRequest?.text || '없음', photos: additionalRequest.photos?.map(photo => photo.uri) || [], }, // 추가 요청사항, 없으면 '없음'
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

  const splitPhotos = photos?.length > 0 ? splitArrayIntoPairs(photos, 2) : [];
  const splitAdditionalPhotos = additionalRequest.photos?.length ?
    additionalRequest.photos?.length > 0 ? splitArrayIntoPairs(additionalRequest.photos, 2) : []
    : []


  return (
    <ScrollView>
      <BackButton onPress={() => navigation.goBack()}>
        <Arrow color={BLACK} />
      </BackButton>

      <Title20B style={{ marginTop: 5, marginBottom: 15, color: 'black', textAlign: 'center' }}>주문서 확인</Title20B>


      <View style={{ backgroundColor: 'white', marginHorizontal: 10 }}>
        <View style={{ marginHorizontal: 20, paddingVertical: 10, alignItems: 'center' }}>
          <Subtitle16B style={{ color: 'black' }}>주문서</Subtitle16B>
          <View style={{ height: 2.5, backgroundColor: PURPLE, width: '100%', marginTop: 5, marginBottom: 20 }} />
          <Subtitle18B style={{ color: 'black', marginBottom: 5 }}>청바지로 에코백 만들어드립니다</Subtitle18B>
          <Body14B style={{ color: 'black' }}>주문번호: 08WH9A</Body14B>
          <Caption12M style={{ color: 'black' }}>2024-10-31 17:05</Caption12M>


        </View>
        {quotation.map((item, index) => {
          const value = Array.isArray(item.data)
            ? item.data.join(', ') // 배열을 쉼표로 구분된 문자열로 변환
            : item.data || '없음'; // undefined나 null일 경우 기본값 처리


          return (
            <View key={index}>

              <TextBox>
                <Subtitle16B style={{ flex: 1 }}>{item.key}</Subtitle16B>
                {item.key !== '의뢰한 의류 정보' && item.key !== '추가 요청사항' && item.key !== '추가한 옵션' && (
                  <Body14R style={{ flex: 1.5, textAlign: 'right' }}>{value}</Body14R>
                )}
              </TextBox>

              {item.key === '의뢰한 의류 정보' && photos.length > 0 && (
                <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                  <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Image
                      source={{ uri: photos[0]?.uri }}
                      style={{ width: 200, height: 150, borderRadius: 10 }}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>

                  {/* 전체보기 모달 */}
                  <Modal visible={modalVisible} transparent={true}>
                    <View style={styles.modalBackground}>
                      <View style={styles.modalContent}>
                        <TouchableOpacity
                          //style={styles.closeButton}
                          onPress={() => setModalVisible(false)}
                        >
                          <Text style={{ fontSize: 18, color: 'black' }}>X</Text>
                        </TouchableOpacity>
                        <ScrollView>
                          {photos.map((photo, index) => (
                            <Image
                              key={index}
                              source={{ uri: photo.uri }}
                              style={{ width: width - 40, height: 250, marginBottom: 10, borderRadius: 10 }}
                              resizeMode="contain"
                            />
                          ))}
                        </ScrollView>
                      </View>
                    </View>
                  </Modal>
                </View>
              )}

              {item.key === '추가 요청사항' && (
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                  <View
                    style={{
                      backgroundColor: '#E9EBF8',
                      width: '90%',
                      padding: 15,
                      borderRadius: 8,
                    }}
                  >
                    <Body14R style={{ color: 'black', marginBottom: 10 }}>
                      {additionalRequest.text || '없음'}
                    </Body14R>

                    {additionalRequest.photos?.length ? additionalRequest.photos?.length > 0 && (
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#CEBFFA',
                          padding: 10,
                          borderRadius: 8,
                          alignItems: 'center',
                        }}
                        onPress={() => setAdditionalModalVisible(true)}
                      >
                        <Body14R style={{ color: 'white' }}>참고 사진 보기</Body14R>
                      </TouchableOpacity>
                    ) : <></>}
                  </View>


                  <Modal visible={additionalModalVisible} transparent={true}>
                    <View style={styles.modalBackground}>
                      <View style={styles.modalContent}>
                        <TouchableOpacity
                          //style={styles.closeButton}
                          onPress={() => setAdditionalModalVisible(false)}
                        >
                          <Text style={{ fontSize: 18, color: 'black' }}>X</Text>
                        </TouchableOpacity>
                        <ScrollView>
                          {additionalRequest.photos?.map((photo, index) => (
                            <Image
                              key={index}
                              source={{ uri: photo.uri }}
                              style={{ width: width - 40, height: 250, marginBottom: 10, borderRadius: 10 }}
                              resizeMode="contain"
                            />
                          ))}
                        </ScrollView>
                      </View>
                    </View>
                  </Modal>
                </View>

              )}

              {item.key === '추가 요청사항' && (
                <View style={{ marginTop: 30, marginBottom: 40 }}>
                  <TextBox>
                    <Subtitle16M style={{ flex: 1 }}>서비스 금액</Subtitle16M>
                    <Body14R style={{ flex: 1.5, textAlign: 'right' }}>19900원</Body14R>
                  </TextBox>
                  <TextBox>
                    <Subtitle16M style={{ flex: 1 }}>옵션 추가 금액</Subtitle16M>
                    <Body14R style={{ flex: 1.5, textAlign: 'right' }}>2000원</Body14R>
                  </TextBox>
                  <View
                    style={{
                      height: 1,
                      backgroundColor: BLACK,
                      width: '100%',
                      paddingHorizontal: 40,
                      marginVertical: 10,
                    }}
                  />
                  <TextBox>
                    <Subtitle16B style={{ flex: 1 }}>예상 결제 금액</Subtitle16B>
                    <Subtitle16B style={{ flex: 1.5, textAlign: 'right' }}>21900원</Subtitle16B>
                  </TextBox>
                </View>
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
          onPress={() => setCheckBoxPressed(!checkBoxPressed)}
          text='완성된 결과물의 이미지를 리폼러가 사용하는 것에 동의합니다.'
        />
      </View>
      <View style={{ padding: 10, marginVertical: 30 }}>
        <BottomButton value={'주문서 보내기'} onPress={handleSendQuotation} pressed={true} style={{ backgroundColor: GREEN }}
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
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 10,
    width: '90%',
    maxHeight: '80%',
  },
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