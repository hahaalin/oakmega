import { useStateHandle } from '@/methods/useStateHandle.js'
const { markerCluster, myMap } = useStateHandle()

export const flyToMaker = (lng, lat) => {
  const layers = markerCluster.getLayers()
  const point = layers.filter(
    (item) => item.getLatLng().lat === lat && item.getLatLng().lng === lng
  )[0]
  myMap.flyTo(point.getLatLng(), 18)
  myMap.on('zoomend', () => {
    point.openPopup()
  })
}
