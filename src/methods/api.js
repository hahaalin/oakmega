import axios from 'axios'

// 取得api data
export const getList = async (lng, lat) => {
  const { data } = await axios.post(
    process.env.VUE_APP_API,
    {
      lng: lng,
      lat: lat,
      function: 'xinbei_distance'
    }
  )
  return data.result
}

export const getPolygonList = async () => {
  const { data } = await axios.post(process.env.VUE_APP_API, {
    directory: 'tucheng.json',
    function: 'xinbei_json'
  })

  return data.result.features
}
