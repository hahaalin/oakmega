<template>
<div class="bg-light">

  <!-- Map -->
  <div id="mapid" class=""></div>

<div id="mapcontent" class="container-fluid overflow-auto">

  <div class="d-flex bg-white my-3 border" v-for="item in dataList" :key="item.id">
    <div class="col-6">
      <p class="p-3">{{item.stop_name}}</p>

    </div>
    <div class="col-6 text-end">
      <p class="p-3">{{item.distance}}<span>km</span></p>
    </div>
  </div>

</div>

</div>
</template>

<script>
// @ is an alias to /src
import L from 'leaflet'
import { onMounted, ref } from 'vue'
import 'leaflet/dist/leaflet.css'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import axios from 'axios'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import { MarkerClusterGroup } from 'leaflet.markercluster'

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
})
L.Marker.prototype.options.icon = DefaultIcon

export default {
  name: 'Home',
  components: {
  },
  setup () {
    let mymap
    const markerCluster = new MarkerClusterGroup()
    const dataList = ref('')
    const polygonList = ref('')

    // 取得api data
    const getList = async () => {
      const { data } = await axios.post(
        'https://asia-east2-botfat.cloudfunctions.net/project_controller',
        {
          lng: '121.50463',
          lat: '24.993955',
          function: 'xinbei_distance'
        }
      )
      return data?.result
    }

    const getPolygonList = async () => {
      const { data } = await axios.post('https://asia-east2-botfat.cloudfunctions.net/project_controller', {
        directory: 'tucheng.json',
        function: 'xinbei_json'
      })

      return data?.result?.features
    }

    const addCluster = (arr) => {
      arr.forEach(item => {
        markerCluster.addLayer(
          // 添加標記點
          L.marker([item.latitude, item.longitude], {
            title: item.stop_name
          })
            .bindPopup(item.stop_name)
        )
      })

      mymap.addLayer(markerCluster)
    }

    const addPolygon = (arr) => {
      const newpolygon = arr.map(item => item.geometry.coordinates[0]).map(item =>
        item.map(item => [item[1], item[0]])
      )

      console.log(newpolygon)
      //  var latlngs = [[
      //         [25.0270000, 121.555745],
      //         [25.0370000, 121.565745],
      //         [25.0270000, 121.575745],
      //         [25.0270000, 121.555745]
      //       ]]
      newpolygon.forEach(latlngs => {
        L.polygon(latlngs).addTo(mymap)
      })
    }

    const showData = async () => {
      dataList.value = await getList()
      addCluster(dataList.value)
      polygonList.value = await getPolygonList()
      addPolygon(polygonList.value)
    }

    onMounted(() => {
      mymap = L.map('mapid').setView([23.97565, 120.9738819], 8)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mymap)
      showData()
    })

    return { getList, getPolygonList, addCluster, addPolygon, showData, dataList, polygonList }
  }
}
</script>
<style >
  #mapid{
    width: 100%;
    height: 60vh;
  }
  #mapcontent{
    height:40vh;
  }
</style>
