<template lang="">
  <div id="mapid"></div>
</template>
<script>
import L from 'leaflet'
import { onMounted } from 'vue'
import 'leaflet/dist/leaflet.css'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import { mapInit } from '@/methods/mapInit'

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
})
L.Marker.prototype.options.icon = DefaultIcon
export default {
  setup () {
    onMounted(() => {
      mapInit('mapid')
    })
  }
}
</script>
<style lang=""></style>
