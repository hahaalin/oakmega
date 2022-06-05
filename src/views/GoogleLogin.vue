<template>
<div>
  <GoogleLogin :callback="callback"/>
</div>
</template>

<script>
import { computed } from 'vue'
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
      console.log('Handle the response', userData)
      if (googleUserName.value) {
        router.push('/')
      }
    }
    return { callback, googleUserName, googleUserImg }
  }
}
</script>
