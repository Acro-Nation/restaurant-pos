import countAndAverage from '@restaurant-pos/sample-lib'

export default function Home() {
  return (
    <>
      <h1>Hello World {countAndAverage(1, 2, 3).average}</h1>
    </>
  )
}
