# 개발환경 구축
### 1. React Native
- Mac: https://dev-yakuza.posstree.com/ko/react-native/install-on-mac/   
- Window: https://dev-yakuza.posstree.com/ko/react-native/install-on-windows/

### 2. Git Fork
- Fork your own copy of sdp-tech/UPCY_Mobile
- Git clone with VSCode

### 3. Property List
- 공유 받은 local.properties를 android 폴더에 넣기
- Info.plist를 ios/upcy 폴더에 넣기
- env.d.ts를 프로젝트 최상위 폴더에 넣기

### 4. .env 파일 생성
- 프로젝트 최상위 폴더에 .env 파일 생성
- .env 파일 내에 UPCY_API_URL를 key로 하여, 백엔드 통신 주소를 value로 지정하기
- 공유 받은 API 키 목록을 넣기

### 5. package.json 패키지 설치
```
yarn install
```

### 6. (iOS의 경우) pod install 수행
- 프로젝트 최초 설정 시 또는 **이후 새로운 패키지 설치/삭제 시** 아래 명령어 수행
```
cd ios && pod install
```

### 7. Build
- 프로젝트 빌드
```
yarn start
``` 
- .env 파일 수정 사항 반영 위해 아래 옵션 사용
```
yarn start --reset-cache
```
