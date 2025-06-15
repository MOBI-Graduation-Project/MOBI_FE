'use client'

import { useNicknameStore } from '@/stores/nicknameStore'
import { useCharacterStore } from '@/stores/useCharacterStore'
import React from 'react'
import { useRouter } from 'next/navigation'
import Lottie from 'lottie-react'

// 8개의 Lottie JSON 애니메이션 import
import character111 from '@/assets/characters/111.json'
import character112 from '@/assets/characters/112.json'
import character121 from '@/assets/characters/121.json'
import character122 from '@/assets/characters/122.json'
import character211 from '@/assets/characters/211.json'
import character212 from '@/assets/characters/212.json'
import character221 from '@/assets/characters/221.json'
import character222 from '@/assets/characters/222.json'

// type에 따른 애니메이션 맵
const characterMap: Record<string, any> = {
  '111': character111,
  '112': character112,
  '121': character121,
  '122': character122,
  '211': character211,
  '212': character212,
  '221': character221,
  '222': character222,
}

const CharacterResult = () => {
  const router = useRouter()
  const nickname = useNicknameStore(state => state.nickname)
  const type = useCharacterStore(state => state.type)

  const handleAccept = () => {
    alert('마음에 든다고 했음!')
  }

  const handleRetry = () => {
    router.push('/signup/investment')
  }

  const animationData = characterMap[type] || character111 // fallback

  return (
    <div className="relative max-w-[700px] mx-auto mt-16 text-center">
      <h1 className="text-xl font-bold text-[#4D2700] whitespace-pre-line mb-6">
        {`당신의 투자 유형에 맞는 캐릭터가 생성되었어요!\n${nickname}님, 마음에 드시나요?`}
      </h1>

      <div className="w-[300px] h-[300px] mx-auto mb-8">
        <Lottie animationData={animationData} loop className="w-full h-full" />
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
