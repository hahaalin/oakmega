import { useStore } from 'vuex'

export const initFacebook = () => {
  const store = useStore()
  console.log('initFacebook')
  window.fbAsyncInit = function () {
    console.log('global FB')
    /* global FB */
    FB.init({
      appId: process.env.VUE_APP_FB_APP_ID,
      cookie: true,
      xfbml: true,
      version: 'v14.0'
    })
    store.commit('setFB', FB)
    FB.AppEvents.logPageView()
  }
}
