import L from 'leaflet'
import { useStateHandle } from '@/methods/useStateHandle.js'
import { MarkerClusterGroup } from 'leaflet.markercluster'

export const addCluster = (arr) => {
  const { markerCluster, myMap, stateHandle } = useStateHandle()
  const MarkerCluster = new MarkerClusterGroup()
  stateHandle('setMarkerCluster', MarkerCluster)

  arr.forEach((item) => {
    markerCluster.addLayer(
      L.marker([item.latitude, item.longitude], {
        title: item.stop_name
      }).bindPopup(
        `
          <p>站點: ${item.stop_name}</p>
          <p>經度: ${item.longitude}</p>
          <p>緯度: ${item.latitude}</p>`,
        {
          closeButton: false
        }
      )
    )
  })
  myMap.addLayer(markerCluster)
}
