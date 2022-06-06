<template>
<div class="bg-light">
<userData />
  <!-- Map -->
  <div id="mapid" class=""></div>

  <div id="mapcontent" class="container-fluid overflow-auto">
  <h1>新北市都市更新地點查詢</h1>

  <div class="row g-3 align-items-center p-2">
    <div class="col-auto">
      <label for="inputPassword6" class="col-form-label">經緯度查詢</label>
    </div>
    <div class="col-auto">
      <input type="text" class="form-control" v-model="lng" placeholder="經度 EX:121.50463">
    </div>
    <div class="col-auto">
      <input type="text"  class="form-control" v-model="lat" placeholder="緯度 EX:24.993955" >
    </div>
    <div class="col-auto">
    <button type="button" class="btn btn-primary" @click="showData">查詢</button>
    </div>
  </div>

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
import { onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'
// import { useRouter } from 'vue-router'
import 'leaflet/dist/leaflet.css'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import axios from 'axios'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import { MarkerClusterGroup } from 'leaflet.markercluster'
import userData from '@/components/userData.vue'
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
})
L.Marker.prototype.options.icon = DefaultIcon

export default {
  name: 'Home',
  components: {
    userData
  },
  setup () {
    const store = useStore()
    // const router = useRouter()
    let mymap
    const markerCluster = new MarkerClusterGroup()
    const lng = ref('121.50463')
    const lat = ref('24.993955')
    const dataList = ref('')
    const polygonList = ref('')
    const googleUserName = computed(() => store.state.googleUserName)

    // 取得api data
    const getList = async (lng, lat) => {
      const { data } = await axios.post(
        'https://asia-east2-botfat.cloudfunctions.net/project_controller',
        {
          lng: lng,
          lat: lat,
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
      if (!lng.value || !lat.value) {
        alert('請輸入經緯度')
      } else {
        markerCluster.clearLayers()// 清除圖層群組
        dataList.value = await getList(lng.value, lat.value)
        console.log(dataList.value)
        addCluster(dataList.value)
        polygonList.value = await getPolygonList()
        addPolygon(polygonList.value)
      }
    }

    onMounted(() => {
      // if (!googleUserName.value) {
      //   router.push('/googleLogin')
      // }
      mymap = L.map('mapid').setView([25.03306616058466, 121.54724121093751], 11)
      // window.mymap = mymap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mymap)
    })

    return { getList, getPolygonList, addCluster, addPolygon, showData, dataList, polygonList, googleUserName, lng, lat }
  }
}
</script>
<style >
  #mapid{
    width: 100%;
    height: 60vh;
    z-index: 1;
  }
  #mapcontent{
    height:40vh;
  }

</style>
