import { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Modal,
  Image,
  Alert,
  StyleSheet,
} from 'react-native';
import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-safearea-height';

import { HomeStackParams } from '../../../pages/Home';
import { StackScreenProps } from '@react-navigation/stack';

import Arrow from '../../../assets/common/Arrow.svg';

import { BLACK, PURPLE } from '../../../styles/GlobalColor';
import {
  Body14R,
  Body16M,
  Subtitle16M,
  Title20B,
} from '../../../styles/GlobalText';
import Carousel from '../../../common/Carousel';
import CheckBox from '../../../common/CheckBox';

const statusBarHeight = getStatusBarHeight(true);
const { width, height } = Dimensions.get('window');

const QuotationPage = ({
  navigation,
  route,
}: StackScreenProps<HomeStackParams, 'QuotationConfirm'>) => {
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
    { key: '희망 사이즈', data: '여성 55' },
    { key: '추가 요청사항', data: '' },
    { key: '옵션 상세', data: '' },
    { key: '거래 방식', data: '비대면' },
    { key: '이름', data: '이소윤' },
    { key: '연락처', data: '010 1234 1234' },
    { key: '주소', data: '서울특별시 서대문구 어쩌구저쩌구동 124' },
  ];

  const options = [
    {
      option: 'option 1',
      title: '주머니 지퍼',
      description: '가방 입구에 똑딱이 단추를 추가할 수 있어요.',
      price: '1,000 원',
      image: 'https://example.com/image1.jpg',
    },
    {
      option: 'option 1',
      title: '주머니 지퍼',
      description: '주머니에 귀여운 지퍼를 달아보세요.',
      price: '1,000 원',
      image: 'https://example.com/image2.jpg',
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
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          opacity: 0.9,
        }}
      />
      <View style={{ marginTop: 30 }}>
        <Title20B
          style={{
            marginTop: statusBarHeight,
            color: BLACK,
            textAlign: 'center',
          }}>
          주문서 확인
        </Title20B>
        <View style={{ paddingVertical: 35, paddingHorizontal: 20 }}>
          <View style={{ backgroundColor: 'white', marginHorizontal: 10 }}>
            <View style={{ marginTop: 20 }}>
              <Title20B
                style={{ color: BLACK, marginBottom: 3, textAlign: 'center' }}>
                마켓명 (SDP의 상점)
              </Title20B>

              {quotation.map((item, index) => {
                return (
                  <>
                    <TextBox key={index}>
                      <Subtitle16M style={{ flex: 1 }}>{item.key}</Subtitle16M>
                      <Body14R style={{ flex: 1.5, textAlign: 'right' }}>
                        {item.data}
                      </Body14R>
                    </TextBox>

                    {item.key === '추가 요청사항' && (
                      <>
                        <Carousel
                          data={splitRefPhotos}
                          renderItem={({ item }: any) => {
                            return (
                              <View style={{ flexDirection: 'row' }}>
                                {item.map((subItem: any) => (
                                  <View
                                    key={subItem.id}
                                    style={{
                                      width: '50%',
                                      paddingHorizontal: 20,
                                    }}>
                                    <ImageBackground
                                      source={{
                                        uri: 'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp',
                                      }}
                                      style={{
                                        width: '90%',
                                        height: 150,
                                        marginLeft: -13,
                                      }}
                                      alt={subItem.fileName}
                                    />
                                  </View>
                                ))}
                              </View>
                            );
                          }}
                          slider
                        />
                        <Body14R style={{ textAlign: 'center' }}>
                          이렇게 저렇게 해주세요
                        </Body14R>
                      </>
                    )}

                    {item.key === '옵션 상세' && (
                      <View
                        style={{
                          backgroundColor: 'white',
                          marginHorizontal: 10,
                          paddingVertical: 20,
                        }}>
                        {options.map((option, optionIndex) => (
                          <View key={optionIndex} style={styles.optionCard}>
                            <Subtitle16M style={{ color: PURPLE }}>
                              {option.option}
                            </Subtitle16M>
                            <View style={styles.optionContent}>
                              <View style={styles.optionText}>
                                <Subtitle16M style={{ color: BLACK }}>
                                  {option.title}
                                </Subtitle16M>
                                <Body14R style={{ color: BLACK }}>
                                  {option.description}
                                </Body14R>
                              </View>
                              <Image
                                source={{ uri: option.image }}
                                style={styles.optionImage}
                              />
                            </View>
                            <Body16M
                              style={{ color: BLACK, textAlign: 'right' }}>
                              {option.price}
                            </Body16M>
                          </View>
                        ))}
                      </View>
                    )}
                  </>
                );
              })}
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 10,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#F4F4F4',
            padding: 10,
            flex: 1,
            marginLeft: 30,
            marginRight: 10,
            alignItems: 'center',
            borderRadius: 20,
          }}
          onPress={() => {
            console.log('주문서 거절 버튼 클릭');
            navigation.navigate('Rejection');
          }}>
          <Text style={{ color: BLACK }}>주문서 거절</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: '#F4F4F4',
            padding: 10,
            flex: 1,
            marginLeft: 10,
            marginRight: 30,
            alignItems: 'center',
            borderRadius: 20,
          }}
          onPress={() => console.log('카톡 상담 버튼 클릭')}>
          <Text style={{ color: BLACK }}>카톡 상담</Text>
        </TouchableOpacity>
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

const TextBox = styled.View`
  flex-direction: row;
  padding: 8px 25px;
  justify-content: space-between;
`;

const styles = StyleSheet.create({
  optionCard: {
    borderColor: PURPLE,
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  optionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  optionDescription: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
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
});

export default QuotationPage;
