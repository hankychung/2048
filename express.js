let express = require('express')
let app = new express()

app.get('/', function(req, res) {
  res.json('hello')
})

module.exports = app.listen(2048, ()=> {
  console.log('listen 2048')
})