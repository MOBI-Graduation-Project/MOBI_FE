//프->백 요청 바디 스키마 타입 명시 
export interface SajuCompatibilityRequest {
  //스웨거에 맞춘 데이터 형식
  birthDate: string;
  stockName: string;
}

//백->프 응답 바디 스키마 타입 명시 
export interface SajuCompatibilityResponse {
  //스웨거에 맞춰
  result: string;
}

/**
 * API 에러 공통 포맷(프론트 내부에서 사용)
 * - 백엔드의 원문 에러를 그대로 실어줄 수도 있음
 */
export interface ApiError {
  message: string;
  status?: number;
  detail?: unknown;
}