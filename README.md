# LOOKLIKE

옷 사진을 올리면 대표 색상을 브라우저에서 분석하고, 카테고리·스타일 힌트를 결합해 비슷한 상품과 가격을 찾는 반응형 패션 검색 사이트입니다.

## 실행

```bash
npm install
npm run dev
```

API 키가 없으면 자동으로 데모 상품을 표시합니다.

## 실제 상품 연동

무신사와 에이블리는 일반 사용자를 위한 공개 상품 검색 API가 확인되지 않아 공개 문서가 있는 네이버 쇼핑 검색 API를 사용합니다. 네이버 개발자 센터에서 검색 API 애플리케이션을 등록한 뒤 다음 환경변수를 Vercel에 추가하세요.

```env
NAVER_CLIENT_ID=발급받은_ID
NAVER_CLIENT_SECRET=발급받은_SECRET
```

키는 `api/search.js` 서버리스 함수에서만 사용되어 브라우저에 노출되지 않습니다.

## 검색 방식

브라우저 Canvas로 대표 색상을 감지하고 사용자가 카테고리와 스타일을 보정한 뒤, 세 특징을 결합해 네이버 쇼핑 API에서 실제 상품과 가격을 검색합니다.

## 명령어

```bash
npm run dev
npm run build
npm test
```
