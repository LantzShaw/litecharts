export function unique(arr: (number | string)[]): (number | string)[] {
  return new Array(...new Set(arr))
}
