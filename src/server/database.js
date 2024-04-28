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
async function createItem(item) {
    // Validate the item type
    const typeInfo = enumTypes[item.type];
    if (!typeInfo) {
        throw new Error("Invalid item type");
    }

    // Validate the required fields
    const missingFields = typeInfo.requiredFields.filter(
        (field) => !item[field]
    );
    if (missingFields.length) {
        throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }

    // Create the item in the database
    const response = await marketDB.post({
        ...item,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    });
    return { id: response.id, ...item };
}

/**
 * This function retrieves an item from the database with the given id.
 * @param {*} id The id of the item to retrieve
 * @returns The item with the given id or null if the item does not exist
 */
async function getItem(id) {
    try {
        const response = await marketDB.get(id);
        return { id, ...response };
    } catch (error) {
        return null;
    }
}

async function updateItem(id, updates) {}

async function deleteItem(id) {}

async function listItems() {
    const response = await marketDB.allDocs({ include_docs: true });
    return response.rows.map((row) => ({ id: row.id, ...row.doc }));
}

async function listServices() {}

async function listProducts() {}

async function createUser(user) {}

async function getUser(id) {}

async function updateUser(id, updates) {}

async function deleteUser(id) {}

async function listUsers() {}

async function getItemsByUser(userId) {}

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
