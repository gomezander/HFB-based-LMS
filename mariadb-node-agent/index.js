const express = require('express')
const app = express()

const pool = require('./database')

app.get('/products', async (req, res) => {
    try {
        //Get Connection
        const conn = await pool.getConnection();

        //Create a new query
        const query = 'select * from products';

        //Executing the quey
        const rows = await conn.query(query);

        //Response to the client
        res.status(200).json(rows);
    } catch (error) {
        console.log(error);
    }
})

app.post('/new-product', async (req, res) => {
    console.log(req.body);

    //Get Connection
    const conn = await pool.getConnection();

    //Create a new query
    const query = 'INSERT INTO products(name) SET (?)';

    //Executing the query
    const result = await conn.query(query, [req.body.name]);

    //Response to the client
    res.status(200).json(result);

    //Query

})

app.listen(5000, () => {
    console.log('Server on port', 5000)
})