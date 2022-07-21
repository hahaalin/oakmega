<template>
  <div class="bg-light">
    <user-data/>
    <!-- Map -->
    <Map />
    <div id="mapcontent" class="container-fluid overflow-auto">
      <h1>新北市都市更新地點查詢</h1>
      <SearchCoordinate @show-data="showData">
      <UrbanRenewalList />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import L from 'leaflet'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import 'leaflet/dist/leaflet.css'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import { getList, getPolygonList } from '@/methods/api'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import { MarkerClusterGroup } from 'leaflet.markercluster'
import UrbanRenewalList from '../components/urbanRenewalList.vue'
import Map from '../components/map.vue'
import SearchCoordinate from '../components/searchCoordinate.vue'
import UserData from '../components/userData.vue'
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
})
L.Marker.prototype.options.icon = DefaultIcon

export default {
  name: 'Home',
  components: {
    UrbanRenewalList,
    Map,
    SearchCoordinate,
    UserData
  },
  setup () {
    const router = useRouter()
    let mymap
    const markerCluster = new MarkerClusterGroup()
    const dataList = ref('')
    const polygonList = ref('')

    const addCluster = (arr) => {
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
      // console.log(markerCluster)
      mymap.addLayer(markerCluster)
    }

    const addPolygon = (arr) => {
      const newpolygon = arr
        .map((item) => item.geometry.coordinates[0])
        .map((item) => item.map((item) => [item[1], item[0]]))
      //  var latlngs = [[
      //         [25.0270000, 121.555745],
      //         [25.0370000, 121.565745],
      //         [25.0270000, 121.575745],
      //         [25.0270000, 121.555745]
      //       ]]
      newpolygon.forEach((latlngs) => {
        L.polygon(latlngs).addTo(mymap)
      })
    }

    const showData = async (lng, lat) => {
      const googleUserName = document.cookie.replace(
        /(?:(?:^|.*;\s*)googleUserName\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )

      if (!googleUserName) {
        alert('請先登入')
        router.push('/googleLogin')
      } else if (!lng || !lat) {
        alert('請輸入經緯度')
      } else {
        mymap.setView([25.03306616058466, 121.54724121093751], 11)
        markerCluster.clearLayers() // 清除圖層群組
        dataList.value = await getList(lng, lat)
        addCluster(dataList.value)
        polygonList.value = await getPolygonList()
        addPolygon(polygonList.value)
      }
    }
    const flyToList = (lng, lat) => {
      const layers = markerCluster.getLayers()
      const point = layers.filter(
        (item) => item.getLatLng().lat === lat && item.getLatLng().lng === lng
      )[0]
      // window.point = point
      mymap.flyTo(point.getLatLng(), 18)
      mymap.on('zoomend', () => {
        point.openPopup()
      })
    }

    onMounted(() => {
      mymap = L.map('mapid').setView(
        [25.03306616058466, 121.54724121093751],
        11
      )
      // window.mymap = mymap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mymap)
    })
    return {
      getList,
      getPolygonList,
      addCluster,
      addPolygon,
      showData,
      dataList,
      polygonList,
      flyToList
    }
  }
}
</script>
<style>
#mapid {
  width: 100%;
  height: 60vh;
  z-index: 1;
}
#mapcontent {
  height: 40vh;
}
</style>
