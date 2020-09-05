/* eslint-disable radix */
const connection = require('./queries.js');

const getRoomById = (request, response) => {
  const id = parseInt(request.params.id);

  connection.pool.query('SELECT * FROM listings WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

module.exports.getRoomById = getRoomById;
