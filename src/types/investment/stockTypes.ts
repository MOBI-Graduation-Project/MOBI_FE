export interface Stock {
  // 주식 이름으로 코드 조회
  stockCode: string; // 종목코드: A005930
  stockName: string; // 삼성전자
}

export interface StockPriceRecord {
  date: string; // YYYY-MM-DD
  closePrice?: number; // 실제 종가
  predictedPrice?: number; // 예측 종가
  isPredicted: boolean;
}

export interface StockPrediction {
  stock: Stock;
  priceRecords: StockPriceRecord[];
  meta: {
    predictionGeneratedAt: string;
  };
}
export interface MyDataRegister {
  stockCode: string;
  stockName: string;
  purchaseAmount: number;
  avgPrice: number;
}

export interface MyData {
  myDataId: number; // 고유 ID
  stockCode: string; // 종목 코드
  stockName: string; // 종목명
  purchaseAmount: number; // 매수 수량
  avgPrice: number; // 매수 단가
  currentPrice: number; // 현재가
  valuationAmount: number; // 평가 금액
  returnAmount: number; // 평가 손익
  returnRate: number; // 수익률 (%)
}

export interface MarketPrediction {
  marketName: "KOSPI" | "KOSDAQ";
  prediction_result: "상승" | "하락";
  lastUpdated: string;
  predictionDate: string;
}
