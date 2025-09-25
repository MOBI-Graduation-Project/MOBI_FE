import CharacterPage from "./CharacterPage";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const typeParam = Array.isArray(searchParams.type)
    ? searchParams.type[0]
    : searchParams.type;

  return <CharacterPage type={typeParam} />;
}
