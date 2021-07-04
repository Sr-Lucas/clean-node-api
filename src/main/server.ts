require('dotenv/config')

import MongoHelper from '../infra/db/mongodb/helpers/MongoHelper'
import app from './config/app'

MongoHelper.connect(`${process.env.MONGODB_URL}`)

app.listen(5050, () => console.log('Server running at http://localhost:5050'))
