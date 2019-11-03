'use strict';

const { Pool } = require('pg');
const dotenv = require('dotenv');

const fs = require("fs");

dotenv.config();

const pool = new Pool({
  user : 'postgres',
  database: 'loopcup',
  password :'vivere',
  connectionString: process.env.DATABASE_URL
});



pool.on('connect', () => {
  console.log('connected to the db');
});


/**
 * Create Tables
 */

const createTables = () => {


  var content = fs.readFileSync('table_creation.sql', 'utf8');
  //console.log(content.toString());
  const queryText =content.toString();
      
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}


/**
 * Fill Tables
 */

const fillTables = () => {


    var content = fs.readFileSync('fill_table.sql', 'utf8');
    const queryText =content.toString();
        
    pool.query(queryText)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
  }


/**
 * Drop Tables
 */
const dropTables = () => {
  var content = fs.readFileSync('drop_table.sql', 'utf8');
  const queryText =content.toString();
  
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

const refr = () => {
    dropTables();
    createTables();
    fillTables();
}


pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createTables,
  fillTables,
  dropTables,
    refr
};

require('make-runnable');