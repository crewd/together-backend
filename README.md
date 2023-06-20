# 투게더 Back-End

<img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white"> <img src="https://img.shields.io/badge/nestjs-E0234E?style=flat&logo=nestjs&logoColor=white"> <img src="https://img.shields.io/badge/TypeOrm-white?style=flat"> <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178c6?style=flat&logo=typescript&logoColor=white">

## 🔎 About

매장 관리 웹서비스 투게더의 백엔드입니다.

회원가입, 로그인, 매장 관리에 관한 기능들이 있습니다.

> ### [Front-End](https://github.com/crewd/together-manager)

### ❗ 아직 개발이 진행 중인 프로젝트 입니다.

## 설치

```
npm install
```

## 실행

- `.env.example` 파일을 참고하여 `.env` 파일 생성

- ```
  # development
  $ npm run start

  # watch mode
  $ npm run start:dev

  # production mode
  $ npm run start:prod
  ```

## API

`http://localhost:3000/api`

### User

- POST `/user/login` 로그인

- POST `/user/signup` 회원가입

### Store

- GET `/store/list/{permission}` 매장 목록 조회

- GET `/store/store/{storeId}` 매장 상세 조회

- POST `/store/create` 매장 생성

- PATCH `/store/{storeId}/edit` 매장 정보 수정

- DELETE `/store/{storeId}/delete` 매장 제거

### Role

- PATCH `/role/role/{storeId}` 권한 변경

### Notice

- GET `/store/{storeId}/notice` 공지사항 목록 조회

- POST `/store/{storeId}/notice` 공지사항 생성

- PATCH `/store/{storeId}/notice/{noticeId}` 공지사항 수정

- DELETE `/store/{storeId}/notice/{noticeId}` 공지사항 제거

### 인수인계

- GET `/store/{storeId}/memo/{date`} 인수인계 목록 조회

- POST `/store/{storeId}/memo` 인수인계 생성

- PATCH `/store/{storeId}/memo/{memoId}` 인수인계 수정

### 업무 카테고리

- GET `/store/{storeId}/category` 카테고리 목록 조회

- POST `/store/{storeId}/category` 카테고리 생성

- PATCH `/store/{storeId}/category/{categoryId}` 카테고리 수정

- DELETE `/store/{storeId}/category/{categoryId}` 카테고리 제거

### 업무사항

- GET `/store/{storeId}/category/{categoryId}/work` 업무 조회

- POST `/store/{storeId}/category/{categoryId}/work` 업무 생성

- PATCH `/store/{storeId}/work/{workId}` 업무 수정

- DELETE `/store/{storeId}/work/{workId}` 업무 제거
