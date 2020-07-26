exports.up = function (knex) {
  return knex.schema
    .createTable("diners", (tbl) => {
      tbl.increments();

      tbl.string("username", 258).notNullable().unique();
      tbl.string("password", 300).notNullable();
    })

    .createTable("operators", (tbl) => {
      tbl.increments();

      tbl.string("username", 258).notNullable().unique();
      tbl.string("password", 300).notNullable();
    })

    .createTable("foodTrucks", (tbl) => {
      tbl.increments();

      tbl.string("truckName", 258).notNullable();
      tbl.string("imgOfTruck", 400);
      tbl.integer("customerRatings");
      tbl.integer("customerRatingAvg").notNullable();
      tbl.string("currentLocation", 300).notNullable();
      tbl.string("departTime", 258).notNullable();
      tbl
        .integer("operator_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("operators")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
    })

    .createTable("menu", (tbl) => {
      tbl.increments();

      tbl.string("menuName", 128).notNullable();
      tbl.string("menuDesc", 300).notNullable();
      tbl.string("menuPhoto", 300);
      tbl.float("menuPrice").notNullable();
      tbl.integer("customerRatingAvg");
      tbl
        .integer("truck_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("foodTrucks")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("foodTrucks")
    .dropTableIfExists("menu")
    .dropTableIfExists("operators")
    .dropTableIfExists("diners");
};
