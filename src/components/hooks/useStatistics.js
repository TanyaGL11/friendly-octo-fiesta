import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getItem, setItem } from '../../utils/localStorage'

export const useStatistics = () => {
  const location = useLocation()

  useEffect(() => {
    const statistics = getItem('statistics') || {}
    const gameName = location.pathname.split('/')[2]
    if (!statistics[gameName]) {
      statistics[gameName] = 1
    } else {
      statistics[gameName] += 1
    }
    setItem('statistics', statistics)
  }, [location])
}
