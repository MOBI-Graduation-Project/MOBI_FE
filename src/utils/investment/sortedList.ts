export type SortOrder = "asc" | "desc";

export function sortListByField<T>(
  list: T[],
  field: keyof T,
  order: SortOrder = "desc",
): T[] {
  const sorted = [...list].sort((a, b) => {
    const valueA = (a[field] ?? 0) as string | number;
    const valueB = (b[field] ?? 0) as string | number;

    if (typeof valueA === "string" && typeof valueB === "string") {
      return order === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    return order === "asc"
      ? (valueA as number) - (valueB as number)
      : (valueB as number) - (valueA as number);
  });

  return sorted;
}
