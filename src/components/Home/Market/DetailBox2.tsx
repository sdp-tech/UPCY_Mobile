// DetailBox component without the tab
import { View, Text, StyleSheet } from 'react-native';

const PeriodBox = ({ period }: { period: number }) => {
  return (
    <View style={styles.eachBox}>
      <View style={styles.periodLine}>
        <Text style={TextStyles.eachlabel}>예상 제작 기간</Text>
        <Text style={TextStyles.eachData}>{period}주</Text>
      </View>
    </View>
  );
};

const ContentBox = ({ content }: { content: string }) => {
  return (
    <View style={styles.eachBox}>
      <View style={styles.contentLine}>
        <Text style={TextStyles.eachlabel}>서비스 상세</Text>
        <Text style={TextStyles.eachData}> {content} </Text>
      </View>
    </View>
  );
};

type DetailBox2Props = {
  servicePeriod: number;
  //   serviceContent: string;
};

const DetailBox2 = ({ servicePeriod /*serviceContent*/ }: DetailBox2Props) => {
  return (
    <>
      <PeriodBox period={servicePeriod} />
      {/* <ContentBox content={serviceContent} /> */}
    </>
  );
};

const styles = StyleSheet.create({
  eachBox: {
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderColor: '#dcdcdc',
    paddingVertical: 8,
  },
  periodLine: {
    flexDirection: 'row',
    gap: 24,
    alignContent: 'center',
  },
  contentLine: {
    flexDirection: 'column',
    gap: 29,
    alignContent: 'center',
  },
});

const TextStyles = StyleSheet.create({
  eachlabel: {
    color: '#222222',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  eachData: {
    color: '#222222',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export default DetailBox2;
