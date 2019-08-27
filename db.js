
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
		`SELECT * FROM PARTICIPANT WHERE ip = $1`, [ip]
	)
}
const getResult = () => {
	return pg_client.query(
		`SELECT COUNT (CASE WHEN (is_it = 'true' AND is_positive = 'true') 
		then 'it_positive' END) AS it_positive, 
		COUNT(CASE WHEN (is_it = 'true' AND is_positive = 'false') 
		then 'it_negative' END) AS it_negative,
		COUNT(CASE WHEN (is_it = 'false' AND is_positive = 'true') 
		then 'nit_positive' END) AS nit_positive,
		COUNT(CASE WHEN (is_it = 'false' AND is_positive = 'false') 
		then 'nit_negative' END) AS nit_negative
		FROM participant`
	)
}

module.exports = {
  addParticipant,
	getParticipant,
	getResult
};
