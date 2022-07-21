
import L from 'leaflet'
import { useStateHandle } from '@/methods/useStateHandle.js'

export const addPolygon = (arr) => {
  const { myMap } = useStateHandle()

  const newpolygon = arr
    .map((item) => item.geometry.coordinates[0])
    .map((item) => item.map((item) => [item[1], item[0]]))
  newpolygon.forEach((latlngs) => {
    L.polygon(latlngs).addTo(myMap)
  })
}
