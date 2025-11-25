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

export default function Step3({ onNext, onPrev }: StepProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<SelectionValue | null>(null);

  const handlePrev = onPrev ?? (() => router.back());
  const handleNext = () => {
    if (selected) onNext(selected);
  };

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      <PurposeText
        leftText="나는 성격이 급한 편이다."
        rightText="나는 성격이 느긋하다."
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
