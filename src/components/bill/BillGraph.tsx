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
import { useEffect, useRef, useState } from 'react'
import { BillChartOption } from '.'
import { TrackAnalysis } from '@/types'
import { Spinner } from '@/assets'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  RadarController,
  Filler,
  Legend
)

export const initialAnalysisObject: TrackAnalysis = {
  acousticness: 0,
  energy: 0,
  valence: 0,
  danceability: 0,
  tempo: 0
}

export const BillGraph = ({ analysisList, color, isSmall = false }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const [windowWidthSize, setWindowWidthSize] = useState(window.innerWidth)

  if (!analysisList) {
    return <Spinner />
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidthSize(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (!chartRef.current || !analysisList) return

    /** tempo 값을 BPM 범위로 정규화 */
    const normalizedTempo = (analysisList.tempo - MIN_BPM) / (MAX_BPM - MIN_BPM)

    const sortedKeys = [
      'danceability',
      'energy',
      'brightness',
      'acousticness',
      'tempo'
    ]

    const data = {
      labels: sortedKeys,
      datasets: [
        {
          data: sortedKeys.map(key =>
            key === 'tempo'
              ? normalizedTempo
              : key === 'brightness'
                ? analysisList['valence']
                : analysisList[key]
          ),
          backgroundColor: `${color}d9`,
          borderColor: color,
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
      options: BillChartOption(isSmall)
    })

    return () => {
      chartInstance.destroy()
    }
  }, [analysisList, windowWidthSize])

  return (
    <canvas
      id="myChart"
      ref={chartRef}></canvas>
  )
}
