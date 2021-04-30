import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  // slices from starting index and take them
  return _(items).slice(startIndex).take(pageSize).value();
}
