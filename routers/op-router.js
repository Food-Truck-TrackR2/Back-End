const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Ops = require("../models/op-model");
const restricted = require("../auth/restricted-middleware");
const { truckReq, isValid } = require("../middleware/auth-mw");

router.use(restricted);

router.get("/", (req, res) => {
  Ops.find()
    .then((users) => {
      res.status(200).json({ users, jwt: req.jwt });
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  Ops.findById(id)
    .then((user) => {
      if (user) {
        res.status(200).json({ data: user });
      } else {
        res.status(404).json({ message: "No account by that ID found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get("/:id/trucks", (req, res) => {
  const { id } = req.params;

  Ops.findTrucks(id)
    .then((trucks) => {
      if (trucks.length > 0) {
        res.status(200).json({ operatorsTrucks: trucks });
      } else {
        res
          .status(404)
          .json({ message: "Could not find trucks for given operator id" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          message: "Failed to get Operator's trucks",
          errMessage: err.message,
        });
    });
});

router.post("/:id/trucks", (req, res) => {
  const truckData = req.body;
  const { id } = req.params;
  truckData.operator_id = id;

  Ops.findById(id).then((op) => {
    if (op) {
      if (truckReq(truckData)) {
        Ops.addTruck(truckData)
          .then((truck) => {
            res.status(201).json({ trucks: truck });
          })
          .catch((err) => {
            console.log("truck error", err.message);
            res
              .status(500)
              .json({
                message: "Could not add to database/ API issue",
                err: err.message,
              });
          });
      } else {
        res
          .status(404)
          .json({ message: "Please have all fields for a truck filled out" });
      }
    } else {
      res
        .status(404)
        .json({ message: "Could not Find Operator with given id." });
    }
  });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  const id = req.params.id;

  Ops.findById(id).then((user) => {
    if (user) {
      if (isValid(changes)) {
        const rounds = process.env.BCRYPT_ROUNDS || 12;

        const hash = bcrypt.hashSync(changes.password, rounds);

        changes.password = hash;

        Ops.update(id, changes)
          .then((updatedOp) => {
            res.status(201).json({ updatedOp });
          })
          .catch((err) => {
            res.status(500).json({ message: err.message });
          });
      } else {
        res
          .status(404)
          .json({ message: "Please provide a username and password" });
      }
    } else {
      res.status(404).json({ message: "No account by that ID found" });
    }
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Ops.remove(id)
    .then((deleted) => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res
          .status(404)
          .json({ message: "Could not find Operator with given id" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          message: "Failed to delete Operator, API error",
          errMessage: err.message,
        });
    });
});
module.exports = router;
