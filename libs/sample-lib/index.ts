function countAndAverage(
  a: number,
  b: number,
  c: number,
): { count: number; average: number } {
  const count = 3
  const average = (a + b + c) / count
  return { count, average }
}
export default countAndAverage
