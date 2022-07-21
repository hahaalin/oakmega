import L from 'leaflet'
import { useStateHandle } from '@/methods/useStateHandle.js'

export const mapInit = (id) => {
  const { stateHandle } = useStateHandle()

  const myMap = L.map(id).setView(
    [25.03306616058466, 121.54724121093751],
    11
  )
  stateHandle('handleMymap', myMap)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap)
}
