type Styles = '빈티지' | '미니멀' | '캐주얼';
type Materials = '가죽' | '스웨이드' | '벨벳' | '데님' | '퍼' | '실크' | '울';
export type StyleType = Styles[];
export type MaterialType = Materials[];
export type RegionType = '서울 전체' | '광진구' | '관악구' | undefined;
export type EducType = {
  school: string;
  major: string;
  status: '재학' | '휴학' | '졸업' | '수료';
  file: undefined;
  // 파일 형식 추가
};

export type CareerType = undefined;
// 종류별 타입 정의
