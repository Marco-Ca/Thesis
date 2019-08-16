
const pg = require('pg');

const pg_client = new pg.Client({
  user: 'postgres',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
  idleTimeoutMillis: 60, // how long a client is allowed to remain idle before being closed
});

pg_client.connect();

function addParticipant(admin, ip, name, country, is_it, is_positive) {
  return pg_client.query(
    `INSERT INTO participant (is_admin, ip, name, country, is_it, is_positive)
        VALUES ($1, $2, $3, $4, $5, $6);`,
        [admin, ip, name, country, is_it, is_positive]
  );
}

function getParticipant(ip) {
	return pg_client.query(
		`SELECT * FROM PARTICIPANT WHERE `
	)
}

module.exports = {
  addParticipant

};
