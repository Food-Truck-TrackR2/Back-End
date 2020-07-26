const router = require("express").Router();

const Trucks = require("../models/truck-model");
const { truckReq, menuReq } = require("../middleware/auth-mw");
const restricted = require("../auth/restricted-middleware");

router.use(restricted);

router.get("/", (req, res) => {
  Trucks.find()
    .then((trucks) => {
      res.status(200).json({ foodTrucks: trucks });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  Trucks.findById(id)
    .then((truck) => {
      if (truck) {
        res.status(200).json({ data: truck });
      } else {
        res.status(404).json({ message: "No truck by that ID found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get("/:id/menu", (req, res) => {
  const { id } = req.params;

  Trucks.findTruckMenu(id)
    .then((menu) => {
      if (menu.length > 0) {
        res.status(200).json({ trucksMenu: menu });
      } else {
        res
          .status(404)
          .json({ message: "Could not find Menu Items for given truck" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          message: "Failed to get Food trucks's menu items",
          errMessage: err.message,
        });
    });
});

router.post("/:id/menu", (req, res) => {
  const menuData = req.body;
  const { id } = req.params;

  menuData.truck_id = id;

  Trucks.findById(id).then((truck) => {
    if (truck) {
      if (menuReq(menuData)) {
        Trucks.addMenuItem(menuData)
          .then((menu) => {
            res.status(201).json({ truckMenu: menu });
          })
          .catch((err) => {
            console.log("your error", err.message);
            res
              .status(500)
              .json({ message: "Could not add to database / API erroor" });
          });
      } else {
        res
          .status(404)
          .json({
            message: "please have all fields for a menu item filled out",
          });
      }
    } else {
      res
        .status(404)
        .json({ message: "Couldnot find Operator with the given id." });
    }
  });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  if (truckReq(changes)) {
    Trucks.findById(id)
      .then((truck) => {
        if (truck) {
          Trucks.update(id, changes)
            .then((updatedTruck) => {
              res.status(201).json({ updatedTruck });
            })
            .catch((err) => {
              res
                .status(500)
                .json({
                  errorMessage:
                    "sorry coud not update Truck at this time. API error",
                  err: err.message,
                });
            });
        } else {
          res.status(404).json({ message: "No truck by that ID found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } else {
    res
      .status(404)
      .json({ message: "Please have all fields for a truck filled out" });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Trucks.remove(id)
    .then((deleted) => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res
          .status(404)
          .json({ message: "Could not find Food Truck with given id" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          message: "Failed to delete Food Truck, API error",
          errMessage: err.message,
        });
    });
});

module.exports = router;
