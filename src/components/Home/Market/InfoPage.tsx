import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import styled from 'styled-components/native';
import { Body14R, Body16B } from '../../../styles/GlobalText';
import {
  AwardsType,
  CareerType,
  CertifiType,
  EducType,
  FreeType,
} from '../../../types/UserTypes';

// 개별 마켓 페이지 누르면 보이는 '프로필' 탭에 있는 페이지임!
type InfoPageDataType = {
  label: string;
  data: any;
};

export type MarketType = {
  reformer_link?: string, // 링크 
  market_introduce: string, // 자기소개
  // TODO: introduce로 수정하기 
  reformer_nickname?: string, // 닉네임 
  market_thumbnail: string, // ???
  market_uuid?: string, // market_uuid
  reformer_area?: string; // 주요 활동지역 
  education?: EducType;
  certification?: CertifiType;
  awards?: AwardsType;
  career?: CareerType;
  freelancer?: FreeType;
};

const InfoPage = ({ marketData }: { marketData: MarketType }) => {
  // const data = [
  //   {
  //     label: '소개글',
  //     data: '안녕하세요 데님 전문 리폼러 하느리퐁퐁입니다!\n 어쩌구 저쩌구',
  //   },
  //   { label: '오픈채팅 링크', data: 'https://www.naver.com' },
  //   { label: '주요 활동지역', data: '서울 서대문구' },
  //   {
  //     label: '경력',
  //     data: [
  //       '업씨대학교 패션디자인학과 졸업',
  //       '한국패션디자인공모전 동상',
  //       '업씨패션회사 인턴 6개월',
  //     ],
  //   },
  // ];

  const [data, setData] = useState<InfoPageDataType[]>();
  // 개별 경력 데이터를 포맷팅
  const formatCareerItem = (category: string, items: any[]) => {
    if (!items || items.length === 0) return []; // items가 비어있으면 빈 배열 반환
    return items.map(item => {
      switch (category) {
        case 'awards':
          return `${item.competition} ${item.prize}`;
        case 'career':
          return `${item.company_name} ${item.department} ${item.period}`;
        case 'certification':
          return `${item.name} ${item.issuing_authority}`;
        case 'education':
          return `${item.school} ${item.major} ${item.academic_status}`;
        case 'freelancer':
          return `${item.project_name} ${item.description}`;
        default:
          return '';
      }
    });
  };

  // 전체 경력 데이터를 포맷팅
  const formattedCareer = () => {
    return [
      ...formatCareerItem('awards', marketData.awards || []),
      ...formatCareerItem('career', marketData.career || []),
      ...formatCareerItem('certification', marketData.certification || []),
      ...formatCareerItem('education', marketData.education || []),
      ...formatCareerItem('freelancer', marketData.freelancer || []),
    ];
  };

  useEffect(() => {
    const newData = [
      {
        label: '소개글',
        data: marketData.market_introduce,
      },
      { label: '오픈채팅 링크', data: marketData.reformer_link },
      { label: '주요 활동지역', data: marketData.reformer_area },
      {
        label: '경력',
        data: formattedCareer(),
      },
    ];
    setData(newData);
  }, [marketData]);

  return (
    <Tabs.FlatList
      data={data}
      style={{ marginTop: 12 }}
      renderItem={({ item }: any) => {
        return (
          <InfoSection>
            <Body16B>{item.label}</Body16B>
            {item.label === '경력' ? (
              // item.data가 list인 경우
              <View style={styles.flexColumn}>
                {item.data.map((itemData: string, index: number) => (
                  <Body14R key={index}>{itemData}</Body14R>
                ))}
              </View>
            ) : item.label == '오픈채팅 링크' ? (
              <Body14R
                style={{ textAlign: 'right', textDecorationLine: 'underline' }}>
                {item.data}
              </Body14R>
            ) : (
              <Body14R style={{ textAlign: 'right' }}>{item.data}</Body14R>
            )}
          </InfoSection>
        );
      }}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
});

const InfoSection = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px;
  border-bottom-width: 1px;
  border-color: #dfdfdf;
`;

export default InfoPage;
