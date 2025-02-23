export const SortAlphabetically = (data, key) => {
  return [...data].sort((a, b) => {
    const nameA = typeof a[key] === "string" ? a[key].toLowerCase() : "";
    const nameB = typeof b[key] === "string" ? b[key].toLowerCase() : "";
    return nameA.localeCompare(nameB);
  });
};
