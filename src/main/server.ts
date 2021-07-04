require('dotenv/config')

import MongoHelper from '../infra/db/mongodb/helpers/MongoHelper'
import app from './config/app'

MongoHelper.connect(`${process.env.MONGODB_URL}`).then(async () => {
  await import('./config/app')
  app.listen(process.env.SERVER_PORT, () =>
    console.log(`Server running at http://localhost:${process.env.SERVER_PORT}`)
  )
})
