export function hpaToMmhg(hpa: number): number {
  return hpa * 0.75006157584566
}

// thx deepCOOOOOOOOOOOOOOOOOOCK
export function azimuthToDirection(azimuth: number) {
  // Нормализация угла в диапазон [0, 360)
  const normalized = ((azimuth % 360) + 360) % 360

  // Массив направлений (16 румбов)
  const directions = [
    'север',
    'северо-северо-восток',
    'северо-восток',
    'востоко-северо-восток',
    'восток',
    'востоко-юго-восток',
    'юго-восток',
    'юго-юго-восток',
    'юг',
    'юго-юго-запад',
    'юго-запад',
    'западо-юго-запад',
    'запад',
    'западо-северо-запад',
    'северо-запад',
    'северо-северо-запад',
  ]

  // Определение индекса направления (сектор по 22.5 градуса)
  const index = Math.round(normalized / 22.5) % 16

  return directions[index]
}
