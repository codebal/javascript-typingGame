Typing Game
=============

## 해결 전략
1. 페이지 구성
    * 라우터 (hash 방식)
        - #typing : 타이핑 페이지
        - #result : 결과 페이지
    * 타이핑 페이지
        - http://localhost:9000 or http://localhost:9000/#typing
        - src/page/resultPage/resultPage.ts
    * 결과 페이지
        - http://localhost:9000/#result
        - src/page/resultPage/resultPage.ts

2. 타이핑 페이지에서 게임 실행
    * 게임시작
        - 화면 초기화
        - axios로 게임데이터 호출
    * 타이핑 체크
        - 게임데이터 배열순서로 타이핑 게임 진행
        - 게임데이터의 text 와 textinput 을 비교
        - 제한시간은 second 값을 setTimeout 으로 구현
        - 정답일경우 solve 값을 true, solve_seoncd 값에 해결시간을 기록
        - 제한시간 초과하면 solve 값을 false 기록
    * 점수 계산
        - solve 갯수로 점수 계산
        - solve_second 합계 / solve = 평균 해결시간
    * 게임 완료
        - 게임데이터 배열을 전부 소모하면 결과 페이지로 이동
    * 초기화
        - 게임시작을 다시 실행

3. 결과 페이지에서 결과 확인
    * 결과표시
        - 게임중에 기록된 결과를 화면에 표시
    * 다시시작
        - 타이핑 페이지로 이동

## 디렉토리
- public
- css
- src
    - @test
    - @type
    - model
    - page
        - resultPage
        - typingPage
    - utils

## data model
- src/model/~
- TypingInfo : 게임데이터의 타이핑 정보

## type
- src/@type/~

## router
- hash / onhashchange 로 구현
- router() 함수
- src/utils/commonUtils.ts

## script
- test : 유닛테스트
- build : 빌드
    - output 경로: build
- start
    - webpack-dev-server 실행

## test
- jest
- src/@test/test.ts
- 테스트내용
    1. "initGameData game size 12" : 게임데이터 배열 갯수 12개
    2. "getTypingInfo(5) is not null" : 6번째 데이터 null 체크
    3. "no typing result avg_second is 0" : 게임전 평균 해결시간은 0
    4. "game finish result" : 해결,해결시간 세팅후 계산 결과 체크
