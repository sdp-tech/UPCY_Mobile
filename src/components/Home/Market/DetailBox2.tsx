// DetailBox component without the tab
import { View, Text, StyleSheet } from 'react-native';
import RenderHTML from 'react-native-render-html';

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
        <View style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
          <RenderHTML contentWidth={350} source={{ html: content }} />
        </View>
      </View>
    </View>
  );
};

const MaterialBox = ({ list }: { list: string[] }) => {
  function materialList({ data }: { data: string[] }) {
    return data?.map((item, index) => (
      <View key={index}>
        <Text style={TextStyles.eachMaterialData}>{item} | </Text>
      </View>
    ));
  }

  return (
    <>
      <View style={styles.eachBox}>
        <Text style={TextStyles.eachlabel}>작업 가능한 소재</Text>
        <View style={styles.materialListLine}>
          {materialList({ data: list })}
        </View>
      </View>
    </>
  );
};

// TODO: OptionBox.tsx component 사용하도록 변경
const OptionBox = () => {
  return (
    <View style={styles.eachBox}>
      <Text style={TextStyles.eachlabel}>옵션 상세</Text>
    </View>
  );
};

type DetailBox2Props = {
  servicePeriod: number;
  serviceMaterials?: string[];
  serviceContent: string;
};

const DetailBox2 = ({
  servicePeriod,
  serviceMaterials,
  serviceContent,
}: DetailBox2Props) => {
  return (
    <>
      <PeriodBox period={servicePeriod} />
      <ContentBox content={serviceContent} />
      <MaterialBox list={serviceMaterials ?? []} />
      <OptionBox />
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
  materialListLine: {
    flexDirection: 'row',
    flex: 0.7,
    flexWrap: 'wrap',
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
  eachMaterialData: {
    fontSize: 14,
    lineHeight: 26,
    color: '#222222',
    fontFamily: 'Pretendard Variable',
    fontWeight: '400',
  },
});

export default DetailBox2;
