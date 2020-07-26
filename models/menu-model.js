const db = require("../database/db-connection");

module.exports = {
  find,
  findById,
  update,
  remove,
};

function find() {
  return db("menu").select(
    "id",
    "menuName",
    "menuDesc",
    "menuPhoto",
    "menuPrice",
    "customerRatingAvg"
  );
}

function findById(id) {
  return db("menu").where({ id }).first();
}

function update(id, changes) {
  return db("menu").where({ id }).update(changes);
}

function remove(id) {
  return db("menu").where({ id }).del();
}
