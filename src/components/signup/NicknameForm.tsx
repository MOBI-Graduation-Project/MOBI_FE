'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaArrowRight } from 'react-icons/fa'
import { useNicknameStore } from '@/stores/nicknameStore'

const NicknameForm = () => {
  const router = useRouter()
  const [nickname, setNickname] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)

  const { setNickname: saveNickname } = useNicknameStore()

  const nicknameValid = /^[a-zA-Z0-9가-힣]{2,10}$/.test(nickname)
  const formReady = nicknameValid && agreed

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value

    // 특수문자 포함 여부 확인
    const hasInvalidChar = /[^a-zA-Z0-9가-힣]/.test(input)
    setIsInvalid(hasInvalidChar)

    // 10자까지만 입력 가능
    if (input.length <= 10) {
      setNickname(input)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formReady) return
    saveNickname(nickname)
    router.push('/signup/investment')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative max-w-[520px] mx-auto mt-20 p-10 bg-[#FFF8EE] rounded-[30px] shadow-xl border border-[#FFD288]"
    >
      {/* 제목 */}
      <h1 className="text-[40px] text-brown-primary font-normal mb-6 drop-shadow-[0_0_2px_white]">
        닉네임을 입력해주세요
      </h1>

      {/* 입력창 + 중복확인 버튼 */}
      <div className="flex items-center gap-2 mb-2">
        <input
          type="text"
          name="nickname"
          placeholder="한글/영어/숫자만 2~10자 입력해주세요"
          value={nickname}
          onChange={handleChange}
          className={`flex-1 h-[50px] px-4 text-sm border rounded-xl bg-[#FFF4D8] focus:outline-none transition ${
            isInvalid ? 'border-red-500 placeholder:text-red-500' : 'border-[#FFD288]'
          }`}
        />
        <button
          type="button"
          className="w-[90px] h-[50px] bg-[#FFD288] hover:bg-[#F2B300] text-[#4D2700] text-sm font-bold rounded-xl transition shadow-sm"
        >
          중복확인
        </button>
      </div>

      {/* 약관 동의 */}
      <label className="flex items-start gap-3 mt-4 text-sm text-[#4D2700]">
        <input
          type="checkbox"
          checked={agreed}
          onChange={e => setAgreed(e.target.checked)}
          className="appearance-none w-5 h-5 border-2 border-[#4D2700] rounded-full checked:bg-[#4D2700] mt-1"
        />
        <span>
          <strong>이용약관 동의</strong> (투자는 본인의 책임이므로, 투자로 인한 손실은 투자자 본인에게 책임이 있습니다)
        </span>
      </label>

      {/* 오른쪽 화살표 버튼 */}
      <button
        type="submit"
        disabled={!formReady}
        className={`absolute right-[-25px] bottom-[-25px] w-[60px] h-[60px] rounded-full bg-[#4D2700] text-white flex items-center justify-center text-lg shadow-md transition ${
          formReady ? 'hover:bg-[#2e1600]' : 'opacity-50 pointer-events-none'
        }`}
      >
        <FaArrowRight />
      </button>
    </form>
  )
}

export default NicknameForm
