import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { getItem } from '../../utils/localStorage'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Статистика по посещению игр',
    },
  },
}

const games = getItem('statistics') || {}
const labels = Object.keys(games)

export const data = {
  labels,
  datasets: [
    {
      label: 'Games',
      data: labels.map((label) => games[label]),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
}

export function Statistics() {
  return <Bar options={options} data={data} />
}
