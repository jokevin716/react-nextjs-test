import { query } from "@/lib/db";

// create handler
export default async function handler(req, res) {
  // only process this if method is GET
  if(req.method === 'GET') {
    // define variables
    let { page = 1, limit = 9 } = req.query
    let offset = (page - 1) * limit

    try {
      // query to get all items
      let getAllItems = await query({
        query: 'SELECT * FROM items LIMIT ? OFFSET ?',
        values: [limit, offset]
      })

      // query to get total items
      let totalItems = await query({
        query: 'SELECT COUNT(*) as total FROM items',
        values: []
      })

      // display result
      res.status(200).json({
        items: getAllItems,
        total: totalItems[0].total
      })
    } catch(e) {
      // throw error if there's error in querying
      console.error('Error fetching items:', e);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  else {
    // display error other than GET method
    res.status(405).json({ message: 'Method not allowed' })
  }
}