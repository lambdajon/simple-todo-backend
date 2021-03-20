import 'reflect-metadata'
// import app from ''
// import databaseConfig from './config/databaseConfig'
import app from './app'
import DB from './core/db';
if (!process.env) {
  throw new Error(`.env file required pleas create`)
}
const PORT = process.env.PORT || 3000

let existingDB: DB | null = null;
;(async function () {
  try {

    const db = new DB();
    db.connect();
    
    app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}.`)
    })
    
    // initSocket(server)
    console.log('Database connection initialized.')
  } catch (e) {
    throw new Error(`DB connection error: ${e}`)
  }
})()
