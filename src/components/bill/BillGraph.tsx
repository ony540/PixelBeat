import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Legend,
  RadarController
} from 'chart.js'
import { MAX_BPM, MIN_BPM } from '@/constants'
import { useEffect, useRef } from 'react'
import { BillChartOption } from '.'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  RadarController,
  Filler,
  Legend
)

export const BillGraph = ({ averageAnalysis }: { averageAnalysis?: any }) => {
  if (!averageAnalysis) {
    return <p>Loading...</p>
  }

  const chartRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!chartRef.current || !averageAnalysis) return

    /** tempo 값을 BPM 범위로 정규화 */
    const normalizedTempo =
      (averageAnalysis.tempo - MIN_BPM) / (MAX_BPM - MIN_BPM)

    const data = {
      labels: Object.keys(averageAnalysis),
      datasets: [
        {
          data: Object.values(averageAnalysis).map((value, index) =>
            index === Object.keys(averageAnalysis).indexOf('tempo')
              ? normalizedTempo
              : value
          ),
          backgroundColor: 'rgba(87, 255, 87, 0.85)',
          borderColor: '#57FF57',
          borderWidth: 1,
          strokeColor: '#000',
          pointRadius: 0
        }
      ]
    }

    const ctx: CanvasRenderingContext2D = chartRef.current.getContext('2d')!
    const chartInstance = new ChartJS(ctx, {
      type: 'radar',
      data: data,
      options: BillChartOption
    })

    return () => {
      chartInstance.destroy()
    }
  }, [averageAnalysis])

  return (
    <canvas
      id="myChart"
      ref={chartRef}></canvas>
  )
}
