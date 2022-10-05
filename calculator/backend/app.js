const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')

const app = express()
const port = 8000
const jsonParser = bodyParser.json()

app.get('/result', (req, res) => {
  fs.readFile('data.json', (err,data) => {
    if(err){
      throw err
    }else{
      res.status(200).send(JSON.parse(data))
    }
  })
})

app.post('/result', jsonParser, (req, res) => {
  fs.writeFile('data.json', JSON.stringify({ result: req.body.result }), (err,data) => {
    if(err){
      throw err
    }else{
      res.status(200)
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})