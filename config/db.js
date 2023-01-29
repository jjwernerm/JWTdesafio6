const { Pool } = require('pg');

const pool = new Pool ({
  host: 'postgresql-joa.alwaysdata.net',
  user: 'joa',
  password: 'Developer123.',
  database: 'joa_softjobs',
  port: 5432,
  allowExitOnIdle: true
});

module.exports = pool;