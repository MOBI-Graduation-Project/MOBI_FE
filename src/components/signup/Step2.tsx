"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { SelectionValue } from "@/stores/usePurposeStore";

import { ButtonLayout } from "@/components/layout/ButtonLayout";

import { PurposeText } from "./PurposeText";

interface StepProps {
  onNext: (value: SelectionValue) => void;
  onPrev?: () => void;
}

export default function Step2({ onNext, onPrev }: StepProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<SelectionValue | null>(null);

  const handlePrev = onPrev ?? (() => router.back());
  const handleNext = () => {
    if (selected) onNext(selected);
  };

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      {/* 모바일 전용 (md 미만) */}
      <PurposeText
        className="block md:hidden"
        leftText={`나는 평소에 손해가\n나는 것은 내 두 눈이\n뜨고 있는 이상\n있을 수가 없다.`}
        rightText={`나는 평소에 손해를\n보더라도 미래를 위해 \n 투자를 하는 편이다.`}
        selected={selected}
        onSelect={value => setSelected(value)}
      />

      {/* 태블릿/PC 전용 (md 이상) */}
      <PurposeText
        className="hidden md:block"
        leftText={`나는 평소에 손해가 나는 것은\n내 두 눈이 뜨고 있는 이상\n있을 수가 없다.`}
        rightText={`나는 평소에 손해를 보더라도\n미래를 위해 투자를 하는 편이다.`}
        selected={selected}
        onSelect={value => setSelected(value)}
      />

      <ButtonLayout
        handlePrev={handlePrev}
        handleNext={handleNext}
        disabledNext={!selected}
      />
    </div>
  );
}
