<template>
  <div class="bg-light">
    <user-data />
    <!-- Map -->
    <Map />
    <div id="mapcontent" class="container-fluid overflow-auto">
      <h1>新北市都市更新地點查詢</h1>
      <SearchCoordinate @show-data="showData" />
      <UrbanRenewalList />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStateHandle } from '@/methods/useStateHandle'
import { addCluster } from '@/methods/addCluster'
import { addPolygon } from '@/methods/addPolygon'
import { getList, getPolygonList } from '@/methods/api'

import UrbanRenewalList from '../components/urbanRenewalList.vue'
import Map from '../components/map.vue'
import SearchCoordinate from '../components/searchCoordinate.vue'
import UserData from '../components/userData.vue'

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
    const dataList = ref('')
    const polygonList = ref('')
    const { markerCluster, myMap } = useStateHandle()
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
        myMap.value.setView([25.03306616058466, 121.54724121093751], 11)
        console.log('markerCluster' + markerCluster)
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
      myMap.flyTo(point.getLatLng(), 18)
      myMap.on('zoomend', () => {
        point.openPopup()
      })
    }

    return {
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
