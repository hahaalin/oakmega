<template>
  <div class="userWrap">
    <p>使用者名稱:<span>{{googleUserName}}</span></p>
    <p>使用者相片:<img :src="googleUserImg"></p>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()
    const googleUserName = computed(() => store.state.googleUserName)
    const googleUserImg = computed(() => store.state.googleUserImg)

    return { googleUserName, googleUserImg }
  }
}
</script>
<style>
  .userWrap{
    position: absolute;
    right: 0;
    padding: 10px;
    border: 1px solid ;
    z-index: 100;
    background-color: #fff;
  }
</style>
