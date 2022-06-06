<template>
  <div>
    <p>請登入Facebook</p>
    <fb:login-button
      scope="public_profile,email,user_photos"
      onlogin="checkLoginState"
    >
    </fb:login-button>
    <p>{{ status }}</p>

        <!-- <div
      class="fb-login-button"
      data-width=""
      data-size="large"
      data-button-type="login_with"
      data-layout="default"
      data-auto-logout-link="false"
      data-use-continue-as="false"
      onlogin="checkLoginState"
    ></div> -->
  </div>
</template>
<script>
import { initFacebook } from '@/methods/fb'
import { onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  setup () {
    const router = useRouter()
    const store = useStore()
    const FB = computed(() => store.state.FB)
    const status = ref('')
    initFacebook()

    const checkLoginState = () => {
      FB.value.getLoginStatus(function (response) {
        statusChangeCallback(response)
      })
    }

    const statusChangeCallback = (response) => {
      console.log(response)
      const { authResponse, status } = response
      if (status === 'connected') {
        // Logged into your app and Facebook.
        getProfile({ authResponse })
      } else {
        // The person is logged into Facebook, but not your app.
        status.value = 'Please log ' + 'into this app again'
      }
    }

    const getProfile = async ({ authResponse }) => {
      const { name } = await getFBData('/me')
      document.cookie = `fbUserName=${name}`

      const { picture } = await getFBData(
          `https://graph.facebook.com/${authResponse?.userID}?fields=picture&type=square`
      )
      document.cookie = `fbUserImg=${picture?.data?.url}`

      isLogin()
    }

    const getFBData = (url) => {
      return new Promise((resolve, reject) => {
        FB.value.api(url, function (response) {
          console.log('response ', response)
          resolve(response)
        })
      })
    }

    const isLogin = () => {
      const fbUserName = document.cookie.replace(/(?:(?:^|.*;\s*)fbUserName\s*=\s*([^;]*).*$)|^.*$/, '$1')
      const googleUserName = document.cookie.replace(/(?:(?:^|.*;\s*)googleUserName\s*=\s*([^;]*).*$)|^.*$/, '$1')
      if (!googleUserName) {
        router.push('/googleLogin')
      } else if (fbUserName) {
        router.push('/')
      }
    }

    onMounted(() => {
      window.checkLoginState = checkLoginState
      isLogin()
    })

    return { checkLoginState, statusChangeCallback, getProfile, status, isLogin }
  }

}
</script>
<style lang="">

</style>
