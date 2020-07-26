exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments();

      tbl.string("username", 128).notNullable().unique();
      tbl.string("password", 258).notNullable();
      tbl.string("role", 128).notNullable();
    })

    .createTable("exampleFoodTruck", (tbl) => {
      tbl.increments();

      tbl.string("imgOfTruck", 400).notNullable();
      tbl.string("cuisineType", 128).notNullable();
      tbl.integer("cstmrRatingAvg").notNullable();
      tbl.string("menu", 123).notNullable();
      tbl.string("currentLocation", 258).notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("users")
    .dropTableIfExists("exampleFoodTruck");
};
