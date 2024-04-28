const PouchDB = require("pouchdb");
PouchDB.plugin(require("pouchdb-find"));

const marketDB = new PouchDB("marketplace");
const userDB = new PouchDB("users");

// Define the required fields for each item type in the database
const enumTypes = {
    service: {
        requiredFields: ["name", "description", "rating"],
    },
    product: {
        requiredFields: ["name", "description", "price", "rating"],
    },
    user: {
        requiredFields: ["name", "email", "password", "items"],
    },
};

/**
 * This function creates an item in the database with the given item data.
 * @param {*} item The item to create in the database
 * @returns The created item with an id or throws an error if the item is invalid
 */
async function createItem(req, res) {}

/**
 * This function retrieves an item from the database with the given id.
 * @param {*} id The id of the item to retrieve
 * @returns The item with the given id or null if the item does not exist
 */
async function getItem(req, res) {}

async function updateItem(req, res) {}

async function deleteItem(req, res) {}

async function listItems(req, res) {
    const response = await marketDB.allDocs({ include_docs: true });
    const items = response.rows.map((row) => ({ id: row.id, ...row.doc }));
    if (items.length === 0) {
        return res.status(404).json({ message: "No items found" });
    }
    res.json(items);
}

async function listServices() {}

async function listProducts() {}

async function createUser() {}

async function getUser() {}

async function updateUser() {}

async function deleteUser() {}

async function listUsers() {}

async function getItemsByUser() {}

module.exports = {
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
};
