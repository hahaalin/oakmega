import { computed } from 'vue'
import { useStore } from 'vuex'

export const useStateHandle = () => {
  const store = useStore()
  const markerCluster = computed(() => store.state.markerCluster)
  const myMap = computed(() => store.state.myMap)
  const FB = computed(() => store.state.FB)
  const stateHandle = (type, payload) => {
    store.dispatch(type, payload)
  }
  return { markerCluster, myMap, FB, stateHandle }
}
