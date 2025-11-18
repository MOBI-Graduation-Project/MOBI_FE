import { useKeyboardControls } from "@react-three/drei";

export type MoveKeys = {
  forward: boolean;
  back: boolean;
  left: boolean;
  right: boolean;
  jump: boolean;
};

export function usePlayerInput() {
  const [, get] = useKeyboardControls();
  return () => get() as MoveKeys; // 호출 시점 최신 상태 그대로
}