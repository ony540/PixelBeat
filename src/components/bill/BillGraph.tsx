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

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  RadarController,
  Filler,
  Legend
)

// 해당 순서로 데이터 불러오기
const trackData = {
  acousticness: 0.00242,
  energy: 0.842,
  valence: 0.428,
  danceability: 0.585,
  tempo: 118.211
}

// tempo 값을 BPM 범위로 정규화
const normalizedTempo = (trackData.tempo - MIN_BPM) / (MAX_BPM - MIN_BPM)

export const data = {
  labels: Object.keys(trackData),
  datasets: [
    {
      data: Object.values(trackData).map((value, index) =>
        index === Object.keys(trackData).indexOf('tempo')
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

const options = {
  plugins: {
    legend: {
      display: false
    }
  },
  legend: {
    pointLabels: {
      fontColor: 'white'
    }
  },
  scales: {
    r: {
      grid: {
        color: '#000'
      },
      angleLines: {
        color: '#000'
      },
      ticks: {
        display: false,
        count: 4
      },
      pointLabels: {
        font: {
          size: 16,
          family:
            'NeoDunggeunmoPro-Regular, DungGeunMo, AppleSDGothicNeo, sans-serif'
        },
        color: '#000'
      }
    }
  },
  responsive: true,
  elements: {}
}

export const BillGraph = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      const ctx: CanvasRenderingContext2D = chartRef.current.getContext('2d')!

      new ChartJS(ctx, {
        type: 'radar',
        data: data,
        options: options
      })
    }
  }, [chartRef, data, options])

  return (
    <canvas
      id="myChart"
      ref={chartRef}></canvas>
  )
}
