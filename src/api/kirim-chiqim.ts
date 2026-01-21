export type CashFlowPoint = {
  day: string // "Dushanba"
  kirim: number
  chiqim: number
}

const week = ["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba", "Yakshanba"]

function makePrettyMock(seed: number): CashFlowPoint[] {
  // seed asosida barqaror "random" (har refreshda o'zgarmas)
  let x = seed % 2147483647
  const rnd = () => (x = (x * 48271) % 2147483647) / 2147483647

  return week.slice(0, 6).map((d) => {
    const base = 1_200_000 + Math.floor(rnd() * 1_800_000) // 1.2m..3.0m
    const kirim = Math.round((base + rnd() * 900_000) / 10_000) * 10_000
    const chiqim = Math.round((base * (0.55 + rnd() * 0.35)) / 10_000) * 10_000
    return { day: d, kirim, chiqim }
  })
}

export async function fetchCashFlowChart(): Promise<CashFlowPoint[]> {
  try {
    // JSONPlaceholder dan seed olish uchun (fake data)
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=6", {
      headers: { Accept: "application/json" },
    })
    if (!res.ok) throw new Error(String(res.status))

    const posts: Array<{ id: number; userId: number }> = await res.json()
    const seed = posts.reduce((a, p) => a + p.id * p.userId, 0)

    return makePrettyMock(seed)
  } catch {
    // internet o'chsa ham UI ishlasin
    return makePrettyMock(777)
  }
}
