const express = require("express");
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

module.exports = router;