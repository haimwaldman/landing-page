import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const adapter = new JSONFile('db.json')

// שים לב לשינוי כאן — מוסיפים defaultData:
const defaultData = {
  contents: [],
  user: {
    email: 'admin@example.com',
    passwordHash: ''
  }
}

const db = new Low(adapter, defaultData)

await db.read()

export default db
