export type Styles =
  | '빈티지'
  | '미니멀'
  | '캐주얼'
  | '페미닌'
  | '글램'
  | '스트릿'
  | '키치'
  | '스포티'
  | '홈웨어'
  | '걸리시';
type Materials = '가죽' | '스웨이드' | '벨벳' | '데님' | '퍼' | '실크' | '울';
interface File {
  name: string;
  uri: string;
}
export type Files = File[];

export type StyleType = Styles[];
export type MaterialType = Materials[];
export type RegionType =
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
type BaseType = {
  file?: Files; // 공통 속성
};

type Educ = BaseType & {
  school?: string; // 학교명
  major?: string | undefined; // 전공
  academic_status?: string | undefined; // 상태
};
export type EducType = Educ[];

type Career = BaseType & {
  company_name?: string; // 회사명
  department?: string | undefined; // 근무부서 및 직책
  period?: string | undefined; // 근무기간
};
export type CareerType = Career[];

type Awards = BaseType & {
  competition?: string; // 공모전명
  prize?: string | undefined; // 수상내역
};
export type AwardsType = Awards[];

type Certifi = BaseType & {
  name?: string; // 자격증명
  issuing_authority?: string | undefined; // 발급기관
};
export type CertifiType = Certifi[];

type Free = BaseType & {
  project_name?: string; // 프로젝트명
  description?: string | undefined; // 상세설명
};
export type FreeType = Free[];

export type Field = {
  name: string;
  file: Files;
  type: string;
  major?: string | undefined;
  status?: string | undefined;
  team?: string | undefined;
  period?: string | undefined;
  host?: string | undefined;
  content?: string | undefined;
};
export type FieldType = Field[];
// 종류별 타입 정의

export type UserInfoType = {
  email: string;
  phone: string | null;
  full_name: string;
  nickname: string;
  agreement_terms: boolean;
  address: string | null;
  profile_image_url: string;
  introduce: string;
  is_active: boolean;
  role: string;
}

export type ReformerResponseType = {
  user_info: UserInfoType;
  reformer_link: string;
  reformer_area: string;
  education: EducType;
  certification: CertifiType;
  awards: AwardsType;
  career: CareerType;
  freelancer: FreeType;
}