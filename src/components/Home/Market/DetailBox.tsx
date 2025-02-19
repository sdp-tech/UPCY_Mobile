import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import { Option } from './ServiceRegistration';
import React from 'react';

const DetailBox = () => {
  const { width, height } = Dimensions.get('window');
  const [makingTime, setMakingTime] = useState<number>(1);
  const [inputText, setInputText] = useState<string>(
    `1958년에는 원예시험장을 설립하여 연구를 본격화하기 시작하였고...`,
  );

  const serviceDetail: {
    label: string;
    data: string;
    list: string[];
    optionList: Option[];
  }[] = [
      { label: 'period', data: '3주', list: [], optionList: [] },
      {
        label: 'service',
        data: `1958년에는 원예시험장을 설립하여 연구를 본격화하기 시작하였고...`,
        list: [],
        optionList: [],
      },
      {
        label: 'image',
        data: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20220209_239%2F1644400118557CudbV_JPEG%2F45535946365331675_377614541.jpg&type=sc960_832',
        list: [],
        optionList: [],
      },
      {
        label: 'material',
        list: [
          '면',
          '폴리에스테르',
          '나일론',
          '데님',
          '울',
          '모달',
          '아크릴',
          '코듀로이',
        ],
        data: '',
        optionList: [],
      },
      {
        label: 'option',
        data: '',
        list: [],
        optionList: [
          {
            option: '뚝딱이 단추',
            optionExplain: '가방 입구에 똑딱이 단추를 추가할 수 있어요.',
            isFixing: false,
            addPrice: '+1000원',
            photoAdded: false,
            optionPhotos: [],
          },
          {
            option: '주머니 지퍼',
            optionExplain: '주머니에 귀여운 지퍼를 달아보세요.',
            isFixing: false,
            addPrice: '+1000원',
            photoAdded: false,
            optionPhotos: [],
          },
        ],
      },
    ];

  return (
    <View>
      <Tabs.ScrollView bounces={false} overScrollMode="never">
        {serviceDetail.map((item, index) => {
          if (item.label === 'period')
            return periodBox({ index: index, period: item.data });
          if (item.label === 'service')
            return serviceBox({ index: index, explanation: item.data });
          if (item.label === 'image')
            return imageBox({ index: index, uri: item.data });
          if (item.label === 'material' && serviceDetail[3].list.length > 0)
            return materialBox({ index: index });
          if (item.label === 'option')
            // FIXME: backend에서 어떻게 보내는지 check 후 수정
            return optionDetailBox({
              index: index,
              optionsList: item.optionList,
            });
          return null;
        })}
        <View style={{ marginBottom: 120 }} />
      </Tabs.ScrollView>
    </View>
  );

  function periodBox({ index, period }: { index: number; period: string }) {
    return (
      <View key={index} style={styles.periodBox}>
        <View style={styles.periodLine}>
          <Text style={TextStyles.infolabel}>예상 제작 기간</Text>
          <Text>{period}</Text>
        </View>
        <View>
          <Text style={TextStyles.detail}>
            * 재료 수령일로부터 소요되는 기간입니다
          </Text>
        </View>
      </View>
    );
  }

  function serviceBox({
    index,
    explanation,
  }: {
    index: number;
    explanation: string;
  }) {
    return (
      <View key={index}>
        <View style={styles.serviceBox}>
          <Text style={TextStyles.infolabel}>서비스 상세</Text>
          <Text style={TextStyles.service}>{explanation}</Text>
        </View>
      </View>
    );
  }

  function imageBox({ index, uri }: { index: number; uri: string }) {
    return (
      <View style={styles.imageBox} key={index}>
        <ImageBackground
          style={{ height: width - 32, width: '100%' }}
          imageStyle={{ height: width - 32 }}
          source={{ uri }}
        />
      </View>
    );
  }

  function materialBox({ index }: { index: number }) {
    function materialList({ data }: { data: string[] }) {
      return data.map((item, index) => (
        <View key={index}>
          <Text
            style={{
              fontSize: 14,
              lineHeight: 26,
              color: '#222222',
              fontFamily: 'Pretendard Variable',
              fontWeight: '400',
            }}>
            {item} |{' '}
          </Text>
        </View>
      ));
    }

    return (
      <>
        <View style={styles.materialBox} key={index}>
          <View style={{ flexDirection: 'column', flex: 0.3 }}>
            <Text
              style={{
                fontSize: 16,
                lineHeight: 24,
                fontWeight: '600',
                width: 200,
              }}>
              작업 가능한 소재
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flex: 0.7,
              flexWrap: 'wrap',
            }}>
            {materialList({ data: serviceDetail[3].list })}
          </View>
        </View>
      </>
    );
  }

  function optionDetailBox({
    index,
    optionsList,
  }: {
    index: number;
    optionsList: Option[];
  }) {
    function eachOptionDetailBox({
      index,
      eachOption,
    }: {
      index: number;
      eachOption: Option;
    }) {
      return (
        <View style={styles.eachOptionDetailBox} key={index}>
          <Text style={TextStyles.optionTitle}>option {index + 1}</Text>
          <View style={styles.eachOptionDetailLine}>
            <Text style={TextStyles.eachOptionTitle}>{eachOption.option}</Text>
            <Text style={TextStyles.eachOptionAddPrice}>
              {eachOption.addPrice}
            </Text>
          </View>
          <View style={styles.eachOptionDetailExplainBox}>
            <Text style={TextStyles.optionExplain}>
              {eachOption.optionExplain}
            </Text>
          </View>
        </View>
      );
    }
    return (
      <View key={index}>
        <View style={styles.optionDetailBox}>
          <Text style={TextStyles.infolabel}>옵션 상세</Text>
          {optionsList.map((eachOption, index) =>
            eachOptionDetailBox({ index: index, eachOption: eachOption }),
          )}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  serviceBox: {
    display: 'flex',
    borderTopColor: '#dcdcdc',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBlockColor: '#dcdcdc',
  },
  periodBox: {
    flex: 1,
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBlockColor: '#dcdcdc',
    padding: 16,
    gap: 8,
  },
  periodLine: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageBox: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    display: 'flex',
    borderBottomWidth: 1,
    borderBlockColor: '#dcdcdc',
  },
  materialBox: {
    flex: 1,
    flexDirection: 'row',
    gap: 24,
    padding: 16,
    borderBottomWidth: 1,
    borderBlockColor: '#dcdcdc',
  },
  optionDetailBox: {
    flex: 1,
    flexDirection: 'column',
    gap: 24,
    padding: 16,
  },
  eachOptionDetailBox: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 16,
  },
  eachOptionDetailLine: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 4,
    marginBottom: 16,
  },
  eachOptionDetailExplainBox: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    borderRadius: 8,
  },
});

const TextStyles = StyleSheet.create({
  infolabel: {
    color: '#222222',
    fontSize: 16,
    fontFamily: 'Pretendard Variable',
    fontWeight: '600',
    lineHeight: 24,
  },
  service: {
    paddingTop: 32,
    color: '#222222',
    fontSize: 14,
    fontFamily: 'Pretendard Variable',
    fontWeight: '400',
    lineHeight: 24,
  },
  detail: {
    fontSize: 11,
    fontWeight: '400',
    color: '#929292',
  },
  optionTitle: {
    color: '#612FEF',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 4,
  },
  eachOptionTitle: {
    color: '#222222',
    fontSize: 16,
    fontFamily: 'Pretendard Variable',
    fontWeight: '700',
    lineHeight: 24,
  },
  eachOptionAddPrice: {
    color: '#222222',
    fontSize: 16,
    fontFamily: 'Pretendard Variable',
    fontWeight: '400',
    lineHeight: 24,
  },
  optionExplain: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
  },
});

export default DetailBox;
