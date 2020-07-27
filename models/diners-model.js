const db = require("../database/db-connection");

module.exports = {
  find,
  findBy,
  add,
  findById,
  remove,
  update,
};

function find() {
  return db("diners").select("id", "username");
}

function findById(id) {
  return db("diners").where({ id }).first();
}

function update(id, changes) {
  return db("diners").where({ id }).update(changes);
}

function remove(id) {
  return db("diners").where({ id }).del();
}

// function findTruck() {
//     return db('exampleFoodTruck').select('id', 'imgOfTruck', 'cuisineType', 'cstmrRatingAvg','menu', 'currentLocation')
// }

function findBy(filter) {
  return db("diners").where(filter);
}

async function add(user) {
  try {
    const [id] = await db("diners").insert(user, "id");

    return findById(id);
  } catch (error) {
    throw error;
  }
}
