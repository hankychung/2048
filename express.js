let express = require('express')
let app = new express()

app.use(express.static('./dist'))

module.exports = app.listen(2048, ()=> {
  console.log('listen 2048')
})