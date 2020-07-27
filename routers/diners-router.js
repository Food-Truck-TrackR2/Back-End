const router = require("express").Router();
const bcrypt = require("bcryptjs");

// User Models and  middle ware and config vars go below this line ------->
const Diners = require("../models/diners-model");
const restricted = require("../auth/restricted-middleware");
const { isValid } = require("../middleware/auth-mw");
router.use(restricted);

router.get("/", (req, res) => {
  Diners.find()
    .then((users) => {
      res.status(200).json({ users, jwt: req.jwt });
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  Diners.findById(id)
    .then((user) => {
      if (user) {
        res.status(200).json({ data: user });
      } else {
        res.status(404).json({ message: "No account by that ID" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  const id = req.params.id;

  Diners.findById(id).then((user) => {
    if (user) {
      if (isValid(changes)) {
        const rounds = process.env.BCRYPT_ROUNDS || 12;

        const hash = bcrypt.hashSync(changes.password, rounds);

        changes.password = hash;

        Diners.update(id, changes)
          .then((updatedDin) => {
            res.status(201).json({ updatedDin });
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

  Diners.remove(id)
    .then((deleted) => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: "Could not find Diner with given id" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to delete Diner, API error",
        errMessage: err.message,
      });
    });
});

module.exports = router;
