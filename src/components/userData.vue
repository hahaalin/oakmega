<template>
  <div class="userWrap" v-if="googleUserName">
    <p>google暱稱:<span>{{googleUserName}}</span></p>
    <p>google相片:<img :src="googleUserImg" alt="googleUserImg"></p>
    <p>fb暱稱:<span>{{fbUserName}}</span></p>
    <p>fb相片:<img :src="fbUserImg" alt="fbUserImg"></p>
    <!-- <fbLoginout/> -->
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  components: {
  },
  setup () {
    const googleUserName = ref('')
    const googleUserImg = ref('')
    googleUserName.value = document.cookie.replace(/(?:(?:^|.*;\s*)googleUserName\s*=\s*([^;]*).*$)|^.*$/, '$1')
    googleUserImg.value = document.cookie.replace(/(?:(?:^|.*;\s*)googleUserImg\s*=\s*([^;]*).*$)|^.*$/, '$1')
    const fbUserName = ref(document.cookie.replace(/(?:(?:^|.*;\s*)fbUserName\s*=\s*([^;]*).*$)|^.*$/, '$1'))
    const fbUserImg = ref(document.cookie.replace(/(?:(?:^|.*;\s*)fbUserImg\s*=\s*([^;]*).*$)|^.*$/, '$1'))

    return { googleUserName, googleUserImg, fbUserName, fbUserImg }
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
