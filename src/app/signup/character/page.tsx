'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Image from 'next/image';
import Lottie from 'react-lottie-player';
import LeftArrow from "@/assets/leftArrow.svg";


interface CharacterInfo {
  name: string;
  jsonPath: string;
}

const characterMap: Record<string, CharacterInfo> = {
  '111': { name: '111', jsonPath: '/animations/111.json' },
  '112': { name: '112', jsonPath: '/animations/112.json' },
  '121': { name: '121', jsonPath: '/animations/121.json' },
  '122': { name: '122', jsonPath: '/animations/122.json' },
  '211': { name: '211', jsonPath: '/animations/211.json' },
  '212': { name: '212', jsonPath: '/animations/212.json' },
  '221': { name: '221', jsonPath: '/animations/221.json' },
  '222': { name: '222', jsonPath: '/animations/222.json' },
};

const CharacterPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [characterType, setCharacterType] = useState<string>('');
  const [animationData, setAnimationData] = useState<any>(null);
  const [showNameInput, setShowNameInput] = useState(false);
  const [characterName, setCharacterName] = useState('');

  useEffect(() => {
    const type = searchParams.get('type');
    if (type && characterMap[type]) {
      setCharacterType(type);
      // Lottie JSON 파일 로드
      fetch(characterMap[type].jsonPath)
        .then(response => response.json())
        .then(data => setAnimationData(data))
        .catch(error => console.error('Failed to load animation:', error));
    }
  }, [searchParams]);

  const handlePrev = () => {
    router.push('/signup/purpose');
  };

  const handleNameSubmit = () => {
    if (characterName.trim()) {
      // 캐릭터 정보 저장 (Zustand store에 저장하는 로직 추가 필요)
      console.log('Character saved:', { type: characterType, name: characterName });
      // 다음 페이지로 이동
      router.push('/signup/complete');
    }
  };

  const currentCharacter = characterType ? characterMap[characterType] : null;

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      {/* 배경 이미지 */}
      <Image
        src="/svgs/backgroundImage.svg"
        alt="forest background"
        fill
        className="object-cover"
        priority
      />

      
      {/* 메인 콘텐츠 */}
      <div className="relative z-10 flex flex-col items-center">
        {/* 캐릭터 소개 텍스트 */}
        <h2 className="mb-[4rem] text-center font-[geekble] text-heading2 text-brown">
          당신의 투자 유형에 맞는 캐릭터가 생성되었어요!
          <br />
         nickname님, 마음에 드시나요?
        </h2>

        {/* 캐릭터 애니메이션 */}
        <div className="h-[40rem] w-[40rem] rounded-[2rem] bg-white/80 p-[2rem] shadow-lg">
          {animationData ? (
            <Lottie
              loop
              animationData={animationData}
              play
              style={{ width: '100%', height: '100%' }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <p className="text-gray-60">캐릭터 로딩 중...</p>
            </div>
          )}
        </div>

        {/* 캐릭터 이름 입력 또는 버튼 */}
        {!showNameInput ? (
          <div className="mt-[4rem] flex gap-[2rem]">
            <button
              onClick={() => setShowNameInput(true)}
              className="inline-flex h-[6rem] items-center justify-center rounded-[2rem] bg-yellow px-[4rem] font-[geekble] text-lab1 text-brown shadow-lg transition-all hover:opacity-80"
              style={{
                boxShadow: '0px 0px 4px 0px #462611, 0px 2px 0px 0px #FFF inset, 0px 27px 4.6px 0px rgba(230, 229, 225, 0.46) inset, 0px -4px 2.7px 0px rgba(206, 123, 0, 0.34) inset, 0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                WebkitTextStroke: '2px #FFF',
                paintOrder: 'stroke fill',
              }}
            >
              네, 마음에 들어요
            </button>
            <button
              onClick={handlePrev}
              className="inline-flex h-[6rem] items-center justify-center rounded-[2rem] bg-gray-40 px-[4rem] font-[geekble] text-lab1 text-white shadow-lg transition-all hover:opacity-80"
            >
              저와 잘맞는 캐릭터인거 같아요
            </button>
          </div>
        ) : (
          <div className="mt-[4rem] flex flex-col items-center gap-[2rem]">
            
            
            
          </div>
        )}
      </div>


      {/* 이전 버튼 */}
      <button
        onClick={handlePrev}
        className="absolute left-[3rem] top-1/2 flex h-[11.4rem] w-[11.4rem] -translate-y-1/2 transform items-center justify-center rounded-full transition-all cursor-pointer"
      >
       <LeftArrow className="h-full w-full" />
      </button>
    </div>
  );
};

export default CharacterPage;