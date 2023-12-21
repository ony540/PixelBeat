import { useEffect, useRef, useState } from 'react'

export const MatrixBackground = () => {
  const matrixRef = useRef<HTMLCanvasElement | null>(null)
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })
  const digit =
    'PIXEL BEAT is a service that provides users with recommended music receipts based on their responses 012345789ZƐ:・."=*+-<>¦｜╌'
  const font_size = 15
  const columns = Math.floor(windowSize.width / font_size)
  const columnCount = new Array(columns).fill(1)

  const draw = ctx => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    ctx.fillRect(0, 0, matrixRef.current!.width, matrixRef.current!.height)
    ctx.fillStyle = '#74E874'
    ctx.font =
      font_size +
      'px NeoDunggeunmoPro-Regular, DungGeunMo, AppleSDGothicNeo, sans-serif'

    for (let x = 0; x < columnCount.length; x++) {
      const randomChar = digit[Math.floor(Math.random() * digit.length)]
      const y = columnCount[x] * font_size
      ctx.fillText(randomChar, x * font_size, y)

      if (
        columnCount[x] * font_size > matrixRef.current!.height &&
        Math.random() > 0.975
      ) {
        columnCount[x] = 0
      } else {
        columnCount[x]++
      }
    }
  }

  useEffect(() => {
    if (!matrixRef.current) return
    const ctx: CanvasRenderingContext2D = matrixRef.current.getContext('2d')!
    const timer = setInterval(() => draw(ctx), 100)
    return () => {
      clearInterval(timer)
    }
  }, [])

  //화면 리사이즈 대응
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      id="matrix"
      ref={matrixRef}
      width={windowSize.width}
      height={windowSize.height}
      className="absolute top-0 z-[0]"></canvas>
  )
}
