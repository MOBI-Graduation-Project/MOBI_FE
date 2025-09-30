import { Suspense } from "react";

import CharacterPage from "./CharacterPage";

const Character = () => {
  return (
    <Suspense fallback="로딩 중">
      <CharacterPage />
    </Suspense>
  );
};
export default Character;
