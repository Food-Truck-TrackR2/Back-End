const db = require("../database/db-connection");

module.exports = {
  find,
  findById,
  update,
  addMenuItem,
  findTruckMenu,
  remove,
};

function find() {
  return db("foodTrucks").select(
    "id",
    "truckName",
    "imgOfTruck",
    "customerRatingAvg",
    "currentLocation",
    "departTime",
    "operator_id"
  );
}

function findById(id) {
  return db("foodTrucks").where({ id }).first();
}

function update(id, changes) {
  return db("foodTrucks").where({ id }).update(changes);
}

function findByMenuId(id) {
  return db("menu").where({ id }).first();
}

function findTruckMenu(id) {
  return db("foodTrucks")
    .join("menu", "foodTrucks.id", "menu.truck_id")
    .select(
      "menu.id",
      "menu.menuName",
      "menu.menuDesc",
      "menu.menuPhoto",
      "menu.menuPrice",
      "menu.customerRatingAvg",
      "menu.truck_id"
    )
    .where({ "menu.truck_id": id });
}

async function addMenuItem(menu) {
  try {
    const [id] = await db("menu").insert(menu);

    return findByMenuId(id);
  } catch (error) {
    throw error;
  }
}

function remove(id) {
  return db("foodTrucks").where({ id }).del();
}
