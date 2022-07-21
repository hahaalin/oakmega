<template lang="">
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
    <button type="button" class="btn btn-primary" @click="emitSearch">查詢</button>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  setup (props, context) {
    const lng = ref('121.50463')
    const lat = ref('24.993955')
    const emitSearch = () => {
      context.emit('show-data', lng.value, lat.value)
    }
    return { lng, lat, emitSearch }
  }
}
</script>
<style lang="">

</style>
