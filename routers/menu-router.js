const router = require("express").Router();

const Menu = require("../models/menu-model");
const restricted = require("../auth/restricted-middleware");
const { menuReq } = require("../middleware/auth-mw");

router.use(restricted);

router.get("/", (req, res) => {
  Menu.find()
    .then((menus) => {
      res.status(200).json({ menuItems: menus });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  Menu.findById(id)
    .then((menu) => {
      if (menu) {
        res.status(200).json({ data: menu });
      } else {
        res.status(404).json({ message: "No menu item by that ID found" });
      }
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ message: err.message });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  Menu.findById(id)
    .then((menu) => {
      if (menu) {
        if (menuReq(changes)) {
          Menu.update(id, changes)
            .then((updatedMenu) => {
              res.status(201).json({ updatedMenu });
            })
            .catch((err) => {
              console.log(err);
              res
                .status(500)
                .json({
                  message:
                    "Sorry, could not update menu in database, API error",
                });
            });
        } else {
          res
            .status(404)
            .json({
              message: "Please be sure to fill out all menu requirements",
            });
        }
      } else {
        res.status(404).json({ message: "No menu item by that ID found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Menu.remove(id)
    .then((deleted) => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res
          .status(404)
          .json({ message: "Could not find Menu item with given id" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          message: "Failed to delete Menu item, API error",
          errMessage: err.message,
        });
    });
});

module.exports = router;
