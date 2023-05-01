# 질문 1
1. 특정한 영화정보를 받아오는 RESTful API인 /api/v1/movie가 있다고 하겠습니다. 이 API의 입력과 결과 값으로 어떤 JSON 데이터가 와야 할까요? 기대하는 HTTP Status code와 JSON data 형식을 적어주세요. 참고로 아래와 같은 화면 Front-end를 지원한다고 가정하겠습니다. (로그인한 사용자의
데이터를 고려하지 않으셔도 됩니다. 시청목록, Seen, 좋아요, 싫어요 고려하지 않겠습니다.)

A: 다음과 같은 json 형식을 따라 제작했습니다.
```
   [{
        "id": 10,
        "name": "존윅5555",
        "originName": "john wick 4",
        "posterImage": "https://laksdnfa.asndlfknalsk.com",
        "openingDate": "Tue Apr 25 2023 09:00:00 GMT+0900 (Korean Standard Time)",
        "synopsis": "존윅의 액션 영화",
        "playtime": "180분",
        "score": 99,
        "actors": [
            "키아누 리브스",
            "견자단",
            "빌 스카스가드"
        ],
        "genres": [
            "shooting"
        ],
        "directors": [
            "john"
        ],
        "trailers": [
            "https://youtube.com/trailers",
            "https://youtube.com/trailers",
            "https://youtube.com/trailers"
      ]
    }]
```
    
## GET /api/v1/movies
- 이 API는 Entiy들을 Filter로 걸러서 돌려주는 것입니다. 이 Resource에서는 어떤 Filter가 가능할까요? 그리고 각 Filter들은 어떤 Operation을 해야 할까요? ( 예를들어, /api/v1/movies?title=화양연화)
  
  A : 영화 이름, 출연 배우, 감독, 상영시간의 필터를 적용할 수 있겠습니다.
  예를 들어 /api/v1/movies?take=100&skip=10&genres=action&actors=키아누리브스,견자단&name=화양연가&startdate=2022-02-01&directors=john
  과 같이 입력하면 모든 쿼리 조건을 만족 시키는 영화만 필터링해 list로 돌려줍니다.
  
  
- 성공적인 경우, 어떤 https status code와 결과를 되돌려 줘야 할까요?
  
  A : 성공적인 경우 200 코드와 영화 정보 list를 돌려줍니다.
  
  
- 만약 Filter를 포함한 Request를 던졌는데 내용이 없다면 어떤 https status code오 결과를 되돌려 줘야 할까요?
  
  A : 성공적인 경우 203 코드와 빈 body를 돌려줍니다.
  
  
## GET /api/v1/movies/{movie_id}
- 성공적인 경우, 어떤 https status code와 결과를 되돌려 줘야 할까요?
  
  A : 성공적인 경우 200 코드 하나의 영화 정보를 돌려줍니다.
  
- 만약 해당하는 Entity가 없다면 어떤 https status code와 결과를 되돌려 줘야 할까요?

  A : 성공적인 경우 203 코드와 빈 body를 돌려줍니다.
  
## POST /api/v1/movies
- Input은 어떻게 줘야 할까요?
  
  A : 아래와 같이 body로 전달하면 됩니다.
  
  ```
   [{
        "name": "존윅5555",
        "originName": "john wick 4",
        "posterImage": "https://laksdnfa.asndlfknalsk.com",
        "openingDate": "Tue Apr 25 2023 09:00:00 GMT+0900 (Korean Standard Time)",
        "synopsis": "존윅의 액션 영화",
        "playtime": "180분",
        "score": 99,
        "actors": [
            "키아누 리브스",
            "견자단",
            "빌 스카스가드"
        ],
        "genres": [
            "shooting"
        ],
        "directors": [
            "john"
        ],
        "trailers": [
            "https://youtube.com/trailers",
            "https://youtube.com/trailers",
            "https://youtube.com/trailers"
      ]
    }]


- 성공적으로 Entity를 만들었다면 , 어떤 https status code와 결과를 되돌려 줘야할까요?
A : 201 코드와 생성된 entitiy 정보를 돌려주면 됩니다.

- 만약 새롭게 생성한 Entity 가 기존에 있는 것과 충돌한다면, 어떤 https status code와 결과를 되돌려 줘야 할까요?
A : 400 코드와 에러 메시지를 돌려주면 됩니다.

- 만약 해당하는 Entity를 생성하다가 다른 내부 문제가 생겼다면 어떤 https status code와 결과를 되돌려 줘야 할까요?
A : 500 코드와 에러 메시지를 돌려주면 됩니다.

## PUT /api/v1/movies/{movie_id}
- 성공적으로 Entity를 변경했다면, 어떤 https status code와 결과를 되돌려 줘야할까요?
A : 201 코드와 변경된 entitiy 정보를 돌려주면 됩니다.

- 만약 변경한 Entity의 내용이 받아들일 수 없는 내용이라면, 어떤 https status code와 결과를 되돌려 줘야 할까요?
A : 400 코드와 변경된 에러 메시지를 돌려주면 됩니다.

## DELETE /api/v1/movies/{movie_id}
- 성공적으로 Entity를 삭제했다면, 어떤 https status code와 결과를 되돌려 줘야할까요?
A : 200 코드와 삭제 완료 메시지를 돌려주면 됩니다.

- 만약 삭제하려는 Entity가 없는 Entity라면, 어떤 https status code와 결과를 되돌려줘야 할까요?
A : 400 코드와 변경된 에러 메시지를 돌려주면 됩니다.

# 질문2

## 사용 스택
- Node.js v16.17.0
- Nest.js
- Sqlite
- Typescript 

## 구현 기능
- 회원 기능
    - [x] GET /api/v1/movies
    - [x] GET /api/v1/movies/{movie_id}
    - [x] POST /api/v1/movies
    - [x] PUT /api/v1/movies/{movie_id}
    - [x] DELETE /api/v1/movies/{movie_id}

# 개발 내용
### ERD
![image](https://user-images.githubusercontent.com/91925895/235353296-8c978a90-1ccc-48cc-a4b8-4b9fbaae991e.png)

### 프로젝트 실행 방법
- 의존성 설치
  - npm i 
- 개발 환경 실행
  - npm run start:dev
- 유닛 테스트 진행
  - npm run test 

### api 문서
- 프로젝트 로컬 실행 후 웹을 통해 localhost:3000/api 접속 
![image](https://user-images.githubusercontent.com/91925895/235356937-5ffe996d-3be6-44ce-afb7-b25669b1a5a7.png)

### 레파지토리 의존성 분리
- 모든 엔티티와 데이터베이스에 진행하는 crud 작업이 repository 모듈에서만 진행되어 다른 모듈에서 엔티티 및 crud 작업을 진행하지 않도록 설계해 보았습니다. 이를 통해 데이터베이스 변경 등 이슈에 있어 movie 모듈과 상관 없이 변경 및 수정을 진행할 수 있을 것으로 사료됩니다.

### get query 설계
- 실제 검색 모델 처럼 영화명, 배우, 감독, 장르, 상영일 등 쿼리를 모두 받아 모든 조건을 만족 시키는 엔티티만 반환하도록 설계 했습니다. 최초에는 모든 쿼리 조건을 만족시키는 영화를 모두 찾은 뒤 중복된 영화만 다시 찾아내는 로직으로 제작했습니다. 또한 페이징 기능을 추가해 skip, take (기본값 skip =0, take=10)쿼리로 받아오고 싶은 정도를 설정할 수 있도록 제작했습니다.

### 더미 데이터 업로드
- 실제 영화 내용을 기반으로 5개의 영화를 업로드해 두었습니다. 해당 데이터를 기반으로 로컬 테스트를 진행하시면 될 것 같습니다. 실제 데이터는 testresource.json 파일을 참조해 주세요.
