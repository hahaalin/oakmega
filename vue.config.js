// module.exports = {
//   devServer: {
//     disableHostCheck: true
//   },
//   publicPath: '/'
// }

const fs = require('fs')
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/oakmega/'
    : '/',
  devServer: {
    https: {
      key: fs.readFileSync(`${__dirname}/src/assets/localhost-key.pem`),
      cert: fs.readFileSync(`${__dirname}/src/assets/localhost.pem`)
    }
  }
}
