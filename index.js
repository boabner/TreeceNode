const express = require('express')
const bodyParser = require('body-parser')
const userRoute = require('./routes/userRoute')
const cors = require('cors')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false}))
app.use(cors())

userRoute(app)

app.get('/', (req, res) => res.send('Olá mundo pelo Express'))

app.listen(port, () => console.log('Api rodando na porta 3000'))
