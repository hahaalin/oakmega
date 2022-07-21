<template lang="">
  <div>
    <button type="button" @click="logout">登出</button>
  </div>
</template>
<script>
import { initFacebook } from '@/methods/fb'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    initFacebook()
    const store = useStore()
    const FB = computed(() => store.state.FB)
    const logout = () => {
      FB.value.getLoginStatus(function (response) {
        // 檢查登入狀態
        if (response.status === 'connected') {
          // 移除授權
          FB.value.api('/me/permissions', 'DELETE', function (res) {
            // 用戶登出
            FB.value.logout()
          })
        } else {
          // do something
          console.log('無法登出')
        }
      })
    }
    return { logout }
  }
}
</script>
<style lang="">

</style>
