export const msToMinutesAndSeconds = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)

  const seconds = totalSeconds % 60

  // 두 자리 수로 포맷팅
  const formattedMinutes = String(minutes).padStart(2, '0')
  const formattedSeconds = String(seconds).padStart(2, '0')

  // 결과 반환
  return `${formattedMinutes}:${formattedSeconds}`
}
