const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../client")));

const router = require("./server");
app.use("/", router);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
