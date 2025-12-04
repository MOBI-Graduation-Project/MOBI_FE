"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { SelectionValue } from "@/stores/usePurposeStore";

import { ButtonLayout } from "@/components/layout/ButtonLayout";

import { PurposeText } from "./PurposeText";

interface StepProps {
  onNext: (value: SelectionValue) => void;
}

export default function Step1({ onNext }: StepProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<SelectionValue | null>(null);

  const handlePrev = () => router.back();
  const handleNext = () => {
    if (selected) onNext(selected);
  };

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      <PurposeText
        className="block md:hidden"
        leftText="나는 지금 당장 눈앞에\n치킨 사먹을 돈이\n떨어져도 행복하다."
        rightText="나는 기다려서라도\n건물 정도는 사야지\n행복하다."
        selected={selected}
        onSelect={value => setSelected(value)}
      />

      <PurposeText
        className="hidden md:block"
        leftText="나는 지금 당장 눈앞에\n치킨 사먹을 돈이 떨어져도 행복하다."
        rightText="나는 기다려서라도\n건물 정도는 사야지 행복하다."
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
