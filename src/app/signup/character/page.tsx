import CharacterPage from "./CharacterPage";

interface SignupCharacterPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default function Page({ searchParams }: SignupCharacterPageProps) {
  const typeParam = Array.isArray(searchParams.type)
    ? searchParams.type[0]
    : searchParams.type;

  return <CharacterPage type={typeParam} />;
}
