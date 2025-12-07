# 📈 모비(MOBI) – 혁신적인 주식 투자 플랫폼

<img width="1920" height="1080" alt="1p" src="https://github.com/user-attachments/assets/ab1723ce-96bb-425a-80d9-554c50105821" />

모비는 주식 투자 초보자부터 경험자까지 모두가 쉽고 즐겁게 투자할 수 있도록 돕는 혁신적인 금융 플랫폼입니다. 단순한 정보 제공을 넘어, 개인화된 캐릭터, 실시간 소통, 에이아이 기반 예측, 3D 메타버스 등 다양한 기능을 결합하여 투자자에게 실질적인 도움과 소속감을 제공합니다.  

요즘 20대 사이에서 트렌드가 ‘욜로(YOLO)’에서 ‘요노(YONO, 미래 준비형 소비)’로 변화하면서, 미래 대비와 현재 즐거움을 동시에 추구하는 새로운 소비 성향이 나타나고 있습니다. 모비는 이러한 흐름 속에서 사용자들이 재정적 목표를 달성하며 투자 경험을 즐길 수 있도록 설계되었습니다. 

---

## 🎯 서비스 목표
🔗 서비스 링크 : https://mobi.ai.kr/ </br>
🔗 서비스 소개 영상: https://www.youtube.com/watch?v=fK-NsPFCgXw&list=PLYIp_ptouZrkHoGXeDcxDBk_WoDy40f3y&index=8

- 주식 투자 초보자도 쉽게 접근 가능한 플랫폼
- 투자 정보와 실시간 소통을 통한 몰입감 있는 경험 제공
- 개인화된 캐릭터와 메타버스를 통한 즐거운 투자 생활
- AI 기반 예측과 맞춤형 분석으로 합리적 투자 지원

---

## 🔑 주요 기능

### 1. 로그인 & 회원 관리
- 구글 OAuth 2.0 기반 간편 로그인
- Zustand로 사용자 캐릭터 및 로그인 상태 안전하게 관리
- JWT 토큰 기반 액세스/리프레시 토큰 상태 관리

### 2. 주가 예측
- 관심 종목 등록 및 과거 주가, 미래 예측 데이터 제공
- AI 모델 기반 코스피/코스닥 지수 상승/하락 예측
- 실시간 한국거래소 API 연동으로 보유 종목 수익률, 평가금액, 손익 자동 계산
- 개별 종목 맞춤형 분석 제공

### 3. AI 비서 – 챗봇 모비
- OpenAI GPT 모델 기반 금융 맞춤형 챗봇
- 실시간 금융 데이터 조회 및 질문에 맞춤형 답변 제공
- 주식 투자 관련 궁금증 실시간 해결

### 4. 실시간 채팅
- WebSocket 기반 양방향 통신
- 채팅방 입장, 퇴장, 메시지 읽음 상태 등 다양한 인터랙션 지원
- 투자자 간 정보 공유 및 소속감 형성

### 5. 점집 기능
- 사용자 생년월일과 관심 종목 정보 기반 사주 궁합 분석
- 투자에 재미 요소 추가, 서비스 참여 유도

### 6. 3D 메타버스
- Three.js + React Three Fiber 기반 웹 3D 공간
- 아바타 이동, 점프, 물리 충돌 시뮬레이션
- 광장 내 실시간 다른 투자자와 상호작용 가능
- Zustand 기반 상태 관리로 아바타 및 메타버스 데이터 안전하게 유지

---

## 🔨 기술 스택
| **역할**              | **종류**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Framework**       | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge\&logo=nextdotjs\&logoColor=white)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Language**        | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Library**         | ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge\&logo=react\&logoColor=black) ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge\&logo=axios\&logoColor=white) ![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge\&logo=three.js\&logoColor=white) ![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge\&logo=zustand\&logoColor=white) ![SockJS](https://img.shields.io/badge/SockJS-000000?style=for-the-badge\&logo=javascript\&logoColor=white) ![@stomp/stompjs](https://img.shields.io/badge/STOMP-FF6600?style=for-the-badge\&logo=javascript\&logoColor=white) |
| **Styling**         | ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge\&logo=tailwindcss\&logoColor=white)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **Formatting**      | ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge\&logo=eslint\&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge\&logo=prettier\&logoColor=black) ![Husky](https://img.shields.io/badge/Husky-000000?style=for-the-badge\&logo=husky\&logoColor=white)                                                                                                                                                                                                                                                                                                                                        |
| **Version Control** | ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge\&logo=git\&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge\&logo=github\&logoColor=white)                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **Package Manager** | ![Yarn](https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge\&logo=yarn\&logoColor=white)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **Cowork Tool**     | ![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge\&logo=slack\&logoColor=white) ![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge\&logo=notion\&logoColor=white)                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
                                                       

---

## 👩‍💻 팀 소개
### 👥 팀원 소개

| <img src="https://avatars.githubusercontent.com/u/80269181?v=4" width="150" height="150"/> | <img src="https://avatars.githubusercontent.com/u/198352098?v=4" width="150" height="150"/> | <img src="https://avatars.githubusercontent.com/u/21856708?v=4" width="150" height="150"/> | <img src="https://avatars.githubusercontent.com/u/173968250?v=4" width="150" height="150"/> |
| :-------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------: |
| 신수진 <br/> [lemoncurdyogurt](https://github.com/lemoncurdyogurt) | 희주 <br/> [HeejuChoi01](https://github.com/HeejuChoi01) | 정은 <br/> [forlyby](https://github.com/forlyby) | 형준 <br/> [JunKimDdm](https://github.com/JunKimDdm) |
| **FE / 팀장** | **FE** | **BE** | **BE / AI & ML** |

---
