const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// auth routers will be below here ---->

const dinerAuthRouter = require("../auth/dinerAuth-router");
const dinersRouter = require("../routers/diners-router");

// other routers will be below here ----->

const operatorAuthRouter = require("../auth/opAuth-router");
const opsRouter = require("../routers/op-router");
const trucksRouter = require("../routers/truck-router");
const menuRouter = require("../routers/menu-router");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

// auth log in routers
server.use("/api/diner-auth", dinerAuthRouter);
server.use("/api/op-auth", operatorAuthRouter);

// routers for each user type
server.use("/api/diners", dinersRouter);
server.use("/api/ops", opsRouter);
server.use("/api/trucks", trucksRouter);
server.use("/api/menus", menuRouter);

server.get("/", (req, res) => {
  res.json({
    api:
      "Welcome, the Food Truck API is Up and Running! Please Use the Sign in endpoints to continue",
  });
});

module.exports = server;
