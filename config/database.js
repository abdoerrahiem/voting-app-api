const mongoose = require('mongoose')

const database = async () => {
  const connect = await mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })

  console.log(`MongoDB Terhubung: ${connect.connection.host}`)
}

module.exports = database
