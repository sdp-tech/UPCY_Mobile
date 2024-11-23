// DetailBox component without the tab
import { View, Text, StyleSheet } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { MaterialDetail, ServiceDetailOption } from './Service';

function convertPeriod(period: number) {
  let localPeriod: string = '';
  if (period === 0) {
    localPeriod = '3일';
  } else if (period === 1) {
    localPeriod = '5일';
  } else if (period === 2) {
    localPeriod = '7일';
  } else if (period === 3) {
    localPeriod = '3주';
  } else if (period === 4) {
    localPeriod = '5주';
  } else if (period === 5) {
    localPeriod = '8주';
  } else {
    localPeriod = '정보 없음';
  }
  return localPeriod;
}

const PeriodBox = ({ period }: { period: number }) => {
  return (
    <View style={styles.eachBox}>
      <View style={styles.periodLine}>
        <Text style={TextStyles.eachLabel}>예상 제작 기간</Text>
        <Text style={TextStyles.eachData}>{convertPeriod(period)}</Text>
      </View>
    </View>
  );
};

const ContentBox = ({ content }: { content: string }) => {
  return (
    <View style={styles.eachBox}>
      <View style={styles.contentLine}>
        <Text style={TextStyles.eachLabel}>서비스 상세</Text>
        <View style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
          <RenderHTML
            contentWidth={350}
            source={{ html: content }}
            tagsStyles={{
              img: { maxWidth: '100%' },
              p: { overflow: 'hidden' },
            }}
            baseStyle={{
              maxWidth: 370,
            }}
          />
        </View>
      </View>
    </View>
  );
};

const MaterialBox = ({ list }: { list: MaterialDetail[] }) => {
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
        <Text style={TextStyles.eachLabel}>작업 가능한 소재</Text>
        <View style={styles.materialListLine}>
          {materialList({ data: list.map(element => element.material_name) })}
        </View>
      </View>
    </>
  );
};

const OptionBox = ({ list }: { list: ServiceDetailOption[] }) => {
  return (
    <View style={styles.eachBox}>
      <Text style={TextStyles.eachLabel}>옵션 상세</Text>
      <View style={styles.optionListBox}>
        {list.map((option, index) => {
          return (
            <View key={option.option_uuid} style={{ marginBottom: 16 }}>
              <Text style={TextStyles.optionLabel}>option {index + 1}</Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 16,
                }}>
                <Text style={TextStyles.optionNameLabel}>
                  {option.option_name}
                </Text>
                <Text style={TextStyles.optionPriceLabel}>
                  +{option.option_price}원
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#f1f1f1',
                  padding: 14,
                  borderRadius: 8,
                }}>
                <Text style={TextStyles.optionContentLabel}>
                  {option.option_content}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

type DetailBox2Props = {
  servicePeriod: number;
  serviceMaterials?: MaterialDetail[];
  serviceContent: string;
  serviceOptions?: ServiceDetailOption[];
  marketUuid: string;
};

const DetailBox2 = ({
  servicePeriod,
  serviceMaterials,
  serviceContent,
  serviceOptions,
  marketUuid,
}: DetailBox2Props) => {
  return (
    <>
      <PeriodBox period={servicePeriod} />
      <ContentBox content={serviceContent} />
      {serviceMaterials && serviceMaterials.length > 0 && (
        <MaterialBox list={serviceMaterials ?? []} />
      )}
      {serviceOptions && serviceOptions.length > 0 && (
        <OptionBox list={serviceOptions ?? []} />
      )}
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
  optionListBox: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

const TextStyles = StyleSheet.create({
  eachLabel: {
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
  optionLabel: {
    color: '#612FEF',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 4,
  },
  optionNameLabel: {
    color: '#222',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  optionPriceLabel: {
    color: '#222',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  optionContentLabel: {
    color: '#222',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
  },
});

export default DetailBox2;
