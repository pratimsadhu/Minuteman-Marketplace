const PouchDB = require("pouchdb");
const bcrypt = require("bcrypt");
const { generateToken } = require("./auth");
PouchDB.plugin(require("pouchdb-find"));
const nodemailer = require("nodemailer");
const validator = require("email-validator");
require("dotenv").config();

const marketDB = new PouchDB("marketplace");
const userDB = new PouchDB("users");

const enumTypes = {
    service: {
        requiredFields: ["type", "name", "email", "phoneNo"],
    },
    product: {
        requiredFields: ["type", "name", "email", "phoneNo", "price"],
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
async function createItem(req, res) {
    const { ...item } = req.body;

    if (!item.type) {
        return res.status(400).json({ message: "Type is required" });
    }

    const requiredFields = enumTypes[item.type].requiredFields;
    const missingFields = requiredFields.filter((field) => !item[field]);
    if (missingFields.length > 0) {
        return res
            .status(400)
            .json({ message: `Missing required fields: ${missingFields}` });
    }

    try {
        const response = await marketDB.post(item);
        res.json({ id: response.id, ...item });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * This function retrieves an item from the database with the given id.
 * @param {*} id The id of the item to retrieve
 * @returns The item with the given id or null if the item does not exist
 */
async function getItem(req, res) {
    const { id } = req.params;
    try {
        const response = await marketDB.get(id);
        res.json({ id: response.id, ...response });
    } catch (error) {
        res.status(404).json({ message: "Item not found" });
    }
}

async function updateItem(req, res) {
    const { id } = req.params;
    const { type, ...item } = req.body;

    if (!type) {
        return res.status(400).json({ message: "Type is required" });
    }

    try {
        const response = await marketDB.get(id);
        const updatedItem = { ...response, ...item };
        await marketDB.put(updatedItem);
        res.json({ id: response.id, ...updatedItem });
    } catch (error) {
        res.status(404).json({ message: "Item not found" });
    }
}

async function deleteItem(req, res) {
    const { id } = req.params;
    try {
        const response = await marketDB.get(id);
        await marketDB.remove(response);
        res.json({ id: response.id, ...response });
    } catch (error) {
        res.status(404).json({ message: "Item not found" });
    }
}

async function listItems(req, res) {
    const response = await marketDB.allDocs({ include_docs: true });
    const items = response.rows.map((row) => ({ id: row.id, ...row.doc }));
    if (items.length === 0) {
        return res.status(404).json({ message: "No items found" });
    }
    res.json(items);
}

async function listServices(req, res) {
    const response = await marketDB.find({ selector: { type: "service" } });
    if (response.docs.length === 0) {
        return res.status(404).json({ message: "No services found" });
    }
    res.json(response.docs);
}

async function listProducts(req, res) {
    const response = await marketDB.find({ selector: { type: "product" } });
    if (response.docs.length === 0) {
        return res.status(404).json({ message: "No products found" });
    }
    res.json(response.docs);
}

async function createUser(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res
            .status(400)
            .json({ message: "Name, email, and password are required" });
    }

    try {
        if ((await userDB.find({ selector: { email } })).docs.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userDB.post({
            name,
            email,
            password: hashedPassword,
            items: [],
        });

        const token = generateToken({ user });
        res.json({ id: user.id, token: token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "Email and password are required" });
    }

    try {
        const response = await userDB.find({ selector: { email } });
        if (response.docs.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = response.docs[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = generateToken({ user });
        res.json({ message: "Login Successful", id: user.id, token: token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getUser(req, res) {
    const userId = req.user.id;
    const { id } = req.params;

    if (userId !== id) {
        return res.status(403).json({ message: "Access denied" });
    }

    try {
        const response = await userDB.get(id);
        res.json({ id: response.id, ...response });
    } catch (error) {
        res.status(404).json({ message: "User not found" });
    }
}

async function updateUser(req, res) {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
        const response = await userDB.get(id);
        const updatedUser = { ...response, name, email, password };
        await userDB.put(updatedUser);
        res.json({ id: response.id, ...updatedUser });
    } catch (error) {
        res.status(404).json({ message: "User not found" });
    }
}

async function deleteUser(req, res) {
    const { id } = req.params;
    try {
        const response = await userDB.get(id);
        await userDB.remove(response);
        res.json({ id: response.id, ...response });
    } catch (error) {
        res.status(404).json({ message: "User not found" });
    }
}

async function listUsers(req, res) {
    const response = await userDB.allDocs({ include_docs: true });
    const users = response.rows.map((row) => ({ id: row.id, ...row.doc }));
    if (users.length === 0) {
        return res.status(404).json({ message: "No users found" });
    }
    res.json(users);
}

async function getItemsByUser(req, res) {
    const { id } = req.params;
    try {
        const user = await userDB.get(id);
        const items = await marketDB.find({
            selector: { _id: { $in: user.items } },
        });
        res.json(items.docs);
    } catch (error) {
        res.status(404).json({ message: "User not found" });
    }
}

async function receiveEmail(req, res) {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res
            .status(400)
            .json({ message: "Name, email, and message are required" });
    }

    if (!validator.validate(email)) {
        return res.status(400).json({ message: "Invalid email address" });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: "psadhu@umass.edu",
            subject: `${name} <${email}> contacted you - Minuteman Marketplace!`,
            text: message,
            html: `<p><strong>${name}</strong> (<a href="mailto:${email}">${email}</a>) sent you a message:</p><p>${message}</p>`,
        };

        await transporter.sendMail(mailOptions);
        return res.json({ message: "Message sent successfully" });
    } catch (error) {
        console.error("Email sending error:", error);
        return res
            .status(500)
            .json({ message: "Couldn't send message!", error: error.message });
    }
}



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
    loginUser,
    receiveEmail,
};
