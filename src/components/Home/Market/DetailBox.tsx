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
          return null;
        })}
        <View style={{ marginBottom: 400 }} />
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
        <View style={styles.service}>
          <Text style={TextStyles.infolabel}>서비스 상세</Text>
          <Text style={TextStyles.service}>{explanation}</Text>
        </View>
      </View>
    );
  }

  function imageBox({ index, uri }: { index: number; uri: string }) {
    return (
      <View style={styles.image} key={index}>
        <ImageBackground
          style={{ height: width - 32, width: '100%' }}
          imageStyle={{ height: width - 32 }}
          source={{ uri }}
        />
      </View>
    );
  }

  function materialBox({ index }: { index: number }) {
    return (
      <>
        <View style={styles.material} key={index}>
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

  function materialList({ data }: { data: string[] }) {
    return data.map((item, index) => (
      <View key={index}>
        <Text
          style={{
            fontSize: 14,
            lineHeight: 24,
            color: '#222222',
            fontFamily: 'Pretendard Variable',
            fontWeight: '400',
          }}>
          {item} |{' '}
        </Text>
      </View>
    ));
  }
};

const styles = StyleSheet.create({
  service: {
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
  image: {
    padding: 16,
    display: 'flex',
    borderBottomWidth: 1,
    borderBlockColor: '#dcdcdc',
  },
  material: {
    flex: 1,
    flexDirection: 'row',
    gap: 24,
    padding: 16,
    borderBottomWidth: 1,
    borderBlockColor: '#dcdcdc',
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
});

export default DetailBox;
