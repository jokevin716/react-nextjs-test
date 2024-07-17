import mysql from 'mysql2/promise'

// create async function to query from db
export async function query({ query, values = [] }) {
  // open the db connection in mysql
  const dbconn = await mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  })

  try {
    // execute the query
    let [queryResults] = await dbconn.execute(query, values)

    // then close the db connection
    dbconn.end();
    
    // return query result
    return queryResults
  }
  catch(e) {
    // throw error if opening db has error
    console.log(e)
    throw Error(e.message)
  }
}