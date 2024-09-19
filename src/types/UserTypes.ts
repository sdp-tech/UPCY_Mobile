type Styles = '빈티지' | '미니멀' | '캐주얼';
type Materials = '가죽' | '스웨이드' | '벨벳' | '데님' | '퍼' | '실크' | '울';
interface File {
  name: string;
  uri: string;
}
export type Files = File[];

export type StyleType = Styles[];
export type MaterialType = Materials[];
export type RegionType =
  | '서울 전체'
  | '강남구'
  | '강동구'
  | '강북구'
  | '강서구'
  | '관악구'
  | '광진구'
  | '구로구'
  | '금천구'
  | '노원구'
  | '도봉구'
  | '동대문구'
  | '동작구'
  | '마포구'
  | '서대문구'
  | '서초구'
  | '성동구'
  | '성북구'
  | '송파구'
  | '양천구'
  | '영등포구'
  | '용산구'
  | '은평구'
  | '종로구'
  | '중구'
  | '중랑구'
  | '';
export type EducType = {
  school: string;
  major: string;
  status: string | undefined;
  file: Files;
  // 파일 형식 추가
};

export type Careers = {
  name: string;
  file: Files;
  type: string | undefined;
  major?: string;
  status?: string | undefined;
  team?: string;
  period?: string;
  // start?: Date;
  // end?: Date;
  host?: string;
  //client?: string;
  content?: string;
};
type InternType = Careers & {
  team: string;
  start: string;
  end: string;
};
type ContestType = Careers & {
  host: string;
};
type CertificateType = Careers & {
  host: string;
};
type OutsourcingType = Careers & {
  client: string;
  content: string;
  start: string;
  end: string;
};
export type CareerType = Careers[];
// 종류별 타입 정의
