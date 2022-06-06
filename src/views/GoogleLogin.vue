<template>
  <div>
    <GoogleLogin :callback="callback" prompt/>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { decodeCredential } from 'vue3-google-login'
import { useRouter } from 'vue-router'
export default {
  setup () {
    const router = useRouter()
    const store = useStore()
    const googleUserName = computed(() => store.state.googleUserName)
    const googleUserImg = computed(() => store.state.googleUserImg)
    const callback = (response) => {
      // This callback will be triggered when the user selects or login to
      // his Google account from the popup
      const userData = decodeCredential(response.credential)

      store.dispatch('updateGoogleUserName', userData.name)
      store.dispatch('updateGoogleUserImg', userData.picture)
      document.cookie = `googleUserName=${userData.name}`
      document.cookie = `googleUserImg=${userData.picture}`
      console.log('Handle the response', userData)
      isLogin()
    }

    const isLogin = () => {
      const googleUserName = document.cookie.replace(/(?:(?:^|.*;\s*)googleUserName\s*=\s*([^;]*).*$)|^.*$/, '$1')
      if (googleUserName) {
        router.push('/fbLogin')
      }
    }

    onMounted(() => {
      isLogin()
    })

    return { callback, googleUserName, googleUserImg, isLogin }
  }
}
</script>
