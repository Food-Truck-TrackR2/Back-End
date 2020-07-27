const db = require("../database/db-connection");

module.exports = {
  find,
  findBy,
  add,
  addTruck,
  findById,
  findByTruckId,
  findTrucks,
  update,
  remove,
};

function find() {
  return db("operators").select("id", "username");
}

function findById(id) {
  return db("operators").where({ id }).first();
}

function findByTruckId(id) {
  return db("foodTrucks").where({ id }).first();
}

function findBy(filter) {
  return db("operators").where(filter);
}

function findTrucks(id) {
  return db("operators")
    .join("foodTrucks", "operators.id", "foodTrucks.operator_id")
    .select(
      "foodTrucks.id",
      "foodTrucks.truckName",
      "foodTrucks.imgOfTruck",
      "foodTrucks.customerRatingAvg",
      "foodTrucks.currentLocation",
      "foodTrucks.departTime",
      "foodTrucks.operator_id"
    )
    .where({ "foodTrucks.operator_id": id });
}

function update(id, changes) {
  return db("operators").where({ id }).update(changes);
}

async function add(user) {
  try {
    const [id] = await db("operators").insert(user, "id");

    return findById(id);
  } catch (error) {
    throw error;
  }
}

function remove(id) {
  return db("operators").where({ id }).del();
}

async function addTruck(truck) {
  try {
    const [id] = await db("foodTrucks").insert(truck);

    return findByTruckId(id);
  } catch (error) {
    throw error;
  }
}
