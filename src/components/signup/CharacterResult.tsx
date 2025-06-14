'use client'

import { useNicknameStore } from '@/stores/nicknameStore'
import { useCharacterStore } from '@/stores/useCharacterStore'
import React from 'react'
import { useRouter } from 'next/navigation'

const CharacterResult = () => {
  const router = useRouter()
  const nickname = useNicknameStore(state => state.nickname)
  const type = useCharacterStore(state => state.type) // 여기 추가됨!

  const handleAccept = () => {
    alert('마음에 든다고 했음!')
  }

  const handleRetry = () => {
    router.push('/signup/investment')
  }

  return (
    <div className="relative max-w-[700px] mx-auto mt-16 text-center">
      <h1 className="text-xl font-bold text-[#4D2700] whitespace-pre-line mb-6">
        {`당신의 투자 유형에 맞는 캐릭터가 생성되었어요!\n${nickname}님, 마음에 드시나요?`}
      </h1>

      {/* 여기 이미지 표시! */}
      <div className="w-[300px] h-[300px] mx-auto mb-8">
        <img
          src={`/assets/characters/${type}.png`}
          alt="캐릭터"
          className="w-[300px] h-[300px] object-contain mx-auto"
        />
      </div>

      <div className="flex justify-center gap-6">
        <button
          className="bg-[#FFD288] hover:bg-[#F2B300] text-[#4D2700] px-6 py-3 rounded-xl font-bold"
          onClick={handleAccept}
        >
          네, 마음에 들어요
        </button>
        <button
          className="bg-white border border-[#4D2700] text-[#4D2700] px-6 py-3 rounded-xl font-bold"
          onClick={handleRetry}
        >
          저와 잘맞는 캐릭터인거 같아요
        </button>
      </div>
    </div>
  )
}

export default CharacterResult
