'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'

const InvestmentPurpose = () => {
  const [selected, setSelected] = useState<number | null>(null)
  const router = useRouter()

  const handleNext = () => {
    if (selected !== null) {
      // TODO: 선택 결과 저장 로직
      router.push('/signup/character') // 다음 페이지로 이동
    } else {
      alert('투자 성향을 선택해주세요!')
    }
  }

  return (
    <div className="relative max-w-[700px] mx-auto mt-20 p-6">
      <h1 className="text-center text-xl text-[#4D2700] font-semibold mb-8">
        투자유형 확인 - 투자 성향 선택
      </h1>

      {/* 선택 카드들 */}
      <div className="flex justify-between gap-6">
        {/* 카드 1 */}
        <div
          onClick={() => setSelected(0)}
          className={`flex-1 cursor-pointer p-6 rounded-2xl text-center border-2 ${
            selected === 0 ? 'bg-[#FFE9C8] border-[#F2B300]' : 'bg-[#FFF6E4] border-transparent'
          } shadow-md hover:border-[#FFD288] transition`}
        >
          <p className="text-[#4D2700] font-bold">
            나는 지금 당장 눈앞에<br />
            치킨 사먹을 돈이 떨어져도 행복하다.
          </p>
        </div>

        {/* 카드 2 */}
        <div
          onClick={() => setSelected(1)}
          className={`flex-1 cursor-pointer p-6 rounded-2xl text-center border-2 ${
            selected === 1 ? 'bg-[#FFD138] border-[#4D2700]' : 'bg-[#FFE69A] border-transparent'
          } shadow-md hover:border-[#F2B300] transition`}
        >
          <p className="text-[#4D2700] font-bold">
            나는 평소에 손해를 보더라도<br />
            미래를 위해 투자하는 편이다.
          </p>
        </div>
      </div>

      {/* 왼쪽 화살표 */}
      <button
        onClick={() => router.back()}
        className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 w-[50px] h-[50px] rounded-full bg-[#4D2700] text-white flex items-center justify-center shadow-md hover:bg-[#2e1600] transition"
      >
        <FaArrowLeft />
      </button>

      {/* 오른쪽 화살표 */}
      <button
        onClick={handleNext}
        className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 w-[50px] h-[50px] rounded-full bg-[#4D2700] text-white flex items-center justify-center shadow-md hover:bg-[#2e1600] transition"
      >
        <FaArrowRight />
      </button>
    </div>
  )
}

export default InvestmentPurpose
