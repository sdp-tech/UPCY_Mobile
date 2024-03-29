type Styles = '빈티지' | '미니멀' | '캐주얼';
type Materials = '가죽' | '스웨이드' | '벨벳' | '데님' | '퍼' | '실크' | '울';
export type StyleType = Styles[];
export type MaterialType = Materials[];
export type RegionType = '서울 전체' | '광진구' | '관악구' | undefined;
export type EducType = {
  school: string;
  major: string;
  status: '재학' | '휴학' | '졸업' | '수료' | undefined;
  file: undefined;
  // 파일 형식 추가
};

type Careers = {
  name: string;
  file: undefined;
};
type FreelancerType = Careers & {};
type InternType = Careers & {
  team: string;
  position: string;
  start: string;
  end: string;
};
type ContestType = Careers & {
  host: string;
  date: string;
};
type CertificateType = Careers & {
  host: string;
  date: string;
};
type OutsourcingType = Careers & {
  client: string;
  content: string;
  start: string;
  end: string;
};
export type CareerType = (
  | FreelancerType
  | InternType
  | ContestType
  | CertificateType
  | OutsourcingType
)[];
// 종류별 타입 정의
