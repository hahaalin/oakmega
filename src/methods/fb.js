import { useStateHandle } from '@/methods/useStateHandle.js'

export const initFacebook = () => {
  const { stateHandle } = useStateHandle()
  window.fbAsyncInit = function () {
    /* global FB */
    FB.init({
      appId: process.env.VUE_APP_FB_APP_ID,
      cookie: true,
      xfbml: true,
      version: 'v14.0'
    })
    stateHandle('setFB', FB)
    FB.AppEvents.logPageView()
  }
}

(function (d, s, id) {
  console.log('facebook-jssdk')
  var js
  var fjs = d.getElementsByTagName(s)[0]
  if (d.getElementById(id)) {
    return
  }
  js = d.createElement(s)
  js.id = id
  js.src = 'https://connect.facebook.net/zh_TW/sdk.js'
  fjs.parentNode.insertBefore(js, fjs)
})(document, 'script', 'facebook-jssdk')
