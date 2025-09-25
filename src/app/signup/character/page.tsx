import CharacterPage from "@/app/signup/character/CharaterPage";

export default function Page({
  searchParams,
}: {
  searchParams: { type?: string };
}) {
  return <CharacterPage type={searchParams.type} />;
}
