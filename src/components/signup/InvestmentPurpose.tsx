'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import { useCharacterStore } from '@/stores/useCharacterStore'

const questions = [
  {
    title: '투자유형 확인 - 투자 성향 선택',
    options: [
      '나는 평소에 손해가 나는 것은 내 두 눈이 뜨고 있는 이상 있을 수가 없다!!',
      '나는 평소에 손해를 보더라도 미래를 위해 투자를 하는 편이다.'
    ],
  },
  {
    title: '투자유형 확인 - 수익실현 시기',
    options: [
      '나는 성격이 급한 편이다.',
      '나는 성격이 느긋하다.',
    ],
  },
  {
    title: '투자유형 확인 - (예시 질문 3)',
    options: [
      '나는 오늘의 행복이 중요하다.',
      '나는 미래의 성공이 중요하다.',
    ],
  }
]

const InvestmentPurpose = () => {
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<number[]>([])
  const router = useRouter()
  const { setType } = useCharacterStore()

  const handleNext = () => {
    if (selected === null) return

    const updatedAnswers = [...answers, selected]

    if (step < questions.length - 1) {
      setStep(prev => prev + 1)
      setAnswers(updatedAnswers)
      setSelected(null)
    } else {
      // 마지막 단계 → 캐릭터 타입 저장 후 다음 페이지 이동
      const typeCode = updatedAnswers.map(i => i + 1).join('') // e.g., [0,1,1] → '122'
      setType(typeCode)
      router.push('/signup/character')
    }
  }

  const handlePrev = () => {
    if (step > 0) {
      setStep(prev => prev - 1)
      setAnswers(prev => prev.slice(0, -1))
      setSelected(null)
    } else {
      router.back()
    }
  }

  const q = questions[step]

  return (
    <div className="relative max-w-[700px] mx-auto mt-20 p-6">
      <h1 className="text-center text-xl text-[#4D2700] font-semibold mb-8">
        {q.title}
      </h1>

      <div className="flex justify-between gap-6">
        {q.options.map((text, idx) => (
          <div
            key={idx}
            onClick={() => setSelected(idx)}
            className={`flex-1 cursor-pointer p-6 rounded-2xl text-center border-2 transition shadow-md 
              ${
                selected === idx
                  ? idx === 1
                    ? 'bg-[#FFC414] border-[#4D2700]'
                    : 'bg-[#FFF6E4] border-[#F2B300]'
                  : idx === 1
                    ? 'bg-[#FFE69A] border-transparent'
                    : 'bg-[#FFF4D8] border-transparent'
              } hover:border-[#F2B300]`}
          >
            <p className="text-[#4D2700] font-bold whitespace-pre-line">{text}</p>
          </div>
        ))}
      </div>

      {/* 왼쪽 화살표 */}
      <button
        onClick={handlePrev}
        className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 w-[50px] h-[50px] rounded-full bg-[#4D2700] text-white flex items-center justify-center shadow-md hover:bg-[#2e1600] transition"
      >
        <FaArrowLeft />
      </button>

      {/* 오른쪽 화살표 */}
      <button
        onClick={handleNext}
        disabled={selected === null}
        className={`absolute right-[-40px] top-1/2 transform -translate-y-1/2 w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-lg shadow-md transition ${
          selected === null
            ? 'bg-[#4D2700]/50 pointer-events-none'
            : 'bg-[#4D2700] hover:bg-[#2e1600]'
        }`}
      >
        <FaArrowRight />
      </button>
    </div>
  )
}

export default InvestmentPurpose
