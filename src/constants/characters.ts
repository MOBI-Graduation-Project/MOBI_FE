export interface CharacterInfo {
  name: string;
  modelPath: string;
}

export const CHARACTER_MAP: Record<string, CharacterInfo> = {
  "111": { name: "111", modelPath: "/models/111.glb" },
  "112": { name: "112", modelPath: "/models/112.glb" },
  "121": { name: "121", modelPath: "/models/121.glb" },
  "122": { name: "122", modelPath: "/models/122.glb" },
  "211": { name: "211", modelPath: "/models/211.glb" },
  "212": { name: "212", modelPath: "/models/212.glb" },
  "221": { name: "221", modelPath: "/models/221.glb" },
  "222": { name: "222", modelPath: "/models/222.glb" },
};
