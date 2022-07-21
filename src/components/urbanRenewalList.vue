<template lang="">
  <div
    id="resultListWrap"
    class="d-flex bg-white my-3 border"
    v-for="item in dataList"
    :key="item.id"
    @click="flyToList(item.longitude, item.latitude)"
  >
    <div class="col-6">
      <p class="p-3">
        {{ item.stop_name }} {{ item.longitude }},{{ item.latitude }}
      </p>
    </div>
    <div class="col-6 text-end">
      <p class="p-3">{{ item.distance }}<span>km</span></p>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style>
#resultListWrap:hover {
  background-color: #ccc !important;
}
</style>
