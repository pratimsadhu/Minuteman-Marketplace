const express = require("express");
const { authenticate } = require("./auth");
const {
    createItem,
    getItem,
    updateItem,
    deleteItem,
    listItems,
    listServices,
    listProducts,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    listUsers,
    getItemsByUser,
} = require("./database");

const router = express.Router();

router.route("/services").get(listServices);

router.route("/products").get(listProducts);

router.route("/items").post(createItem).get(listItems);
router.route("/items/:id").get(getItem);

router.route("/users").post(createUser);
router.use(authenticate);
router.route("/users").get(listUsers);
router.route("/users/:id").get(getUser).put(updateUser).delete(deleteUser);
router.route("/users/:id/items").get(getItemsByUser);

router.route("/items/:id").put(updateItem).delete(deleteItem);

module.exports = router;
