const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const database = require('./config/database')
const app = express()

dotenv.config({ path: './config/config.env' })

database()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => res.send('API running...'))

app.use('/api/users', require('./routes/users'))
app.use('/api/candidates', require('./routes/candidates'))
app.use('/api/votes', require('./routes/votes'))

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () =>
  console.log(`Server terhubung di port ${PORT}`)
)

process.on('unhandledRejection', (err) => {
  console.log(`Tidak dapat terhubung! Pesan error: ${err.message}`)
  server.close(() => process.exit(1))
})
