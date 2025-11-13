export const AVATAR_TO_MODEL: Record<string, string> = {
  AVATAR_TYPE_1: "111",
  AVATAR_TYPE_2: "112",
  AVATAR_TYPE_3: "121",
  AVATAR_TYPE_4: "122",
  AVATAR_TYPE_5: "211",
  AVATAR_TYPE_6: "212",
  AVATAR_TYPE_7: "221",
  AVATAR_TYPE_8: "222",
};

export const toModelFile = (code?: string) =>
  `/models/${(code && AVATAR_TO_MODEL[code]) || "111"}.glb`;