export type DeliveryRow = {
  id: number
  tovarId: string
  dastavshik: string
  qabulQiluvchi: string
  tovarNomi: string
  miqdori: number
  narhi: number
  sana: string
  status: "yolda" | "qabul_qilingan" | "kutilmoqda" | "bekor_qilingan" | "qaytarilgan"
}

export const deliveryData: DeliveryRow[] = [
  { id: 1, tovarId: "20202020", dastavshik: "Jasmina", qabulQiluvchi: "Omina", tovarNomi: "Tarelka (25sm) — oq", miqdori: 1500, narhi: 1000000, sana: "20.09.25", status: "yolda" },
  { id: 2, tovarId: "33001122", dastavshik: "Sardor", qabulQiluvchi: "Dilshod", tovarNomi: "Stakan 200ml — shaffof", miqdori: 2400, narhi: 780000, sana: "19.09.25", status: "qabul_qilingan" },
  { id: 3, tovarId: "88440011", dastavshik: "Madina", qabulQiluvchi: "Zuhra", tovarNomi: "Vilka — plastik (qora)", miqdori: 800, narhi: 420000, sana: "19.09.25", status: "kutilmoqda" },
  { id: 4, tovarId: "11002233", dastavshik: "Akmal", qabulQiluvchi: "Umida", tovarNomi: "Qoshiq — yog‘och (eko)", miqdori: 1200, narhi: 690000, sana: "18.09.25", status: "qabul_qilingan" },
  { id: 5, tovarId: "55667788", dastavshik: "Nodira", qabulQiluvchi: "Sanjar", tovarNomi: "Konteyner 750ml — qopqoqli", miqdori: 500, narhi: 950000, sana: "18.09.25", status: "yolda" },
  { id: 6, tovarId: "90901234", dastavshik: "Jasmina", qabulQiluvchi: "Aziz", tovarNomi: "Paket — kichik (logoli)", miqdori: 3000, narhi: 360000, sana: "17.09.25", status: "bekor_qilingan" },
  { id: 7, tovarId: "77770001", dastavshik: "Sardor", qabulQiluvchi: "Omina", tovarNomi: "Salat idish — 500ml", miqdori: 1100, narhi: 880000, sana: "17.09.25", status: "qaytarilgan" },
  { id: 8, tovarId: "12344321", dastavshik: "Madina", qabulQiluvchi: "Dilshod", tovarNomi: "Lanch boks — 3 bo‘limli", miqdori: 650, narhi: 1120000, sana: "16.09.25", status: "qabul_qilingan" },
  { id: 9, tovarId: "44445555", dastavshik: "Akmal", qabulQiluvchi: "Umida", tovarNomi: "Folga — 30sm (rulon)", miqdori: 90, narhi: 540000, sana: "16.09.25", status: "kutilmoqda" },
  { id: 10, tovarId: "60070080", dastavshik: "Nodira", qabulQiluvchi: "Zuhra", tovarNomi: "Pitsa qutisi — 33sm", miqdori: 400, narhi: 760000, sana: "15.09.25", status: "yolda" },
  { id: 11, tovarId: "98001122", dastavshik: "Sardor", qabulQiluvchi: "Sanjar", tovarNomi: "Napkin — oq (1000 dona)", miqdori: 140, narhi: 310000, sana: "15.09.25", status: "qabul_qilingan" },
  { id: 12, tovarId: "12121212", dastavshik: "Madina", qabulQiluvchi: "Aziz", tovarNomi: "Ichimlik qopqog‘i — 90mm", miqdori: 2000, narhi: 470000, sana: "14.09.25", status: "kutilmoqda" },
]