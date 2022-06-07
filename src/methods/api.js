import axios from 'axios'

// 取得api data
export const getList = async (lng, lat) => {
  const { data } = await axios.post(
    'https://asia-east2-botfat.cloudfunctions.net/project_controller',
    {
      lng: lng,
      lat: lat,
      function: 'xinbei_distance'
    }
  )
  return data.result
}

export const getPolygonList = async () => {
  const { data } = await axios.post('https://asia-east2-botfat.cloudfunctions.net/project_controller', {
    directory: 'tucheng.json',
    function: 'xinbei_json'
  })

  return data.result.features
}
