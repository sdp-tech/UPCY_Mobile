// DetailBox component without the tab
import { View, Text, StyleSheet, Image, Button, Dimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { defaultImageUri, MaterialDetail, ServiceDetailOption, } from './Service';
import { useState } from 'react';
import React from 'react';

const { width, } = Dimensions.get("window");

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

const WebDisplay = React.memo(function WebDisplay({ content }: { content: string }) {
  return (
    <RenderHTML
      contentWidth={350}
      source={{ html: content || "<p>No content available</p>" }}
      tagsStyles={{
        img: { maxWidth: '100%' },
        p: { overflow: 'hidden' },
      }}
      baseStyle={{
        maxWidth: 370,
      }}
    />
  );
});

const ContentBox = ({ content, imageUris }: { content: string; imageUris: { image: string }[] }) => {
  const [imageHeights, setImageHeights] = useState<number[]>([]);

  // const handleImageLoad = (index: number, width: number, height: number) => {
  //   // 이미지 비율에 따라 동적 높이 계산
  //   const aspectRatio = height / width;
  //   const adjustedHeight = width * aspectRatio; // 화면 너비 기준 높이 계산
  //   setImageHeights((prev: any) => {
  //     const newHeights = [...prev];
  //     newHeights[index] = adjustedHeight;
  //     return newHeights;
  //   });
  // };

  return (
    <View style={styles.eachBox}>
      <View style={styles.contentLine}>
        <Text style={styles.eachLabel}>서비스 상세</Text>
        <View style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
          <WebDisplay content={content} />
        </View>

        {/* 이미지 렌더링 */}
        {imageUris && imageUris.length > 1 && (
          <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
            {imageUris.slice(1).map((uriObj, index) => (
              <Image
                key={index}
                style={{
                  width: width - 32, // 좌우 padding (16 + 16)을 제외한 너비
                  height: undefined, // 높이가 계산되기 전 기본값 200
                  aspectRatio: 1, // 초기 비율
                  marginBottom: 16,
                  borderRadius: 8,
                  resizeMode: 'cover',
                }}
                source={{ uri: uriObj.image }}
                onLoad={(e) => {
                  const { width: imgWidth, height: imgHeight } = e.nativeEvent.source;
                  const aspectRatio = imgWidth / imgHeight;
                  e.target.setNativeProps({
                    style: { aspectRatio }, // 비율 동적 적용
                  });
                }}
              />
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const MaterialBox = ({ list }: { list: MaterialDetail[] }) => {
  function materialList({ data }: { data: MaterialDetail[] }) {
    return data?.map((item, index) => (
      <View key={item.material_uuid}>
        <Text style={TextStyles.eachMaterialData}>
          {item.material_name} {index < data.length - 1 && '| '}
        </Text>
      </View>
    ));
  }

  return (
    <View style={styles.materialBox}>
      <Text style={TextStyles.eachLabel}>작업 가능한 소재</Text>
      <View style={styles.materialListLine}>
        {materialList({ data: list })}
      </View>
    </View>
  );
};

const OptionBox = ({ list, }: { list: ServiceDetailOption[], }) => {
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
              <View style={{
                flexDirection: 'row',
                gap: 14,
              }}>
                <View
                  style={{
                    backgroundColor: '#f1f1f1',
                    padding: 14,
                    borderRadius: 8,
                    flexGrow: 1,
                  }}>
                  <Text style={TextStyles.optionContentLabel}>
                    {option.option_content}
                  </Text>
                </View>
                {(Array.isArray(option.service_option_images) && option.service_option_images.length > 0) &&
                  <Image
                    style={{ width: 50, height: 100, flexGrow: 0.4 }}
                    source={{
                      uri: option.service_option_images[0].image
                    }}
                  />
                }
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
  imageUris: any[];
  marketUuid: string;
};

const DetailBox2 = ({
  servicePeriod,
  serviceMaterials,
  serviceContent,
  serviceOptions,
  imageUris,
  marketUuid,
}: DetailBox2Props) => {
  return (
    <View>
      <PeriodBox period={servicePeriod} />
      <ContentBox content={serviceContent} imageUris={imageUris} />
      {serviceMaterials && serviceMaterials.length > 0 && (
        <MaterialBox list={serviceMaterials ?? []} />
      )}
      {serviceOptions && serviceOptions.length > 0 && (
        <OptionBox list={serviceOptions ?? []} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  eachBox: {
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderColor: '#dcdcdc',
    paddingVertical: 8,
  },
  eachLabel: {
    color: '#222222',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  materialBox: {
    display: 'flex',
    flexDirection: 'row',
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
    lineHeight: 24,
    color: '#222222',
    fontFamily: 'Pretendard Variable',
    fontWeight: '400',
    paddingVertical: 8,
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
