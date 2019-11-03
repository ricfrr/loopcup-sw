'use strict';

const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    user : 'postgres',
    database: 'loopcup',
    password :'vivere',
    connectionString: process.env.DATABASE_URL
});




async function query(text, params){

    var res = await pool.query(text,params);
    return res.rows;
}

module.exports = {
    query
};
  
