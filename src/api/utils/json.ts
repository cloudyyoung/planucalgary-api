export const isJsonEqual = (a: JSON, b: JSON): boolean => {
  return JSON.stringify(a) === JSON.stringify(b)
}
