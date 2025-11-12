"use client";

import { useRouter } from "next/navigation";

import { useSignUpStore } from "@/stores/signupStore";
import { SelectionValue, usePurposeStore } from "@/stores/usePurposeStore";
import { useFunnel } from "@use-funnel/browser";

import Step1 from "@/components/signup/Step1";
import Step2 from "@/components/signup/Step2";
import Step3 from "@/components/signup/Step3";

type FunnelContext = {
  step1: object;
  step2: { step1: SelectionValue };
  step3: { step1: SelectionValue; step2: SelectionValue };
};

export default function PurposePage() {
  const router = useRouter();

  const funnel = useFunnel<FunnelContext>({
    id: "purpose-flow",
    initial: { step: "step1", context: {} },
  });

  return (
    <funnel.Render
      step1={({ history }) => (
        <Step1
          onNext={value => {
            usePurposeStore.getState().setSelection("step1", value);
            history.push("step2", prev => ({ ...prev, step1: value }));
          }}
        />
      )}
      step2={({ context, history }) => (
        <Step2
          onNext={value => {
            usePurposeStore.getState().setSelection("step2", value);
            history.push("step3", prev => ({
              ...prev,
              step1: context.step1!,
              step2: value,
            }));
          }}
          onPrev={() => history.back()}
        />
      )}
      step3={({ context, history }) => (
        <Step3
          onNext={value => {
            usePurposeStore.getState().setSelection("step3", value);
            const investmentAnswers = `${context.step1}${context.step2}${value}`;
            useSignUpStore.getState().setSignUpData({
              investmentAnswers,
            });
            router.push(`/signup/character?type=${investmentAnswers}`);
          }}
          onPrev={() => history.back()}
        />
      )}
    />
  );
}
